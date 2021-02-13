from flask import Flask
from flask_cors import CORS
from app.utils.boot import boot
from app.models import db
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler
from config import DOCS_DIR, FILE_EXTENTIONS


def create_app():

    app = Flask(__name__)
    CORS(app)

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

    def on_changed(event):
        boot(connect=False)
        print(f"something, {event.src_path}")

    # watch files and restart
    patterns = "*"
    ignore_patterns = ""
    ignore_directories = False
    case_sensitive = True
    my_event_handler = PatternMatchingEventHandler(
        patterns, ignore_patterns, ignore_directories, case_sensitive)

    my_event_handler.on_created = on_changed
    my_event_handler.on_deleted = on_changed
    my_event_handler.on_modified = on_changed
    my_event_handler.on_moved = on_changed

    path = DOCS_DIR
    go_recursively = True
    my_observer = Observer()
    my_observer.schedule(my_event_handler, path, recursive=go_recursively)

    my_observer.start()

    return app
