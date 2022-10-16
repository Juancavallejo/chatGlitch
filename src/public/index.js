console.log ("index js working")

const socketClient = io();

let user; 
Swal.fire ({
    title: "Hola Isis",
    text: "Bienvenida, ingresa tu nombre",
    input: "text",
    allowOutSideClick:false
}).then(response => {
    user = response.value;
});


const mensaje = document.getElementById("messageField")

mensaje.addEventListener ("keydown", (e) => {
    console.log (e.key)
    if (e.key === "Enter") {
        socketClient.emit("message", {
            username: user,
            message: mensaje.value
        })
    }
})

const messageContainer = document.getElementById("messageContainer")

socketClient.on ("historial", (data) => {
    let elementos =""
    data.forEach(el => {
        elementos = elementos + `<p><strong>${el.username}</strong> 
        : ${el.message}</p>`
    });
    messageContainer.innerHTML = elementos;
})

socketClient.on ("newUser", ()=>{
    Swal.fire ({
        text:"nuevo usuario conectado",
        toast: true
    })
})

