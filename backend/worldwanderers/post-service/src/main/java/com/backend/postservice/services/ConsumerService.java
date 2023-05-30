package com.backend.postservice.services;

import com.backend.postservice.models.Comment;
import com.backend.postservice.models.Like;
import com.backend.postservice.models.Post;
import com.backend.postservice.repositories.CommentRepository;
import com.backend.postservice.repositories.LikeRepository;
import com.backend.postservice.repositories.PostRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsumerService {

    private final PostRepository postRepository;
    private final LikeRepository likeRepository;
    private final CommentRepository commentRepository;
    private static final Logger logger = LoggerFactory.getLogger(ConsumerService.class);

    @Autowired
    public ConsumerService(PostRepository postRepository, LikeRepository likeRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.likeRepository = likeRepository;
        this.commentRepository = commentRepository;
    }

    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void receivedMessage(String userId) {
        List<Post> posts = postRepository.findByUserId(userId);
        postRepository.deleteAll(posts);
        logger.info("User received and deleted posts ");
        List<Comment> comments = commentRepository.findByUserId(userId);
        commentRepository.deleteAll(comments);
        logger.info("User received and deleted comments ");
        List<Like> likes = likeRepository.findByUserId(userId);
        likeRepository.deleteAll(likes);
        logger.info("User received and deleted likes ");
    }

}
