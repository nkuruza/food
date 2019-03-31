package za.co.asanda.foodservice.model;

public enum OrderStatusType {
	PLACED("PLACED"), VIEWED("VIEWED"), ACCEPTED("ACCEPTED"), PREPARING("PREPARING"), READY("READY"),
	CUSTOMER_ACCEPTED("CUSTOMER_ACCEPTED");
	String orderStatusType;

	private OrderStatusType(String orderStatusType) {
		this.orderStatusType = orderStatusType;
	}

	public String getOrderStatusType() {
		return orderStatusType;
	}
}
