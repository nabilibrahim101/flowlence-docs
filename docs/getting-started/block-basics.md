# How Blocks Work

Before you dive into sensors, let's make sure you're comfortable with the block editor itself. Every lesson from here on assumes you know how to do the four things on this page.

!!! tip "You can skip this page if you've used Scratch before"
    Flowlence Code works almost identically to Scratch. If you can build a Scratch program, you can build a Flowlence program — just jump to [Pin Map & Wiring Conventions](pin-map.md).

## 1. Find a block in the toolbox

The **block toolbox** is the coloured column on the left side of the screen. Blocks are grouped by category:

| Colour | Category | What's inside |
|--------|----------|---------------|
| 🟡 Yellow | **Events** | Starting points like *when Arduino begin* |
| 🟠 Orange | **Control** | Loops (*forever*, *repeat*), waits, conditions |
| 🟢 Green | **Operators** | Maths (+, −, ×), comparisons (>, <, =) |
| 🟣 Purple | **Serial** | Send messages to your computer for debugging |
| 🔵 Blue | **Pins** | Turn pins on/off, read analog values |
| 🔷 Teal (various) | **Sensor extensions** | One category per sensor (DHT, Ultrasonic, Servo, …) |

![Toolbox categories](../images/placeholder.svg)

## 2. Drag a block into the workspace

Click and hold a block in the toolbox, then drag it into the empty grey **workspace** in the middle of the screen. Let go of the mouse to drop it.

![Dragging a block](../images/placeholder.svg)

## 3. Snap blocks together

Blocks have bumps on the top and notches on the bottom. If the shapes match, they click together like LEGO when you drag one close to another. You'll hear a subtle snap.

![Blocks snapping together](../images/placeholder.svg)

To **pull blocks apart**, grab the lower block and drag it down and away.

## 4. Upload to your ESP32

When your program is ready, click the **green Upload button** at the top right. Flowlence Code translates your blocks into Arduino C++ (you can see it in the right-hand panel), compiles it, and sends it over USB to the ESP32.

![Upload button](../images/placeholder.svg)

!!! warning "Program Mode vs Upload Mode"
    The switch at the top (Program Mode ↔ Upload Mode) changes what happens when you run your code.

    - **Upload Mode**: your program runs directly on the ESP32, even after you unplug the USB. Use this for every project in this tutorial.
    - **Program Mode** (real-time): your computer sends commands one-by-one while connected. Useful for quick experiments, but the program stops when you disconnect.

## Quick vocabulary check

- **Block** — a single coloured shape you drag into the workspace.
- **Stack** — two or more blocks snapped together.
- **Script** — the full program, usually starting from a *when Arduino begin* block.
- **Toolbox** — the palette on the left.
- **Workspace** — the grey area in the middle where you build.
- **Code Panel** — the text on the right showing the generated Arduino C++.

If anything on this list is confusing, ask your teacher before moving on.

## Next up

[Pin Map & Wiring Conventions :material-arrow-right:](pin-map.md){ .md-button .md-button--primary }
