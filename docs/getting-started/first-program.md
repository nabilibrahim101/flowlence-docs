# Your First Program

In this tutorial, you'll make the built-in LED on your ESP32 blink on and off. No extra components needed - just your ESP32 and a USB cable.

## What You'll Learn

- How to connect your ESP32 to Flowlence Code
- How to use basic blocks (Events, Pins, Control)
- How to upload a program to your ESP32

## Step 1: Connect Your ESP32

1. Plug your ESP32 into your computer using the USB cable
2. In Flowlence Code, click **ESP32** in the menu bar
3. Click **Connect** and select the COM port that appears

!!! tip
    If no COM port appears, you may need to install the USB driver. See [Troubleshooting](install.md#troubleshooting).

## Step 2: Build the Program

Drag the following blocks into your workspace:

![Blink Program Blocks](../images/placeholder-blink-code.png)

Here's what each block does:

1. **when Arduino begin** - This is where your program starts
2. **forever** - Repeats everything inside it endlessly
3. **set pin 2 to HIGH** - Turns the LED on (pin 2 is the built-in LED)
4. **wait 1 seconds** - Pauses for 1 second
5. **set pin 2 to LOW** - Turns the LED off
6. **wait 1 seconds** - Pauses for 1 second again

## Step 3: Upload

1. Click the **Upload** button (green arrow)
2. Wait for the code to compile and upload
3. Watch your ESP32 - the LED should start blinking!

!!! success "Congratulations!"
    You've just written and uploaded your first program. The LED on your ESP32 should be blinking on and off every second.

## Understanding the Code

Look at the **Code Panel** on the right side. You'll see the Arduino code that was generated from your blocks:

```cpp
void setup() {
    pinMode(2, OUTPUT);
}

void loop() {
    digitalWrite(2, HIGH);
    delay(1000);
    digitalWrite(2, LOW);
    delay(1000);
}
```

This is the same program written in text-based code. As you learn more blocks, you'll start to understand the code behind them.

## Try It!

!!! question "Challenge"
    Can you make the LED blink faster? Try changing the wait time from 1 second to 0.5 seconds.

    **Bonus:** Can you make the LED stay on for 2 seconds and off for 0.5 seconds?

## Next Step

Now that you can upload programs, let's learn about the [sensors and modules](../sensors/index.md) in your kit!
