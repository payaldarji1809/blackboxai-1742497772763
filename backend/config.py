import os

class Config:
    SECRET_KEY = "root"  # Change this to a strong secret key
    SQLALCHEMY_DATABASE_URI = "sqlite:///voting.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = os.path.join(os.getcwd(), "qrcodes")
