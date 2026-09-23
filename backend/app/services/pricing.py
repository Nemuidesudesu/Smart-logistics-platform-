BASE_PRICE = 500.0        # Базовая цена в KZT
PRICE_PER_KM = 100.0      # Стоимость за 1 км в KZT
WEIGHT_SURCHARGE = 300.0  # Надбавка за каждый килограмм сверх 5 кг

def calculate_delivery_price(distance_km: float, weight_kg: float) -> float:
    """Расчет стоимости заказа по базовой формуле."""
    price = BASE_PRICE + (distance_km * PRICE_PER_KM)
    if weight_kg > 5.0:
        price += (weight_kg - 5.0) * WEIGHT_SURCHARGE
    return round(price, 2)

def validate_vehicle_capacity(vehicle_max_weight: float, cargo_weight: float) -> bool:
    """Проверка грузоподъемности транспорта перед назначением."""
    return vehicle_max_weight >= cargo_weight