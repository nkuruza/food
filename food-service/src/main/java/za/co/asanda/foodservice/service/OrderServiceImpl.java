package za.co.asanda.foodservice.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import za.co.asanda.foodservice.model.Order;
import za.co.asanda.foodservice.model.OrderLine;
import za.co.asanda.foodservice.model.OrderStatusType;
import za.co.asanda.foodservice.repo.OrderRepo;
import za.co.asanda.foodservice.repo.OrderStatusRepo;

@Service("orderService")
public class OrderServiceImpl implements OrderService {
	@Autowired
	private OrderRepo repo;
	@Autowired
	private OrderStatusRepo orderStatusRepo;

	@Override
	public Order placeOrder(Order o) {
		o.setDateCreated(new Date());
		o.setStatus(orderStatusRepo.findOneByType(OrderStatusType.PLACED.name()));
		for(OrderLine line : o.getOrderLines()) 
			line.setUnitPrice(line.getProduct().getPrice());
		
		return repo.save(o);
	}

	@Override
	public List<Order> listOrdersByShop(Long shopId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Order> listPlacedOrders() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Order updateOrderStatus(Order o, OrderStatusType ost) {
		// TODO Auto-generated method stub
		return null;
	}

}
