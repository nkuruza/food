package za.co.asanda.foodservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import za.co.asanda.foodservice.model.Location;
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
	@PostMapping("/market")
	public List<Shop> listAllShops(@RequestBody Location location){
		return service.listMarketShops(location);
	}
	@GetMapping("/mine")
	public List<Shop> listMine(){
		List<Shop> shops = service.myShops();
		return shops;
	}
	@PostMapping("/save")
	public Shop saveShop(@RequestParam("image") MultipartFile image, String name, String address, Double lon, Double lat) {
		return service.saveShop(image, name, address, lon, lat);
	}
}
