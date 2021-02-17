from flask import Flask, render_template, request, make_response, jsonify

app = Flask(__name__)
app.static_folder = 'static'
data = [{"message": "data received"}, ]


@app.route("/home/")
@app.route('/')
def home():
    return render_template("index.html")

# Getting the data fro the fitch api using post method


@app.route("/pi_trigger", methods=["POST"])
def pi_trigger():
    # getting the data in json formate.
    req = request.get_json()
    print(request.get_data())
    # checking the data for current data of the button.
    if req["current_state"] == "on":
        value = "on"
    else:
        value = "off"
    # the return the divice state to update web page.
    res = make_response(jsonify({"message": "data received"}, {
                        "device_state": f"{value}"}), 200)
    return res


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
