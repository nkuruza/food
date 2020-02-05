package za.co.asanda.foodservice.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import za.co.asanda.foodservice.model.Product;
import za.co.asanda.foodservice.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {
	@Autowired
	private ProductService productService;
	@PostMapping("/add/{id}")
	public Product addProduct(@RequestBody Product product, @PathVariable("id") long shopId) {
		return productService.addProduct(product, shopId);
	}
	@PostMapping("/update")
	public Product updateProduct(@RequestBody Product product) {
		return productService.updateProduct(product);
	}
	@GetMapping("/list/{id}")
	public Set<Product> getUserProducts(@PathVariable("id") long id){
		return productService.listByShopId(id);
	}
}
