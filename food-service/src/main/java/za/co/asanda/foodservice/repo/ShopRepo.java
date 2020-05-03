package za.co.asanda.foodservice.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.asanda.foodservice.model.Shop;

public interface ShopRepo extends JpaRepository<Shop, Long> {
	List<Shop> findByOwnerUsername(String username);
}
