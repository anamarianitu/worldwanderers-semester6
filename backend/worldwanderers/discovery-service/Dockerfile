FROM azul/zulu-openjdk:17

WORKDIR /

COPY build/libs/*.jar app.jar

EXPOSE 8761

ENTRYPOINT ["java","-jar","/app.jar"]
