package za.co.asanda.foodservice.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import za.co.asanda.foodservice.model.User;
import za.co.asanda.foodservice.model.UserProfile;
import za.co.asanda.foodservice.repo.UserProfileRepository;
import za.co.asanda.foodservice.repo.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service("userService")
@Transactional
public class UserServiceImpl implements UserService{
 
    @Autowired
    private UserRepository userRepo;
    
    
    @Autowired
    private UserProfileRepository userProfileRepo;
    
    //@Autowired
    //private PasswordEncoder passwordEncoder;
 
     
    public User save(User user){
        //user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setConfirmPassword(user.getPassword());
        Set<UserProfile> userProfiles = new HashSet<UserProfile>();
        for(UserProfile pro : user.getUserProfiles()){
        	userProfiles.add(userProfileRepo.getOne(pro.getId()));
        }
        user.setUserProfiles(userProfiles);
        return userRepo.save(user);
    }
 
    public User findById(Long id) {
        return userRepo.findById(id).get();
    }
 
    public User findByUsername(String sso) {
    	return userRepo.findByUsername(sso);
    }

	@Override
	public void updateUser(User user) {
		User entity = userRepo.findById(user.getId()).get();
        if(entity!=null){
            entity.setUsername(user.getUsername());
            entity.setPassword(user.getPassword());
            entity.setFirstName(user.getFirstName());
            entity.setLastName(user.getLastName());
            entity.setEmail(user.getEmail());
            entity.setUserProfiles(user.getUserProfiles());
        }
	}

	@Override
	public void deleteUserBySSO(String sso) {
		//dao.deleteBySSO(sso);
		
	}

	@Override
	public List<User> findAllUsers() {
		return userRepo.findAll();
	}

	@Override
	public boolean isUserSSOUnique(Integer id, String sso) {
		User user = findByUsername(sso);
        return ( user == null || ((id != null) && (user.getId() == id.longValue())));
	}

	@Override
	public String encodePassword(String password) {
		return ""; //passwordEncoder.encode(password);
	}
 
}