async function sendMessage(){

    const input =
    document.getElementById("userInput");

    const chatBox =
    document.getElementById("chatBox");

    const text = input.value;

    if(text === "") return;

    chatBox.innerHTML += `
        <div class="user-message">
            ${text}
        </div>
    `;

    input.value = "";

    const response =
    await fetch("/chat",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            message:text
        })

    });

    const data =
    await response.json();

    chatBox.innerHTML += `
        <div class="ai-message">
            ${data.reply}
        </div>
    `;

}
