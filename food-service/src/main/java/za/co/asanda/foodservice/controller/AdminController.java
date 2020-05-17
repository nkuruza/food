package za.co.asanda.foodservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import za.co.asanda.foodservice.model.Location;
import za.co.asanda.foodservice.model.Shop;
import za.co.asanda.foodservice.model.User;
import za.co.asanda.foodservice.service.ShopService;
import za.co.asanda.foodservice.service.UserService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	UserService userService;

	@Autowired
	private ShopService shopService;

	@GetMapping("/list-users")
	public List<User> getAllUsers() {
		return userService.findAllUsers();
	}

	@GetMapping("/list-shops")
	public List<Shop> listAllShops() {
		return shopService.listShops();
	}
	
	@GetMapping("/list-unapproved-shops")
	public List<Shop> listUnApprovedShops() {
		return shopService.listShops();
	}
	
	@GetMapping("/list-approved-shops")
	public List<Shop> listApprovedShops() {
		return shopService.listShops();
	}
	
	@GetMapping("/list-shops-location")
	public List<Shop> listShopsByLocation(@RequestBody Location location) {
		return shopService.listByLocation(location);
	}
	
}
