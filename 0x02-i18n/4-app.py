#!/usr/bin/env python3

"""Babel locale selector"""

from flask_babel import Babel
from flask import Flask, render_template, request

app = Flask(__name__)
babel = Babel(app)


class Config(object):
    """Configure app languages"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)


@app.route('/', methods=['GET'], strict_slashes=False)
def index() -> str:
    """Render hello world"""
    return render_template('4-index.html')


@babel.localeselector
def get_locale() -> str:
    """Get locale from request"""
    locale = request.args.get('locale')
    if locale and locale in app.config['LANGUAGES']:
        return locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])


if __name__ == "__main__":
    app.run()
