package com.pawfinds.adoption.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.pawfinds.adoption.repository")
@EnableMongoAuditing
public class MongoConfig {
    // MongoDB configuration
    // Connection details are in application.properties
}
