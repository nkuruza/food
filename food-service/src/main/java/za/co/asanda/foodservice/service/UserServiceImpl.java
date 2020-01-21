package za.co.asanda.foodservice.service;

import java.util.List;
import za.co.asanda.foodservice.model.User;
import za.co.asanda.foodservice.repo.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service("userService")
@Transactional
public class UserServiceImpl implements UserService{
 
    @Autowired
    private UserRepository userRepo;

 
     
    public User save(User user){
        
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