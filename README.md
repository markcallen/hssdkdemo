# HS SDK Demo

## Start nginx

```sh
docker run --name hs-demo-nginx \
   -v $PWD/static:/usr/share/nginx/html:ro \
   -v $PWD/conf.d:/etc/nginx/conf.d:ro \
   -p 80 \
   -p 443 \
   -d nginx
````

Verify by going to

```sh
open http://$(docker port hs-demo-nginx 80)/hs_stream_demo.html
````

## Create the tunnel

This is required for the content source demo as Hootsuite needs to verify access
the image to be loaded into ow.ly

```sh
docker run --name hs-demo-ngrok \
    -p 4040 \
    --link hs-demo-nginx:http \
    -d wernight/ngrok ngrok http hs-demo-nginx:80
````

Get the ngrok URL

```sh
curl -Ls $(docker port hs-demo-ngrok 4040)/api/tunnels/command_line | python -c 'import sys, json; print json.load(sys.stdin)["public_url"]'
````

Verify:

````
open $(curl -Ls $(docker port hs-demo-ngrok 4040)/api/tunnels/command_line | python -c 'import sys, json; print json.load(sys.stdin)["public_url"]')/hs_stream_demo.html
````

View the traffic

````
open http://$(docker port hs-demo-ngrok 4040)
````

Edit assets/js/vars.js and set the publicHostname to the ngork url

## Configure

Go to Hootsuite Developer portal https://hootsuite.com/developers/my-apps

Create a New App, set the name and description and press Create.

Click on the new App link.  Click the Edit button.

Set the Authentication Type to Single Sign On and set the shared secret to:
hsdemosharedsecret and press Save.

Click New App Component.  Select App Component Type of Stream, set the App Component
Title and press Add.

For the new stream App Component click on the Edit button and set

IFrame URL: <ngrok url>/hs_stream_demo.html
Icon URL: <ngrok url>/asset/icon.png

Press the Save button.

Add a New App Component with Type Plugin

IFrame URL: <ngrok url>/hs_stream_demo.html
Icon URL: <ngrok url>/asset/icon.png

Add a New App Component with Type Content Source

IFrame URL: <ngrok url>/content_source_demo.html
Icon URL: <ngrok url>/asset/icon.png

## Add the App to Hootsuite

Open Hootsuite https://hootsuite.com/dashboard

Click on the App Directory in the left hand nav.  Under Developers -> My Apps
install your new App, adding to a new stream.
