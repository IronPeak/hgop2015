#!/bin/bash

echo 'Starting deployment'

echo -e '\nPulling from docker'
ssh vagrant@192.168.50.4 "docker pull ironpeak/tictactoe:$"
pulldocker=$?
if [ $pulldocker != 0 ]; then
    echo "docker pull failed with error code $pulldocker"
    exit $pulldocker
fi

echo -e '\nKilling and removing current'
ssh vagrant@192.168.50.4 '(str=$(docker ps -a -f "name=productiontest" | grep "productiontest")
                          if [ ! -z "$str" ]; then
                            echo -e "\nKilling current"
                            docker kill productiontest
                            echo -e "\nRemoving old"
                            docker rm productiontest
                          fi)'
killdocker=$?
if [ $killdocker != 0 ]; then
    echo "docker kill & remove failed with error code $killdocker"
    exit $killdocker
fi

echo -e '\nDeploying'
ssh vagrant@192.168.50.4 "docker run -p 8080:8080 -d -e NODE_ENV=production --name productiontest ironpeak/tictactoe:$GIT_COMMIT"
rundocker=$?
if [ $rundocker != 0 ]; then
    echo "docker run failed with error code $rundocker"
    exit $rundocker
fi

echo -e '\nDone'

exit 0
