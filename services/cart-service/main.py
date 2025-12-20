from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uuid

app = FastAPI(title="Cart Service")

# In-memory carts: {user_id: [items]}
carts = {}

class CartItem(BaseModel):
    product_id: str
    quantity: int

@app.post("/cart/{user_id}/add")
def add_item(user_id: str, item: CartItem):
    if user_id not in carts:
        carts[user_id] = []
    carts[user_id].append(item)
    return {"message": "Item added", "cart": carts[user_id]}

@app.post("/cart/{user_id}/remove")
def remove_item(user_id: str, item: CartItem):
    if user_id not in carts or not carts[user_id]:
        raise HTTPException(status_code=404, detail="Cart is empty")
    carts[user_id] = [i for i in carts[user_id] if i.product_id != item.product_id]
    return {"message": "Item removed", "cart": carts[user_id]}

@app.get("/cart/{user_id}", response_model=List[CartItem])
def get_cart(user_id: str):
    return carts.get(user_id, [])
