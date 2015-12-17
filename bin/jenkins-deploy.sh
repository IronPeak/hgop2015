#!/bin/bash

GIT_UPSTREAM_HASH=$(<dist/githash.txt)

./bin/dockerdeploy.sh $GIT_UPSTREAM_HASH 9090
deployexitcode=$?
if [ $deployexitcode != 0 ]; then
  echo "deploy exited with error code $deployexitcode"
  exit $deployexitcode
fi

exit 0
