# LED (Light Emitting Diode)

## What Is It?

An LED (Light Emitting Diode) is a small light that turns on when electricity flows through it. LEDs are found everywhere - in traffic lights, phone screens, and decorations. In this tutorial, you'll learn how to control an LED with your ESP32.

![LED Component](../images/placeholder-led-photo.png)

## How It Works

An LED has two legs:

- **Long leg (Anode / +)** - connects to the signal pin
- **Short leg (Cathode / -)** - connects to ground (GND)

When the ESP32 sends a HIGH signal to the pin, current flows through the LED and it lights up. When it sends LOW, the LED turns off.

!!! info "Why do we need a resistor?"
    A resistor (220 ohm) is placed in series with the LED to limit the current. Without it, too much current flows and the LED can burn out.

## Specifications

| Property | Value |
|----------|-------|
| Operating Voltage | 2V - 3.3V |
| Recommended Resistor | 220 ohm |
| Pin Type | Digital Output |

## Pin Layout

| LED Pin | ESP32 Pin |
|---------|-----------|
| Anode (+) through 220 ohm resistor | GPIO 2 |
| Cathode (-) | GND |

## Wiring Diagram

![LED Wiring Diagram](../images/placeholder-led-wiring.png)

1. Connect the **long leg** of the LED to a **220 ohm resistor**
2. Connect the other end of the resistor to **GPIO 2** on the ESP32
3. Connect the **short leg** of the LED to **GND** on the ESP32

## Code

### Basic: Turn LED On and Off

Drag these blocks into your workspace:

![LED On/Off Code](../images/placeholder-led-code-1.png)

**How it works:**

| Block | What It Does |
|-------|-------------|
| `when Arduino begin` | Program starts here |
| `forever` | Repeats the blocks inside |
| `set pin 2 to HIGH` | Sends power to GPIO 2, turning the LED **on** |
| `wait 1 seconds` | Pauses for 1 second |
| `set pin 2 to LOW` | Stops power to GPIO 2, turning the LED **off** |
| `wait 1 seconds` | Pauses for 1 second |

### Advanced: LED Brightness Control (PWM)

You can also control the **brightness** of the LED using PWM (Pulse Width Modulation). Instead of just ON or OFF, PWM rapidly switches the pin on and off to simulate different brightness levels.

![LED PWM Code](../images/placeholder-led-code-2.png)

**How it works:**

| Block | What It Does |
|-------|-------------|
| `set pwm pin 2 to 0` | LED fully off |
| `set pwm pin 2 to 128` | LED half brightness |
| `set pwm pin 2 to 255` | LED fully on |

## Expected Result

- **Basic:** The LED blinks on for 1 second, then off for 1 second, repeating forever.
- **Advanced:** The LED gradually gets brighter, then dimmer, creating a "breathing" effect.

## Try It!

!!! question "Challenge 1"
    Make the LED blink 3 times quickly, then pause for 2 seconds, then repeat.

!!! question "Challenge 2"
    Create a "breathing" effect where the LED slowly fades in and out using PWM.

    **Hint:** Use a variable that increases from 0 to 255, then decreases back to 0.
