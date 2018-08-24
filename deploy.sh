#!/usr/bin/env bash
npm build
docker build -t gcr.io/arafat-project/arafat-node .
#docker login -u _json_key -p "$(cat /home/komen/Downloads/arafat-project-2ea19b3d54c3.json)" https://gcr.io #only run once (the path is path to the credentials file -got from google IMA and Admin)
docker push gcr.io/arafat-project/arafat-node
ssh 35.229.104.163 sudo docker pull gcr.io/arafat-project/arafat-node
ssh 35.229.104.163 sudo docker stop arafat-node
ssh 35.229.104.163 sudo docker rm arafat-node
ssh 35.229.104.163 sudo docker run -d -p 9002:3000 --name arafat-node --restart always gcr.io/arafat-project/arafat-node