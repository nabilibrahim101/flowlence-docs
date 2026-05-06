---
pillar: parking
---

# RFID Reader

!!! abstract "At a glance"
    **Category:** Smart Mobility & Traffic Systems
    **In your kit:** 1 × Reader, 2 × Cards, 1 × Fob (tag)
    **Status:** 🚧 Full tutorial coming soon

## What it is

An RFID (Radio-Frequency Identification) reader uses a small radio coil to read the unique ID stored in a passive card or key-fob. The reader tells your ESP32 *which* card was tapped — you can then allow or deny access, log the event, or trigger a gate.

![RFID Reader with card and fob](../../images/placeholder.svg)

## What you'll build with it

- Smart parking-garage entry (tap to open, log which car ID entered)
- Student ID check-in for a classroom
- Automatic transit-style gate

## Cards vs fobs

The two cards and one fob in your kit each have their own unique ID. You'll learn to read the ID, store a list of "allowed" IDs in your program, and open the gate only for those.

## Before this page is filled in

See the [DHT11 tutorial](../temperature/dht11.md) for the pattern every sensor page follows once complete.
