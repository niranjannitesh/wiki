# wikiki/backend

Backend for wikiki

## Developing

Create and activate a Python 3 virtual environment:

```sh
$ python3 -m venv .env
$ source .env/bin/activate
```

Then install requirements dependencies:

```sh
$ pip install -r requirements.txt
```

Setup flask env variables:

```sh
$ export FLASK_APP=wsgi.py

$ export FLASK_ENV=development

$ flask run
```
