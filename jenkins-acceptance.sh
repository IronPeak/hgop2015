#!/bin/bash

./deploy.sh
deployexitcode=$?
if [ $deployexitcode = 0 ]; then
  echo "deploy exited with error code $deployexitcode"
  exit $deployexitcode
fi

exit 0
