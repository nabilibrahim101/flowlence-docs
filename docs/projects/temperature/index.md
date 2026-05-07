---
pillar: temperature
---

# Part 5 · Smart Temperature

!!! abstract "What you'll build"
    An automatic climate-control system that reads the air temperature, displays it on an LCD, and turns a fan on when things get too hot. The kind of system that keeps server rooms, greenhouses, and indoor public spaces comfortable without anyone touching a thermostat.

    **Smart-city pillar:** 🌿 **Comfort: Smart Environment & Climate Monitoring**
    **Components:** Temperature & Humidity Sensor (DHT11), DC Motor (Fan), LCD Display
    **Time:** ~2 hours total

## Why a smart city needs this

Cities are getting **hotter**: urban heat-island effects mean a downtown can be 5–10 °C warmer than the suburbs around it. Smart climate-monitoring networks of sensors feed:

- Public alerts during heatwaves
- Automated cooling in transit stations and shelters
- Energy-grid load forecasts (more cooling = more electricity demand)
- Long-term data on neighbourhood-level climate trends

Your project is one tiny node of that climate-monitoring network: read, display, react.

## How the system thinks

```
┌─────────────────────────────────┐
│ Read DHT11 temperature & humidity│
└──────┬──────────────────────────┘
       │
   ┌───▼──────────────────┐
   │ Show on LCD:         │
   │ Line 1: Temp = 24 C  │
   │ Line 2: Hum  = 55%   │
   └──────┬───────────────┘
          │
   ┌──────▼──────────┐
   │ Temp too hot?   │── No ──→ Fan OFF
   └──────┬──────────┘
          │ Yes
          ▼
       Fan ON
```

In IF/THEN logic:

- **IF** temperature is high (above your threshold) → **THEN** turn fan ON
- **IF** temperature is normal → **THEN** turn fan OFF
- **Always:** show live temperature and humidity on the LCD

## What you'll learn (in this Part)

Work through each component lesson, then bring them together in the build:

1. **[Temperature & Humidity (DHT11)](dht11.md)**: your environmental sensor
2. **[DC Motor (Fan)](dc-motor.md)**: cools the space when triggered
3. **[LCD Display](lcd.md)**: shows the live readings
4. **[Build the Smart Temperature System](build.md)**: tie everything together

[Start with the DHT11 :material-arrow-right:](dht11.md){ .md-button .md-button--primary }
