package za.co.asanda.foodservice.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

import za.co.asanda.foodservice.model.Shop;
import za.co.asanda.foodservice.repo.ShopRepo;

public class ShopServiceImpl implements ShopService {
	@Autowired
	private ShopRepo repo;

	@Override
	public Shop saveShop(Shop shop) {
		return repo.save(shop);
	}

	@Override
	public int removeShop(long id) {
		repo.deleteById(id);
		return 1;
	}

	@Override
	public List<Shop> listShops() {
		
		return repo.findAll();
	}

	@Override
	public List<Shop> myShops() {
		// TODO Auto-generated method stub
		return null;
	}

}
