FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY target/*.jar DiscoveryService.jar
ENTRYPOINT ["java", "-jar", "DiscoveryService.jar"]