# Relay Module

## What Is It?

A relay is an electrically controlled switch. It allows the ESP32 (which operates at 3.3V) to control high-power devices like water pumps, fans, and lights that require more voltage. Think of it as a bridge between your low-power ESP32 and high-power devices.

## How It Works

When the ESP32 sends a HIGH signal to the relay, an internal electromagnet activates and closes a switch. This connects the high-power circuit, turning on the connected device.

## Specifications

| Property | Value |
|----------|-------|
| Control Voltage | 3.3V - 5V |
| Switching Capacity | Up to 10A at 250V AC |
| Trigger | HIGH = ON (active high) |
| Pins | VCC, GND, Signal |

## Pin Layout

| Relay Pin | ESP32 Pin |
|-----------|-----------|
| VCC | 5V |
| GND | GND |
| IN (Signal) | GPIO 26 |

## Wiring Diagram

![Relay Wiring Diagram](../images/placeholder-relay-wiring.png)

!!! danger "Safety Warning"
    Relays can switch high-voltage circuits. In these tutorials, we only use the relay with low-voltage devices (small water pumps, fans). **Never** connect mains electricity (wall outlet) without proper supervision and safety measures.

## Code

![Relay Code](../images/placeholder-relay-code.png)

## Expected Result

The relay clicks on and off. If a water pump is connected, it turns on for 3 seconds then off for 3 seconds.

## Try It!

!!! question "Challenge"
    Combine the relay with the soil moisture sensor: when soil is dry, activate the relay to turn on a water pump. When soil is moist, turn it off.
