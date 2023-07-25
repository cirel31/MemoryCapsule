#!/bin/bash
# Edited by yimo22
# Usage
# - change name below
# - change run_option below
# result 
# 1. stop & remove continaer ${name}-service 
# 2. make image ${name}-image
# 3. build container with ${run_option} , named ${name}-service
name="user"
container_name="$name-service"
image_name="$name-image"
tag_name="latest"
# env file import
run_option="-dp 8000:8000 --env-file=/jenkins/workspace/setup.env"

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
# [stop container by name or container-id]
############################################################
stop_container_command="sudo docker stop $container_name"
printf "\n"
printf "=================================================\n"
printf "| $stop_container_command\n"
printf "=================================================\n"



############################################################
# [remove container by name or container-id]
############################################################
remove_container_command="sudo docker rm $container_name"
printf "\n"
printf "=================================================\n"
printf "| $remove_container_command\n"
printf "=================================================\n"
{
    $stop_container_command && $remove_container_command
} || {
    echo "There's no container named $container_name"
}


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