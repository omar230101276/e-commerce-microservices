$root = Get-Location

Write-Host "Starting E-Commerce Microservices..."

# 1. Catalog Service (Port 8000)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\services\catalog-service'; echo 'Starting Catalog Service...'; pip install -r requirements.txt; uvicorn main:app --reload --port 8000"

# 2. Cart Service (Port 8001)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\services\cart-service'; echo 'Starting Cart Service...'; pip install -r requirements.txt; uvicorn main:app --reload --port 8001"

# 3. Order Service (Port 8002)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\services\order-service'; echo 'Starting Order Service...'; pip install -r requirements.txt; uvicorn main:app --reload --port 8002"

# 4. Payment Service (Port 8003)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\services\payment-service'; echo 'Starting Payment Service...'; pip install -r requirements.txt; uvicorn main:app --reload --port 8003"

# 5. Dashboard (Port 3000)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\dashboard\order-dashboard'; echo 'Starting Dashboard...'; npm install; npm start"

Write-Host "All services are being started in separate windows."
