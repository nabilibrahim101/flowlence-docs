---
pillar: safety
---

# Fire Detector

!!! abstract "At a glance"
    **Category:** Public Safety & Emergency Systems
    **In your kit:** ×1
    **Status:** 🚧 Full tutorial coming soon

## What it is

An infrared flame-detector module. It has a photodiode tuned to the infrared wavelengths produced by an open flame (around 760–1100 nm). When it sees a flame within about 20–80 cm, its digital output goes LOW.

![Fire Detector module](../../images/placeholder.svg)

!!! danger "Use a safe flame source"
    For testing, use a **small candle or long lighter** held well away from the sensor and any flammable materials. Never use this with a petrol lighter near the ESP32, and always have an adult supervising. This is a learning sensor, not a certified fire-safety device.

## What you'll build with it

- Fire alarm (pairs naturally with the [Active Buzzer](active-buzzer.md) and an LED)
- Candle-monitored dinner timer
- Smart fireplace cutoff (pairs with the Relay to close a fuel valve in a simulation)

This sensor is a good alternative to the PIR-based alarm projects you'll see elsewhere, as it triggers on a specific real threat rather than any motion.

## Before this page is filled in

See the [DHT11 tutorial](../temperature/dht11.md) for the pattern every sensor page follows once complete.
