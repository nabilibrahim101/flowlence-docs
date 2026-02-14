# Light Sensor (LDR)

## What Is It?

An LDR (Light Dependent Resistor), also called a photoresistor, detects light levels. Its resistance decreases when light shines on it and increases in darkness. It's used in automatic streetlights, daylight sensors, and light-following robots.

## Specifications

| Property | Value |
|----------|-------|
| Type | Analog sensor |
| Output Range | 0 - 4095 (ESP32 ADC) |
| Operating Voltage | 3.3V |

## Pin Layout

| Sensor Pin | ESP32 Pin |
|------------|-----------|
| Signal | GPIO 34 |
| VCC | 3.3V |
| GND | GND |

## Wiring Diagram

![LDR Wiring Diagram](../images/placeholder-ldr-wiring.png)

## Code

![LDR Code](../images/placeholder-ldr-code.png)

**How it works:**

| Block | What It Does |
|-------|-------------|
| `read analog pin 34` | Reads light level (0 = dark, 4095 = bright) |
| `serial print` | Displays the value in Serial Monitor |

## Expected Result

The Serial Monitor shows a number between 0 and 4095. Cover the sensor to see the value drop. Shine a light on it to see the value increase.

## Try It!

!!! question "Challenge"
    Build an automatic night light: when the light level drops below a threshold, turn on an LED automatically.
