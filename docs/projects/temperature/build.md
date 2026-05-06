---
pillar: temperature
---

# Weather Station

!!! abstract "At a glance"
    **What you'll build:** a small weather station that measures the temperature and humidity of the room, shows the readings on an LCD display, and flashes an LED when the temperature gets too high.

    **Smart-city pillar:** 🌿 Smart Environment & Climate Monitoring — in a real city, hundreds of these sensors feed data into air-quality monitoring and climate-adaptation systems.

    **Prerequisites:** [DHT11 lesson](dht11.md), [LCD lesson](lcd.md), [White LED lesson](../agriculture/led.md).

    **Time:** about 45 minutes.

---

## Overview

Modern cities operate **networks of environmental sensors** — on streetlight poles, on buildings, in parks. The data they collect shapes decisions about traffic (ozone alerts), public health (heatwave warnings), and infrastructure design (which neighbourhoods need more shade trees).

In this project you'll build a single node of that network. Your weather station:

1. Reads air temperature and humidity from a DHT11 sensor
2. Shows the current readings on a 1602 LCD display
3. Lights an LED as a high-temperature warning when it exceeds 28 °C

Once this is working, **Part 4** will show you how to send those same readings to Flowlence Cloud so an entire classroom's worth of weather stations can be compared on one dashboard.

## Components needed

Everything on this list is in your Brilliant Smart City Kit — no breadboard or extra wires needed.

| Component | Quantity | From your kit |
|-----------|----------|---------------|
| ESP32 Plus board | 1 | ✅ |
| DHT11 Temperature & Humidity Sensor | 1 | ✅ |
| 1602 LCD Display (I²C) | 1 | ✅ |
| White LED module | 1 | ✅ |
| 3-pin Dupont cables | 3 | ✅ |
| USB-C cable | 1 | ✅ |

## How it works

```
┌─────────────────────┐        ┌──────────────────────┐
│  DHT11 reads         │───────►│ ESP32 brain          │
│  temp & humidity     │        │  - decide what to do │
│  every 2 seconds     │        │  - format display    │
└─────────────────────┘        └─┬─────────────┬──────┘
                                  │             │
                          ┌───────▼─┐      ┌────▼──────┐
                          │ 1602 LCD │      │ LED       │
                          │ shows:   │      │ ON if     │
                          │ Temp: X  │      │ temp > 28 │
                          │ Hum:  Y  │      │ OFF else  │
                          └──────────┘      └───────────┘
```

## Wiring

Three 3-pin Dupont cables, three sensor modules, three plug-in connections. That's it.

![Weather Station — DHT11, LCD, and LED plugged into the ESP32 Plus shield](../../images/placeholder.svg)

| Sensor | ESP32 Plus pin |
|--------|----------------|
| DHT11 Temperature & Humidity | **IO 15** |
| 1602 LCD Display (I²C) | **SDA / SCL** header (top of board) |
| White LED module | **IO 5** |

**Step by step:**

<ol class="flowlence-steps" markdown>
<li markdown>Unplug the USB cable from your ESP32 Plus.</li>
<li markdown>Plug a 3-pin cable between the DHT11 module and pin **IO 15** (match S / V / G at both ends).</li>
<li markdown>Plug a 4-pin I²C cable between the LCD module and the dedicated **I²C header** on the ESP32 Plus (labelled `GND V SDA SCL` near the top of the board).</li>
<li markdown>Plug a 3-pin cable between the White LED module and pin **IO 5**.</li>
<li markdown>Plug the USB cable back in.</li>
</ol>

!!! warning "Disconnect USB before wiring"
    You know the drill by now — unplug, wire, plug back in.

## Step-by-step code

Rather than writing the whole program in one go, build it in **three stages** and test after each. This is how real engineers work — it isolates bugs quickly.

### Stage 1 · Read and print the DHT11

This is exactly the program from the [DHT11 lesson](dht11.md). We start here to confirm the sensor is wired correctly before adding the LCD and LED.

![Stage 1 blocks — DHT11 only, print to serial](../../images/placeholder.svg)

**Test it:** upload, open Serial Monitor, confirm you see temperature and humidity numbers that move when you breathe on the sensor.

!!! tip "Stuck? Don't move on."
    If the Serial Monitor shows `nan` or `0.00`, your DHT11 isn't talking. Recheck wiring against the table above before adding more components.

### Stage 2 · Show the readings on the LCD

Now replace the *serial print* blocks with LCD blocks. Your program is still just reading and displaying — no logic yet.

![Stage 2 blocks — same readings, now sent to LCD](../../images/placeholder.svg)

**What's new:**

| Block | What it does |
|-------|--------------|
| `init lcd I2C address 0x27` | Tells Flowlence to use the 1602 LCD at its default I²C address |
| `lcd set cursor column 0 row 0` | Moves the "write head" to the top-left of the display |
| `lcd print "Temp: "` | Prints text |
| `lcd print (read dht_1 temperature)` | Prints the temperature value after the "Temp: " label |

**Test it:** upload, watch the LCD. It should update every 2 seconds.

!!! info "LCD shows garbled characters or nothing at all?"
    The I²C address might not be `0x27`. Try `0x3F` instead — those are the two common defaults. If neither works, see [Troubleshooting](../../reference/troubleshooting.md).

### Stage 3 · Add the temperature alert

Now we add **decision logic** — the ESP32 has to *think* about the reading and do something different based on it.

![Stage 3 blocks — full program with if/else for LED](../../images/placeholder.svg)

**What's new:**

| Block | What it does |
|-------|--------------|
| `if (temp > 28) then … else …` | Checks the condition every time through the loop |
| `set pin 5 to HIGH` | Turns White LED on when hot |
| `set pin 5 to LOW` | Turns White LED off otherwise |

## Testing

Once you upload Stage 3, run through this checklist:

- [ ] LCD line 1 shows temperature updating every 2 seconds
- [ ] LCD line 2 shows humidity updating every 2 seconds
- [ ] Breathing on the DHT11 makes the humidity number jump up
- [ ] Warming the DHT11 (cup your hand around it) eventually makes the LED turn on
- [ ] When the sensor cools down, the LED turns off

If all five boxes check, **you've built a working smart-city environment node.** 🎉

## Extend it

Pick one of these and make it yours — this kind of creativity is exactly what the BGC judges look for.

!!! question "Extension 1 · Multi-threshold warning"
    Add a **buzzer**. Design a three-tier alert:

    - < 25 °C: LED off, buzzer silent
    - 25–30 °C: LED on steady
    - > 30 °C: LED flashing + buzzer beeping

!!! question "Extension 2 · Humidity tracking"
    Warn when humidity drops below 30 % (too dry — uncomfortable for people) or rises above 70 % (too humid — risk of mould). Use the LCD second line to display the warning text.

!!! question "Extension 3 · Historical max/min"
    Create two variables, `max_temp` and `min_temp`, that remember the highest and lowest temperatures seen since the program started. Show them on an extra screen that appears every 10 seconds.

!!! question "Extension 4 · Cloud dashboard (Advanced)"
    When Part 4 is ready, connect this weather station to Flowlence Cloud. Your teacher can then see every student's weather station on one classroom dashboard. This is the real smart-city workflow.

## What's next?

- **More smart-city projects** → [Smart Agriculture](../agriculture/index.md), [Smart Parking](../parking/index.md), [Smart Safety](../safety/index.md)
