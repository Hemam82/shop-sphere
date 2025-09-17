# catalog-service/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI()

# CORS: allow frontend dev server
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_CONFIG = {
    "host": os.getenv("POSTGRES_HOST", "postgres"),
    "database": os.getenv("POSTGRES_DB", "shopsphere"),
    "user": os.getenv("POSTGRES_USER", "shop"),
    "password": os.getenv("POSTGRES_PASSWORD", "shop_pass"),
}

def get_conn():
    return psycopg2.connect(**DB_CONFIG)

class ProductIn(BaseModel):
    name: str
    price_cents: int

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/products")
def get_products():
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT id, name, price_cents FROM products ORDER BY id")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        return {"products": rows}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/products", status_code=201)
def create_product(item: ProductIn):
    try:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO products(name, price_cents) VALUES (%s, %s) RETURNING id, name, price_cents",
            (item.name, item.price_cents),
        )
        new = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return {"product": {"id": new[0], "name": new[1], "price_cents": new[2]}}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
