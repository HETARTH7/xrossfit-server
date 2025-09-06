# Xrossfit

A **fitness tracking and e-commerce app** built with Spring Boot.
Users can log workouts, shop for fitness equipment, track purchases, and use promotions for discounts.

---

## 🚀 Features

* User authentication (signup/login with email/OTP/password)
* Daily exercise logging and tracking
* Exercise library with categories (Cardio, Strength, Flexibility, Balance)
* E-commerce module: wishlist, cart, checkout, payments
* Promotions and discounts with voucher codes
* Admin panel for managing users and exercises

---

## 🛠️ Tech Stack

* **Frontend**: ReactJS (Typescript)
* **Backend**: Spring Boot (Java)
* **Database**: MySQL  (SQL schema in `xrossfit.sql`)
* **Authentication**: JWT & refresh tokens (HttpOnly cookies)
* **Other**: JPA/Hibernate for ORM

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
   git clone https://github.com/your-username/xrossfit.git
   cd xrossfit
   ```
2. Import the project into your IDE (IntelliJ/Eclipse).
3. Configure your database in `application.properties`.
4. Run the Spring Boot application.

---

[//]: # (## 📜 License)

[//]: # ()
[//]: # (This project is licensed under the MIT License.)

[//]: # ()
[//]: # (---)

