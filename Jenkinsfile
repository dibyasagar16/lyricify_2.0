pipeline {
    agent any

    tools {
        git 'Default'
    }

    environment {
        AWS_REGION = 'us-east-1'
        AWS_ACCOUNT_ID = '245013470166'
        ECR_REPOSITORY_NAME = 'lyricify'
        CONTAINER_NAME = 'lyricify-web'
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
                echo "Building the Docker image..."
                script {
                    // Tag the image with AWS ECR URL and build number
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
                        // Secure login to ECR
                        sh """
                            aws ecr get-login-password --region ${AWS_REGION} \
                            | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                        """

                        // Push images
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy on EC2') {
            steps {
                echo "Deploying the new container with secrets..."
                withCredentials([file(credentialsId: 'lyricify-env-file', variable: 'ENV_FILE')]) {
                    script {
                        // Image URL
                        def imageUrl = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_NAME}:latest"

                        // Use safe shell expansion for secrets
                        sh '''
                            docker stop ${CONTAINER_NAME} || true
                            docker rm ${CONTAINER_NAME} || true
                            docker pull ${imageUrl}
                            docker run -d --name ${CONTAINER_NAME} -p 80:80 --env-file $ENV_FILE ${imageUrl}
                        '''
                    }
                }
            }
        }
    }
}
