#!/bin/bash

echo 'Starting jenkins shell script'

export PATH=/usr/local/bin:$PATH;
export DISPLAY=:0

npm install
npmexitcode=$?
if [ $npmexitcode != 0 ]; then
  echo "npm install exited with error code $npmexitcode"
  exit $npmexitcode
fi

bower install
bowerexitcode=$?
if [ $bowerexitcode != 0 ]; then
  echo "bower install exited with error code $bowerexitcode"
  exit $bowerexitcode
fi

./bin/dockerbuild.sh
buildexitcode=$?
if [ $buildexitcode != 0 ]; then
  echo "Dockerbuild exited with error code $buildexitcode"
  exit $buildexitcode
fi

echo 'Finished jenkins shell script'

exit 0
