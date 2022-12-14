from flask.cli import AppGroup
from .users import seed_users, undo_users
from.posts import seed_Posts, undo_Posts
from .comments import seed_comments, undo_comments
from .friends import seed_friends, undo_friends

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_Posts()
    seed_comments()
    seed_friends()
    
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_Posts()
    undo_comments()
    undo_friends()
    # Add other undo functions here
