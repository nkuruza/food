package za.co.asanda.foodservice.util;

import za.co.asanda.foodservice.model.Location;

public class EarthGeoUtil {
	public static final double R = 6371000;

	public static double getDisplacement(Location loc1, Location loc2) {
		return getDisplacement(loc1.getLon(), loc1.getLat(), loc2.getLon(), loc2.getLat());
	}

	public static double getDisplacement(double lon1, double lat1, double lon2, double lat2) {
		final double radLat1 = lat1 * Math.PI / 180;
		final double radLat2 = lat2 * Math.PI / 180;
		final double radLatDiff = (lat2 - lat1) * Math.PI / 180;
		final double radLonDiff = (lon2 - lon1) * Math.PI / 180;

		return getDisplacementByRad(radLat1, radLat2, radLatDiff, radLonDiff);
	}

	private static double getDisplacementByRad(double radLat1, double radLat2, double radLatDiff, double radLonDiff) {
		final double a = Math.sin(radLatDiff / 2) * Math.sin(radLatDiff / 2)
				+ Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(radLonDiff / 2) * Math.sin(radLonDiff / 2);

		double c = Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return R * c;
	}
}
