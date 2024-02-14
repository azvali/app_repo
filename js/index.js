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