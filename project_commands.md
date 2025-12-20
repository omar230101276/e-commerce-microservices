# E-Commerce Project Command Cheatsheet

## 🚀 Quick Start
**Run with Docker Compose (Easiest)**
```powershell
.\start_with_docker.ps1
# OR manually:
docker-compose up --build
```

**Run Locally (Dev Mode)**
```powershell
.\start_dev.ps1
# This opens separate terminals for each service
```

---

## 🐳 Docker
**Build and Run**
```bash
docker-compose up --build
```
**Stop Services**
```bash
docker-compose down
```
**View Running Containers**
```bash
docker ps
```
**View Logs**
```bash
docker-compose logs -f [service_name]
# Example: docker-compose logs -f catalog-service
```

---

## ☸️ Kubernetes (KinD)

### Cluster Management
**Create Cluster**
```bash
kind create cluster --name ecommerce-cluster
```
**Delete Cluster**
```bash
kind delete cluster --name ecommerce-cluster
```
**Load Docker Images into KinD**
*(Required if not using a registry)*
```bash
kind load docker-image catalog-service:latest --name ecommerce-cluster
kind load docker-image cart-service:latest --name ecommerce-cluster
kind load docker-image order-service:latest --name ecommerce-cluster
kind load docker-image payment-service:latest --name ecommerce-cluster
```

### Deployment
**Apply Manifests**
```bash
kubectl apply -f k8s/
# Or specific folders:
kubectl apply -f k8s/catalog
kubectl apply -f k8s/cart
kubectl apply -f k8s/order
kubectl apply -f k8s/payment
```

### Troubleshooting
**Get Pods**
```bash
kubectl get pods
```
**Get Services**
```bash
kubectl get svc
```
**Logs for a Pod**
```bash
kubectl logs [pod-name]
```
**Port Forwarding (Access Services)**
```bash
kubectl port-forward svc/catalog-service 8000:8000
kubectl port-forward svc/order-dashboard 3000:3000
```

---

## 🐙 ArgoCD
**Install ArgoCD**
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```
**Access ArgoCD UI**
```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
# Login with standard admin password retrieval
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```
