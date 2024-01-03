let url = "http://127.0.0.1:8080/";
const key = ['P', '%', 'L', 'N', '!', '$', ' ', 'B', 'r', 's', 'W', '9', 'R', 'x', 'I', '.', 'O', 'n', 'J', 'v', '^', 'z', '(', '?', 'F', 'T', 'E', "'", '[', '_', '1', 'H', ':', 'V', 'h', 'o', 'M', 'b', '3', '0', 'C', 'U', 'S', '&', 'g', 'q', '/', 'e', ',', '\\', 'G', '|', '-', ']', 'l', '8', 'w', '~', '}', 'A', ';', '`', '<', 'a', 'i', ')', '6', '*', '7', '=', 'D', 'Y', '{', '4', '5', '@', '"', '+', 'X', 't', 'Q', '2', '#', 'd', 'm', '>', 'c', 'Z', 'f', 'k', 'y', 'p', 'u', 'j', 'K']

function Decrypt(message) {
    const myArray = String(message).split("");
    let x = 0;
    let y = 0;
    let pairs = [];
    temp = "";
    myArray.forEach(i => {
        x++;
        if (x == 2) {
            x = 0
            pairs.push(myArray[y - 1] + myArray[y]);
        }
        y++;
    });

    let final = ""
    pairs.forEach(pair => {
        if (pair[0] == 0) {
            pair = pair[1]
        }
        final += key[pair]
    });
    return final
}


function Encrypt(message) {
    let final = "";
    for (letter in String(message).slice()) {
        let char = message[letter];
        let replace = key.indexOf(char);
        if (replace < 10) {
            replace = "0" + replace;
        }
        final += replace;
    }
    return final;
}

document.addEventListener("keypress", function (e) {
    if (e.key === "Enter" || e.keyCode == 13) {
        CheckSend()
    }
    else {
        document.getElementById("chatbox").focus();
    }
});

function CheckSend() {
    let user = document.getElementById("username").value;
    if (!user) {
        alert("You have to set a Name");
    }
    else {
        let message = document.getElementById("chatbox").value;
        if (message) {
            Send(message);
        }
        document.getElementById("chatbox").value = "";
    }

}

async function Send(msg) {
    let u = url + "message/"; // server url
    let time = Date.now() / 1000;
    let user = document.getElementById("username").value;
    let composed = u + "?user=" + Encrypt(user) + "&message=" + Encrypt(msg) + "&time=" + Encrypt(time);

    let res = await fetch(composed, {
        method: "get",
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
        })
    });

    let data = await res.json();
    // write the parser
    let chats = "";
    for (let msg in data) {
        let row = "";
        row += Date(Decrypt(data[msg]["time"])).substring(0, 3) + " " + Date(Decrypt(data[msg]["time"])).substring(15, 21) + "\t"
        row += Decrypt(data[msg]["user"]) + ":\t\t\t"
        row += Decrypt(data[msg]["message"]) + "<br>"
        chats += row
    }
    document.getElementById("chat").innerHTML = chats;
    Scroll();
}

function Scroll() {
    document.getElementById("chat").scrollTo(0, document.getElementById("chat").scrollHeight);
}

async function Load() {
    let res = await fetch(url + "?key=86923", {
        method: "get",
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
        })
    });

    let data = await res.json();

    // parser
    let chats = "";
    for (let msg in data) {
        let row = "";
        row += Date(Decrypt(data[msg]["time"])).substring(0, 3) + " " + Date(Decrypt(data[msg]["time"])).substring(15, 21) + "\t"
        row += Decrypt(data[msg]["user"]) + ":\t\t\t"
        row += Decrypt(data[msg]["message"]) + "<br>"
        chats += row
    }

    document.getElementById("chat").innerHTML = chats;
    Scroll();
}
// refresh
setInterval(async function () {
    let res = await fetch(url + "?key=86923", {
        method: "get",
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
        })
    });

    let data = await res.json();

    // parser
    let chats = "";
    for (let msg in data) {
        let row = "";
        row += Date(Decrypt(data[msg]["time"])).substring(0, 3) + " " + Date(Decrypt(data[msg]["time"])).substring(15, 21) + "\t"
        row += Decrypt(data[msg]["user"]) + ":\t\t\t"
        row += Decrypt(data[msg]["message"]) + "<br>"
        chats += row
    }

    document.getElementById("chat").innerHTML = chats;
    Scroll();
}, 10000);