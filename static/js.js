const btn = document.querySelector("#switch");
const title = document.querySelector("#title_state");
var title_border_style = (color) =>
  (title.style.cssText = `box-shadow: 10px 0px ${color}, 0 0 0 1px rgb(0 0 0 / 20%)`);

btn.addEventListener("change", () => {
  if (btn.checked) {
    console.log("start");
    submit_state("on");
  } else {
    console.log("Stop");
    title_border_style(" red");
    submit_state("off");
  }
});

function submit_state(state) {
  var entry = {
    current_state: state,
  };
  fetch(`${window.origin}/pi_trigger`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(entry),
    caches: "no-cache",
    headers: new Headers({
      "content-type": "application/json",
    }),
  })
    // gets the response from the server
    .then(function (response) {
      // check to see if the server response was 200
      if (response.status !== 200) {
        console.error(`Response status was not 200: ${response.status}`);
        return;
      }
      // converts the get data to json data feather brake down of data to analyse
      response.json().then(function (data) {
        console.log(data[0]["message"]);
        if (data[1]["device_state"] === "on") {
          title_border_style(" green");
          if (btn.checked === false) {
            btn.checked = true;
          }
        } else {
          console.log(data[1]["device_state"]);
          title_border_style(" red");
          if (btn.checked) {
            btn.checked = true;
          }
        }
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// setTimeout(() => {
//   submit_state("on");
// }, 100);

self.addEventListener("fetch", (evt) => {
  console.log(`fetch event ${evt}`);
});

for (const item of object) {
}
