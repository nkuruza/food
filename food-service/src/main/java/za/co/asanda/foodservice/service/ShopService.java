package za.co.asanda.foodservice.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import za.co.asanda.foodservice.model.Shop;

public interface ShopService {
	Shop saveShop(Shop shop, MultipartFile image);
	int removeShop(long id);
	Shop findOne(long id);
	List<Shop> listShops();
	List<Shop> myShops();
}
