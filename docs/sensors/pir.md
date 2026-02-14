# PIR Motion Sensor

## What Is It?

A PIR (Passive Infrared) sensor detects motion by sensing changes in infrared radiation. When a person or animal moves in front of the sensor, it outputs a HIGH signal. It's used in security systems, automatic lights, and occupancy detection.

## Specifications

| Property | Value |
|----------|-------|
| Detection Range | Up to 7 meters |
| Detection Angle | ~120 degrees |
| Output | Digital (HIGH when motion detected) |
| Operating Voltage | 3.3V - 5V |

## Pin Layout

| Sensor Pin | ESP32 Pin |
|------------|-----------|
| VCC | 5V |
| Signal | GPIO 27 |
| GND | GND |

## Wiring Diagram

![PIR Wiring Diagram](../images/placeholder-pir-wiring.png)

!!! info
    After powering on, the PIR sensor needs about 30-60 seconds to stabilize. Motion detection during this time may be unreliable.

## Code

![PIR Code](../images/placeholder-pir-code.png)

## Expected Result

When you walk in front of the sensor, the Serial Monitor prints "Motion detected!" and the LED turns on. After a few seconds of no motion, the LED turns off.

## Try It!

!!! question "Challenge"
    Build a simple security alarm: when motion is detected, sound a buzzer for 3 seconds and blink an LED.
