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
                        // Login to ECR (make sure this runs as a shell command)
                        sh ecrLogin()

                        // Push the image with build number tag
                        dockerImage.push()

                        // Push the image with latest tag
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
                        def imageUrl = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_NAME}:latest"

                        sh """
                            docker stop ${CONTAINER_NAME} || true
                            docker rm ${CONTAINER_NAME} || true
                            docker pull ${imageUrl}
                            docker run -d --name ${CONTAINER_NAME} -p 80:80 --env-file ${ENV_FILE} ${imageUrl}
                        """
                    }
                }
            }
        }
    }
}
