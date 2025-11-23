# Xrossfit Server

A **fitness tracking and e-commerce app** built with Spring Boot.
Users can log workouts and shop for fitness equipments.

---

## 🚀 Features

* User authentication (signup/login with email and password)

---

## 🛠️ Tech Stack

* **Backend**: Spring Boot 3, Spring Web, Spring Security 6 (JWT), Spring Data JPA, Hibernate, Validation API
* **Database**: MySQL
* **Language**: Java 21
* **Build Tool**: Maven
* **Authentication**: JWT (JSON Web Tokens), BCrypt PasswordEncoder
* **Testing**: JUnit 5, Mockito
* **Utilities**: Lombok, Slf4j
* **DevOps**: Docker

---

## 🗄️ Database

This project uses a relational database schema.
The following tables are included (see `xrossfit.sql` for full details):

* **users**
* **addresses**
* **exercises**
* **exercise\_logs**
* **products**
* **product\_reviews**
* **wishlists**
* **carts**
* **promotions**
* **purchases**
* **order\_items**

---

## 📦 Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/hetarth7/xrossfit-server.git
   cd xrossfit-server
   ```
2. Import the project into your IDE.
3. Configure your database in `application.properties`.
4. Build using maven.
    ```bash
    mvn clean install
    ```
   OR
    ```bash
    mvn clean install -DskipTests
    ```
5. Run the Spring Boot application.

   ```bash
   mvn spring-boot:run
   ```

---

## To do:
* Daily exercise logging and tracking
* Exercise library with categories (Cardio, Strength, Flexibility, Balance)
* E-commerce module: wishlist, cart, checkout, payments
* Promotions and discounts with voucher codes
* Admin panel for managing users and exercises

---

[//]: # (## 📜 License)

[//]: # ()
[//]: # (This project is licensed under the MIT License.)

[//]: # ()
[//]: # (---)

