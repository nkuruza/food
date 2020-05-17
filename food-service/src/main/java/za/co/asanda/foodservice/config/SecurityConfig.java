package za.co.asanda.foodservice.config;

import org.keycloak.adapters.springsecurity.authentication.KeycloakLogoutHandler;
import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter;
import org.springframework.security.web.session.HttpSessionEventPublisher;

import za.co.asanda.foodservice.handlers.AsandaAuthenticationFailureHandler;

@Configuration
@ComponentScan({ "za.co.asanda.foodservice.controller", "za.co.asanda.foodservice.service",
		"za.co.asanda.foodservice.repo" })
public class SecurityConfig extends KeycloakWebSecurityConfigurerAdapter {
	
	@Autowired
	private AuthenticationEntryPoint unauthorizedHandler;
	
	@Autowired
	private AccessDeniedHandler accessDeniedHandler;
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(keycloakAuthenticationProvider());
	}

	@Bean
	public ServletListenerRegistrationBean<HttpSessionEventPublisher> httpSessionEventPublisher() {
		return new ServletListenerRegistrationBean<HttpSessionEventPublisher>(new HttpSessionEventPublisher());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	protected KeycloakLogoutHandler keycloakLogoutHandler() throws Exception {
        return new KeycloakLogoutHandler(adapterDeploymentContext());
    }

	@Bean
	@Override
	protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
		return new RegisterSessionAuthenticationStrategy(new SessionRegistryImpl());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		super.configure(http);
		http.sessionManagement()
	        .sessionAuthenticationStrategy(sessionAuthenticationStrategy())
	        .and()
	        .addFilterBefore(keycloakPreAuthActionsFilter(), LogoutFilter.class)
	        .addFilterAfter(keycloakSecurityContextRequestFilter(), SecurityContextHolderAwareRequestFilter.class)
	        .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint())
	        .and().
        	authorizeRequests()
				.antMatchers("/orders/place").hasRole("CUSTOMER")
				.antMatchers("/shops/save").hasRole("MERCHANT")
				.antMatchers("/admin/**").hasRole("ADMIN")
				.anyRequest().authenticated()
			.and().exceptionHandling()
				.accessDeniedHandler(accessDeniedHandler)
				.authenticationEntryPoint(unauthorizedHandler)
			.and().csrf().disable()
            .logout()
            .addLogoutHandler(keycloakLogoutHandler())
            .logoutUrl("/users/logout").permitAll()
            .logoutSuccessUrl("/users/me");;
	}
	@Bean
	public AuthenticationFailureHandler asandaAuthenticationFailureHandler() {
		return new AsandaAuthenticationFailureHandler();
	}
}
