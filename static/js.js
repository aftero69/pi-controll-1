var socket = io.connect();
var theParentElement = document.getElementById("event-listener");
// const btn = document.querySelector("#switch");
// const title = document.querySelector("#title_state");
// var title_border_style = (color) =>
//   (title.style.cssText = `box-shadow: 10px 0px ${color}, 0 0 0 1px rgb(0 0 0 / 20%)`);
var state = "off";

// btn.addEventListener("change", () => {
//   if (btn.checked) {
//     state = "on";

//   } else {
//     state = "off";
//   }
//   socket.emit("state", state);
// });

// socket.on("connect", function () {
//   console.log("sending.....");
//   socket.send("Connection established");
//   socket.on("message", (msg) => {
//     console.log(msg);
//     set_state_of_tile(msg);
//   });
// });

// socket.on("broadcast", function (msg) {
//   // This socket function listen to the broadcast made by the serve.
//   // SO that it can  change all of the clients data
//   set_state_of_tile(msg);
// });

// function set_state_of_tile(state) {
//   // IT sets the color of the label and state of the button
//   if (state == "off") {
//     title_border_style(" red");
//     btn.checked = false;
//   } else {
//     title_border_style(" green");
//     btn.checked = true;
//   }
// }

theParentElement.addEventListener("click",doSomething);
var _event = "";
function doSomething(e){
  _event = e
  console.log(e);
  if (e.target !== e.currentTarget){
    if (e.target.type === "checkbox"){
      var toggle_switch_id = e.target.id;
      var toggle_switch = document.getElementById(toggle_switch_id);
      var title_id = toggle_switch.parentElement.parentElement.children[0].id
      var title = document.getElementById(title_id)
      if (toggle_switch.checked){
        title.style.cssText = `box-shadow: 10px 0px green, 0 0 0 1px rgb(0 0 0 / 20%)`;
      }else{
        title.style.cssText = `box-shadow: 10px 0px red, 0 0 0 1px rgb(0 0 0 / 20%)`;
      }

    }
  }
  e.stopPropagation();
}