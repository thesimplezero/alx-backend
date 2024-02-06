#!/usr/bin/env python3

from flask import Flask, \
    render_template
from flask_babel import Babel

# Create Flask app
app = Flask(__name__)
# Instantiate Babel object
babel = Babel(app)

# Create Config class
class Config:
    # Define available languages
    LANGUAGES = ["en", "fr"]
    # Set default locale
    BABEL_DEFAULT_LOCALE = "en"
    # Set default timezone
    BABEL_DEFAULT_TIMEZONE = "UTC"

# Set Flask app config
app.config.from_object(Config)

# Define route for index page
@app.route('/')
def index():
    return render_template('1-index.html')

# Run app if executed directly
if __name__ == '__main__':
    app.run(debug=True)
