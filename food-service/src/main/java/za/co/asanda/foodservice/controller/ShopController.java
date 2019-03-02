package za.co.asanda.foodservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import za.co.asanda.foodservice.model.Shop;
import za.co.asanda.foodservice.service.ShopService;

@RestController
@RequestMapping("/shops")
public class ShopController {
	@Autowired
	private ShopService service;
	@GetMapping("/list")
	public List<Shop> listAllShops(){
		return service.listShops();
	}
	@GetMapping("/mine")
	public List<Shop> listMine(){
		return service.myShops();
	}
}
