#!/bin/bash

export PATH=/usr/local/bin:$PATH;
export DISPLAY=:0
export ACCEPTANCE_URL=localhost:8080

./deploy.sh
deployexitcode=$?
if [ $deployexitcode != 0 ]; then
  echo "deploy exited with error code $deployexitcode"
  exit $deployexitcode
fi

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

grunt mochaTest:acceptance
acceptanceexitcode=$?
if [ $acceptanceexitcode != 0 ]; then
  echo "Acceptance tests exited with error code $acceptanceexitcode"
  exit $acceptanceexitcode
fi

exit 0
