package com.onuryilmazo.demo;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

/*
 * Filters incoming HTTP requests to perform JWT (JSON Web Token) validation. 
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil; 

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil; // Dependency is injected via the constructor
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization"); // Getting the Authorization Header
        String token = null;
        String username = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.substring(7); // To remove the 'Bearer ' prefix from the Authorization header and get only the JWT token
            username = jwtUtil.extractUsername(token);
        }
        
        // If the username is not empty and the user has not already been authenticated
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) { //
            if (jwtUtil.validateToken(token)) {
                PreAuthenticatedAuthenticationToken authToken =
                        new PreAuthenticatedAuthenticationToken(username, null, null);
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
