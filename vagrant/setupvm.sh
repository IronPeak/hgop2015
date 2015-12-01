#!/bin/bash

sudo apt-get install virtualbox-5.0 --yes
sudo apt-get install virtualbox-dkms --yes

wget https://releases.hashicorp.com/vagrant/1.7.4/vagrant_1.7.4_x86_64.deb -O vagrant.deb
sudo dpkg -i vagrant.deb && sudo apt-get install -f
rm vagrant.deb

if [ ! -f package.box ]; then
	wget https://www.dropbox.com/s/27ffx8z804fhz0u/package.box?dl=0 -O package.box
fi

vagrant up

exit 0
