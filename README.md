# HS SDK Demo

## Start docker-compose

```sh
docker-compose up
````

Verify nginx:

```sh
open http://$(docker port hssdkdemo_nginx_1 80)/hs_stream_demo.html
````

Get the ngrok URL:

```sh
curl -Ls $(docker port hssdkdemo_ngrok_1 4040)/api/tunnels/command_line | python -c 'import sys, json; print json.load(sys.stdin)["public_url"]'
````

Verify ngrok:

````
open $(curl -Ls $(docker port hssdkdemo_ngrok_1 4040)/api/tunnels/command_line | python -c 'import sys, json; print json.load(sys.stdin)["public_url"]')/hs_stream_demo.html
````

View the traffic:

````
open http://$(docker port hssdkdemo_ngrok_1 4040)
````

## Configure

Edit assets/js/vars.js and set the publicHostname to the ngork url

### Create New App

Go to Hootsuite Developer portal https://hootsuite.com/developers/my-apps

Create a New App, set the name and description and press Create.

Click on the new App link.  Click the Edit button.

Set the Authentication Type to Single Sign On and set the shared secret to:
hsdemosharedsecret and press Save.

### Add Stream

Click New App Component.  Select App Component Type of Stream, set the App Component
Title and press Add.

For the new stream App Component click on the Edit button and set

> IFrame URL: {{ngrok url}}/hs_stream_demo.html
> Icon URL: {{ngrok url}}/asset/icon.png

Press the Save button.

### Add Plugin

Add a New App Component with Type Plugin

> IFrame URL: {{ngrok url}}/hs_plugin_demo.html
> Icon URL: {{ngrok url}}/asset/icon.png

### Add Content Source

Add a New App Component with Type Content Source

> IFrame URL: {{ngrok url}}/content_source_demo.html  
> Icon URL: {{ngrok url}}/asset/icon.png

## Add the App to Hootsuite

Open Hootsuite https://hootsuite.com/dashboard

Click on the App Directory in the left hand nav.  Under Developers -> My Apps
install your new App, adding to a new stream.
