package za.co.asanda.foodservice.service;

import za.co.asanda.foodservice.model.Location;

public interface LocationService {
	Location saveLocation(Location loc);
	Location findByLonLat(double lon, double lat);
}
