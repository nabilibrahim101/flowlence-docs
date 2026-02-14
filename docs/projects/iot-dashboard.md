# IoT Dashboard

## Overview

Connect your ESP32 to the internet and send sensor data to a cloud dashboard using MQTT. You'll see real-time graphs and widgets showing your sensor readings from anywhere in the world.

This project uses **Flowlence Cloud** (powered by ThingsBoard) for the dashboard.

## Components Needed

- ESP32
- DHT11 Temperature & Humidity Sensor
- WiFi connection
- Flowlence Cloud account

## Prerequisites

Before starting this project, make sure you've completed:

- [DHT11 Tutorial](../sensors/dht11.md) - understand the sensor
- [Your First Program](../getting-started/first-program.md) - know how to upload code

## How It Works

```
┌──────────┐    WiFi/MQTT    ┌─────────────────┐
│  ESP32   │ ──────────────► │ Flowlence Cloud  │
│  + DHT11 │                 │  (Dashboard)     │
└──────────┘                 └─────────────────┘
  Reads temp                   Shows graphs,
  & humidity                   gauges, alerts
  every 5 sec                  in real-time
```

## Step-by-Step Guide

### Step 1: Set Up Flowlence Cloud

*Coming soon - account setup and device creation guide.*

### Step 2: Configure WiFi on ESP32

*Coming soon - WiFi connection blocks.*

### Step 3: Send Data via MQTT

*Coming soon - MQTT publishing blocks.*

### Step 4: Build Your Dashboard

*Coming soon - creating widgets and charts in Flowlence Cloud.*

## Expected Result

A live dashboard showing temperature and humidity graphs updating in real-time as your ESP32 sends data.

## Extend It

- Add more sensors (light, soil moisture) and display them on the dashboard
- Create alerts that notify you when values exceed thresholds
- Build a mobile-friendly dashboard you can check from your phone
