const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
const LED = new Gpio(5, 'out'); //use GPIO pin 5, and specify that it is output

exports.blinkGpio = function(req, res) {
  let blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms

  function blinkLED() { //function to start blinking
    LED.read((err, value) => { // Asynchronous read
      if (err) {
        throw err;
      }

      LED.write(value ^ 1, err => { // Asynchronous write
        if (err) {
          throw err;
        }
      });
    });
  }

  function endBlink() { //function to stop blinking
    clearInterval(blinkInterval); // Stop blink intervals
    LED.write(0, err => {}); // Turn LED off
    LED.unexport(); // Unexport GPIO to free resources
    res.status(200).json({"value": "blinked"});
  }

  setTimeout(endBlink, 5000); //stop blinking after 5 seconds
};

