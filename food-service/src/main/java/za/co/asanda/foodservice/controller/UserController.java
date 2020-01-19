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
import za.co.asanda.foodservice.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	UserService userService;
	
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
		String roles = "";
		Iterator<? extends GrantedAuthority> it = authentication.getAuthorities().iterator();
		
		while (it.hasNext()) {
			roles += it.next().getAuthority();
		}
		return authentication.getName() + "roles: " + roles;
	}
	@GetMapping("/me")
	public User whoAmI() {
		return userService.findByUsername(getUsername());
	}
	@GetMapping("/encode/{password}")
	public String encode(@PathVariable("password") String password) {
		return userService.encodePassword(password);
	}
}
