package za.co.asanda.foodservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import za.co.asanda.foodservice.model.Location;
import za.co.asanda.foodservice.model.Shop;
import za.co.asanda.foodservice.repo.ShopRepo;
import za.co.asanda.foodservice.util.EarthGeoUtil;

@Transactional
@Service("shopService")
public class ShopServiceImpl implements ShopService {
	@Autowired
	private ShopRepo repo;
	@Autowired
	private LocationService locationService;
	@Autowired
	private FileStorageService fileStorageService;
	@Autowired
	private UserService userService;

	@Value("${asanda.max-radius}")
	private double maxRadius;

	@Override
	public Shop saveShop(Shop shop, MultipartFile image) {
		String fileName = fileStorageService.storeFile(image);
		shop.setImage(fileName);
		return repo.save(shop);
	}

	@Override
	public Shop saveShop(MultipartFile image, String name, String address, Double lon, Double lat) {
		Shop shop = new Shop();
		Location loc = new Location();
		loc.setAddress(address);
		loc.setLon(lon);
		loc.setLat(lat);
		loc = locationService.saveLocation(loc);
		shop.setLocation(loc);
		shop.setName(name);
		shop.setOwner(userService.findByUsername(userService.whoami()));
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
	public List<Shop> listApproved() {
		return repo.findByApproved(true);
	}

	@Override
	public List<Shop> listUnApproved() {
		return repo.findByApproved(false);
	}

	@Override
	public List<Shop> listByLocation(Location location) {
		return repo.findAll().stream().filter(s -> EarthGeoUtil.getDisplacement(s.getLocation(), location) < maxRadius)
				.collect(Collectors.toList());
	}

	@Override
	public List<Shop> listMarketShops(Location location) {

		List<Shop> shops = new ArrayList<>();

		listApproved().stream().forEach(s -> {
			s.setDistance(EarthGeoUtil.getDisplacement(s.getLocation(), location));
			shops.add(s);
		});
		return shops.stream().filter(s -> s.getDistance() < maxRadius).collect(Collectors.toList());
	}

	@Override
	public List<Shop> myShops() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return repo.findByOwnerUsername(username);
	}

	@Override
	public Shop findOne(long id) {
		return repo.getOne(id);
	}
}
