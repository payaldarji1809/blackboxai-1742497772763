from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import hashlib
import qrcode
import os
from models import db, Client, Voter, VoteValidation, PublicVotes

routes = Blueprint("routes", __name__)

# Client Registration and Login routes remain unchanged
@routes.route("/register_client", methods=["POST"])
def register_client():
    try:
        data = request.json
        if not all(k in data for k in ("name", "email", "organization", "password")):
            return jsonify({"message": "Missing fields"}), 400

        hashed_password = generate_password_hash(data["password"], method="pbkdf2:sha256")
        
        client = Client(
            name=data["name"], 
            email=data["email"], 
            organization=data["organization"], 
            password=hashed_password
        )
        
        db.session.add(client)
        db.session.commit()
        return jsonify({"message": "Client Registered Successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@routes.route("/client_login", methods=["POST"])
def client_login():
    try:
        data = request.json
        client = Client.query.filter_by(email=data["email"]).first()

        if client and check_password_hash(client.password, data["password"]):
            token = create_access_token(identity=str(client.id))
            return jsonify({"token": token, "message": "Login Successful"}), 200
        
        return jsonify({"message": "Invalid Credentials"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Updated Voter Registration - Simplified version without JWT requirement
@routes.route("/register_voter", methods=["POST"])
def register_voter():
    try:
        data = request.json
        if "gov_ids" not in data:
            return jsonify({"message": "Missing government ID"}), 400

        # Generate unique token from government ID
        gov_id_string = str(data["gov_ids"])
        unique_token = hashlib.sha256(gov_id_string.encode()).hexdigest()
        
        # Check if voter already exists
        existing_voter = Voter.query.filter_by(gov_ids=gov_id_string).first()
        if existing_voter:
            return jsonify({"message": "Voter already registered"}), 400

        # Create new voter
        voter = Voter(
            gov_ids=gov_id_string,
            unique_token=unique_token,
            internal_id=hashlib.sha256((unique_token + "internal").encode()).hexdigest()
        )
        
        db.session.add(voter)
        db.session.commit()

        # Generate QR code
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(unique_token)
        qr.make(fit=True)
        
        # Save QR code
        qr_path = f"backend/qrcodes/{unique_token}.png"
        img = qr.make_image(fill_color="black", back_color="white")
        img.save(qr_path)

        return jsonify({
            "message": "Voter registered successfully",
            "token": unique_token,
            "qr_code": f"/qrcodes/{unique_token}.png"
        }), 201

    except Exception as e:
        print(f"Error in voter registration: {str(e)}")
        return jsonify({"error": str(e)}), 500

# New Voter Login route
@routes.route("/voter_login", methods=["POST"])
def voter_login():
    try:
        data = request.json
        if "voter_id" not in data:
            return jsonify({"message": "Missing voter ID"}), 400

        voter = Voter.query.filter_by(unique_token=data["voter_id"]).first()
        if not voter:
            return jsonify({"message": "Invalid voter ID"}), 401

        token = create_access_token(identity=voter.internal_id)
        return jsonify({
            "message": "Login successful",
            "token": token
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Other routes remain unchanged...
@routes.route("/client_details", methods=["GET"])
@jwt_required()
def client_details():
    try:
        client_id = get_jwt_identity()
        client = Client.query.get(client_id)

        if not client:
            return jsonify({"message": "Unauthorized"}), 401

        return jsonify({"name": client.name, "organization": client.organization}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@routes.route("/get_voters", methods=["GET"])
@jwt_required()
def get_voters():
    try:
        voters = Voter.query.all()
        if not voters:
            return jsonify([]), 200

        response_data = [
            {
                "id": voter.id,
                "gov_ids": voter.gov_ids,
                "unique_token": voter.unique_token
            } for voter in voters
        ]

        return jsonify(response_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@routes.route("/vote", methods=["POST"])
def vote():
    try:
        data = request.json
        if not all(k in data for k in ("internal_id", "vote")):
            return jsonify({"message": "Missing vote details"}), 400

        internal_id = data["internal_id"]
        hashed_vote = hashlib.sha256(data["vote"].encode()).hexdigest()
        confirmation_key = hashlib.sha256((hashed_vote + internal_id).encode()).hexdigest()

        if VoteValidation.query.filter_by(internal_id=internal_id).first():
            return jsonify({"message": "Already Voted"}), 400

        vote_validation = VoteValidation(
            internal_id=internal_id, 
            hashed_vote=hashed_vote, 
            confirmation_key=confirmation_key
        )
        db.session.add(vote_validation)

        candidate_vote = PublicVotes.query.filter_by(candidate=data["vote"]).first()
        if candidate_vote:
            candidate_vote.vote_count += 1
        else:
            new_vote = PublicVotes(candidate=data["vote"], vote_count=1)
            db.session.add(new_vote)

        db.session.commit()
        return jsonify({"message": "Vote Cast Successfully!", "confirmation_key": confirmation_key}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@routes.route("/verify_vote", methods=["POST"])
def verify_vote():
    try:
        data = request.json
        if "internal_id" not in data:
            return jsonify({"message": "Missing internal ID"}), 400

        vote_record = VoteValidation.query.filter_by(internal_id=data["internal_id"]).first()
        if vote_record:
            return jsonify({"message": "Vote Verified", "confirmation_key": vote_record.confirmation_key}), 200
        
        return jsonify({"message": "No Vote Found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@routes.route("/results", methods=["GET"])
def results():
    try:
        results = PublicVotes.query.all()
        return jsonify({vote.candidate: vote.vote_count for vote in results}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
