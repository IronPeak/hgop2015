#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app
grunt
gruntexitcode=$?
if [ $gruntexitcode != 0 ]; then
    echo "grunt exited with error code $gruntexitcode , cancelling build"
    exit $gruntexitcode
fi

cp ./Dockerfile ./dist/

cd dist
npm install --production
npmexitcode=$?
if [ $npmexitcode != 0 ]; then
    echo "npm exited with error code $npmexitcode , cancelling build"
    exit $npmexitcode
fi

echo Building docker image
sudo service docker start
docker build -t ironpeak/tictactoe .
buildexitcode=$?
if [ $buildexitcode != 0 ]; then
    echo "docker build exited with error code $buildexitcode"
    exit $buildexitcode
fi

echo "Done"

exit 0
