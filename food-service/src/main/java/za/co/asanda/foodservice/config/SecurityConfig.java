package za.co.asanda.foodservice.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

@Configuration
@ComponentScan({ "za.co.asanda.foodservice.controller", "za.co.asanda.foodservice.service",
		"za.co.asanda.foodservice.repo" })
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	@Qualifier("foodUserDetailsService")
	private UserDetailsService userDetailsService;

	@Autowired
	private DataSource dataSource;

	@Autowired
	private RestAuthenticationEntryPoint authEntryPoint;

	@Autowired
	private AuthenticationSuccessHandler successHandler;

	@Autowired
	private FoodAccessDeniedHandler accessDeniedHandler;

	private SimpleUrlAuthenticationFailureHandler failureHandler = new SimpleUrlAuthenticationFailureHandler();

	public SecurityConfig() {
		super();
		SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_INHERITABLETHREADLOCAL);
	}

	@Autowired
	public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService);
		auth.authenticationProvider(authenticationProvider());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService);
		authenticationProvider.setPasswordEncoder(passwordEncoder());
		return authenticationProvider;
	}

	@Bean
	public UserDetailsService userDetailsService() {
		return super.userDetailsService();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests().and().exceptionHandling().accessDeniedHandler(accessDeniedHandler)
				.authenticationEntryPoint(authEntryPoint).and().authorizeRequests()
				.antMatchers("/", "/login", "/users/add", "/products/list/**").permitAll()
				.antMatchers("/users/username").authenticated()
				.antMatchers("/products/add", "/products/remove/**", "/products/update").hasRole("MERCHANT").and()
				.formLogin().successHandler(successHandler).failureHandler(failureHandler).and().httpBasic().and()
				.logout();
	}

	@Bean
	public PersistentTokenRepository persistentTokenRepository() {
		JdbcTokenRepositoryImpl tokenRepositoryImpl = new JdbcTokenRepositoryImpl();
		tokenRepositoryImpl.setDataSource(dataSource);
		return tokenRepositoryImpl;
	}
}
