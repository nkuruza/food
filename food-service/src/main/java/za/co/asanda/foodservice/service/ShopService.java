package za.co.asanda.foodservice.service;

import java.util.List;

import za.co.asanda.foodservice.model.Shop;

public interface ShopService {
	Shop saveShop(Shop shop);
	int removeShop(long id);
	List<Shop> listShops();
	List<Shop> myShops();
}
