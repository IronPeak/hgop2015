#!/bin/bash

export PATH=/usr/local/bin:$PATH;
export DISPLAY=:0
export ACCEPTANCE_URL=192.168.50.4:8080
GIT_UPSTREAM_HASH=$(<dist/githash.txt)

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

./bin/dockerdeploy.sh $GIT_UPSTREAM_HASH 8080
deployexitcode=$?
if [ $deployexitcode != 0 ]; then
  echo "deploy exited with error code $deployexitcode"
  exit $deployexitcode
fi

grunt mochaTest:acceptance
acceptanceexitcode=$?
if [ $acceptanceexitcode != 0 ]; then
  echo "Acceptance tests exited with error code $acceptanceexitcode"
  exit $acceptanceexitcode
fi

exit 0
