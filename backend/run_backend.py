import os
import uvicorn

if __name__ == "__main__":
    # Render ka PORT use karein
    port = int(os.environ.get("PORT", 8000))
    
    print(f"Starting GraminGuru FastAPI Engine on http://0.0.0.0:{port} ...")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",      #  IMPORTANT: Render ke liye
        port=port,
        reload=False         # 👈 Production mein False
    )