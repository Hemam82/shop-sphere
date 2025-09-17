FROM python:3.11-slim

WORKDIR /app

# install small build deps needed by some packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc python3-dev libpq-dev build-essential && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements first and install
COPY requirements.txt /app/requirements.txt
RUN python -m pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r /app/requirements.txt

# Copy application code
COPY . /app

EXPOSE 5000

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]
