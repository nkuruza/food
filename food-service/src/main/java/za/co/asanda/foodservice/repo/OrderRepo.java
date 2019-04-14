package za.co.asanda.foodservice.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.asanda.foodservice.model.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {
	List<Order> findByShopId(long shopId);
}
