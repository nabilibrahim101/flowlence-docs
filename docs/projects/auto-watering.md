# Auto Plant Watering System

## Overview

Build an automated plant watering system that monitors soil moisture and activates a water pump when the soil is too dry. The LCD displays the current moisture level and system status.

## Components Needed

- ESP32
- Soil Moisture Sensor
- Relay Module
- Small Water Pump
- LCD Display (I2C)
- Jumper wires

## Wiring Diagram

![Auto Watering Wiring](../images/placeholder-project-watering-wiring.png)

| Component | ESP32 Pin |
|-----------|-----------|
| Soil Moisture Signal | GPIO 35 |
| Relay IN | GPIO 26 |
| LCD SDA | GPIO 21 |
| LCD SCL | GPIO 22 |

## How It Works

```
┌─────────────────────┐
│ Read soil moisture    │
└────────┬─────────────┘
         │
┌────────▼─────────────┐
│ Display moisture      │
│ level on LCD          │
└────────┬─────────────┘
         │
    ┌────▼──────┐
    │ Soil dry? │──── Yes ──── Turn ON pump (relay)
    └────┬──────┘              Wait 3 seconds
         │ No                  Turn OFF pump
         │
    Pump stays OFF
    Wait 10 seconds, repeat
```

## Step-by-Step Code

*Coming soon - screenshots of Flowlence Code blocks will be added here.*

## Testing

1. Upload the code to your ESP32
2. Insert the soil moisture sensor into dry soil
3. The LCD should show a high value and the pump should activate
4. Add water to the soil - the value drops and the pump stops

## Extend It

- Add an LED indicator (green = moist, red = dry)
- Set different moisture thresholds for different plants
- Send moisture data to an IoT dashboard
