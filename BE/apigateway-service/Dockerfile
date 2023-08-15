FROM openjdk:11-ea-11-jdk-slim
VOLUME /tmp
COPY target/*.jar ApigatewayService.jar
ENTRYPOINT ["java", "-jar", "-Dspring.cloud.config.profile=${PROFILE}","ApigatewayService.jar"] 