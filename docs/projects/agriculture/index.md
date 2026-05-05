# Part 2 · Smart Agriculture

!!! abstract "What you'll build"
    A self-watering plant system. When the soil gets dry, it checks if there's water in the tank. If both, it turns on a pump to water the plant — automatically. If the water tank runs low, an LED warns you to refill.

    **Smart-city pillar:** 🌿 **Sustainability — Smart Irrigation & Water Management**
    **Components:** White LED, Soil Moisture Probe, Water Level Detector, Water Pump (with Relay)
    **Time:** ~2 hours total (~30 min per component, ~30 min for the build)

## Why a smart city needs this

Cities use **massive amounts of water on landscaping** — parks, medians, roadside trees. Watering on a fixed schedule wastes water (and money) when it just rained, or starves the plants when it's been hot for a week. **Smart irrigation systems** read the actual soil moisture and rain levels and water *only when needed*, often saving 30–50% of the water used by traditional sprinklers.

Your project is a tiny version of the same idea — one plant instead of a park.

## How the system thinks

```
┌──────────────────────────┐
│ Read soil moisture       │
└──────┬───────────────────┘
       │
   ┌───▼───────┐
   │ Soil dry? │── No ──→ Pump OFF, wait, repeat
   └───┬───────┘
       │ Yes
   ┌───▼───────────────────┐
   │ Read water tank level │
   └───┬───────────────────┘
       │
   ┌───▼─────────┐
   │ Tank empty? │── Yes ──→ LED warning ON, Pump OFF
   └───┬─────────┘
       │ No
       ▼
   Pump ON for a few seconds, LED OFF
```

In IF/THEN logic:

- **IF** soil is dry **AND** tank has water → **THEN** turn pump ON
- **IF** soil is wet → **THEN** turn pump OFF
- **IF** water level is low → **THEN** turn warning LED ON

## What you'll learn (in this Part)

Work through each component lesson, then bring them together in the build:

1. **[White LED](led.md)** — your simplest output, used here as the low-water warning indicator
2. **[Soil Moisture Probe](soil-moisture.md)** — measures how wet the soil is
3. **[Water Level Detector](water-level.md)** — measures depth of water in the tank
4. **[Water Pump (with Relay)](water-pump.md)** — moves water from the tank to the soil
5. **[Build the Smart Agriculture System](build.md)** — tie everything together

[Start with the White LED :material-arrow-right:](led.md){ .md-button .md-button--primary }
