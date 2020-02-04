package za.co.asanda.foodservice.service;

import java.util.Arrays;
import java.util.List;

import za.co.asanda.foodservice.model.Shop;
import za.co.asanda.foodservice.model.User;
import za.co.asanda.foodservice.model.dto.UserDto;
import za.co.asanda.foodservice.repo.ShopRepo;
import za.co.asanda.foodservice.repo.UserRepository;

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private ShopRepo shopRepo;

	public User save(User user) {

		return userRepo.save(user);
	}

	public User findById(Long id) {
		return userRepo.findById(id).get();
	}

	public User findByUsername(String sso) {
		return userRepo.findByUsername(sso);
	}

	@Override
	public void updateUser(User user) {
		User entity = userRepo.findById(user.getId()).get();
		if (entity != null) {
			entity.setUsername(user.getUsername());

		}
	}

	@Override
	public void deleteUserBySSO(String sso) {
		// dao.deleteBySSO(sso);

	}

	@Override
	public List<User> findAllUsers() {
		return userRepo.findAll();
	}

	@Override
	public boolean isUserSSOUnique(Integer id, String sso) {
		User user = findByUsername(sso);
		return (user == null || ((id != null) && (user.getId() == id.longValue())));
	}

	@Override
	public String encodePassword(String password) {
		return ""; // passwordEncoder.encode(password);
	}

	@Value("${keycloak.auth-server-url}")
	String kcUrl;

	@Value("${keycloak.realm}")
	String kcRealm;

	@Value("${keycloak.resource}")
	String kcResource;

	@Override
	public Long addNew(UserDto userDto) {
		User user = new User();
		String username = whoami();
		user.setUsername(username);

		user = userRepo.save(user);

		if (user.getId() == null)
			System.out.println("Problem");
		if (userDto.getShop() != null && userDto.getRole().equals("ROLE_MERCHANT")) {
			Shop shop = userDto.getShop();
			shop.setOwner(user);
			shop = shopRepo.save(shop);
		}
		addSSOUser(username, userDto.getRole());

		return user.getId();
	}

	private void addSSOUser(String username, String role) {
		String apiUser = System.getenv("KEYCLOAK_API_USER");
		String apiPass = System.getenv("KEYCLOAK_API_PASS");
		String apiClient = System.getenv("KEYCLOAK_API_CLIENT");
		String apiRealm = System.getenv("KEYCLOAK_API_REALM");

		Keycloak keycloak = KeycloakBuilder.builder().serverUrl(kcUrl).realm(apiRealm).username(apiUser)
				.password(apiPass).clientId(apiClient)
				.resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build()).build();

		RealmResource realmResource = keycloak.realm(kcRealm);

		ClientRepresentation clientRep = realmResource.clients().findByClientId(kcResource).get(0);
		RoleRepresentation clientRoleRep = realmResource.clients().get(clientRep.getId()).roles().get(role)
				.toRepresentation();

		UserRepresentation kuser = realmResource.users().search(username).get(0);
		realmResource.users().get(kuser.getId()).roles().clientLevel(clientRep.getId())
				.add(Arrays.asList(clientRoleRep));
	}

	private String whoami() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		return authentication.getName();
	}

}