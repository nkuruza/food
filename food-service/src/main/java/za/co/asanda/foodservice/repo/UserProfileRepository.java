package za.co.asanda.foodservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.asanda.foodservice.model.UserProfile;

public interface UserProfileRepository extends
		JpaRepository<UserProfile, Integer> {

}
