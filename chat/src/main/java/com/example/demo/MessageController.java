package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {
	
	@Autowired
	SimpMessagingTemplate simpMessagingTemplate;
	
	// Mapped as /app/application
//	@MessageMapping("/application")
//	@SendTo("/all/messages")
//	public Message send(Message message) {
//		return message;
//	}
	
	// Mapped as /app/private
	@MessageMapping("/chat/{to}")
	public void sendToMessagePrivate(@DestinationVariable String to, Message message) {
		System.out.println(to);
		System.out.println(message);
		simpMessagingTemplate.convertAndSend("/topic/messages/"+to, message);
	}
}
