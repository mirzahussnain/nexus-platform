package com.nexus.dto;

import lombok.Data;

@Data
public class AIResponse {
    private String urgency;
    private String category;
    private double confidence;
    private int score;
    private String recommended_action;
    private Object explanation;
}