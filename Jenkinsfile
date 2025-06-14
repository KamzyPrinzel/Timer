pipeline {
    agent any

    environment {
        IMAGE_NAME = 'timer:1'
    }

    stages {

        stage('clean up workspace') {
            steps {
                deleteDir()
            }
        }

        stage('check out from git repo') {
            steps {
                git branch: 'main', url: 'https://github.com/KamzyPrinzel/Timer.git'
            }
        }

        stage('build docker image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('run container from image') {
            steps {
                sh 'docker run -d -p 1234:80 $IMAGE_NAME'
            }
        }

        stage('scan docker image with trivy') {
            steps {
               sh 'trivy image --scanners vuln --timeout 10m $IMAGE_NAME > timer-1-result.txt'
            }
        }

        stage('push image to dockerhub') {
            steps {
                withCredentials([string(credentialsId: 'dockerhub-password', variable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u prinzkay --password-stdin
                        docker push $IMAGE_NAME
                    '''
                }
            }
        }
    }
}
