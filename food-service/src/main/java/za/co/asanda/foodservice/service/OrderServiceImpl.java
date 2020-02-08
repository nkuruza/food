package za.co.asanda.foodservice.service;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import za.co.asanda.foodservice.model.Order;
import za.co.asanda.foodservice.model.OrderLine;
import za.co.asanda.foodservice.model.OrderStatus;
import za.co.asanda.foodservice.model.OrderStatusType;
import za.co.asanda.foodservice.model.User;
import za.co.asanda.foodservice.repo.OrderRepo;
import za.co.asanda.foodservice.repo.OrderStatusRepo;

@Transactional
@Service("orderService")
public class OrderServiceImpl implements OrderService {
	@Autowired
	private OrderRepo repo;
	@Autowired
	private OrderStatusRepo orderStatusRepo;

	@Autowired
	UserService userService;

	@Override
	public Order placeOrder(Order o) {
		o.setDateCreated(LocalDateTime.now());
		OrderStatus status = orderStatusRepo.findOneByType(OrderStatusType.PLACED.name());
		if (status == null)
			status = orderStatusRepo.save(OrderStatusType.PLACED.getValue());
		o.setStatus(status);

		for (OrderLine line : o.getOrderLines())
			line.setUnitPrice(line.getProduct().getPrice());
		User customer = userService.findById(o.getCustomer().getId());
		// customer.setLat(o.getCustomer().getLat());
		// customer.setLon(o.getCustomer().getLon());
		o.setCustomer(customer);
		return repo.save(o);
	}

	@Override
	public List<Order> listOrdersByShop(Long shopId) {
		return repo.findByShopId(shopId);
	}

	@Override
	public List<Order> listPlacedOrders() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Order updateOrderStatus(long orderId, OrderStatusType ost) {
		Order order = repo.getOne(orderId);
		OrderStatus status = orderStatusRepo.findOneByType(ost.name());
		if(order != null && status != null) {
			order.setStatus(status);
			return repo.save(order);
		}
		return null;
	}

	@Override
	public List<Order> listMyShopsOrders() {
		Long ownerId = 0L;
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User me = userService.findByUsername(authentication.getName());
		if (me != null)
			ownerId = me.getId();
		return repo.findByShopOwnerId(ownerId);
	}

}
