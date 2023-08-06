#!/bin/bash
# Edited by yimo22
# Usage
# $1 : profile
# - change name below
# - change run_option below
# result 
# 1. stop & remove continaer ${name}-service 
# 2. make image ${name}-image
# 3. build container with ${run_option} , named ${name}-service
name="apigateway"
container_name="$name-service"
image_name="$name-image"
tag_name="latest"
# .env file import
run_option="-dp 8000:8000 --net santa -e PROFILE=$1 --env-file=/var/jenkins_home/workspace/setup.env"


stop_container_command="sudo docker stop $container_name"
remove_container_command="sudo docker rm $container_name"
remove_image_command="sudo docker rmi $image_name"

if [ "$(sudo docker ps -a -q -f name=$container_name)" ]; then
    ############################################################
    # [stop container by name or container-id]
    ############################################################
    printf "\n"
    printf "=================================================\n"
    printf "| $stop_container_command\n"
    printf "=================================================\n"
    $stop_container_command
    ############################################################
    # [remove container by name or container-id]
    ############################################################
    printf "\n"
    printf "=================================================\n"
    printf "| $remove_container_command\n"
    printf "=================================================\n"
    $remove_container_command
    ############################################################
    # [remove image by name or container-id]
    ############################################################
    printf "\n"
    printf "=================================================\n"
    printf "| $remove_image_command\n"
    printf "=================================================\n"
    $remove_image_command
fi


############################################################
# [docker build command]
############################################################
image_build_command="sudo docker build --no-cache --tag $image_name:$tag_name ."
printf "=================================================\n" 
printf "| Docker image build !!\n"
printf "=================================================\n" 
printf "| IMG_NAME :: $image_name\n"
printf "| TAG_NAME :: $tag_name\n"
printf "=================================================\n"
printf "| $image_build_command\n"
printf "=================================================\n"
$image_build_command


############################################################
# [docker container run command]
############################################################
container_run_command="sudo docker run $run_option --name $container_name $image_name:$tag_name"
printf "\n"
printf "=================================================\n"
printf "| Docker container running !!\n"
printf "=================================================\n"
printf "| $container_run_command\n"
printf "=================================================\n"

$container_run_command