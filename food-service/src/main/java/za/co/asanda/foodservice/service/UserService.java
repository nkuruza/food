package za.co.asanda.foodservice.service;

import java.util.List;

import za.co.asanda.foodservice.model.User;
import za.co.asanda.foodservice.model.dto.UserDto;


public interface UserService {
	
	User save(User user);
	
    User findById(Long id);
     
    User findByUsername(String sso);
    
    void updateUser(User user);
    
    void deleteUserBySSO(String sso);
 
    List<User> findAllUsers(); 
     
    boolean isUserSSOUnique(Integer id, String sso);
    
    String encodePassword(String password);

	Long addNew(UserDto user);
	
	String whoami();
	
	void logout();
     
}