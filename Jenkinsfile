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
    }
}
