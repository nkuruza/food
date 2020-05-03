package za.co.asanda.foodservice.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import za.co.asanda.foodservice.model.Shop;
import za.co.asanda.foodservice.model.User;
import za.co.asanda.foodservice.repo.ShopRepo;
@Transactional
@Service("shopService")
public class ShopServiceImpl implements ShopService {
	@Autowired
	private ShopRepo repo;
	@Autowired
	private UserService userService;
	@Autowired
    private FileStorageService fileStorageService;

	@Override
	public Shop saveShop(Shop shop, MultipartFile image) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User owner = userService.findByUsername(username);
		String fileName = fileStorageService.storeFile(image);
		
		shop.setOwner(owner);
		shop.setImage(fileName);
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
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userService.findByUsername(username);
		return repo.findByOwnerId(user.getId());
	}

	@Override
	public Shop findOne(long id) {
		return repo.getOne(id);
	}

}
