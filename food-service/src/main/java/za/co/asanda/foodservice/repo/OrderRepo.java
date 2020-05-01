package za.co.asanda.foodservice.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.asanda.foodservice.model.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {
	List<Order> findByShopId(long shopId);
	List<Order> findByShopIdAndStatusTypeNot(long shopId, String type);
	List<Order> findByShopOwnerId(long ownerId);
	List<Order> findByShopOwnerUsername(String username);
	List<Order> findByShopOwnerUsernameAndStatusTypeNot(String username, String type);
	List<Order> findByCustomerUsername(String username);
	Order findByCustomerUsernameAndStatusTypeNot(String username, String type);
}
