var socket = io.connect();
const btn = document.querySelector("#switch");
const title = document.querySelector("#title_state");
var title_border_style = (color) =>
  (title.style.cssText = `box-shadow: 10px 0px ${color}, 0 0 0 1px rgb(0 0 0 / 20%)`);
var state = "off" 

btn.addEventListener("change", () => {
  if (btn.checked) {
    state = "on"
  } else {
    state = "off"
  }
  socket.emit('state', state)
});

socket.on('connect', function(){
  console.log("sending.....")
  socket.send("Connection established")
  socket.on("message", (msg)=>{
    console.log(msg)
    set_state_of_tile(msg)
  });
});


socket.on("broadcast",function (msg){
  // This socket function listen to the broadcast made by the serve.
  // SO that it can  change all of the clients data
  set_state_of_tile(msg)
});

function set_state_of_tile(state){
  // IT sets the color of the label and state of the button
  if (state == "off"){
    title_border_style(" red");
    btn.checked = false
  }else{
    title_border_style(" green")
    btn.checked = true
  }
}