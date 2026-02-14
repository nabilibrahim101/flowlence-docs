# Sensors & Modules

This section covers every sensor and module included in your Flowlence IoT Kit. Each tutorial is self-contained - you can follow them in any order.

## What's in Your Kit

| Module | Description | Difficulty |
|--------|-------------|------------|
| [LED](led.md) | Light Emitting Diode - basic output | Beginner |
| [Button](button.md) | Push button - basic input | Beginner |
| [Buzzer](buzzer.md) | Sound output - tones and alarms | Beginner |
| [Servo Motor](servo.md) | Precise angle control motor | Beginner |
| [Ultrasonic Sensor](ultrasonic.md) | Distance measurement | Intermediate |
| [DHT11](dht11.md) | Temperature & humidity sensor | Intermediate |
| [Light Sensor (LDR)](ldr.md) | Light level detection | Beginner |
| [PIR Motion Sensor](pir.md) | Motion detection | Intermediate |
| [Soil Moisture Sensor](soil-moisture.md) | Soil water content | Intermediate |
| [Water Level Sensor](water-level.md) | Water depth detection | Intermediate |
| [LCD Display](lcd.md) | 16x2 character display | Intermediate |
| [Relay Module](relay.md) | Control high-power devices | Advanced |

## Tutorial Structure

Each sensor tutorial follows the same format:

1. **What is it?** - What the sensor does and how it works
2. **Specifications** - Pin layout and technical details
3. **Wiring Diagram** - How to connect it to the ESP32
4. **Code** - Block-based program with explanation
5. **Expected Result** - What you should see when it works
6. **Try It!** - A challenge to test your understanding

## Wiring Color Convention

Throughout these tutorials, we use the following wire colors:

| Wire Color | Purpose |
|------------|---------|
| **Red** | Power (VCC / 3.3V / 5V) |
| **Black** | Ground (GND) |
| **Yellow** | Signal / Data |
| **Blue** | Additional signal (when needed) |

!!! warning "Important"
    Always double-check your wiring before powering on. Incorrect wiring can damage your sensors or ESP32.
