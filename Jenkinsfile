pipeline {
  agent any

  environment {
    AWS_REGION          = 'us-east-1'
    AWS_ACCOUNT_ID      = '245013470166'
    ECR_REPOSITORY_NAME = 'lyricify'
    COMPOSE_PROJECT_DIR = '/var/lib/jenkins/monitoring'
    SERVICE_NAME        = 'lyricify-web'
  }

  stages {
    stage('Checkout Code') {
      steps {
        echo 'Cloning the repository...'
        checkout scm
      }
    }

    stage('Init') {
      steps {
        script {
          env.IMAGE_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_NAME}"
        }
        echo "Image URI set to ${env.IMAGE_URI}"
      }
    }

    stage('Build Docker Image') {
      steps {
        echo "Building Docker image..."
        sh """
          docker build -t ${IMAGE_URI}:${BUILD_NUMBER} .
          docker tag ${IMAGE_URI}:${BUILD_NUMBER} ${IMAGE_URI}:latest
        """
      }
    }

    stage('Push Image to AWS ECR') {
      steps {
        echo "Pushing the image to ECR..."
        withAWS(region: "${AWS_REGION}", credentials: 'aws-credentials') {
          sh """
            aws ecr get-login-password --region ${AWS_REGION} \
              | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
            docker push ${IMAGE_URI}:${BUILD_NUMBER}
            docker push ${IMAGE_URI}:latest
          """
        }
      }
    }

    stage('Deploy Configs') {
        steps {
            echo "Deplyoing monitoring configs to the server..."
            sh """
                mkdir -p ${COMPOSE_PROJECT_DIR}
                cp docker-compose.yml ${COMPOSE_PROJECT_DIR}/
                cp prometheus.yml ${COMPOSE_PROJECT_DIR}/
            """
        }
    }

    stage('Deploy with Docker Compose') {
      steps {
        echo "Deploying all services with Docker Compose..."
        withCredentials([file(credentialsId: 'lyricify-env-file', variable: 'ENV_FILE')]) {
          sh """
            cd ${COMPOSE_PROJECT_DIR}
            export ENV_FILE=${ENV_FILE}
            export AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID}
            export AWS_REGION=${AWS_REGION}

            # Pull latest images
            docker compose --env-file "$ENV_FILE" pull

            # Bring everything up (app + monitoring)
            docker compose --env-file "$ENV_FILE" up -d
          """
        }
      }
    }
  }
}
