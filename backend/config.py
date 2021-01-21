# Statement for enabling the development environment
DEBUG = True
PORT = 8080

# Define the application directory
import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
FILE_EXTENTIONS = ['.md', '.txt']

DOCS_DIR = os.path.join(BASE_DIR, 'docs')
