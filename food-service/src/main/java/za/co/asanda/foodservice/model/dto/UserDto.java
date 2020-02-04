package za.co.asanda.foodservice.model.dto;

import java.io.Serializable;

import javax.validation.constraints.NotNull;

import za.co.asanda.foodservice.model.Shop;

public class UserDto implements Serializable {
	private static final long serialVersionUID = 2774314535809828371L;

	@NotNull
	private String role;

	private Shop shop;

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Shop getShop() {
		return shop;
	}

	public void setShop(Shop shop) {
		this.shop = shop;
	}

}
