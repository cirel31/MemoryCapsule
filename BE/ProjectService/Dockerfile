FROM openjdk:11-jdk-alpine
VOLUME /tmp
COPY target/*.jar project-service.jar
ENTRYPOINT ["java", "-jar", "project-service.jar"]