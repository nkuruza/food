package za.co.asanda.foodservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import za.co.asanda.foodservice.model.ApiKey;
import za.co.asanda.foodservice.repo.ApiKeyRepo;

@Service("apiService")
public class ApiKeyServiceImpl implements ApiKeyService {
	@Autowired
	ApiKeyRepo repo;

	@Override
	public String getByName(String name) {
		ApiKey key = repo.findByName(name);
		return key == null ? null : key.getKey();
	}

}
