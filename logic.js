  //This Javascript is related to the Uno WiFi Web tutorials that you can find at this page:
  //http://www.arduino.org/learning/tutorials/boards-tutorials/content/arduino-uno-wifi-tutorial

  //This function is used to manage digital commands for the Example:
  //http://www.arduino.org/learning/tutorials/boards-tutorials/turn-on-off-a-led-by-smartphone-pc
  function digitalCommand(pin) {
      //Retrive the value from the object that creates the event
      var value = document.getElementById(event.target.id).value == 'ON' ? 0 : 1
      //Send an ajax request to the Uno Wifi
      ajax(pin, value, 'digital')
  }

  //This function is used to manage commands for the servo of the example:
  //http://www.arduino.org/learning/tutorials/boards-tutorials/control-a-servo-motor-by-smartphone-pc
  function servoCommand(pin) {
      //Retrive the value from the object that creates the event
      var value = document.getElementById(event.target.id).value
      //Send an ajax request to the Uno Wifi
      ajax(pin, value, 'servo')
  }	

  //This function is used to manage commands for the LCD and the TFT of the examples:
  //http://www.arduino.org/learning/tutorials/boards-tutorials/send-messages-on-lcd-display
  //and
  //http://www.arduino.org/learning/tutorials/boards-tutorials/send-messages-on-tft-display
  function customCommand() {
      //Retrive the value from the object that creates the event
      var value = document.getElementById(event.target.id).value
      //Send an ajax request to the Uno Wifi
      ajax(0, value, 'custom')
  }

  function ajax(pin, value, command) {
      //Get the element that creates the even
      var srcElement = event.target.id
      //Manage the command received for the Uno WiFi
      var arduinoURL_array = document.URL.split("/");
      var arduinoURL = arduinoURL_array[0] + "//" + arduinoURL_array[2];
      url = arduinoURL + '/arduino/' + command +'/' + pin + '/' + value      
      if(command=='custom')      
         url = arduinoURL + '/arduino/' + command +'/' + value
      
      //Create the HTTP Request
      xmlhttp = new XMLHttpRequest()
      xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
              var resp = xmlhttp.responseText
          //Do not consider undefined responses
	  if (typeof resp === 'undefined') return

          //Return a proper message for each command
	  if(command=='digital'){
		  var el1 = document.getElementById(srcElement)
		  el1.className = resp.includes('D' + pin + ':1') ? 'on' : 'off'
		  el1.value = resp.includes('D' + pin + ':1') ? 'ON' : 'OFF'
	  }else if(command=='servo'){
            	  alert('Command received')
	  }else if(command=='custom'){
            	  alert("Message '"+value+"' sent to the LCD")
	  }
      }
      xmlhttp.open('GET', url, true)
      xmlhttp.send()
  }

  function manage_response(){

  }
