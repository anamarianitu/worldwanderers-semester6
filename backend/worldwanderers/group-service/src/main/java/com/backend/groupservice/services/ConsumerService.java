package com.backend.groupservice.services;

import com.backend.groupservice.repositories.GroupRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsumerService {

    private final GroupRepository groupRepository;
    private static final Logger logger = LoggerFactory.getLogger(ConsumerService.class);

    @Autowired
    public ConsumerService(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void receivedMessage(String userId) {
        groupRepository.findAll().forEach(group -> {
            if(group.getUserIds() != null && group.getUserIds().contains(userId)){
                group.getUserIds().remove(userId);
                groupRepository.save(group);
            }
        });
        logger.info("User received and deleted users from joined groups ");
    }

}
