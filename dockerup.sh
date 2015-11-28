#!/bin/bash

sudo service docker start

sudo npm install

sudo bower install --allow-root

./dockerbuild.sh

docker run -p 9000:8080 -d -e "NODE_ENV=production" ironpeak/tictactoe

exit 0
