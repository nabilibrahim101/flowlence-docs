# Servo Motor

## What Is It?

A servo motor is a motor that can rotate to a specific angle (0 to 180 degrees). Unlike regular motors that just spin, servos let you control the exact position. They're used in robotic arms, doors, gates, and steering mechanisms.

## How It Works

A servo has 3 wires: power (red), ground (brown/black), and signal (orange/yellow). The ESP32 sends a PWM signal to tell the servo what angle to move to.

## Specifications

| Property | Value |
|----------|-------|
| Rotation Range | 0 - 180 degrees |
| Operating Voltage | 4.8V - 6V |
| Signal Type | PWM |
| Wires | Red (VCC), Brown (GND), Orange (Signal) |

## Pin Layout

| Servo Wire | ESP32 Pin |
|------------|-----------|
| Orange (Signal) | GPIO 13 |
| Red (VCC) | 5V |
| Brown (GND) | GND |

## Wiring Diagram

![Servo Wiring Diagram](../images/placeholder-servo-wiring.png)

!!! warning
    Servos draw more current than most sensors. If using multiple servos, consider an external power supply.

## Code

![Servo Code](../images/placeholder-servo-code.png)

**How it works:**

| Block | What It Does |
|-------|-------------|
| `set servo pin 13 angle 0` | Moves servo to 0 degrees |
| `wait 1 seconds` | Waits 1 second |
| `set servo pin 13 angle 90` | Moves servo to 90 degrees (middle) |
| `wait 1 seconds` | Waits 1 second |
| `set servo pin 13 angle 180` | Moves servo to 180 degrees (full rotation) |

## Expected Result

The servo should rotate to 0, then 90, then 180 degrees with 1-second pauses between each position.

## Try It!

!!! question "Challenge"
    Create a program that slowly sweeps the servo from 0 to 180 degrees and back, like a radar. Use a variable that increases by 1 each loop.
