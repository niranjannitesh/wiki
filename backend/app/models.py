from peewee import *

db = SqliteDatabase('db.sqlite3')

class File(Model):
  full_path = CharField(unique=True)
  relative_path = CharField(unique=True)
  title = CharField(null=True)

  @property
  def serialize(self):
      data = {
          'id': self.id,
          'relative_path': str(self.relative_path).strip(),
          'title': str(self.title).strip() if self.title else None
      }

      return data

  class Meta:
    database = db
