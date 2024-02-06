#!/usr/bin/env python3
# Import necessary modules
from flask import Flask, \
    render_template, request
from flask_babel import Babel, \
    _
app = Flask(__name__)
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

# Get locale from request
@babel.localeselector
def get_locale():
    return request.accept_languages.best_match(Config.LANGUAGES)

# Define route for index page
@app.route('/')
def index():
    return render_template('2-index.html')


# Run app if executed directly
if __name__ == '__main__':
    app.run(debug=True)
