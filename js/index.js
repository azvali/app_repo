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



document.addEventListener("DOMContentLoaded", function() {
    const connectButton = document.querySelector("#connectButton");
    const displayBox = document.getElementById("display_box"); // Use the ID of the input where you want to display the data

    const serviceUUID = '12345678-1234-1234-1234-123456789012';
    const characteristicUUID = '87654321-4321-4321-4321-210987654321';

    connectButton.addEventListener("click", function() {
        if (!navigator.bluetooth) {
            console.error("Web Bluetooth is not available in this browser.");
            return;
        }

        console.log("Requesting BLE Device Info...");
        navigator.bluetooth.requestDevice({
            filters: [{services: [serviceUUID]}]
        })
        .then(device => {
            console.log(`Device selected: ${device.name}`);
            return device.gatt.connect();
        })
        .then(server => {
            console.log("Successfully connected to the GATT Server.");
            return server.getPrimaryService(serviceUUID);
        })
        .then(service => {
            console.log("Service found. Getting characteristic...");
            return service.getCharacteristic(characteristicUUID);
        })
        .then(characteristic => {
            console.log('Characteristic found. Setting up notifications...');
            characteristic.startNotifications().then(_ => {
                characteristic.addEventListener('characteristicvaluechanged', event => {
                    const value = new TextDecoder().decode(event.target.value);
                    console.log('Received:', value);
                    displayBox.value = value; // Display the received value in the input box
                });
                console.log('Notifications started');
            });
        })
        .catch(error => {
            console.error('Connection failed:', error);
        });
    });
});
