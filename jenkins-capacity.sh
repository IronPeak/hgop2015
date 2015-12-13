#!/bin/bash

export ACCEPTANCE_URL=192.168.50.4:8080

grunt mochaTest:load
capacityexitcode=$?
if [ $acceptanceexitcode != 0 ]; then
  echo "Capacity tests exited with error code $capacityexitcode"
  exit $capacityexitcode
fi

exit 0
