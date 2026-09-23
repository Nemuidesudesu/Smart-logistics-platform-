-- Роли пользователей
CREATE TYPE user_role AS ENUM ('client', 'dispatcher', 'courier', 'admin');
CREATE TYPE courier_status AS ENUM ('free', 'on_delivery', 'inactive');
CREATE TYPE vehicle_type AS ENUM ('car', 'van', 'truck');
CREATE TYPE vehicle_status AS ENUM ('active', 'maintenance', 'inactive');
CREATE TYPE order_status AS ENUM ('created', 'confirmed', 'courier_assigned', 'picked_up', 'in_transit', 'delivered', 'completed', 'cancelled', 'failed');

-- Таблица пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role user_role NOT NULL DEFAULT 'client',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Транспортные средства
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    vehicle_type vehicle_type NOT NULL,
    max_weight_kg DECIMAL(10,2) NOT NULL,
    status vehicle_status DEFAULT 'active'
);

-- Профили курьеров
CREATE TABLE couriers (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    status courier_status DEFAULT 'free',
    current_vehicle_id INT REFERENCES vehicles(id) ON DELETE SET NULL,
    deliveries_completed INT DEFAULT 0
);

-- Заказы
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    client_id INT REFERENCES users(id) ON DELETE CASCADE,
    courier_id INT REFERENCES couriers(id) ON DELETE SET NULL,
    vehicle_id INT REFERENCES vehicles(id) ON DELETE SET NULL,
    origin_address TEXT NOT NULL,
    destination_address TEXT NOT NULL,
    cargo_type VARCHAR(100) NOT NULL,
    weight_kg DECIMAL(10,2) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status order_status DEFAULT 'created',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- История изменений статусов
CREATE TABLE order_status_history (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    changed_by_user_id INT REFERENCES users(id),
    status order_status NOT NULL,
    comment TEXT,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);