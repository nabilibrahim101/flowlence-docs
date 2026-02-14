# Buzzer

## What Is It?

A buzzer is a small device that produces sound. There are two types: **active buzzers** (make a fixed tone when powered) and **passive buzzers** (can play different tones and melodies). Your kit includes a passive buzzer, which gives you more control.

## How It Works

A passive buzzer vibrates at the frequency of the signal it receives. By changing the frequency, you can produce different musical notes. Higher frequency = higher pitch.

## Specifications

| Property | Value |
|----------|-------|
| Type | Passive buzzer |
| Operating Voltage | 3.3V - 5V |
| Pin Type | Digital/PWM Output |
| Frequency Range | 20Hz - 20kHz |

## Pin Layout

| Buzzer Pin | ESP32 Pin |
|------------|-----------|
| + (Signal) | GPIO 5 |
| - (Ground) | GND |

## Wiring Diagram

![Buzzer Wiring Diagram](../images/placeholder-buzzer-wiring.png)

1. Connect the **+** pin of the buzzer to **GPIO 5**
2. Connect the **-** pin to **GND**

## Code

### Play a Tone

![Buzzer Tone Code](../images/placeholder-buzzer-code.png)

**How it works:**

| Block | What It Does |
|-------|-------------|
| `set buzzer pin 5 tone 262` | Plays middle C (262 Hz) |
| `wait 0.5 seconds` | Hold the note for half a second |
| `set buzzer pin 5 off` | Stops the sound |

### Play a Simple Melody

You can play different notes in sequence to create a melody. Common frequencies:

| Note | Frequency (Hz) |
|------|----------------|
| C | 262 |
| D | 294 |
| E | 330 |
| F | 349 |
| G | 392 |
| A | 440 |
| B | 494 |

## Expected Result

You should hear tones playing from the buzzer. If playing a melody, you'll hear a sequence of different notes.

## Try It!

!!! question "Challenge"
    Program the buzzer to play a simple melody of your choice. Try "Twinkle Twinkle Little Star" (C C G G A A G).
