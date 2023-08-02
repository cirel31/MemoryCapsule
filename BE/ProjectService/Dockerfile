FROM openjdk:11
VOLUME /tmp
COPY target/*.jar project-service.jar
ENTRYPOINT ["java", "-jar", "project-service.jar"]