

name="santa"
container_name="$name-service"
image_name="$name-image"
tag_name="latest"
profile="dev"


stop_container_command="sudo docker stop $container_name"
remove_container_command="sudo docker rm $container_name"
remove_image_command="sudo docker rmi $image_name"

if [ "$(sudo docker ps -a -q -f name=$container_name)" ]; then
    ############################################################
    # [stop container by name or container-id]
    ############################################################
    printf "\n"
    printf "=================================================\n"
    printf "도커 이미지가 실행되고 있어 실행을 중지합니다. \n"
    printf "=================================================\n"
    $stop_container_command
    ############################################################
    # [remove container by name or container-id]
    ############################################################
    printf "\n"
    printf "=================================================\n"
    printf "| 컨테이너를 제거합니다 \n"
    printf "=================================================\n"
    $remove_container_command
    ############################################################
    # [remove image by name or container-id]
    ############################################################
    printf "\n"
    printf "=================================================\n"
    printf "| $이미지를 제거합니다 \n"
    printf "=================================================\n"
    $remove_image_command
fi
printf "----------------------------------------\n"
printf "모듈을 받아오는 중입니다\n"
npm install
printf "----------------------------------------\n"
printf "NPM 빌드를 시작합니다\n"
npm run build
############################################################
# [docker build command]
############################################################
image_build_command="sudo docker build -t $image_name:$tag_name ."
printf "=================================================\n" 
printf "| 도커 이미지를 빌드하겠습니다. !!\n"
printf "=================================================\n" 
printf "| 이미지 이름 :: $image_name\n"
printf "| 태그 :: $tag_name\n"
printf "=================================================\n"
printf "| $image_build_command\n"
printf "=================================================\n"
$image_build_command


############################################################
# [docker container run command]
############################################################
container_run_command="sudo docker run -d --net santa -p 80:80 --name  $container_name $image_name:$tag_name"
printf "\n"
printf "=================================================\n"
printf "| Docker container running !!\n"
printf "=================================================\n"
printf "| $container_run_command\n"
printf "=================================================\n"

$container_run_command