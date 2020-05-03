package za.co.asanda.foodservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import za.co.asanda.foodservice.model.Shop;
import za.co.asanda.foodservice.service.ShopService;
import za.co.asanda.foodservice.service.UserService;

@RestController
@RequestMapping("/shops")
public class ShopController {
	@Autowired
	private ShopService service;
	@Autowired
	private UserService userService;
	
	@GetMapping("/list")
	public List<Shop> listAllShops(){
		return service.listShops();
	}
	@GetMapping("/mine")
	public List<Shop> listMine(){
		List<Shop> shops = service.myShops();
		return shops;
	}
	@PostMapping("/save")
	public Shop saveShop(@RequestParam("image") MultipartFile image, String name, String address, Double lon, Double lat) {
		Shop shop = new Shop();
		shop.setName(name);
		shop.setAddress(address);
		shop.setLat(lat);
		shop.setLon(lon);
		shop.setOwner(userService.findByUsername(userService.whoami()));
		return service.saveShop(shop, image);
	}
}
