#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Import necessary modules
from flask_babel import Babel
from flask import *

# Initialize Flask and Babel
app = Flask(__name__)
babel = Babel(app)


class Config(object):
    """App configuration."""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


# Apply configuration
app.config.from_object(Config)


# Define users
users = {
    1: {"name": "Balou", "locale": "fr",
        "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en",
        "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg",
        "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None,
        "timezone": "Europe/London"},
}


@app.route('/', methods=['GET'], strict_slashes=False)
def index() -> str:
    """Render index page."""
    return render_template('5-index.html')


@babel.localeselector
def get_locale() -> str:
    """Get locale from URL, user, or header."""

    # Check URL parameters
    locale = request.args.get('locale')
    if locale and locale in app.config['LANGUAGES']:
        return locale

    # Check user settings
    if hasattr(g, 'user') and 'locale' in g.user and\
            g.user['locale'] in app.config['LANGUAGES']:
        return g.user['locale']

    # Check request header
    return request.accept_languages.best_match(
        app.config['LANGUAGES'])


def get_user(user_id: int) -> dict:
    """Get user by ID."""
    login_id = request.args.get('login_as')
    if login_id:
        user_id = int(login_id)

    if user_id in users:
        return users.get(user_id)
    else:
        return None


@app.before_request
def before_request() -> None:
    """Handle pre-request actions."""
    user = get_user(request.args.get('login_as'))
    if user:
        g.user = user


if __name__ == "__main__":
    app.run()
