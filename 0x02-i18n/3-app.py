#!/usr/bin/env python3

from flask import Flask, \
    render_template
from flask_babel import Babel, \
    _

app = Flask(__name__)
babel = Babel(app)


class Config:
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@babel.localeselector
def get_locale():
    return request.accept_languages.best_match(Config.LANGUAGES)


@app.route('/')
def index():
    return render_template('3-index.html',
                           home_title=_("Welcome to Holberton"),
                           home_header=_("Hello world!"))


if __name__ == '__main__':
    app.run(debug=True)
