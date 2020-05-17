package za.co.asanda.foodservice.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import za.co.asanda.foodservice.model.Location;
import za.co.asanda.foodservice.model.Shop;

public interface ShopService {
	Shop saveShop(Shop shop, MultipartFile image);
	Shop saveShop(MultipartFile image, String name, String address, Double lon, Double lat);
	int removeShop(long id);
	Shop findOne(long id);
	List<Shop> listShops();
	List<Shop> listApproved();
	List<Shop> listUnApproved();
	List<Shop> listByLocation(Location location);
	List<Shop> listMarketShops(Location location);
	List<Shop> myShops();
}
