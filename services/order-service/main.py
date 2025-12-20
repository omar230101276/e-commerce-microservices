from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uuid

app = FastAPI(title="Order Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory database
orders = {}

class OrderItem(BaseModel):
    product_id: str
    quantity: int

class Order(BaseModel):
    id: str | None = None
    user_id: str
    items: List[OrderItem]
    status: str | None = "pending"

@app.post("/orders", response_model=Order)
def create_order(order: Order):
    order.id = str(uuid.uuid4())
    orders[order.id] = order
    return order

@app.get("/orders/{order_id}", response_model=Order)
def get_order(order_id: str):
    if order_id not in orders:
        raise HTTPException(status_code=404, detail="Order not found")
    return orders[order_id]

@app.put("/orders/{order_id}/status")
def update_status(order_id: str, status: str):
    if order_id not in orders:
        raise HTTPException(status_code=404, detail="Order not found")
    orders[order_id].status = status
    return {"message": f"Order status updated to {status}"}

@app.get("/orders/user/{user_id}", response_model=List[Order])
def get_user_orders(user_id: str):
    user_orders = [o for o in orders.values() if o.user_id == user_id]
    return user_orders
