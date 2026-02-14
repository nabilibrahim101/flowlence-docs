# Button (Push Button)

## What Is It?

A push button is a simple input device. When you press it, it closes a circuit and sends a signal to the ESP32. Buttons are used to trigger actions - like turning an LED on/off, starting a motor, or sending data.

## How It Works

A button has 4 pins, but only 2 pairs matter. When pressed, it connects the circuit. We use a **pull-up resistor** configuration, meaning the pin reads HIGH normally and LOW when pressed.

!!! tip
    The ESP32 has built-in pull-up resistors, so you don't need an external one. We enable it in the code using `INPUT_PULLUP`.

## Specifications

| Property | Value |
|----------|-------|
| Type | Momentary push button |
| Pin Type | Digital Input |
| States | Pressed (LOW) / Released (HIGH) |

## Pin Layout

| Button Pin | ESP32 Pin |
|------------|-----------|
| One leg | GPIO 4 |
| Other leg | GND |

## Wiring Diagram

![Button Wiring Diagram](../images/placeholder-button-wiring.png)

1. Connect one leg of the button to **GPIO 4**
2. Connect the other leg to **GND**

## Code

### Read Button State

![Button Code](../images/placeholder-button-code.png)

**How it works:**

| Block | What It Does |
|-------|-------------|
| `when Arduino begin` | Program starts here |
| `set pin 4 mode INPUT_PULLUP` | Configures pin 4 as input with pull-up resistor |
| `forever` | Repeats the blocks inside |
| `if read digital pin 4 = LOW` | Checks if button is pressed |
| `set pin 2 to HIGH` | Turns LED on when button is pressed |
| `else` | When button is not pressed |
| `set pin 2 to LOW` | Turns LED off |

## Expected Result

When you press the button, the LED turns on. When you release it, the LED turns off.

## Try It!

!!! question "Challenge"
    Modify the program so that pressing the button **toggles** the LED: press once to turn on, press again to turn off.

    **Hint:** You'll need a variable to remember the LED's current state.
