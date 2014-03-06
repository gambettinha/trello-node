Hello world with Node using Vagrant
===================================



###Setting up Vagrant

If you yet have downloaded vagrant and downloaded the precise32 box, you can skip this part.

Make sure you have virtual box instaleed and then install vagrant 1.4.3 from here http://www.vagrantup.com/downloads.html

Then run

    $ vagrant init precise32 http://files.vagrantup.com/precise32.box
    $ vagrant up
    $ vagrant destroy
    
It will download the virtual machine. 
    

###Configure Vagrant box

    $ git clone https://github.com/gambettinha/hello-node.git
    $ cd hello-node 
    $ vagrant up
    
It will set up your environment. Let's connect into it

    $ vagrant ssh
    $ cd /vagrant/app
    
###Running the application
    
Let's install the application dependencies

    $ nvm use v0.11.10
    $ npm install --no-bin-links

and now start the application

    $ node app.js
    
Go in your browser to http://127.0.0.1:9000/hello.txt

Once you are done coding and playing. You can exit from the server with

    $ exit
    $ vagrant suspend
