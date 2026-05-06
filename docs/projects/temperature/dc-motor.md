---
pillar: temperature
---

# DC Motor

!!! abstract "At a glance"
    **Category:** Smart Environment & Climate Monitoring
    **In your kit:** ×1
    **Status:** 🚧 Full tutorial coming soon

## What it is

A small brushed DC motor mounted on a driver module. Your ESP32 can turn it on, turn it off, and vary its speed using PWM. Unlike the servo (which rotates to a specific angle), the DC motor just spins continuously.

![DC Motor module](../../images/placeholder.svg)

## DC Motor vs Servo Motor

| | DC Motor | [Servo Motor](../parking/servo.md) |
|-|----------|-------------------------|
| Motion | Continuous spin | Rotate to specific angle (0°–180°) |
| Speed control | Yes (via PWM) | Indirect (by changing angle over time) |
| Typical use | Fans, pumps, wheels | Robotic arm, gates, dials |

## What you'll build with it

- Cooling fan for a smart climate project (pairs with DHT11 — turn on when it's hot)
- Wind turbine animation (pairs with the Solar Panel)
- Simple motorised vehicle

## Before this page is filled in

See the [DHT11 tutorial](dht11.md) for the pattern every sensor page follows once complete.
