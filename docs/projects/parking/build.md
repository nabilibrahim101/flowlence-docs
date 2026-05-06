---
pillar: parking
---

# Build the Smart Parking System

!!! abstract "At a glance"
    **What you'll build:** a single parking-spot prototype — a distance sensor watches for a car, a "spot taken" LED lights up when it's occupied, and a servo gate opens *only* when an authorized RFID card is scanned.

    **Smart-city pillar:** 🚦 Smart Mobility & Traffic Systems

    **Prerequisites:** [Distance Sensor lesson](ultrasonic.md), [Servo Motor lesson](servo.md), [RFID Reader lesson](rfid.md).

    **Time:** about 60 minutes.

---

## Overview

Two independent behaviours running in one program:

1. **Spot detection.** The ultrasonic sensor sits over the parking spot and constantly measures the distance to whatever's beneath it. Empty spot → distance to ground (large). Car parked → distance to car roof (small). The system decides "taken" or "empty" and lights the LED accordingly.
2. **Authorized gate access.** The RFID reader watches for tagged cards. When an *authorized* card taps the reader, the servo opens the gate for 5 seconds, then closes it. Unauthorized cards (or no card) → gate stays closed.

In a real lot, you'd have many spots and many gates — your prototype is one of each.

## Components needed

All from your Brilliant Smart City Kit.

| Component | Quantity |
|-----------|----------|
| ESP32 Plus board | 1 |
| Distance Sensor (Ultrasonic) | 1 |
| Servo Motor | 1 |
| RFID Reader | 1 |
| RFID Card or Fob | 1+ (use the cards/fob from your kit) |
| White LED module | 1 |
| 3-pin Dupont cables | 4–5 |
| USB-C cable | 1 |

## Wiring

Plug each module's 3-pin cable into the matching G/V/S header on your ESP32 Plus shield at the pin numbers below.

![Smart Parking wiring — Ultrasonic, Servo, RFID, and White LED on the ESP32 Plus shield](../../images/placeholder.svg)

| Sensor | ESP32 Plus pin |
|--------|----------------|
| Ultrasonic — TRIG | **IO 12** |
| Ultrasonic — ECHO | **IO 13** |
| Servo Motor | **IO 14** |
| RFID Reader | **I²C header** (SDA / SCL near top of board) |
| White LED | **IO 5** |

!!! warning "Disconnect USB before wiring"
    Always unplug, wire, plug back in. Moving wires while powered can short pins and damage the board.

## Step-by-step code

We'll build this in **three stages**. Test after each stage before moving on — that way if something breaks you'll know exactly which piece caused it.

### Stage 1 · Spot detection (ultrasonic + LED)

This stage proves the basic sense → decide → act loop.

![Stage 1 blocks — Ultrasonic reading lights the White LED when a car is detected](../../images/placeholder.svg)

**The block-by-block:**

| Block | What it does |
|-------|--------------|
| `when Arduino begin` | Program starts |
| `serial 0 begin baudrate 115200` | Open Serial Monitor for debugging |
| `init ultrasonic TRIG IO12 ECHO IO13` | Tell Flowlence the ultrasonic's pins |
| `forever` | Repeat forever |
| `set var distance to (read ultrasonic distance cm)` | Read the sensor |
| `if (distance < 10) then ... else ...` | Decision threshold (10 cm) |
| `set pin 5 to HIGH` (in `then`) | LED on — spot taken |
| `set pin 5 to LOW` (in `else`) | LED off — spot empty |
| `wait 0.2 seconds` | Don't poll too fast |

**Test it:** upload, then move your hand close to and away from the ultrasonic sensor. The LED should follow — close = on, far = off. If it never turns on, lower the threshold; if it stays on, raise it.

!!! tip "Why 10 cm?"
    A real parked car is much closer to a ceiling-mounted sensor than 10 cm — but for your tabletop prototype, you'll be using your hand or a small object as the "car." Tune the threshold to whatever distance feels natural.

### Stage 2 · Add the gate (servo)

Now add the servo motor as a gate. We'll have it default to closed, and we'll prepare a "open then close" routine that future code will trigger.

![Stage 2 blocks — Spot detection plus servo gate that opens for 5 seconds](../../images/placeholder.svg)

**What's new:**

| Block | What it does |
|-------|--------------|
| `init servo on IO14` | Tell Flowlence the servo's pin |
| `set servo IO14 to angle 0` | Default position — gate closed |
| Custom block: `Open the gate` | Sets servo to 90°, waits 5s, returns to 0° |

For now, manually trigger the gate by pressing a button block, or just to test, drop the "Open the gate" call inside the loop temporarily so it cycles.

**Test it:** the gate should swing open, hold for 5 seconds, then swing closed.

### Stage 3 · Authorized access (RFID)

Final stage — the gate only opens for cards we've authorized. You'll need to first read the IDs of your kit's RFID cards so you know which ones to allow.

![Stage 3 blocks — Full system with RFID-authorized gate access](../../images/placeholder.svg)

**Two-step build:**

**A. Find your card IDs.** Add a temporary `serial print` block that prints the ID of any card scanned. Tap each card and fob from your kit, write down the IDs. They look something like `34 A2 4F 9B`.

**B. Authorize specific IDs.** Replace the print block with an `if` that compares the scanned ID to your authorized list. If matches → `Open the gate`. If not → do nothing (or buzz a denied sound).

**Test it:** tap an authorized card → gate opens. Tap an unauthorized card → gate stays closed.

## Testing

Once Stage 3 is uploaded, run through this checklist:

- [ ] Move hand close to ultrasonic → LED turns on
- [ ] Move hand away → LED turns off
- [ ] Tap authorized RFID card → gate opens, holds 5 sec, closes
- [ ] Tap unauthorized RFID card → gate stays closed
- [ ] Both behaviours work simultaneously (LED tracks while RFID is also responsive)

If all five boxes check, **you've built a working smart-city parking node.** 🎉

## Extend it

Pick one and run with it — the BGC judges value extensions over polish.

!!! question "Extension 1 · Multi-spot lot"
    Use the second ultrasonic sensor and another LED to add a second spot. Show *both* statuses on an LCD: "Spot 1: TAKEN  /  Spot 2: FREE."

!!! question "Extension 2 · Audio feedback"
    Add the Active Buzzer. Two-beep tone for a successful unlock, single long buzz for a denied card.

!!! question "Extension 3 · Visitor log"
    Print a Serial Monitor log every time a card is scanned: timestamp, ID, allowed/denied. Real lots store this for security audits.

!!! question "Extension 4 · Gate timeout adapts to car"
    If the ultrasonic detects a car still under the gate after 5 seconds, hold the gate open longer. Real gates do this so cars don't get stuck.

## What's next?

- **More smart-city sensors** → [Smart Safety](../safety/index.md), [Smart Temperature](../temperature/index.md)
- **Add this to a smart-city dashboard** → coming in a future curriculum once Flowlence Cloud is ready
