package za.co.asanda.foodservice.controller;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import za.co.asanda.foodservice.model.User;
import za.co.asanda.foodservice.model.dto.UserDto;
import za.co.asanda.foodservice.service.ApiKeyService;
import za.co.asanda.foodservice.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	UserService userService;
	
	@Autowired
	ApiKeyService apiKeyService;
	
	@GetMapping("/list")
	public List<User> getAllUsers(){
		return userService.findAllUsers();
	}
	
	@PostMapping("/add")
	public User addUser(@RequestBody User user){
		return userService.save(user);
	}
	@GetMapping("/username")
	public String getUsername() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return authentication.getName();
	}
	@GetMapping("/me")
	public User whoAmI() {
		return userService.findByUsername(getUsername());
	}
	@GetMapping("/encode/{password}")
	public String encode(@PathVariable("password") String password) {
		return userService.encodePassword(password);
	}
	@GetMapping("/mapkey")
	public String getMapKey() {
		return apiKeyService.getByName("googlemaps");
	}
	
	@PostMapping("/new")
	public Long newUser(@RequestBody UserDto user) {
		return userService.addNew(user);
	}
}
