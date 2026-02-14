# Soil Moisture Sensor

## What Is It?

A soil moisture sensor measures the water content in soil. It outputs an analog value that corresponds to the moisture level. It's used in automated irrigation systems, smart gardens, and agriculture.

## Specifications

| Property | Value |
|----------|-------|
| Type | Analog sensor |
| Output Range | 0 - 4095 (ESP32 ADC) |
| Operating Voltage | 3.3V - 5V |

## Pin Layout

| Sensor Pin | ESP32 Pin |
|------------|-----------|
| Signal | GPIO 35 |
| VCC | 3.3V |
| GND | GND |

## Wiring Diagram

![Soil Moisture Wiring Diagram](../images/placeholder-soil-wiring.png)

## Code

![Soil Moisture Code](../images/placeholder-soil-code.png)

## Expected Result

Insert the sensor into soil. Dry soil gives a high value, wet soil gives a low value. The Serial Monitor shows the readings in real-time.

## Try It!

!!! question "Challenge"
    Create a plant monitoring system: display "Dry - Water needed!" on the Serial Monitor when soil moisture drops below a threshold, and "Moist - All good!" when it's adequate.
