package za.co.asanda.foodservice.service;

import java.util.List;

import za.co.asanda.foodservice.model.Order;
import za.co.asanda.foodservice.model.OrderStatusType;

public interface OrderService {
	Order placeOrder(Order o);
	List<Order> listOrdersByShop(Long shopId);
	List<Order> listPlacedOrders();
	Order updateOrderStatus(Order o, OrderStatusType ost);
}
