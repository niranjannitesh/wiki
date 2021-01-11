from app.api import api
from app.models import File
from flask import jsonify

@api.route('/',  methods=['GET'])
def index():
  return "pong!"

@api.route('/file', methods=['GET'])
def list_all_files():
    query = File.select()
    data = [i.serialize for i in query]
    return jsonify(data)
