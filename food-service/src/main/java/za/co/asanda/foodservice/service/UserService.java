package za.co.asanda.foodservice.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import za.co.asanda.foodservice.model.User;


public interface UserService {
	
	User save(User user);
	
    User findById(Long id);
     
    User findByUsername(String sso);
    
    void updateUser(User user);
    
    void deleteUserBySSO(String sso);
 
    List<User> findAllUsers(); 
     
    boolean isUserSSOUnique(Integer id, String sso);
    
    String encodePassword(String password);

	Long addNew();
	
	Long addNew(String role, MultipartFile image, String name, String address, Double lon, Double lat);
	
	String whoami();
	
	void logout();
     
}