package za.co.asanda.foodservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import za.co.asanda.foodservice.model.Location;
import za.co.asanda.foodservice.repo.LocationRepo;

@Service("locationService")
@Transactional
public class LocationServiceImpl implements LocationService {
	@Autowired
	LocationRepo locationRepo;

	@Override
	public Location saveLocation(Location loc) {
		return locationRepo.save(loc);
	}

	@Override
	public Location findByLonLat(double lon, double lat) {
		return locationRepo.findOneByLonAndLat(lon, lat);
	}

}
