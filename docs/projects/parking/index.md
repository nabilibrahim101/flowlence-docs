---
pillar: parking
---

# Part 3 · Smart Parking

!!! abstract "What you'll build"
    A smart parking spot that detects when a car is parked, lights up an indicator so others know the spot is taken, and opens a gate only when an authorized RFID card is scanned.

    **Smart-city pillar:** 🚦 **Mobility — Smart Mobility & Traffic Systems**
    **Components:** Distance Sensor (Ultrasonic), Servo Motor, RFID Reader (+ cards/fob)
    **Time:** ~2 hours total

## Why a smart city needs this

Drivers spend an estimated **30% of urban driving time circling for parking**. That's congestion, fuel waste, and emissions caused entirely by *not knowing* where the spots are. Smart parking systems use sensors per spot to feed real-time availability into apps and signage, so drivers head straight to a free spot. Modern smart-city deployments combine this with **automated gate access** for residential or paid lots — the gate reads a tag in your car, lifts the barrier, no ticket needed.

Your project is a single-spot prototype of that whole flow.

## How the system thinks

```
┌──────────────────────────────┐
│ Read distance to ground/car  │
└──────┬───────────────────────┘
       │
   ┌───▼─────────────┐
   │ Object close?   │── No ──→ LED OFF (spot empty)
   └───┬─────────────┘
       │ Yes
       ▼
   LED ON (spot taken)

──────────────────────────────────

┌──────────────────────────────┐
│ Read RFID card (when tapped) │
└──────┬───────────────────────┘
       │
   ┌───▼─────────────────┐
   │ Card authorized?    │── No ──→ Gate stays closed
   └───┬─────────────────┘
       │ Yes
       ▼
   Servo opens gate, wait 5 sec, gate closes
```

In IF/THEN logic:

- **IF** car detected → **THEN** "spot taken" LED ON
- **IF** no car detected → **THEN** LED OFF
- **IF** authorized card scanned → **THEN** open gate
- **IF** unauthorized or no card → **THEN** gate stays closed

## What you'll learn (in this Part)

Work through each component lesson, then bring them together in the build:

1. **[Distance Sensor (Ultrasonic)](ultrasonic.md)** — measures distance using sound waves
2. **[Servo Motor](servo.md)** — rotates to a specific angle (the gate)
3. **[RFID Reader](rfid.md)** — reads card and fob IDs over radio
4. **[Build the Smart Parking System](build.md)** — tie everything together

[Start with the Distance Sensor :material-arrow-right:](ultrasonic.md){ .md-button .md-button--primary }
