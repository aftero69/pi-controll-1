from flask import Flask, render_template, request, make_response, jsonify
from flask_socketio import SocketIO, send , emit


app = Flask(__name__)
app.config["SECRET_KEY"] = "SYED uzair AHmed"
app.config["DEBUG"] = True
# data = [{"message": "data received"}, ]
socketio = SocketIO(app,cors_allowed_origins="*")

# resberry-pi-variable
port_1 = "off"

@app.route("/home/")
@app.route('/')
def home():
    return render_template("index.html")

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

@socketio.on('message')
def start_start_check(message):
    print(message)
    send(port_1)

@socketio.on('state')
def set_ports(message):
    global port_1
    port_1 = message
    socketio.emit("broadcast", port_1)
    

if __name__ == "__main__":
    socketio.run(app,host="0.0.0.0",port="80")
