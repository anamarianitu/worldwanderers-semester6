package com.backend.userservice.services;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
@Service
public class UserProducerService {

    private RabbitTemplate rabbitTemplate;

    @Autowired
    public UserProducerService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Value("${spring.rabbitmq.exchange}")
    private String exchange;

    @Value("${spring.rabbitmq.postRoutingKey}")
    private String postRoutingKey;

    @Value("${spring.rabbitmq.groupRoutingKey}")
    private String groupRoutingKey;

    public void sendMessage(String userId) {
        rabbitTemplate.convertAndSend(exchange, postRoutingKey, userId);
        rabbitTemplate.convertAndSend(exchange, groupRoutingKey, userId);
    }
}
