#!/bin/bash

echo "Running revision $1 on port $2"

echo -e '\nPulling from docker'
ssh vagrant@192.168.50.4 "docker pull ironpeak/tictactoe:$1"
pulldocker=$?
if [ $pulldocker != 0 ]; then
    echo "docker pull failed with error code $pulldocker"
    exit $pulldocker
fi

echo -e '\nKilling and removing current'
ssh vagrant@192.168.50.4 "(docker kill production$2; docker rm production$2;)"
killdocker=$?
if [ $killdocker != 0 ]; then
    echo "docker kill & remove failed with error code $killdocker"
    exit $killdocker
fi

echo -e '\nDeploying'
ssh vagrant@192.168.50.4 "docker run -p $2:8080 -d -e NODE_ENV=production --name production$2 ironpeak/tictactoe:$1"
rundocker=$?
if [ $rundocker != 0 ]; then
    echo "docker run failed with error code $rundocker"
    exit $rundocker
fi

echo -e '\nDone'

exit 0
