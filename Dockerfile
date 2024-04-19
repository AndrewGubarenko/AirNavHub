# Use a base image with JDK and Maven installed
FROM maven:3.8.4-openjdk-8 AS build

# Copy the Maven project file
COPY pom.xml /app/

# Copy only the necessary directories for Maven dependencies caching
COPY src /app/src/

# Change working directory to /app
WORKDIR /app

# Run Maven to download dependencies
RUN mvn dependency:go-offline

# Copy the frontend directory
COPY frontend /app/frontend

# Build the frontend using the Frontend Maven Plugin
RUN mvn clean install -DskipTests

# Second stage: Use a lighter base image to run the Spring Boot application
FROM openjdk:8-jre-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled JAR file from the previous stage
COPY --from=build /app/target/airnavigation-1.0.1-RELEASE.war /app/airnavigation.war

# Expose the port that your Spring Boot application uses
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "airnavigation.war"]
