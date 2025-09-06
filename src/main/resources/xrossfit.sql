-- ========================
-- USERS TABLE
-- ========================
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255),
    email_verified BOOLEAN DEFAULT TRUE,
    phone_number VARCHAR(20),
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER'
);

-- ========================
-- ADDRESS TABLE
-- ========================
CREATE TABLE addresses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    street VARCHAR(150) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_address_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ========================
-- EXERCISES TABLE
-- ========================
CREATE TABLE exercises (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    exercise_name VARCHAR(100) NOT NULL,
    exercise_type VARCHAR(100) NOT NULL
);

-- ========================
-- EXERCISE LOG TABLE
-- ========================
CREATE TABLE exercise_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    date DATE,
    sets_done INT DEFAULT 1,
    metrics ENUM('KM','REPS','CALORIES','DURATION'),
    duration INT, -- in seconds
    CONSTRAINT fk_log_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_log_exercise FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

-- ========================
-- PRODUCTS TABLE
-- ========================
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    discount_type ENUM('PERCENTAGE','FLAT') DEFAULT NULL,
    discount INT DEFAULT 0,
    img_url VARCHAR(255),
    category VARCHAR(50) NOT NULL
);

-- ========================
-- PRODUCT REVIEWS TABLE
-- ========================
CREATE TABLE product_reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 10),
    reviewer_id BIGINT NOT NULL,
    review VARCHAR(500),
    date DATE,
    CONSTRAINT fk_review_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT fk_review_user FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ========================
-- WISHLIST TABLE
-- ========================
CREATE TABLE wishlists (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    CONSTRAINT fk_wishlist_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_wishlist_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ========================
-- CART TABLE
-- ========================
CREATE TABLE carts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ========================
-- PROMOTIONS TABLE
-- ========================
CREATE TABLE promotions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    discount_type ENUM('PERCENTAGE','FLAT') NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    min_order_value DECIMAL(10,2) DEFAULT 0,
    usage_limit INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE
);


-- ========================
-- PURCHASES TABLE
-- ========================
CREATE TABLE purchases (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING','PAID','SHIPPED','DELIVERED') NOT NULL DEFAULT 'PENDING',
    total_amount DECIMAL(10,2) NOT NULL,
    shipment_charges DECIMAL(10,2) DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    final_amount DECIMAL(10,2) GENERATED ALWAYS AS (total_amount + shipment_charges - discount) STORED,
    payment_mode ENUM('CREDIT_CARD','UPI','NETBANKING','CASH_ON_DELIVERY'),
    transaction_id VARCHAR(255) UNIQUE,
    payment_status ENUM('PENDING','SUCCESS','FAILED') NOT NULL DEFAULT 'PENDING',
    billing_address BIGINT,
    shipping_address BIGINT,
    promotion_id BIGINT,
    CONSTRAINT fk_purchase_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_purchase_billing FOREIGN KEY (billing_address) REFERENCES addresses(id),
    CONSTRAINT fk_purchase_shipping FOREIGN KEY (shipping_address) REFERENCES addresses(id),
    CONSTRAINT fk_purchase_promotion FOREIGN KEY (promotion_id) REFERENCES promotions(id)
);


-- ========================
-- ORDER ITEMS TABLE
-- ========================
CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    purchase_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (quantity * price) STORED,
    CONSTRAINT fk_orderitem_purchase FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
    CONSTRAINT fk_orderitem_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
