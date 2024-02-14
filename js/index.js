const input_content = document.getElementById("input_box");
const output_content = document.getElementById("display_box");
const submit_button = document.getElementById("submit_button");


function button_click(){
    const get_input = input_content.value;

    console.log("Input value:", get_input);

    output_content.textContent = get_input;
    input_content.value = "";
}

submit_button.addEventListener("click",button_click);