#!/bin/bash

echo 'Starting jenkins shell script'

export PATH=/usr/local/bin:/path/to/node:/path/to/node_bin:/path/to/phantomjs:/path/to/jscoverage:$PATH;
export DISPLAY=:0

npm install
bower install

./dockerbuild.sh

echo 'Finished jenkins shell script'

exit 0
