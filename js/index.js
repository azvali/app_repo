const input_content = document.getElementById("input_box");
const output_content = document.getElementById("display_box");
const submit_button = document.getElementById("submit_button");


function button_click(){
    output_content.value = "";
    const get_input = input_content.value;

    console.log("Input value:", get_input);

    output_content.value = get_input;
    input_content.value = "";

    document.getElementById('display_box').textContent = 'Test Message';

}

submit_button.addEventListener("click",button_click);


/*
//for arduino
const connectButton = document.getElementById('connectButton');
const outputContainer = document.querySelector('.outputContainer');

// BLE Service and Characteristic UUIDs
const serviceUUID = "12345678-1234-1234-1234-123456789012";
const characteristicUUID = "87654321-4321-4321-4321-210987654321";

connectButton.addEventListener('click', function() {
    console.log('Attempting to connect...');
    navigator.bluetooth.requestDevice({
        filters: [{ services: [serviceUUID] }]
    })
    .then(device => {
        console.log('Device selected, connecting...');
        return device.gatt.connect();
    })
    .then(server => {
        console.log('Connected to device, getting service...');
        return server.getPrimaryService(serviceUUID);
    })
    .then(service => {
        console.log('Service found, getting characteristic...');
        return service.getCharacteristic(characteristicUUID);
    })
    .then(characteristic => {
        console.log('Characteristic found, starting notifications...');
        characteristic.startNotifications().then(_ => {
            characteristic.addEventListener('characteristicvaluechanged', event => {
                const value = new TextDecoder().decode(event.target.value);
                console.log('Received:', value);
                outputContainer.innerHTML = `<p>Received: ${value}</p>`; // Display the received value
            });
            console.log('Notifications started');
        });
    })
    .catch(error => {
        console.error('Connection failed!', error);
    });
});
*/


//arduino from yt
/*
function isBLEAvailable(){
    if(!navigator.bluetooth){
        console.log("Bluetooth Not Available");
        return false;
    }
    return true;
}

function getDeviceInfo(){
    let option = {
        acceptAllDevices: true
    }

    console.log("Requesting BLE Device Info...");
    navigator.bluetooth.requestDevice(option).then(device => {
        console.log("name " + device.name);
    }).catch(error => {
        console.log("Request Device Error: " + error);
    })
}

document.querySelector("#connectButton").addEventListener("click", function(event){
    event.stopPropagation();
    event.preventDefault();

    if(isBLEAvailable()){
        getDeviceInfo();
    }
})

*/



// Check if BLE is available in the browser
function isBLEAvailable() {
    if (!navigator.bluetooth) {
        console.error("Bluetooth Not Available");
        return false;
    }
    return true;
}

// Handle characteristic value changes
function handleCharacteristicValueChanged(event) {
    const value = new TextDecoder().decode(event.target.value);
    console.log('Received:', value);
    document.querySelector('.outputContainer').textContent = `Received: ${value}`;
}

// Connect to the device and set up the characteristic and notifications
function connectToDevice(device) {
    console.log('Connecting to device...', device.name);
    device.gatt.connect()
        .then(server => {
            console.log("Connected. Getting Service...");
            // Listen for disconnections
            device.addEventListener('gattserverdisconnected', onDisconnected);
            return server.getPrimaryService("12345678-1234-1234-1234-123456789012");
        })
        .then(service => {
            console.log("Service found. Getting Characteristic...");
            return service.getCharacteristic("87654321-4321-4321-4321-210987654321");
        })
        .then(characteristic => {
            console.log("Characteristic found. Starting Notifications...");
            characteristic.startNotifications().then(_ => {
                characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
            });
        })
        .catch(error => {
            console.error('Connection failed!', error);
        });
}

// Attempt to reconnect when disconnected
function onDisconnected(event) {
    const device = event.target;
    console.log(`Device ${device.name} is disconnected. Trying to reconnect...`);
    // Implement your reconnection strategy here
    // This could be simply calling connectToDevice(device) again,
    // or you might want to implement a back-off strategy for multiple attempts.
    connectToDevice(device);
}

// Initial device request and connection setup
function getDeviceInfo() {
    if (!isBLEAvailable()) return;

    let options = {
        acceptAllDevices: true,
        optionalServices: ["12345678-1234-1234-1234-123456789012"]
    };

    console.log("Requesting BLE Device Info...");
    navigator.bluetooth.requestDevice(options)
        .then(device => {
            console.log("Device name: ", device.name);
            connectToDevice(device);
        })
        .catch(error => {
            console.error("Request Device Error: ", error);
        });
}

// Set up the connect button event listener
document.querySelector("#connectButton").addEventListener("click", function(event) {
    event.stopPropagation();
    event.preventDefault();
    getDeviceInfo();
});

