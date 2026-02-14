# Alarm System

## Overview

Build a motion-activated alarm system using a PIR sensor, buzzer, and LED. When motion is detected, the alarm sounds and the LED flashes. This is the basis of real home security systems.

## Components Needed

- ESP32
- PIR Motion Sensor
- Buzzer
- LED
- 220 ohm resistor
- Jumper wires

## Wiring Diagram

![Alarm System Wiring](../images/placeholder-project-alarm-wiring.png)

| Component | ESP32 Pin |
|-----------|-----------|
| PIR Signal | GPIO 27 |
| Buzzer + | GPIO 5 |
| LED (through resistor) | GPIO 2 |

## How It Works

```
┌──────────────────┐
│  Read PIR sensor  │
└────────┬──────────┘
         │
    ┌────▼─────┐
    │ Motion   │──── Yes ──── Sound buzzer + Flash LED
    │ detected?│              for 5 seconds
    └────┬─────┘
         │ No
         │
    Everything OFF, keep watching
```

## Step-by-Step Code

*Coming soon - screenshots of Flowlence Code blocks will be added here.*

## Testing

1. Upload the code and wait 30-60 seconds for the PIR to stabilize
2. Walk in front of the PIR sensor
3. The buzzer should sound and the LED should flash
4. After 5 seconds of no motion, the alarm should stop

## Extend It

- Add a button to arm/disarm the alarm
- Display "ALERT!" on an LCD when motion is detected
- Add a count of how many times motion was detected
