const socket = io();
let btn = document.getElementById("btn");
let inputMsg = document.getElementById("newMsg");
let msgList = document.getElementById("msgList");
btn.addEventListener("click", () => {
  socket.emit("msg_send", {
    msg: inputMsg.value,
  });
});
socket.on("msg_rcvd", (data) => {
  let limsg = document.createElement("li");
  limsg.innerText = data.msg;
  msgList.appendChild(limsg);
});
