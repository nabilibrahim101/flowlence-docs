# Alarm System

!!! warning "This project was redesigned to match your kit"
    The original design used a PIR motion sensor, which is **not** in the Flowlence IoT Kit. This project now uses the **Fire Detector** as the trigger — a more directly smart-city-relevant safety sensor. The full step-by-step content is still being rewritten; the overview and components below match the new design.

## Overview

Build a fire-alarm safety system. When the Fire Detector sees an open flame, the Active Buzzer sounds and the White LED flashes. A Push Button lets you arm/disarm the system. This is the basis of real building-safety systems used in homes, schools, and offices.

**Smart-city pillar:** 🚨 Public Safety & Emergency Systems — in a real city, these alarms feed into emergency-response dispatch and building-management systems.

## Components needed

All components are in your Flowlence IoT Kit.

| Component | Quantity | From your kit |
|-----------|----------|---------------|
| ESP32 Plus board | 1 | ✅ |
| Fire Detector | 1 | ✅ |
| Active Buzzer | 1 | ✅ |
| White LED module | 1 | ✅ |
| Push Button | 1 | ✅ |
| 3-pin Dupont cables | 4 | ✅ |
| USB-C cable | 1 | ✅ |

## Wiring

![Alarm System — Fire Detector, Buzzer, LED, and Button plugged into the ESP32 Plus shield](../../images/placeholder.svg)

| Sensor | ESP32 Plus pin |
|--------|----------------|
| Fire Detector | **IO 32** |
| Active Buzzer | **IO 26** |
| White LED module | **IO 5** |
| Push Button | **IO 4** |

Plug each module's 3-pin cable into the matching G/V/S header at the pin numbers above.

## How it works

```
┌──────────────────┐
│ Read Fire Detector│
└────────┬──────────┘
         │
    ┌────▼─────────┐
    │ Flame        │──── Yes ──── Sound Active Buzzer
    │ detected?    │              + Flash White LED
    └────┬─────────┘              until button pressed
         │ No
         │
    Everything OFF, keep watching
```

A Push Button lets the user silence and re-arm the alarm once the flame is gone.

## Step-by-step code

*Coming soon — this section will be rewritten using the [Weather Station project](../temperature/build.md) as the template (three incremental stages, block screenshots per stage).*

## Testing

!!! danger "Test safely"
    Use a **small candle or long lighter held well away from the ESP32 and any flammable materials**. Have an adult supervise. Never test with a fuel source larger than a single candle flame. See [Fire Detector safety notes](fire-detector.md).

1. Upload the code.
2. Hold a small lit candle about 20 cm in front of the Fire Detector's round sensor.
3. The Active Buzzer should beep and the White LED should flash immediately.
4. Remove the flame and press the Push Button to re-arm.

## Extend it

Pick one of these and make it yours — this kind of creativity is exactly what BGC judges look for.

!!! question "Extension 1 · Multi-stage alarm"
    Add the **Gas Leak Sensor**. Have the alarm react *differently* to smoke vs gas leak vs fire — for example, a slow beep for gas, a fast beep for fire, both lights on for either.

!!! question "Extension 2 · Visitor logging"
    Add the **RFID Reader**. When the alarm triggers, log which user-card was last used to disarm the system — a real security-audit feature.

!!! question "Extension 3 · Cloud alerts"
    When Part 4 is ready, have the alarm send a notification to Flowlence Cloud so a building manager is paged immediately on any fire event.

## What's next?

- **More smart-city projects** → [Smart Temperature](../temperature/index.md), [Smart Agriculture](../agriculture/index.md), [Smart Parking](../parking/index.md)
