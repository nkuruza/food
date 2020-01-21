package za.co.asanda.foodservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.asanda.foodservice.model.ApiKey;

public interface ApiKeyRepo extends JpaRepository<ApiKey, Long> {
	ApiKey findByName(String name);
}
