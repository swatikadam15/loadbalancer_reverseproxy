pipeline {
    agent any
    triggers {
        githubPush()
    }
    environment {
        IMAGE = "swatikadam16/k8s-hostname-ip"
        TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"

        // KUBECONFIG = "/home/ubuntu/.kube/config"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE}:${TAG} ."
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker push ${IMAGE}:${TAG}
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl version --client
                kubectl get nodes
                
                sed -i "s/latest/${TAG}/g" deployment.yaml
                kubectl apply -f app1deployment.yaml
                kubectl apply -f app2deployment.yaml
                kubectl apply -f app3deployment.yaml
                kubectl apply -f app4deployment.yaml
                kubectl apply -f app1service.yaml 
                kubectl apply -f app2service.yaml 
                kubectl apply -f app3service.yaml 
                kubectl apply -f app1service.yaml 

              
          

                kubectl rollout status deployment/nodejs-deployment
                '''
            }
        }
    }
}