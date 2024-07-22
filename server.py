from flask import Flask
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


def save_feedback(feedback, username):
    try:
        with open('./feedback') as f:
            f.write(f"Username: {username}, Feedback: {feedback}\n")
    except Exception as e:
        print(f"Error occurred while saving feedback: {e}")


@socketio.on('connect', namespace='/feedback')
def handle_connect_feedback():
    print('Connected to /feedback')

@socketio.on('client_send', namespace='/feedback')
def handle_client_send_feedback(data):
    feedback = data['feedback']
    username = data['username']
    print(f"Received feedback '{feedback}' from {username}")
    # Save feedback to file
    save_feedback(feedback, username)
    emit('server_send', {'message': 'Feedback received'}, namespace='/feedback')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000, debug=True)
