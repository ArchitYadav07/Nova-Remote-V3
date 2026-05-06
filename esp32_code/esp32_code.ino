#include <BleKeyboard.h>

// Create a BLE Keyboard object. 
// Name: "novaremotev3", Manufacturer: "Espressif", Initial Battery Level: 100%
BleKeyboard bleKeyboard("Nova-Remote-V3", "Espressif", 100);

// --- Pin Definitions for LED and 4 Buttons ---
const int bluetoothLedPin = 5;   // LED turns on when Bluetooth is connected

// Using requested pins
const int buttonBuyPin = 4;      // Buy Button (D4)
const int buttonSellPin = 18;    // Sell Button (D18)
const int buttonPlusPin = 19;    // Plus Button (D19)

// Variables for button state
bool lastBtnBuyState = HIGH;
bool lastBtnSellState = HIGH;
bool lastBtnPlusState = HIGH;

void setup() {
  Serial.begin(115200);
  Serial.println("Starting BLE work!");
  
  // Initialize BLE Keyboard
  bleKeyboard.begin();

  // Initialize LED
  pinMode(bluetoothLedPin, OUTPUT);
  digitalWrite(bluetoothLedPin, LOW); 
  
  // Initialize Buttons with internal pullup resistors
  pinMode(buttonBuyPin, INPUT_PULLUP);
  pinMode(buttonSellPin, INPUT_PULLUP);
  pinMode(buttonPlusPin, INPUT_PULLUP);
}

void loop() {
  // Check if a device is paired and connected
  if (bleKeyboard.isConnected()) {
    digitalWrite(bluetoothLedPin, HIGH); // Turn ON LED when connected
    
    // Read Buttons
    bool btnBuyState = digitalRead(buttonBuyPin);
    bool btnSellState = digitalRead(buttonSellPin);
    bool btnPlusState = digitalRead(buttonPlusPin);

    // Buy Button - For example, sends the letter 'b'
    if (btnBuyState == LOW && lastBtnBuyState == HIGH) {
      Serial.println("Sending 'b' for Buy");
      bleKeyboard.write('b');
      delay(100); 
    }
    
    // Sell Button - For example, sends the letter 's'
    if (btnSellState == LOW && lastBtnSellState == HIGH) {
      Serial.println("Sending 's' for Sell");
      bleKeyboard.write('s');
      delay(100);
    }
    
    // Plus Button - Sends the '+' symbol
    if (btnPlusState == LOW && lastBtnPlusState == HIGH) {
      Serial.println("Sending '+' for Plus");
      bleKeyboard.write('+');
      delay(100);
    }

    // Save states
    lastBtnBuyState = btnBuyState;
    lastBtnSellState = btnSellState;
    lastBtnPlusState = btnPlusState;
    
  } else {
    digitalWrite(bluetoothLedPin, LOW); // Turn OFF LED if disconnected
  }
}
