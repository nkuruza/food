package za.co.asanda.foodservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.asanda.foodservice.model.OrderStatus;

public interface OrderStatusRepo extends JpaRepository<OrderStatus, Integer> {
	OrderStatus findOneByType(String type);
}
