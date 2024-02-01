pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Using checkout scm to automatically check out the source code
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // Your build steps go here
                sh """
                    aws ecr get-login-password | docker login --username AWS --password-stdin 627554678886.dkr.ecr.eu-west-2.amazonaws.com
                """
                
                echo 'Building the code...'
            }
        }

        stage('Test') {
            steps {
                // Your test steps go here
                echo 'Running tests...'
            }
        }

        stage('Deploy') {
            steps {
                // Your deployment steps go here
                echo 'Deploying the code...'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'

            // Additional post-success steps if needed
        }

        failure {
            echo 'Pipeline failed!'

            // Additional post-failure steps if needed
        }
    }
}
