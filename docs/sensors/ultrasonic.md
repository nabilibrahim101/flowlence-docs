# Ultrasonic Sensor (HC-SR04)

## What Is It?

An ultrasonic sensor measures distance by sending out a sound wave and timing how long it takes to bounce back. It works like a bat's echolocation. The HC-SR04 can measure distances from 2 cm to 400 cm.

## How It Works

1. The sensor sends a burst of ultrasonic sound (40 kHz, inaudible to humans)
2. The sound bounces off an object and returns
3. The sensor measures the time it took for the echo to return
4. Distance is calculated from the time

## Specifications

| Property | Value |
|----------|-------|
| Measuring Range | 2 cm - 400 cm |
| Accuracy | ~3 mm |
| Operating Voltage | 5V |
| Pins | VCC, Trig, Echo, GND |

## Pin Layout

| Sensor Pin | ESP32 Pin |
|------------|-----------|
| VCC | 5V |
| Trig | GPIO 12 |
| Echo | GPIO 14 |
| GND | GND |

## Wiring Diagram

![Ultrasonic Wiring Diagram](../images/placeholder-ultrasonic-wiring.png)

## Code

![Ultrasonic Code](../images/placeholder-ultrasonic-code.png)

**How it works:**

| Block | What It Does |
|-------|-------------|
| `read ultrasonic trig 12 echo 14` | Reads distance in centimeters |
| `serial print` | Displays the distance in the Serial Monitor |

## Expected Result

Open the Serial Monitor to see distance readings updating in real-time. Move your hand closer to or farther from the sensor to see the values change.

## Try It!

!!! question "Challenge"
    Create a parking sensor: when an object is closer than 20 cm, turn on a buzzer. The closer the object, the faster the buzzer beeps.
