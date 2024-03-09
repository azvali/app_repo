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



function isBLEAvailable() {
    if (!navigator.bluetooth) {
        console.log("Bluetooth Not Available");
        return false;
    }
    return true;
}

function getDeviceInfo() {
    let options = {
        acceptAllDevices: true,
        optionalServices: ["12345678-1234-1234-1234-123456789012"] // Add the service UUID you want to interact with
    };

    console.log("Requesting BLE Device Info...");
    navigator.bluetooth.requestDevice(options)
    .then(device => {
        console.log("Device name: " + device.name);
        return device.gatt.connect(); // Connect to the device
    })
    .then(server => {
        console.log("Getting Service...");
        return server.getPrimaryService("12345678-1234-1234-1234-123456789012"); // Use the same service UUID
    })
    .then(service => {
        console.log("Getting Characteristic...");
        return service.getCharacteristic("87654321-4321-4321-4321-210987654321"); // Use the characteristic UUID
    })
    .then(characteristic => {
        console.log("Starting Notifications...");
        characteristic.startNotifications().then(_ => {
            characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
        });
    })
    .catch(error => {
        console.log("Error: " + error);
    });
}

function handleCharacteristicValueChanged(event) {
    const value = new TextDecoder().decode(event.target.value);
    console.log('Received: ', value);
    // Display the value on the web page
    document.querySelector('.outputContainer').textContent = `Received: ${value}`;
}

document.querySelector("#connectButton").addEventListener("click", function(event){
    event.stopPropagation();
    event.preventDefault();

    if(isBLEAvailable()){
        getDeviceInfo();
    }
});
