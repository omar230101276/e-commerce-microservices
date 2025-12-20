from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uuid

app = FastAPI(title="Catalog Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory database
products = {}

class Product(BaseModel):
    id: str | None = None
    name: str
    price: float
    stock: int

@app.post("/products", response_model=Product)
def create_product(product: Product):
    product.id = str(uuid.uuid4())
    products[product.id] = product
    return product

@app.get("/products", response_model=List[Product])
def list_products():
    return list(products.values())

@app.get("/products/{product_id}", response_model=Product)
def get_product(product_id: str):
    if product_id not in products:
        raise HTTPException(status_code=404, detail="Product not found")
    return products[product_id]

@app.put("/products/{product_id}", response_model=Product)
def update_product(product_id: str, product: Product):
    if product_id not in products:
        raise HTTPException(status_code=404, detail="Product not found")
    product.id = product_id
    products[product_id] = product
    return product

@app.delete("/products/{product_id}")
def delete_product(product_id: str):
    if product_id not in products:
        raise HTTPException(status_code=404, detail="Product not found")
    del products[product_id]
    return {"message": "Product deleted successfully"}
