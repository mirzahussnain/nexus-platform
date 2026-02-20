package com.nexus.integration.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AIClient {

    private final RestTemplate restTemplate;

    @Value("${ai.service.url}")
    private String aiBaseUrl;

    public AIResponse analyze(String description) {

        URI url = URI.create(aiBaseUrl.trim() + "/analyze");

        Map<String, String> body = new HashMap<>();
        body.put("description", description);

        return restTemplate.postForObject(url, body, AIResponse.class);
    }
}