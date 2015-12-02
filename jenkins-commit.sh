#!/bin/bash

echo 'Starting jenkins shell script'

export PATH=/usr/local/bin:/path/to/node:/path/to/node_bin:/path/to/phantomjs:/path/to/jscoverage:$PATH;
export DISPLAY=:0

npm install
bower install

./dockerbuild.sh
buildexitcode=$?
if [ $buildexitcode != 0 ]; then
  echo "Dockerbuild exited with error code $buildexitcode"
  exit $buildexitcode
fi

if [ $? == 0 ]; then
  docker push ironpeak/tictactoe
fi

echo 'Finished jenkins shell script'

exit 0
