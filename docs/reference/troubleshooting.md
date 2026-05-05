# Troubleshooting

The most common problems students hit while working through this tutorial, and how to fix them.

## Flowlence Code won't install

**Windows SmartScreen blocks the installer.** Windows shows a "Microsoft Defender SmartScreen prevented an unrecognised app from starting" warning. Click **More info** → **Run anyway**. This happens because Flowlence Code is a new app without a widespread reputation yet. See [Install Flowlence Code](../getting-started/install.md) for details.

## Can't connect to the ESP32

**No COM port appears when I plug in the ESP32.**

1. Try a different USB cable — many charging-only cables don't carry data.
2. Try a different USB port, preferably directly on the computer (not through a hub).
3. Install the USB driver. Flowlence Code includes one in the `drivers/` folder — run `install_x64.bat` (Windows) as administrator.

**The COM port appears but upload fails.**

- Close any other program that might be using the port (Arduino IDE, PuTTY, serial terminals).
- Press and hold the **BOOT** button on the ESP32 while clicking Upload in Flowlence Code.

## Flowlence Code shows "update stuck at 17%"

This is the **external-resources updater**, not the installer. It can happen when the version in `config.json` doesn't match the release tag on the update server. If you see this, report the version number shown to Flowlence support — they'll tell you how to recover. You can continue using the app with the last working extensions in the meantime.

## My sensor gives weird readings

- **Check the wiring against the [Pin Map](../getting-started/pin-map.md)** before anything else. Miswired VCC and GND will often produce readings that *look* plausible but are always changing.
- **Open the Serial Monitor** (bottom right panel) and add a *serial print* block to see the raw value.
- **Power**: a DHT11 reading 0 °C almost always means it's not getting power. A soil moisture sensor reading 4095 always means the data wire isn't connected.

## The LED is dimmer than expected

Using a resistor that's too large (above 220 Ω) will make the LED dim. Using one that's too small (below 100 Ω) will make it bright at first, then it burns out. Stick with the 220 Ω resistor from your kit.

## Blocks are disconnected and my program does nothing

Every program needs a starting block — either *when Arduino begin* (runs once) or *forever* (runs continuously). Blocks that aren't snapped under a starting block are ignored. Look for orphan stacks in your workspace and delete or reconnect them.

## The generated code panel is empty / red

Means there's a block configuration error (an empty dropdown, a missing number). Look for a red glow around a block and fix it.

---

!!! question "Stuck on something not on this page?"
    Ask your teacher first. If nobody can help, post in the [Flowlence GitHub issues](https://github.com/nabilibrahim101/flowlence-desktop/issues) with:

    1. A screenshot of your blocks
    2. A photo of your wiring
    3. A copy of the error message (or the generated code panel)
