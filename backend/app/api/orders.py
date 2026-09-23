from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/orders", tags=["Orders"])

class OrderCreate(BaseModel):
    client_id: int
    origin_address: str
    destination_address: str
    weight_kg: float
    distance_km: float

class AssignCourierRequest(BaseModel):
    courier_id: int
    vehicle_id: int
    vehicle_max_weight: float

@router.post("/calculate-price")
def get_order_price(distance_km: float, weight_kg: float):
    from app.services.pricing import calculate_delivery_price
    price = calculate_delivery_price(distance_km, weight_kg)
    return {"calculated_price_kzt": price}

@router.post("/{order_id}/assign")
def assign_courier_and_vehicle(order_id: int, cargo_weight: float, payload: AssignCourierRequest):
    from app.services.pricing import validate_vehicle_capacity
    
    # Валидация бизнес-правила: грузоподъемность транспорта
    if not validate_vehicle_capacity(payload.vehicle_max_weight, cargo_weight):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Транспортное средство не может перевезти груз массой {cargo_weight} кг (Предел: {payload.vehicle_max_weight} кг)."
        )
    
    return {
        "status": "success",
        "message": f"Заказ №{order_id} успешно назначен на курьера ID {payload.courier_id}",
        "order_status": "courier_assigned"
    }