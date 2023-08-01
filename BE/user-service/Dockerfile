FROM openjdk:11-ea-11-jdk-slim
VOLUME /tmp
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "-Dspring.cloud.config.profile=${PROFILE}" "app.jar"]