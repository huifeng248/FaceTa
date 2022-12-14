from crypt import methods
from sqlalchemy import delete
from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post, Comment, Friends, Postslikes
from flask_login import current_user, login_user, logout_user, login_required
from app.forms.post_form import PostForm, FormValidation
from app.forms.comment_form import CommentForm
# from app.models import Imageslikes

from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)


post_routes = Blueprint('posts', __name__)
# homepage get all post including no friends
@post_routes.route('')
@login_required
def get_posts_at_homepage_all_post():
    id = current_user.id
    posts= Post.query.all()
    posts_to_json= [post.to_dict() for post in posts]
    # post_userId = [post.user_id for post in posts]
    for post in posts_to_json:
        # for every post, include the post user info
        post['user'] = User.query.get(post['user_id']).to_dict()
        
        if len(post['liked_user_ids']) == 0:
            post['current_user_like'] = False
        
        for user in post["liked_user_ids"]:
            if user['id'] == current_user.id:
                post['current_user_like'] = True
            else:
                post['current_user_like'] = False
    return jsonify(posts_to_json)


# homepage get posts
# @post_routes.route('')
# @login_required
# def get_posts_at_homepage():
#     id = current_user.id
#     #get the friends for the current user by filtering userId
#     friend_obj_list = Friends.query.filter(Friends.user_id == id).all()
#     friend_arr_list = [friend.friend_id for friend in friend_obj_list]
#     #append userid into that list
#     friend_arr_list.append(id)
#     posts = Post.query.filter(Post.user_id.in_(friend_arr_list)).order_by(
#         Post.createdAt.desc()).all()
#     posts_to_json= [post.to_dict() for post in posts]
#     # post_userId = [post.user_id for post in posts]
#     for post in posts_to_json:
#         # for every post, include the post user info
#         post['user'] = User.query.get(post['user_id']).to_dict()
#         for user in post["liked_user_ids"]:
#             if user['id'] == current_user.id:
#                 post['current_user_like'] = True
#             else:
#                 post['current_user_like'] = False
#     return jsonify(posts_to_json)


# get post by post id
@post_routes.route('/<id>')
@login_required
def get_post_by_post_id(id):
    post = Post.query.get(id)
    if (not post):
        result = {
            "message": "post does not exist",
            "statusCode": 404
            }
        return jsonify(result)
    else: 
        post_to_json = post.to_dict()
        return jsonify(post_to_json)

# get post by user id, get all posts of a certain user 
@post_routes.route('users/<id>')
@login_required
def get_all_posts_by_userid(id):
    user = User.query.get(id)
    if (not user):
        result = {
            "message": "user not exist",
            "statusCode": 404
        }
        return result
    posts = Post.query.filter(Post.user_id == id).order_by(Post.createdAt.desc()).all()
    if (not len(posts)):
        result = {
            "message": "user does not have any post yet",
            "statusCode": 404
        }
        return result

    posts_to_json= [post.to_dict() for post in posts]
    post_userId = [post.user_id for post in posts]
    
    for post in posts_to_json:
        # for every post, include the post user info
        post['user'] = User.query.get(post['user_id']).to_dict()
        
        if len(post['liked_user_ids']) == 0:
            post['current_user_like'] = False
            
        for user in post["liked_user_ids"]:
            if user['id'] == current_user.id:
                post['current_user_like'] = True
            else:
                post['current_user_like'] = False
        
    return jsonify(posts_to_json)

