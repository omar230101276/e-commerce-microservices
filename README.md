# E-Commerce Microservices Project

Microservices-based e-commerce backend deployed on Kubernetes using KinD and managed with ArgoCD.

## Prerequisites

- **Python 3.10+**
- **Node.js 16+** & **npm**

## Local Development

### Docker Support (Best for Fresh Start)

To build and run the entire project from scratch in containers (ensuring a clean environment), use:

```powershell
./start_with_docker.ps1
```
Or manually:
```bash
docker-compose up --build
```
This requires **Docker Desktop** to be running.

### Automation Script (Local)

If you prefer running locally without Docker:


You can start all services and the dashboard with a single PowerShell script:

```powershell
./start_dev.ps1
```

This will open separate terminal windows for each service.

### Manual Setup

To run the project locally manually, you need to start each service independently on specific ports.


### 1. Backend Services

It is recommended to use virtual environments for each service, or one shared environment if dependencies allow.

#### Catalog Service
```bash
cd services/catalog-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### Cart Service
```bash
cd services/cart-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8001
```

#### Order Service
**Note:** The dashboard expects this service on port **8002**.
```bash
cd services/order-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8002
```

#### Payment Service
```bash
cd services/payment-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8003
```

### 2. Frontend Dashboard

The order dashboard visualizes orders for a specific user.

```bash
cd dashboard/order-dashboard
npm install
npm start
```
The dashboard should open at `http://localhost:3000`.

## API Usage Example

**Create an Order:**
```bash
curl -X POST "http://localhost:8002/orders" -H "Content-Type: application/json" -d '{
  "user_id": "user1",
  "items": [{"product_id": "prod-001", "quantity": 2}]
}'
```

Reflect the change in the Dashboard to see the new order.

