from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Payment Service")

class PaymentRequest(BaseModel):
    order_id: str
    amount: float
    method: str = "credit_card"

@app.post("/pay")
def make_payment(payment: PaymentRequest):
    # Fake payment processing
    return {
        "order_id": payment.order_id,
        "amount": payment.amount,
        "method": payment.method,
        "status": "paid",
        "confirmation_id": "CONF-" + payment.order_id[:8]
    }

@app.get("/")
def root():
    return {"message": "Payment Service is running"}
