# Project Setup Guide

Welcome! This guide will help you get this e-commerce project running on your PC for the first time.

## 📋 Prerequisites

Before you start, you need to have **Docker Desktop** installed and running. This is the magic tool that makes sure everything runs exactly the same on your computer as it does on mine.

1.  **Download Docker Desktop:** [Click here to download for Windows](https://www.docker.com/products/docker-desktop/)
2.  **Install it:** Run the installer and follow the instructions.
3.  **Start it:** Open "Docker Desktop" from your Start menu and wait until the whale icon in the bottom right corner says "Docker Desktop is running".

## 🚀 How to Run the Project

We have made it super easy for you.

### Option 1: The Easy Way (Recommended)

1.  Open the folder containing these files.
2.  Double-click the file named **`start.bat`**.
3.  A black window will appear. It will download all the necessary parts and start the project. This might take a few minutes the first time.
4.  Once it says everything is running, you are good to go!

### Option 2: The Manual Way

If you prefer using the command line:

1.  Open your terminal/command prompt in this folder.
2.  Run this command:
    ```bash
    docker-compose up --build
    ```

## 🌐 Accessing the Project

Once the project is running (you see messages about services starting), open your web browser and go to:

*   **Main Dashboard:** [http://localhost:3000](http://localhost:3000)
    *   This is where you can see orders and the system status.

### Service Endpoints (for testing)
*   **Catalog Service:** [http://localhost:8000](http://localhost:8000)
*   **Cart Service:** [http://localhost:8001](http://localhost:8001)
*   **Order Service:** [http://localhost:8002](http://localhost:8002)
*   **Payment Service:** [http://localhost:8003](http://localhost:8003)

## ❓ Troubleshooting

*   **"Docker is not running" error:** Make sure you opened Docker Desktop app and it is fully started.
*   **Ports already in use:** If you have other programs running on ports 3000, 8000-8003, you might need to close them.
*   **Updates:** If you get a new version of this project, just verify you have the latest files and run `start.bat` again.

Enjoy!
