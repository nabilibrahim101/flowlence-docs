# Weather Station

## Overview

Build a weather station that reads temperature and humidity and displays the data on an LCD screen. An LED indicator warns when temperature exceeds a threshold.

## Components Needed

- ESP32
- DHT11 Temperature & Humidity Sensor
- LCD Display (I2C)
- LED
- 220 ohm resistor
- Jumper wires

## Wiring Diagram

![Weather Station Wiring](../images/placeholder-project-weather-wiring.png)

| Component | ESP32 Pin |
|-----------|-----------|
| DHT11 Data | GPIO 15 |
| LCD SDA | GPIO 21 |
| LCD SCL | GPIO 22 |
| LED (through resistor) | GPIO 2 |

## How It Works

```
┌───────────────────┐
│ Read DHT11 sensor  │
│ (temp & humidity)  │
└────────┬───────────┘
         │
┌────────▼───────────┐
│ Display on LCD:     │
│ Line 1: Temp: 25°C  │
│ Line 2: Hum: 60%    │
└────────┬───────────┘
         │
    ┌────▼──────┐
    │ Temp > 30?│──── Yes ──── LED ON (warning)
    └────┬──────┘
         │ No
    LED OFF
```

## Step-by-Step Code

*Coming soon - screenshots of Flowlence Code blocks will be added here.*

## Testing

1. Upload the code to your ESP32
2. The LCD should display current temperature and humidity
3. Breathe on the DHT11 sensor to see humidity increase
4. Values update every 2 seconds

## Extend It

- Add a buzzer alarm for extreme temperatures
- Log data to the Serial Monitor for analysis
- Send data to an IoT dashboard (see [IoT Dashboard project](iot-dashboard.md))
