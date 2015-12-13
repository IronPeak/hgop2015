#!/bin/bash

export DISPLAY=:0
export PATH=/usr/local/bin:$PATH;
export ACCEPTANCE_URL=192.168.50.4:8080

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

grunt mochaTest:load
capacityexitcode=$?
if [ $capacityexitcode != 0 ]; then
  echo "Capacity tests exited with error code $capacityexitcode"
  exit $capacityexitcode
fi

exit 0
