# Temperature & Humidity Sensor (DHT11)

## What Is It?

The DHT11 sensor measures both temperature and humidity in the air. It's commonly used in weather stations, smart homes, and greenhouses.

## How It Works

The DHT11 contains a humidity-sensing component and a temperature-sensing component. It sends data digitally through a single data pin, providing both readings in one connection.

## Specifications

| Property | Value |
|----------|-------|
| Temperature Range | 0 - 50 °C (±2°C accuracy) |
| Humidity Range | 20 - 80% RH (±5% accuracy) |
| Operating Voltage | 3.3V - 5V |
| Pins | VCC, Data, GND |

## Pin Layout

| Sensor Pin | ESP32 Pin |
|------------|-----------|
| VCC | 3.3V |
| Data | GPIO 15 |
| GND | GND |

## Wiring Diagram

![DHT11 Wiring Diagram](../images/placeholder-dht11-wiring.png)

## Code

![DHT11 Code](../images/placeholder-dht11-code.png)

**How it works:**

| Block | What It Does |
|-------|-------------|
| `read DHT11 pin 15 temperature` | Reads temperature in Celsius |
| `read DHT11 pin 15 humidity` | Reads humidity percentage |
| `serial print` | Displays values in the Serial Monitor |

## Expected Result

The Serial Monitor shows temperature and humidity readings, updating every 2 seconds. Try breathing on the sensor to see the humidity spike.

## Try It!

!!! question "Challenge"
    Create a temperature alert: if the temperature goes above 30°C, turn on an LED and buzzer.
