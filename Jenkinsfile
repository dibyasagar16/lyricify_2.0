pipeline {
    agent any

    environment {
        // REPLACE with your AWS Region, e.g., 'us-east-1'
        AWS_REGION = 'us-east-1'
        // REPLACE with your AWS Account ID (the 12-digit number)
        AWS_ACCOUNT_ID = '245013470166'
        // REPLACE with the name you gave your ECR repository
        ECR_REPOSITORY_NAME = 'lyricify'
        // The name we'll give the running container
        CONTAINER_NAME = 'lyricify-web'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning the repository...'
                // This will automatically clone the repo linked to the pipeline
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building the Docker image..."
                // The full ECR path for the image
                script {
                    // We use the build number from Jenkins to tag each image uniquely
                    dockerImage = docker.build("${ECR_REPOSITORY_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Image to AWS ECR') {
            steps {
                echo "Logging in to ECR and pushing the image..."
                // Use the 'aws-credentials' we set up in Jenkins
                withAWS(region: AWS_REGION, credentials: 'aws-credentials') {
                    // Get login command from ECR and execute it
                    def login = ecr.getLogin()
                    sh(login)

                    // Push the image with the build number tag
                    dockerImage.push()

                    // Also push it with the 'latest' tag for easy reference
                    dockerImage.push('latest')
                }
            }
        }

       stage('Deploy on EC2') {
            steps {
                echo "Deploying the new container with secrets..."
                    
                // This block securely loads your secret file.
                // The 'credentialId' must match the ID you created in Jenkins.
                // 'variable' is the name of the environment variable that will hold the path to the temp file.
                withCredentials([file(credentialsId: 'lyricify-env-file', variable: 'ENV_FILE')]) {
                    script {
                        def imageUrl = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY_NAME}:latest"
                            
                        // We modify the 'docker run' command here
                        sh """
                            docker stop ${CONTAINER_NAME} || true
                            docker rm ${CONTAINER_NAME} || true
                            docker pull ${imageUrl}

                            # The --env-file flag tells Docker to load all variables from our secret file
                            # Jenkins makes the secret file available at the path stored in the $ENV_FILE variable
                            docker run -d --name ${CONTAINER_NAME} -p 80:80 --env-file ${ENV_FILE} ${imageUrl}
                            """
                    }
                }
            }
        }
    }
}