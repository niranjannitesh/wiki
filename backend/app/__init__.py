from flask import Flask
from app.utils.boot import boot
from app.models import db

def create_app():

  app = Flask(__name__)


  @app.before_request
  def before_request():
      db.connect()

  @app.after_request
  def after_request(response):
      db.close()
      return response

  from app.api import api as api_blueprint
  app.register_blueprint(api_blueprint, url_prefix='/api')

  boot()

  return app
