package za.co.asanda.foodservice.service;

import java.util.Set;

import za.co.asanda.foodservice.model.Product;

public interface ProductService {
	Product addProduct(Product product, long shopId);
	Set<Product> listByShopId(long id);
	Product getProduct(long id);
	Product updateProduct(Product product);
	int removeProduct(long id);
}
