#!/bin/sh
# chmod 755 api.sh // executable
# usage: ./api.sh [env] [datafile]

env=$1
data=$2

url="http://localhost:8000"
route="/version"

#case $env in 
#  dev)
#    url=$APP_DEV;;
#  prod)
#    url=$APP_PROD;;
#esac

curl -i $url$route \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: $APP_AUTH"
# -d @$data
  




