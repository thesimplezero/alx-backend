#!/usr/bin/env python3

"""Adding a get locale function with the babel.localeselector decorator."""

from flask_babel import Babel
from flask import Flask, render_template, request, g

app = Flask(__name__)
babel = Babel(app)


class Config(object):
    """Configure available languages in our app."""

    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


@app.route('/', methods=['GET'], strict_slashes=False)
def index() -> str:
    """Render simple hello world html file."""
    return render_template('5-index.html')


@babel.localeselector
def get_locale() -> str:
    """Get locale language code from request accepted languages."""
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])


def get_user(user_id: int) -> dict:
    """Get a user dictionary or none from passed ID."""
    login_id = request.args.get('login_as')
    if login_id:
        user_id = int(login_id)
    if user_id in users:
        return users.get(user_id)
    else:
        return None


@app.before_request
def before_request() -> None:
    """Before request handler."""
    user = get_user(request.args.get('login_as'))
    if user:
        g.user = user


if __name__ == "__main__":
    app.run()
