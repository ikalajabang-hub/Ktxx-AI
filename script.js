const API_KEY = "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";

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const historyBox = document.getElementById("history");

async function sendMessage(){

    const text = userInput.value.trim();

    if(text === "") return;

    addMessage(text,"user");

    saveHistory(text);

    userInput.value = "";

    const loading = document.createElement("div");

    loading.className = "ai-message";
    loading.id = "loading";

    loading.innerHTML = "Ktxx AI sedang mengetik...";

    chatBox.appendChild(loading);

    chatBox.scrollTop = chatBox.scrollHeight;

    try{

        const response = await fetch(

            "https://api.openai.com/v1/chat/completions",

            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + API_KEY
                },

                body:JSON.stringify({

                    model:"gpt-4o-mini",

                    messages:[

                        {
                            role:"system",
                            content:`
                            Kamu adalah Ktxx AI.
                            AI modern khusus coding,
                            desain UI, website,
                            dan teknologi.
                            `
                        },

                        {
                            role:"user",
                            content:text
                        }

                    ]

                })

            }

        );

        const data = await response.json();

        document.getElementById("loading").remove();

        const aiReply =
        data.choices[0].message.content;

        addMessage(aiReply,"ai");

    }catch(err){

        document.getElementById("loading").remove();

        addMessage(
            "Error koneksi API 🚫",
            "ai"
        );

    }

}

function addMessage(text,type){

    const div = document.createElement("div");

    div.className =
    type === "user"
    ? "user-message"
    : "ai-message";

    div.innerHTML = formatCode(text);

    chatBox.appendChild(div);

    chatBox.scrollTop =
    chatBox.scrollHeight;

}

function formatCode(text){

    return text.replace(
        /```([\s\S]*?)```/g,
        '<pre><code>$1</code></pre>'
    );

}

function saveHistory(text){

    const item =
    document.createElement("div");

    item.className = "history-item";

    item.innerHTML =
    text.substring(0,30);

    historyBox.appendChild(item);

}

function newChat(){

    chatBox.innerHTML = `
        <div class="ai-message">
            Chat baru dimulai 🚀
        </div>
    `;

}

userInput.addEventListener(
    "keypress",
    function(e){

        if(e.key === "Enter"
        && !e.shiftKey){

            e.preventDefault();

            sendMessage();

        }

    }
);
