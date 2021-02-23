from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config["SECRET_KEY"] = "SYED uzair AHmed"
app.config["DEBUG"] = True
socketio = SocketIO(app, cors_allowed_origins="*")

# resberry-pi-variable
port_1 = "off"
pin_triggers = [
    {"switch0": "off"},
    {"switch1": "off"},
    {"switch2": "off"},
    {"switch3": "off"},
]


@app.route("/home/")
@app.route("/")
def home():
    return render_template("index.html")


@socketio.on("message")
def start_start_check(message):
    print(message)
    emit("init_pin_state", pin_triggers)


@socketio.on("change_state")
def set_ports(data):
    for index , item in enumerate(pin_triggers):
        if str(item.keys()) == str(data.keys()):
            for data_key, data_value in data.items():
                pin_triggers[index][data_key] = data_value
            break
    socketio.emit("broadcast",data)
    print(pin_triggers)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port="80")


# Getting the data fro the fitch api using post method
# @app.route("/pi_trigger", methods=["POST"])
# def pi_trigger():
#     # getting the data in json formate.
#     req = request.get_json()
#     print(request.get_data())
#     # checking the data for current data of the button.
#     if req["current_state"] == "on":
#         value = "on"
#     else:
#         value = "off"
#     # the return the divice state to update web page.
#     res = make_response(jsonify({"message": "data received"}, {
#                         "device_state": f"{value}"}), 200)
#     return res