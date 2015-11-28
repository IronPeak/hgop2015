#!/bin/bash

#poweroff all VMs, line from http://bealers.com/2014/07/halt-all-vagrant-virtualbox-vms-one-liner/
for VM in `VBoxManage list runningvms | awk '{ print $2; }'`; do VBoxManage controlvm $VM poweroff; done

#Pushing image to docker
(cd vagrant && 
vagrant halt && 
vagrant up && 
vagrant ssh -c "(cd src/tictactoe/ && 
		sudo service docker start && 
		docker login --username=ironpeak && 
		docker push ironpeak/tictactoe)" && 
vagrant halt)

#Deploying image to my production-test environment
(cd .. && 
cd HGOP2015 && 
vagrant halt && 
vagrant up && 
vagrant ssh -c "(docker login --username=ironpeak && 
		docker pull ironpeak/tictactoe && 
		docker run -p 9000:8080 -d -e NODE_ENV=production ironpeak/tictactoe)")

exit 0
