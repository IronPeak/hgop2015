#!/bin/bash

echo 'Pushing docker image'

#Pushing image to docker
(cd vagrant &&  
vagrant up && 
vagrant ssh -c '(cd src/tictactoe/
		sudo service docker start 
		docker push ironpeak/tictactoe
		exit)' &&
vagrant halt)

echo 'Deploying docker image'

#Deploying image to my production-test environment
(cd vagrant/server/ && 
vagrant up && 
vagrant ssh -c '(docker pull ironpeak/tictactoe
		str=$(docker ps -f "name=productiontest" | grep "productiontest")
		echo $str
		if [ ! -z "$str" ]; then
		    echo "attempting to remove"
		    docker stop productiontest
		    docker rm productiontest 
		fi
		docker run -p 8080:8080 -d -e NODE_ENV=production --name productiontest ironpeak/tictactoe
		exit)')

exit 0
