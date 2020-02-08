package za.co.asanda.foodservice.model;

public enum OrderStatusType {
	//@formatter:off
	PLACED(new OrderStatus("PLACED")), 
	VIEWED(new OrderStatus("REJECTED")), 
	ACCEPTED(new OrderStatus("ACCEPTED")),
	PREPARING(new OrderStatus("PREPARING")), 
	READY(new OrderStatus("READY")),
	CUSTOMER_ACCEPTED(new OrderStatus("CUSTOMER ACCEPTED"));
	//@formatter:on
	private OrderStatus value;

	private OrderStatusType(OrderStatus orderStatusType) {
		this.value = orderStatusType;
	}

	public OrderStatus getValue() {
		return value;
	}
}
