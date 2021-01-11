import os
from config import DOCS_DIR
from app.models import db, File

def boot():
  db.connect()
  db.drop_tables([File])
  db.create_tables([File])

  for path, subdirs, files in os.walk(DOCS_DIR):
    for name in files:
        full_path = os.path.join(path, name)
        relative_path = full_path.replace(DOCS_DIR, '.')
        file, created = File.get_or_create(full_path=full_path, relative_path=relative_path)
