#!/bin/bash

echo What should the version be?
read VERSION

docker build -t dockerhub/project:$VERSION .
docker push dockerhub/project:$VERSION
ssh root@123.456.7.890 "docker pull benawad/lireddit:$VERSION && docker tag benawad/lireddit:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
