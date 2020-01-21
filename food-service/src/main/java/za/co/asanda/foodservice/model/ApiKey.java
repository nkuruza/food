package za.co.asanda.foodservice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
@Entity
@Table(name = "api_key")
public class ApiKey {
	@Id
	@GeneratedValue
	private Long id;
	
	@NotEmpty
	@Column(unique = true, nullable = false)
	private String name;
	
	@NotEmpty
	@Column(nullable = false)
	private String key;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}
	
	
}
