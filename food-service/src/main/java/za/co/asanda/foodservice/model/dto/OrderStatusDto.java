package za.co.asanda.foodservice.model.dto;

import java.io.Serializable;

import za.co.asanda.foodservice.model.OrderStatusType;

public class OrderStatusDto implements Serializable {
	private static final long serialVersionUID = -7178041153760353957L;
	private Long orderId;
	private OrderStatusType status;

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public OrderStatusType getStatus() {
		return status;
	}

	public void setStatus(OrderStatusType status) {
		this.status = status;
	}

}