# create a post 
# using image url
# @post_routes.route('/new', methods=['POST'])
# @login_required
# def add_post():
#     form = PostForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         post = Post(
#             user_id = current_user.id,
#             url = form.data['url'],
#             description = form.data['description'],
#             location = form.data['location'],
#             show_stats = form.data['show_stats']
#         )
#         db.session.add(post)
#         db.session.commit()
#         post = post.to_dict()
#         post['user'] = User.query.get(current_user.id).to_dict()
#         return post
#     else:
#         return jsonify(form.errors)
#create a post 
# using aws s3 upload
@post_routes.route('/new', methods=['POST'])
@login_required
def add_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
    # aws
        if "uploadImage" not in request.files:
            return {"errors": "image required"}, 400

        image = request.files["uploadImage"]

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]

        # # flask_login allows us to get the current user from the request
        # new_image = Image(user=current_user, url=url)
        # db.session.add(new_image)
        # db.session.commit()
        # return {"url": url}

        post = Post(
            user_id = current_user.id,
            # url = form.data['url'],
            url = url,
            description = form.data['description'],
            location = form.data['location'],
            show_stats = bool(form.data['show_stats'])
        )

        db.session.add(post)
        db.session.commit()
        post = post.to_dict()
        post['user'] = User.query.get(current_user.id).to_dict()
        return post
    else:
        return jsonify(form.errors)


#update a post 
@post_routes.route('/<id>', methods=['PUT'])
@login_required
def update_post(id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post = Post.query.get(id)
    if (not post):
        result = {
            "message": "post does not exist",
            "statusCode": 404
            }
        return jsonify(result)
    if (post.user_id != current_user.id):
        result = {
            "message": "cannot edit other's post",
            "statusCode": 403
            }
        return jsonify(result)
    if form.validate_on_submit():
        # post.url = form.data['url']
        post.description = form.data['description']
        post.location = form.data['location']
        post.show_stats = form.data['show_stats']
        db.session.commit()
        post = post.to_dict()
        post['user'] = User.query.get(current_user.id).to_dict()
        return jsonify(post)
    else:
        return jsonify(form.errors)


#delete a post 
@post_routes.route('/<id>', methods=['DELETE'])
@login_required
def delete_post(id):
    form = FormValidation()
    form['csrf_token'].data = request.cookies['csrf_token']

    post = Post.query.get(id)
    if (not post):
        result = {
            "message": "post does not exist",
            "statusCode": 404
            }
        return jsonify(result)
    if (post.user_id != current_user.id):
        result = {
            "message": "cannot delete other's post",
            "statusCode": 403
            }
        return jsonify(result)
    if form.validate_on_submit():
        db.session.delete(post)
        db.session.commit()
        result = {
            "message": "Successfully deleted!"
        }
        return jsonify(result)
    
# get comment for a post

# create a comment on a given post 
@post_routes.route('/<id>/comments/new', methods=['POST'])
@login_required
def create_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post = Post.query.get(id)
    if (not post):
        result = {
            "message": "post does not exist",
            "statusCode": 404
        }
        return jsonify(result)
    
    
    if form.validate_on_submit():
        comment = Comment(
            user_id = current_user.id,
            comment = form.data['comment'],
            post_id = id
        )
        db.session.add(comment)
        db.session.commit()
        comment = comment.to_dict()
        return jsonify(comment)
    else :
        return jsonify(form.errors)




# like and unlike a post
@post_routes.route('/<int:id>/likes', methods=['POST'])
@login_required
def add_remove_post_like(id):
    form = FormValidation()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post.query.get(id)
        # if post not exist
        if (not post):
            result = {
            "message": "post does not exist",
            "statusCode": 404
            }
            return jsonify(result)
        # if post exist
        post = post.to_dict()
        # post['user'] = User.query.get(post['user_id']).to_dict()
        current_user_id = current_user.id
        ## if current user likes the post, delete the likes
        for user in post['liked_user_ids']:
            if user['id'] == current_user_id:
                delete_post_like = delete(Postslikes).where(
                    Postslikes.c.user_id == current_user_id,
                    Postslikes.c.post_id == id
                )
                db.engine.execute(delete_post_like)
                new_post = Post.query.get(id).to_dict()
                new_post['user'] = User.query.get(post['user_id']).to_dict()
                new_post['current_user_like'] = False
                return jsonify(new_post)
        
        ## if no likes, need to add the likes
        add_like = Postslikes.insert().values((current_user_id, id))
        db.engine.execute(add_like)
        new_post = Post.query.get(id).to_dict()
        new_post['user'] = User.query.get(post['user_id']).to_dict()
        new_post['current_user_like'] = True
        return jsonify(new_post)
    
    else:
        return jsonify(form.errors)

        