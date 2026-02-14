# LCD Display (16x2 I2C)

## What Is It?

A 16x2 LCD display shows text on a screen with 2 rows of 16 characters each. The I2C version uses only 2 data wires (instead of 6+), making wiring much simpler.

## Specifications

| Property | Value |
|----------|-------|
| Display | 16 columns x 2 rows |
| Interface | I2C (address 0x27) |
| Operating Voltage | 5V |
| Pins | VCC, GND, SDA, SCL |

## Pin Layout

| LCD Pin | ESP32 Pin |
|---------|-----------|
| VCC | 5V |
| GND | GND |
| SDA | GPIO 21 |
| SCL | GPIO 22 |

## Wiring Diagram

![LCD Wiring Diagram](../images/placeholder-lcd-wiring.png)

## Code

![LCD Code](../images/placeholder-lcd-code.png)

## Expected Result

The LCD displays your text on the screen. You can show sensor readings, messages, or any text up to 16 characters per line.

## Try It!

!!! question "Challenge"
    Display the temperature and humidity from a DHT11 sensor on the LCD. Show temperature on line 1 and humidity on line 2.
