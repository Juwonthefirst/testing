from flask import Flask, jsonify
from flask_cors import CORS
from livekit import api
import random

livekit_api_key="APIAQLR8akGL3cZ"
livekit_api_secret="14uF9eaSWJBjowiryMX6wp7Bi7cCjXCV0SQIVFoaG7O"


app = Flask(__name__)
CORS(app)

@app.get("/")
def get_token():
	identity = str(random.randint(1, 100))
	token = api.AccessToken(livekit_api_key, livekit_api_secret
	).with_identity(identity).with_name("juwon").with_grants(api.VideoGrants(
		room_join = True,
		room = "chat",
		can_publish = True
	)).to_jwt()
	
	return jsonify({"token": token})

app.run(host = "0.0.0.0", debug = True)