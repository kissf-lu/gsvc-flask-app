#coding=utf-8
#!/usr/bin/env python

import os
from flask import Flask, render_template, session, redirect, url_for, flash
from flask.ext.script import Manager
from flask.ext.wtf import Form
from wtforms import StringField, SubmitField
from wtforms.validators import Required
from datetime import datetime
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.mail import Mail
from flask.ext.mail import Message
from threading import Thread


mail = Mail()
app = Flask(__name__)
app.config['SECRET_KEY'] = 'hard to guess string'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:gsvc123456@localhost:3306/gsvc_sql'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=True
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['MAIL_SERVER'] = 'smtp.126.com'
app.config['MAIL_PORT'] = '25'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['SECURITY_EMAIL_SENDER'] = 'gsvcsupport@126.com'

app.config['FLASK_MAIL_SUBJECT_PREFIX'] = '[Flasky]'
app.config['FLASK_MAIL_SENDER'] = 'Flasky Admin <gsvcsupport@126.com>'
app.config['FLASK_ADMIN'] =  os.environ.get('FLASK_ADMIN')

manager = Manager(app)

mail.init_app(app)
#表单类型声明

def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)

def send_email(to, subject, template, **kwargs):
    msg = Message(app.config['FLASK_MAIL_SUBJECT_PREFIX']+subject,
                sender=app.config['FLASK_MAIL_SENDER'],
                recipients=[to])
    msg.body = render_template(template+'.txt', **kwargs)
    msg.html = render_template(template+'.html', **kwargs)
    thr = Thread(target=send_async_email, args=[app, msg])
    thr.start()
    return thr






@app.route('/', methods=['GET', 'POST'])
def index():
    #name=None
    form=NameForm()
    if form.validate_on_submit():
        user = User.query.filter_by(name=form.name.data).first()
        role = Role.query.filter_by(username='User').first()
        if user is None:
            user = User(name=form.name.data,role=role)
            db.session.add(user)
            session['known'] = False
            if app.config['FLASK_ADMIN']:
                send_email(app.config['FLASK_ADMIN'], 'NEW USER', 'mail/new_user', name=user)

        else:
            session['known'] = True
        session['name'] = form.name.data
        form.name.data = ''
        return redirect(url_for('index'))
    return render_template('index.html',
                           form=form,
                           name=session.get('name'),
                           known=session.get('known',False))

@app.route('/user/<name>')
def user(name):
    return render_template('user.html',name=name)

@app.errorhandler(404)
def pag_not_found(e):
    return render_template('404.html'),404


if __name__ == "__main__":
    manager.run()
