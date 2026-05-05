# Part 4 · Smart Safety

!!! abstract "What you'll build"
    A safety system that detects two kinds of hazards — gas leaks and fire (smoke) — and immediately triggers an audible alarm. The kind of always-watching system that protects homes, schools, kitchens, and commercial buildings.

    **Smart-city pillar:** 🚨 **Protection — Public Safety & Emergency Systems**
    **Components:** Fire Detector, Gas Leak Sensor, Active Buzzer
    **Time:** ~2 hours total

!!! info "About the workshop's 'Smoke Sensor'"
    The workshop coach guide refers to a "Smoke Sensor." In your kit, this is the **Fire Detector** module — it senses the infrared light that flames produce, which is what real smoke alarms ultimately respond to. We use it the same way the workshop intends.

## Why a smart city needs this

Fire alarms have saved millions of lives, but they're traditionally **standalone** — one alarm, one room, screaming when triggered, hoping someone hears. Smart-city public safety systems network these sensors so a single trigger anywhere can:

- Notify the building's occupants and the fire department simultaneously
- Cut gas supply at the source automatically
- Light up evacuation routes
- Show first responders exactly where the fire started before they arrive

Your project is one node of that network — sense → decide → alarm.

## How the system thinks

```
┌─────────────────────────┐    ┌─────────────────────────┐
│ Read Fire Detector       │    │ Read Gas Leak Sensor    │
└──────┬──────────────────┘    └──────┬──────────────────┘
       │                                │
   ┌───▼─────────────┐         ┌────────▼────────────┐
   │ Flame detected? │── Yes ──┤                     │
   └───┬─────────────┘         │   Buzzer ON         │
       │ No                    │   (alarm sounds)    │
                               │                     │
   ┌────────────────┐          │                     │
   │ Gas detected?  │── Yes ───┤                     │
   └───┬────────────┘          └─────────────────────┘
       │ No
       ▼
   System silent, keeps watching
```

In IF/THEN logic:

- **IF** flame is detected → **THEN** buzzer ON (alarm)
- **IF** gas is detected → **THEN** buzzer ON (alarm)
- **IF** neither → **THEN** buzzer OFF (silent monitoring)

## What you'll learn (in this Part)

Work through each component lesson, then bring them together in the build:

1. **[Fire Detector](fire-detector.md)** — senses the infrared signature of an open flame
2. **[Gas Leak Sensor](gas-leak.md)** — senses combustible gases like LPG or smoke vapour
3. **[Active Buzzer](active-buzzer.md)** — makes the loud alarm sound when triggered
4. **[Build the Smart Safety System](build.md)** — tie everything together

[Start with the Fire Detector :material-arrow-right:](fire-detector.md){ .md-button .md-button--primary }
