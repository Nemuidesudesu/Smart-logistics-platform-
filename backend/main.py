from fastapi import FastAPI
from app.api.orders import router as orders_router

app = FastAPI(
    title="Smart Logistics Platform API",
    version="1.0.0",
    description="API системы управления логистикой и доставкой"
)

# Подключение роутов заказов
app.include_router(orders_router)

@app.get("/")
def read_root():
    return {"status": "online", "message": "Smart Logistics Platform API работает!"}