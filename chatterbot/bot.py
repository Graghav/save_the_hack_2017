from chatterbot.trainers import ListTrainer
from chatterbot import ChatBot

import logging

import requests

import json

from random import randint

from flask import Flask, render_template

from flask_ask import Ask, statement, question, session

app = Flask(__name__)

ask = Ask(app, "/")

logging.getLogger("flask_ask").setLevel(logging.DEBUG)


chatterbot = ChatBot("Save the Hacker")
chatterbot.set_trainer(ListTrainer)

chatterbot.train([
    "What causes the AC compressor to continue running and the freon to continue to circulate after the fan inside the house clicks off?",
    "It is possibly a stuck contactor in the outdoor unit or your indoor fan is overheating and shutting off"
])

chatterbot.train([
    "What could be wrong if your central air conditioner blows cool but not cold air and seems to be always running?!",
    "your condenser may be dirty and the evaporator coils should be cleaned there may be inadequate airflow around the condenser. if there is a leak, your unit may be out of refrigerant you might have a leak in your duct system"
])

chatterbot.train([
    "The system is running but the air is not very cold, what's wrong?",
    "If you have some cooling, but not enough, then chances are that the system is low on freon. The only reason a system would need freon is because the freon leaked out. Shall I raise a ticket to fix the issue?"
])

chatterbot.train([
    "The air conditioner does not start operation immediately after it is turned on.",
    "To reduce excessive load in a restart, the air conditioner does not operate for three minutes when the ON switch is pressed immediately after it is shut down or when the operation mode (setting) is changed using the remote controller."
])

chatterbot.train([
    "The air conditioner does not blow air immediately after it starts operation in the heating mode.",
    "The air conditioner conducts a warm-up operation first so that it won't blow cold air in the heating mode. The fan starts operating after one to four minutes of warm-up operation."
])

chatterbot.train([
    "The air conditioner produces a water flowing sound.",
    "The water flowing sound is produced by the refrigerant that flows inside the air conditioner. This sound is more prone to generation when the defrost operation is activated in a heating operation."
])

chatterbot.train([
    "The air conditioner produces an air releasing sound.",
    "The air releasing sound is caused by a change of the refrigerant flow direction. This sound is generated when the air conditioner stops operating or the defrosting operation is activated in a heating operation."
])

chatterbot.train([
    "The air condition produces a crackling sound.",
    "Plastic parts such as the front panel produces a crackling sound when they expand or contract slightly due to temperature change."
])

chatterbot.train([
    "The outdoor unit discharges water or steam.",
    "The defrost operation activated in the heating mode removes frost, which turns into water or steam. A small amount of water is also discharged during a heating operation."
])

chatterbot.train([
    "The air conditioner does not operate",
    "Can you make sure the circuit breaker is not turned off and the fuse is not blown."
])


chatterbot.train([
    "The air conditioner does not cool or warm the room.",
    "can you Make sure the air filters are not dirty and the doors and windows are closed."
])

chatterbot.train([
    "The indoor unit produces a mist.",
    "The cold air blow out during a cooling operation reduces the temperature of the room air and sometimes generates a mist."
])


# ALEXA ROUTES

@ask.launch
def new_request():
    return question("Welcome to Customer Care. How can I help you")

@ask.intent("CatchAllIntent", mapping={'input': 'CatchAll'})
def mindbot(input):

    # Inser User question
    data = {'customer_id': 22003757346, responder_id  : 22001367627, is_auto_gen: 'false', message: input , sent_by : 'CUSTOMER'}
    headers = {'Content-Type': 'application/json'}
    res = requests.post('http://localhost:5000/messages', data=json.dumps(data), headers=headers)


    # Get a response to the input text
    response = chatterbot.get_response(input)
    print(response.confidence)

    if(response.confidence >= 0.8):
        print(response)
        # Push response to backend
        data = {'customer_id': 22003757346, responder_id  : 22001367627, is_auto_gen: 'true', message: response , sent_by : 'RESPONDER'}
        headers = {'Content-Type': 'application/json'}
        res = requests.post('http://localhost:5000/messages', data=json.dumps(data), headers=headers)
    return question(input)

@app.route("/whatsapp",  methods=['POST'])
def message():
    message = request.form['message']

    # Inser User question
    data = {'customer_id': 22003757346, responder_id  : 22001367627, is_auto_gen: 'false', message: input , sent_by : 'CUSTOMER'}
    headers = {'Content-Type': 'application/json'}
    res = requests.post('http://localhost:5000/messages', data=json.dumps(data), headers=headers)


@ask.intent("StopIntent")
def answer():
    return statement("Thank you. Have a Nice Day!")

if __name__ == '__main__':

    app.run(debug=True, port=6000)
