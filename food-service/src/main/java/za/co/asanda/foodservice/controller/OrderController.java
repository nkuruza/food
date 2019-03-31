package za.co.asanda.foodservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import za.co.asanda.foodservice.model.Order;
import za.co.asanda.foodservice.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {
	@Autowired
	private OrderService orderService;
	@PostMapping("/place")
	public Order place(@RequestBody Order order) {
		return orderService.placeOrder(order);
	}
}
