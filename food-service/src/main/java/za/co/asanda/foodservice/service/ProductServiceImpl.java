package za.co.asanda.foodservice.service;

import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import za.co.asanda.foodservice.model.Product;
import za.co.asanda.foodservice.repo.ProductRepo;

@Service("productService")
@Transactional
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepo service;

	@Override
	public Product addProduct(Product product) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		return service.save(product);
	}

	@Override
	public Product getProduct(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Product updateProduct(Product product) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int removeProduct(long id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Set<Product> listByOwnerId(long id) {
		return service.findByOwnerId(id);
	}

}
