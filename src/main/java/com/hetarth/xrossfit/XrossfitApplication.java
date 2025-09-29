package com.hetarth.xrossfit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class XrossfitApplication {

	public static void main(String[] args) {
		SpringApplication.run(XrossfitApplication.class, args);
	}

}
