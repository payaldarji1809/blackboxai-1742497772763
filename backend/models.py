from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    organization = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

class Voter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=True)  # Made optional
    last_name = db.Column(db.String(100), nullable=True)   # Made optional
    email = db.Column(db.String(100), nullable=True)       # Made optional
    dob = db.Column(db.String(100), nullable=True)         # Made optional
    address = db.Column(db.String(10000), nullable=True)   # Made optional
    gov_ids = db.Column(db.String(200), nullable=False)    # Required for registration
    unique_token = db.Column(db.String(100), unique=True, nullable=False)  # Voter ID
    internal_id = db.Column(db.String(100), unique=True, nullable=False)   # For vote tracking

class VoteValidation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    internal_id = db.Column(db.String(100), unique=True, nullable=False)
    hashed_vote = db.Column(db.String(100), nullable=False)
    confirmation_key = db.Column(db.String(100), unique=True, nullable=False)

class PublicVotes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    candidate = db.Column(db.String(50), nullable=False)
    vote_count = db.Column(db.Integer, default=0)
