# Water Level Sensor

## What Is It?

A water level sensor detects the depth of water by measuring conductivity between exposed traces on the board. The more traces are submerged, the higher the reading. It's used in flood detection, water tanks, and aquariums.

## Specifications

| Property | Value |
|----------|-------|
| Type | Analog sensor |
| Output Range | 0 - 4095 (ESP32 ADC) |
| Operating Voltage | 3.3V - 5V |
| Detection Depth | Up to 4 cm |

## Pin Layout

| Sensor Pin | ESP32 Pin |
|------------|-----------|
| Signal | GPIO 36 |
| VCC | 3.3V |
| GND | GND |

## Wiring Diagram

![Water Level Wiring Diagram](../images/placeholder-water-wiring.png)

## Code

![Water Level Code](../images/placeholder-water-code.png)

## Expected Result

Dip the sensor into water gradually. The Serial Monitor shows increasing values as more of the sensor is submerged.

## Try It!

!!! question "Challenge"
    Create a water level alarm: when the water level exceeds a threshold, sound a buzzer to warn of flooding.
