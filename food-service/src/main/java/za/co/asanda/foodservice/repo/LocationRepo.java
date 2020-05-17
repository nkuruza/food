package za.co.asanda.foodservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import za.co.asanda.foodservice.model.Location;

public interface LocationRepo extends JpaRepository<Location, Long> {
	Location findOneByLonAndLat(double lon, double lat);
}
