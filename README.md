# Nova Remote Control Dashboard

This repository contains the software components for a physical ESP32-based Bluetooth remote control that interacts directly with a web dashboard. The ESP32 acts as a BLE Keyboard, simulating keystrokes (`b`, `s`, `+`, `-`) when physical buttons are pressed, which are then intercepted by the web application to perform corresponding actions.

## Project Structure

This repository is split into three main parts:

- **`esp32_code/`**: Contains the Arduino/C++ code for the ESP32 microcontroller. It uses the NimBLE library to act as a Bluetooth HID Keyboard.
- **`simple/`**: A lightweight, vanilla HTML/CSS/JS implementation of the dashboard. No build tools required, just open `index.html` in your browser.
- **`mern-based/`**: A modern, scalable implementation of the dashboard built with **React**, **Vite**, and **Tailwind CSS**.

*(Note: The `index.html`, `script.js`, and `style.css` in the root folder are duplicates of the `simple` folder and can be safely deleted).*

## How to Run

### 1. ESP32 Setup
Upload the code from the `esp32_code` folder to your ESP32 board using the Arduino IDE. Make sure you have the required `BleKeyboard` libraries installed. Once powered on, pair your PC to the ESP32 Bluetooth device.

### 2. Simple Dashboard
Just double-click and open `simple/index.html` in any modern web browser. Keep the tab active, and when you press a button on your physical ESP32 remote, the website will respond to the keystroke!

### 3. Modern React Dashboard
To run the advanced React version, you will need [Node.js](https://nodejs.org/) installed.

1. Open your terminal and navigate to the `mern-based` folder:
   ```bash
   cd mern-based
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the `localhost` URL provided in your terminal (usually `http://localhost:5173`).

Ensure the browser tab is focused so it can detect the keystrokes sent by the ESP32!
