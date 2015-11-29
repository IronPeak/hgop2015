#!/bin/bash

echo 'Shutting down Virtual Machines'
#poweroff all VMs, line from http://bealers.com/2014/07/halt-all-vagrant-virtualbox-vms-one-liner/
for VM in `VBoxManage list runningvms | awk '{ print $2; }'`; do VBoxManage controlvm $VM poweroff; done

exit 0
