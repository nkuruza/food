package za.co.asanda.foodservice.repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.asanda.foodservice.model.Product;

public interface ProductRepo extends JpaRepository<Product, Long> {
	Set<Product> findByShopId(long id);
}
