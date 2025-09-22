def dockerImage  // Declare it once globally

pipeline {
    agent any

    tools {
        git 'Default'
    }

    environment {
        AWS_REGION = 'us-east-1'
        AWS_ACCOUNT_ID = '245013470166'
        ECR_REPOSITORY_NAME = 'lyricify'
        COMPOSE_PROJECT_DIR = '/opt/monitoring'  // Path to your docker-compose.yml
        SERVICE_NAME = 'lyricify-web'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning the repository...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image..."
                script {
                    def imageTag = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_NAME}:${env.BUILD_NUMBER}"
                    dockerImage = docker.build(imageTag)
                }
            }
        }

        stage('Push Image to AWS ECR') {
            steps {
                echo "Logging in to ECR and pushing the image..."
                withAWS(region: AWS_REGION, credentials: 'aws-credentials') {
                    script {
                        sh """
                        aws ecr get-login-password --region ${AWS_REGION} \
                        | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                        """
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo "Deploying using Docker Compose..."
                withCredentials([file(credentialsId: 'lyricify-env-file', variable: 'ENV_FILE')]) {
                    script {
                        sh """
                        cd ${COMPOSE_PROJECT_DIR}

                        # Copy the Jenkins-provided env file to the compose directory
                        cp \$ENV_FILE /tmp/lyricify.env

                        # Pull the latest image for the app
                        docker compose --env-file /tmp/lyricify.env pull ${SERVICE_NAME}

                        # Start or update the app container
                        docker compose --env-file /tmp/lyricify.env up -d ${SERVICE_NAME}
                        """
                    }
                }
            }
        }

    }
}
