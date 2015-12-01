#!/bin/bash

echo -e '\nStarting deployment'

echo -e '\nPushing to docker'
docker push ironpeak/tictactoe

echo -e '\nConnecting to test-production-environment'
ssh vagrant@192.168.50.4 '(echo -e "\nPulling image from docker"
                          docker pull ironpeak/tictactoe
                          str=$(docker ps -a -f "name=productiontest" | grep "productiontest")
                          if [ ! -z "$str" ]; then
                            echo -e "\nKilling current"
                            docker kill productiontest
                            echo -e "\nRemoving old"
                            docker rm productiontest
                          fi
                          echo -e "\nDeploying image"
                          docker run -p 8080:8080 -d -e NODE_ENV=production --name productiontest ironpeak/tictactoe
                          exit)'

echo -e '\nDone'

exit 0
