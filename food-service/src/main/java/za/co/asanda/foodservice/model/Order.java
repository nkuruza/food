package za.co.asanda.foodservice.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Order implements Serializable {
	private static final long serialVersionUID = -1873113138732500381L;
	@Id
	@GeneratedValue
	private Long id;
	@OneToMany(cascade = CascadeType.ALL)
	private Collection<OrderLine> orderLines = new ArrayList<OrderLine>();
	private LocalDateTime dateCreated;
	private LocalDateTime dateCompleted;
	@ManyToOne
	private User customer;
	@ManyToOne
	private OrderStatus status;
	@ManyToOne
	private Shop shop;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Collection<OrderLine> getOrderLines() {
		return orderLines;
	}

	public void setOrderLines(Collection<OrderLine> orderLines) {
		this.orderLines = orderLines;
	}

	public LocalDateTime getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(LocalDateTime dateCreated) {
		this.dateCreated = dateCreated;
	}

	public LocalDateTime getDateCompleted() {
		return dateCompleted;
	}

	public void setDateCompleted(LocalDateTime dateCompleted) {
		this.dateCompleted = dateCompleted;
	}

	public User getCustomer() {
		return customer;
	}

	public void setCustomer(User customer) {
		this.customer = customer;
	}

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus status) {
		this.status = status;
	}

	public Shop getShop() {
		return shop;
	}

	public void setShop(Shop shop) {
		this.shop = shop;
	}
}
