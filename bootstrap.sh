#!/usr/bin/env bash


apt-get update
apt-get install -y build-essential libssl-dev git curl 
su - vagrant -c 'curl https://raw.github.com/creationix/nvm/master/install.sh | sh'
su - vagrant -c 'nvm install v0.11.10'
su - vagrant -c 'nvm use v0.11.10'
exit
