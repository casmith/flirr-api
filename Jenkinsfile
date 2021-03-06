pipeline {
   environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
        registry = 'casmith/flirr-api'
        registryCredential = 'dockerhub'
        dockerImage = ''
    }
    agent none
    stages {
        stage('build') {
            agent { docker { image 'node:latest' } }
            steps {
                sh 'npm install'
                sh 'npm test'
            }
            // post { always { stash includes: '**/*', name: 'build' } }
        }
        stage('publish image') {
            agent any
            steps {
                script {
                    // unstash 'build'
                    // sh 'ls -lah'
                    dockerImage = docker.build(registry + ":$BUILD_NUMBER", "--platform=linux/amd64 .")
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                    sh "docker rmi $registry:$BUILD_NUMBER"
                }
            }
        }
      stage('deploy') {
            agent any
            steps {
                script {
                    if (env.BRANCH_NAME == 'master' || env.BRANCH_NAME == 'develop') {
                        build job: '../docker-syno/master', parameters: [[$class: 'StringParameterValue', name: 'component', value: "flirr-api"]]
                    }
                }
            }
        }
    }
}
