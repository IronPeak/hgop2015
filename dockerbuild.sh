#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app
grunt
gruntexitcode=$?
if [ $gruntexitcode != 0 ]; then
    echo "grunt exited with error code $gruntexitcode"
    exit $gruntexitcode
fi

cp ./Dockerfile ./dist/

cd dist
npm install --production
npmexitcode=$?
if [ $npmexitcode != 0 ]; then
    echo "npm install exited with error code $npmexitcode"
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

docker push ironpeak/tictactoe
pushexitcode=$?
if [ $pushexitcode != 0 ]; then
    echo "docker push exited with error code $pushexitcode"
    exit $pushexitcode
fi

echo "Done"

exit 0
