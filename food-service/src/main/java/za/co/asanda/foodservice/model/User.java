package za.co.asanda.foodservice.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "app_user")
public class User implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -396675681427924512L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotEmpty
	@Column(unique = true, nullable = false)
	private String username;

	@NotEmpty
	@Column(nullable = false)
	private String password;

	@Transient
	private String confirmPassword;

	@NotEmpty
	@Column(nullable = false)
	private String firstName;

	@NotEmpty
	@Column(nullable = false)
	private String lastName;

	@NotEmpty
	@Column(unique = true, nullable = false)
	private String email;

	@NotEmpty
	@Column(unique = true, nullable = false)
	private String phone;

	@NotEmpty
	@Column(nullable = false)
	private String state = State.ACTIVE.getState();

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "APP_USER_USER_PROFILE", joinColumns = { @JoinColumn(name = "USER_ID") }, inverseJoinColumns = {
			@JoinColumn(name = "USER_PROFILE_ID") })
	private Set<UserProfile> userProfiles = new HashSet<UserProfile>();

	private Double lat;
	private Double lon;

	@Column(nullable = false)
	private boolean verified = false;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String ssoId) {
		this.username = ssoId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
		checkPassword();
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
		checkPassword();
	}

	private void checkPassword() {
		if (this.password == null || this.confirmPassword == null) {
			return;
		} else if (!this.password.equals(confirmPassword)) {
			this.confirmPassword = "";
		}
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setCell(String phone) {
		this.phone = phone;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Set<UserProfile> getUserProfiles() {
		return userProfiles;
	}

	public void setUserProfiles(Set<UserProfile> userProfiles) {
		this.userProfiles = userProfiles;
	}

	public boolean isVerified() {
		return verified;
	}

	public void setVerified(boolean verified) {
		this.verified = verified;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public Double getLon() {
		return lon;
	}

	public void setLon(Double lon) {
		this.lon = lon;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		Long result = 1l;
		result = prime * result + id;
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result.intValue();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof User))
			return false;
		User other = (User) obj;
		if (id != other.id)
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", ssoId=" + username + ", password=" + password + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", email=" + email + ", state=" + state + ", userProfiles=" + userProfiles
				+ "]";
	}

}
