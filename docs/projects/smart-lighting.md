# Smart Lighting System

## Overview

Build an automatic lighting system that turns on when it gets dark and can also be manually controlled with a button. This is how real streetlights and smart home lights work.

## Components Needed

- ESP32
- LED
- LDR (Light sensor)
- Push button
- 220 ohm resistor
- Jumper wires

## Wiring Diagram

![Smart Lighting Wiring](../images/placeholder-project-lighting-wiring.png)

| Component | ESP32 Pin |
|-----------|-----------|
| LED (through resistor) | GPIO 2 |
| LDR Signal | GPIO 34 |
| Button | GPIO 4 |

## How It Works

```
┌─────────────────┐
│  Read light      │
│  sensor (LDR)    │
└────────┬─────────┘
         │
    ┌────▼────┐
    │ Is it   │──── Yes ──── Turn LED ON
    │ dark?   │
    └────┬────┘
         │ No
    ┌────▼─────┐
    │ Button   │──── Yes ──── Toggle LED
    │ pressed? │
    └────┬─────┘
         │ No
         │
    LED stays OFF
```

## Step-by-Step Code

### Step 1: Setup

![Step 1 Code](../images/placeholder-project-lighting-code-1.png)

Set up pin modes for the LED (output), LDR (analog input), and button (input with pull-up).

### Step 2: Read the Light Level

![Step 2 Code](../images/placeholder-project-lighting-code-2.png)

Read the analog value from the LDR. If the value is below 1000 (dark), turn the LED on automatically.

### Step 3: Add Button Control

![Step 3 Code](../images/placeholder-project-lighting-code-3.png)

Add a button check so the user can manually override the automatic lighting.

## Testing

1. Upload the code to your ESP32
2. Cover the LDR with your hand - the LED should turn on
3. Uncover the LDR - the LED should turn off
4. Press the button - the LED should toggle regardless of light level

## Extend It

- Add a second LED for brighter lighting
- Use PWM to adjust LED brightness based on how dark it is
- Add a buzzer that beeps when switching modes
