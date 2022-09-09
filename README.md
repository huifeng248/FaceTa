<!-- # Flask React Project

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


<br>

## Deploy to Heroku
This repo comes configured with Github Actions. When you push to your main branch, Github will automatically pull your code, package and push it to Heroku, and then release the new image and run db migrations. 

1. Write your Dockerfile. In order for the Github action to work effectively, it must have a configured Dockerfile. Follow the comments found in this [Dockerfile](./Dockerfile) to write your own!

2. Create a new project on Heroku.

3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres".

4. Configure production environment variables. In your Heroku app settings -> config variables you should have two environment variables set:

   |    Key          |    Value    |
   | -------------   | ----------- |
   | `DATABASE_URL`  | Autogenerated when adding postgres to Heroku app |
   | `SECRET_KEY`    | Random string full of entropy |

5. Generate a Heroku OAuth token for your Github Action. To do so, log in to Heroku via your command line with `heroku login`. Once you are logged in, run `heroku authorizations:create`. Copy the GUID value for the Token key.

6. In your Github Actions Secrets you should have two environment variables set. You can set these variables via your Github repository settings -> secrets -> actions. Click "New respository secret" to create
each of the following variables:

   |    Key            |    Value    |
   | -------------     | ----------- |
   | `HEROKU_API_KEY`  | Heroku Oauth Token (from step 6)|
   | `HEROKU_APP_NAME` | Heroku app name    |

7. Push to your `main` branch! This will trigger the Github Action to build your Docker image and deploy your application to the Heroku container registry. Please note that the Github Action will automatically upgrade your production database with `flask db upgrade`. However, it will *not* automatically seed your database. You must manually seed your production database if/when you so choose (see step 8).

8. *Attention!* Please run this command *only if you wish to seed your production database*: `heroku run -a HEROKU_APP_NAME flask seed all`

## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
| `heroku login -i`      | Authenticate your heroku-cli using the command line. Drop the -i to authenticate via the browser |
| `heroku authorizations:create` | Once authenticated, use this to generate an Oauth token |
| `heroku run -a <app name>` | Run a command from within the deployed container on Heroku |


heroku restart --app faceta && heroku pg:reset DATABASE --confirm faceta --app faceta && heroku run flask db migrate --app faceta && heroku run flask db upgrade --app faceta && heroku run flask seed all --app faceta -->

# Introduction
Welcome to FaceTa!

FaceTa is an online social media application inspired by FaceBook. You can share post and socialzie on FaceTa. The live side is available at https://faceta.herokuapp.com/. 

## Technologies used
 * [JavaScript](https://www.javascript.com/)
[<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="50" height="50" />](https://www.javascript.com/)
 
 * CSS
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

 * [React](https://reactjs.org/)
 [<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="50" height="50" />](https://reactjs.org/)

 * [Redux](https://redux.js.org/)
 [<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="50" height="50" />](https://redux.js.org/)

 * [Flask](https://flask.palletsprojects.com/en/2.2.x/)
[<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" width="50" height="50" />](https://flask.palletsprojects.com/en/2.2.x/)

 * [Python](https://www.python.org/)
[<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="50" height="50" 
/>](https://www.python.org/)

 * [SQLAlchemy](https://www.sqlalchemy.org/)
[<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" width="50" height="50" />](https://www.sqlalchemy.org/)
 
* HTML
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

## Feature 

### login and signup
1. You can login in if you already have an account or you can also log in a demo user.
![image](https://user-images.githubusercontent.com/91226395/189414838-f025de0b-8f48-4920-a4fe-b41cc9e123f0.png)



2. If you want to have your own account, please click sign up. 
![image](https://user-images.githubusercontent.com/91226395/189414897-41628f90-39ef-4c12-a7a8-51f44fc2ea89.png)

### HomePage
1. The homepage will display you and your friends' posts in chronological order.
![image](https://user-images.githubusercontent.com/91226395/189415369-e2f93325-01c7-406b-81ea-9faba7babfea.png)

### Create a post
1. Once logged in, you can click the grey input field "what's on your mind?" to see a popup form. You can fill in the form with discription and image url. 
![image](https://user-images.githubusercontent.com/91226395/189415915-4b50b38f-4bfc-40a1-9938-273f95fa55bc.png)
![image](https://user-images.githubusercontent.com/91226395/189415946-f62ed6b1-1a4d-4eea-8d2f-fac1b00498d0.png)

### Edit a post 
1. If you want to edit a post, you can click the ''' icon on the top right of your post. It would pop up a form pre-populating with your existing data for you to edit. 
![image](https://user-images.githubusercontent.com/91226395/189416152-4c12b1ae-7e2d-4880-9171-afa79010bbdb.png)
2. If you are changing of mind, and would love to cancel exit, you can exit by clicking the "X" button to opt out.
![image](https://user-images.githubusercontent.com/91226395/189416700-1aa06493-2c9c-40a7-aa87-22ec600ae9d6.png)


![image](https://user-images.githubusercontent.com/91226395/189416823-73a1e097-d831-45f0-ade2-c8a4642bdfb0.png)



### Delete a post
1. Similar to edit, you can click the ... icon on the top right of your post, it would show the drop down menu with the delete as an option. Once click that, the post would be deleted, and the comfirmation message would be shown. 

### Show all comments
1. You can click "show # comments" below the post image and it would show all related comments. You can click again to collaps all comments.
![image](https://user-images.githubusercontent.com/91226395/189417060-3b3a4887-74be-4971-a978-b9db9fbd9ba4.png)

### Create a comments
1. You can click on the "comments" to get focus on the comment input and type in your comments. Also you can clip the input file to leave a comment.
![image](https://user-images.githubusercontent.com/91226395/189417305-84597ff3-fb7f-49c7-bcba-be52e794ec5d.png)

### Edit and Delete a comment
1. If you want to change the comment after posted, you can click on the ... icon, and it would show the drop down menu with edit, delete and cancel options. You can certainly opt out by click anywhere outside the drop down box.
![image](https://user-images.githubusercontent.com/91226395/189417720-7e101eed-f3e3-4a5a-a277-133c345ab702.png)

2. You can update the edit input field and click save. The comment would be updated and posted immidiately. You can click Cancel if you are changing of mind.
![image](https://user-images.githubusercontent.com/91226395/189418252-9cd44b66-8096-4b88-aff7-ae3fb39bfa20.png)

3. Once a Delete is clicked, the comments would be deleted, and the comfirmation message would be shown. 
![image](https://user-images.githubusercontent.com/91226395/189418646-e9e01cd4-b56d-4f73-ac0c-9acaecf6f19a.png)

## Feature list
### Demo User Login
* Guest Users have the ability to log in as a demo user to test site functionality

### Posts - Full CRUD
* Logged in user can create posts
* Logged in user can edit posts
* Logged in user can delete posts
* Logged in user can see other users posts
* Logged in user cannot see, edit, create or delete other's posts

### Commenting on Post - Full CRUD
* Logged in user can create comments on posts
* Logged in user can edit their comments on posts
* Logged in user can edit their comments
* Logged in user can see other users comments on posts
* Logged in user cannot see, edit, create or delete others' comments

### Link to WIKI and additional information

[Wiki](https://github.com/huifeng248/Abby-Calstone-project/wiki)

[Feature List](https://github.com/huifeng248/Abby-Calstone-project/wiki/Feature-list)

[Database Schema](https://github.com/huifeng248/Abby-Calstone-project/wiki/Database-Schema)

[User Stories](https://github.com/huifeng248/Abby-Calstone-project/wiki/User-stories)


### To-dos/future features
* Post likes
* Comment likes
* Friends
* Search
* Messaging



