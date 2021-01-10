from app.api import api

@api.route('/',  methods=['GET'])
def index():
  return "pong!"
