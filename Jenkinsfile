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
                    whoami
                    aws sts get-caller-identity
                """
                
                echo 'Building the code...'
            }
        }
    }
}
