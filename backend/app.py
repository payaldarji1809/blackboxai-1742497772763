from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from models import db
from routes import routes  # ✅ Ensure this is correct

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
jwt = JWTManager(app)
CORS(app)

app.register_blueprint(routes)

# Create DB
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
