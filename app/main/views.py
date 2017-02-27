#!/usr/bin/env python
# -*- coding: utf-8 -*-

from bson import json_util
from datetime import  datetime
import flask_excel as excel
from flask import render_template, redirect, url_for, session, abort, flash, request,\
    current_app, jsonify, json, make_response
from flask_login import login_required, current_user
from flask_sqlalchemy import get_debug_queries
from . import main
from .forms import NameForm, EditProfileForm, EditProfileAdminForm, PostForm, SrcvsimForm
from .. import db,cache
from ..models import User, Post,  Permission, Role, VsimManualInfor
from ..decorators import admin_required, permission_required
from ..api_1_0 import exportExcelFunc



@main.route('/')
@login_required
def index():
    return render_template('index.html')


@main.route('/gsvchome', methods=['GET', 'POST'])
@login_required
def gsvchome():
    return render_template('gsvchome.html')


@main.route('/user/<username>')
@login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    page = request.args.get('page', 1, type=int)
    pagination = user.posts.order_by(Post.timestamp.desc()).paginate(
        page, per_page=current_app.config['FLASKY_POSTS_PER_PAGE'],
        error_out=False)
    posts = pagination.items
    return render_template('user.html', user=user, posts=posts,
                           pagination=pagination)


@main.route('/edit-profile', methods=['GET', 'POST'])
@login_required
def edit_profile():
    form = EditProfileForm()
    if form.validate_on_submit():
        current_user.name = form.name.data
        current_user.location = form.location.data
        current_user.about_me = form.about_me.data
        db.session.add(current_user)
        flash('Your profile has been updated.')
        return redirect(url_for('.user', username=current_user.username))
    form.name.data = current_user.name
    form.location.data = current_user.location
    form.about_me.data = current_user.about_me
    return render_template('edit_profile.html', form=form)


@main.route('/edit-profile/<int:id>', methods=['GET', 'POST'])
@login_required
@admin_required
def edit_profile_admin(id):
    user = User.query.get_or_404(id)
    form = EditProfileAdminForm(user=user)
    if form.validate_on_submit():
        user.email = form.email.data
        user.username = form.username.data
        user.confirmed = form.confirmed.data
        user.role = Role.query.get(form.role.data)
        user.name = form.name.data
        user.location = form.location.data
        user.about_me = form.about_me.data
        db.session.add(user)
        db.session.commit()
        flash('The profile has been updated.')
        return redirect(url_for('.user', username=user.username))
    form.email.data = user.email
    form.username.data = user.username
    form.confirmed.data = user.confirmed
    form.role.data = user.id_role
    form.name.data = user.name
    form.location.data = user.location
    form.about_me.data = user.about_me
    return render_template('edit_profile.html', form=form, user=user)


@main.route('/post/<int:id>', methods=['GET', 'POST'])
def post(id):
    post = Post.query.get_or_404(id)
    return render_template('post.html', posts=[post])


@main.route('/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit(id):
    post = Post.query.get_or_404(id)
    if current_user != post.author and \
            not current_user.can(Permission.ADMIN):
        abort(403)
    form = PostForm()
    if form.validate_on_submit():
        post.body = form.body.data
        db.session.add(post)
        flash('The post has been updated.')
        return redirect(url_for('.post', id=post.id))
    form.body.data = post.body
    return render_template('edit_post.html', form=form)

@main.route('/srcimsi/<username>/_query_vsim/')
@login_required
def query_vsim(username):
    #user_query = User.query.filter_by(username=username).first_or_404()
    #name = user_query.username
    country = request.args.get('a', '', type=str)
    person = request.args.get('b', '', type=str)
    #user_gsvc = User.query.filter_by(name=person).first_or_404()
    person_gsvc = person
    if country == "" and person == "":
        vsim_con=VsimManualInfor.query.count()
    elif country == "" and person != "":
        vsim_con = VsimManualInfor.query.filter_by(person_gsvc=person_gsvc).count()
    elif country != "" and person == "":
        vsim_con = VsimManualInfor.query.filter_by(country_iso=country).count()
    else:
        vsim_con = VsimManualInfor.query.filter_by(country_iso=country, person_gsvc=person_gsvc).count()

    query = [{'country': country,'person': person_gsvc, 'vsim_con': vsim_con}]
    return json.dumps(query, sort_keys=True, indent=4)


@main.route('/srcimsi/<username>', methods=['GET', 'POST'])
@login_required

def srcimsi(username):

    user = User.query.filter_by(username=username).first_or_404()

    return render_template('VsimManual.html',
                           user=user,
                           current_time=datetime.utcnow())


@main.route('/mutiCountryVsimSRC/140country')
@login_required
def mutiCountrySRC_140country():

    return render_template('140country_flowerStatic.html')


@main.route('/probVsimFirstDict')
@login_required
def probVsimFirstDict():
    """

    :return:
    """

    return render_template('probVsimFirstDict.html')


@main.route('/vsimFlowerQuery')
@login_required
def vsimFlowerQuery():
    """

    :return:
    """

    return render_template('vsimFlowerQuery.html')


@main.route('/test_jquery/_add_numbers')
@login_required
def add_numbers():
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    return jsonify(result=a + b)


@main.route('/test_uploadfiles')
@login_required
def test_jqxgrid():
    return render_template('test_jquery/test_uploadfiles.html')

@main.route('/test_uploadExcel', methods=['GET','POST'])
@login_required
def export_excel():
    if request.method == 'POST':
        arrayData = request.get_array(field_name='file')
        DicData = exportExcelFunc.getDictExcelData(array_data= arrayData)
        print (DicData['data'][0])
        if DicData['err']:
            returnJsonData = {'err': True, 'errinfo': DicData['errinfo'], 'data': []}
        else:
            returnJsonData = {'err': False, 'errinfo': DicData['errinfo'], 'data': DicData['data']}
            return jsonify({"data": returnJsonData})


    return render_template('/test_jquery/test_uploadfiles.html')








