#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, request, render_template, jsonify, json
from flask_sqlalchemy import SQLAlchemy
"""
A example for creating a Table that is sortable by its header
"""

app = Flask(__name__)

db = SQLAlchemy(app)

class SortableTable(db.Model):
    imsi = Col('imsi')
    name = Col('person_gsvc')
    description = Col('country_iso')
    link = LinkCol(
        'Link', 'flask_link', url_kwargs=dict(imsi='imsi'), allow_sort=False)
    allow_sort = True

    def sort_url(self, col_key, reverse=False):
        if reverse:
            direction = 'desc'
        else:
            direction = 'asc'
        return url_for('index', sort=col_key, direction=direction)


@app.route('/')
def index():
    sort = request.args.get('sort', 'imsi')
    reverse = (request.args.get('direction', 'asc') == 'desc')
    table = SortableTable(Item.get_sorted_by(sort, reverse),
                          sort_by=sort,
                          sort_reverse=reverse)
    return table.__html__()


@app.route('/item/<int:imsi>')
def flask_link(imsi):
    element = Item.get_element_by_imsi(imsi)
    return '<h1>{}</h1><p>{}</p><hr><small>imsi: {}</small>'.format(
        element.name, element.description, element.imsi)


class Item(object):
    """ a little fake database """
    def __init__(self, imsi, name, description):
        self.imsi = imsi
        self.name = name
        self.description = description

    @classmethod
    def get_elements(cls):
        return [
            Item(1, 'Z', 'zzzzz'),
            Item(2, 'K', 'aaaaa'),
            Item(3, 'B', 'bbbbb')]

    @classmethod
    def get_sorted_by(cls, sort, reverse=False):
        return sorted(
            cls.get_elements(),
            key=lambda x: getattr(x, sort),
            reverse=reverse)

    @classmethod
    def get_element_by_imsi(cls, imsi):
        return [i for i in cls.get_elements() if i.imsi == imsi][0]

if __name__ == '__main__':
    app.run(debug=True)
