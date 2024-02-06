#!/usr/bin/env python3

""" simple flask app that renders a basic html template """

from flask import *

app = Flask(__name__)


@app.route('/', methods=['GET'], strict_slashes=False)
def hello_world() -> str:
    """ basic flask app route that renders a html file """
    return render_template("0-index.html")


if __name__ == "__main__":
    app.run()
