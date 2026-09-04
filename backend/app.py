from flask import Flask, request, jsonify
from flask_cors import CORS

from config import (
    SQLALCHEMY_DATABASE_URI,
    SQLALCHEMY_TRACK_MODIFICATIONS
)

from extensions import db


app = Flask(__name__)


# =========================
# DATABASE CONFIGURATION
# =========================

app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = (
    SQLALCHEMY_TRACK_MODIFICATIONS
)


db.init_app(app)

CORS(app)


# =========================
# HOME
# =========================

@app.route("/")
def home():

    return {
        "message":
            "ResLink Mbombela API connected!"
    }


# =========================
# TEST DATABASE
# =========================

@app.route("/test-db")
def test_db():

    try:

        db.session.execute(
            db.text("SELECT 1")
        )

        return {
            "status":
                "success",

            "message":
                "MySQL database connected successfully!"
        }

    except Exception as e:

        return {
            "status":
                "error",

            "message":
                str(e)
        }, 500


# =========================
# ACCOMMODATIONS
# =========================

@app.route(
    "/api/accommodations",
    methods=["GET"]
)
def get_accommodations():

    from models import Accommodation

    accommodations = Accommodation.query.all()

    results = []

    for accommodation in accommodations:

        results.append({

            "id":
                accommodation.id,

            "name":
                accommodation.name,

            "address":
                accommodation.address,

            "accredited":
                accommodation.accredited,

            "description":
                accommodation.description,

            "contact_number":
                accommodation.contact_number,

            "image_url":
                accommodation.image_url

        })

    return results


# =========================
# CREATE ACCOMMODATION
# =========================

@app.route(
    "/api/accommodations",
    methods=["POST"]
)
def create_accommodation():

    from models import Accommodation

    data = request.get_json()

    accommodation = Accommodation(

        name=data["name"],

        address=data["address"],

        image_url=data.get(
            "image_url"
        ),

        accredited=data.get(
            "accredited",
            False
        ),

        description=data.get(
            "description"
        ),

        contact_number=data.get(
            "contact_number"
        ),

        institution_id=data[
            "institution_id"
        ]

    )

    db.session.add(
        accommodation
    )

    db.session.commit()

    return {

        "message":
            "Accommodation created successfully!",

        "id":
            accommodation.id

    }, 201


# =========================
# DELETE ACCOMMODATION
# =========================

@app.route(
    "/api/accommodations/<int:accommodation_id>",
    methods=["DELETE"]
)
def delete_accommodation(
    accommodation_id
):

    from models import (
        Accommodation,
        Room,
        Application
    )

    accommodation = db.session.get(
        Accommodation,
        accommodation_id
    )

    if not accommodation:

        return jsonify({
            "error":
                "Accommodation not found."
        }), 404


    # Check if accommodation has rooms

    rooms = Room.query.filter_by(
        accommodation_id=
            accommodation_id
    ).all()

    if rooms:

        return jsonify({
            "error":
                "Cannot delete accommodation because it still has rooms."
        }), 400


    # Check if accommodation has applications

    applications = Application.query.filter_by(
        accommodation_id=
            accommodation_id
    ).all()

    if applications:

        return jsonify({
            "error":
                "Cannot delete accommodation because it has applications."
        }), 400


    db.session.delete(
        accommodation
    )

    db.session.commit()

    return jsonify({
        "message":
            "Accommodation deleted successfully."
    }), 200


# =========================
# ROOMS
# =========================

@app.route(
    "/api/rooms",
    methods=["GET"]
)
def get_rooms():

    from models import Room

    rooms = Room.query.all()

    results = []

    for room in rooms:

        available_spaces = (
            room.capacity -
            room.occupied
        )

        results.append({

            "id":
                room.id,

            "room_number":
                room.room_number,

            "room_type":
                room.room_type,

            "price":
                room.price,

            "capacity":
                room.capacity,

            "occupied":
                room.occupied,

            "available_spaces":
                available_spaces,

            "accommodation_id":
                room.accommodation_id

        })

    return results


# =========================
# CREATE ROOM
# =========================

@app.route(
    "/api/rooms",
    methods=["POST"]
)
def create_room():

    from models import Room

    data = request.get_json()

    room = Room(

        room_number=
            data["room_number"],

        room_type=
            data["room_type"],

        price=
            data["price"],

        capacity=
            data["capacity"],

        occupied=
            data.get(
                "occupied",
                0
            ),

        accommodation_id=
            data["accommodation_id"]

    )

    db.session.add(
        room
    )

    db.session.commit()

    return {

        "message":
            "Room created successfully!",

        "id":
            room.id

    }, 201


# =========================
# DELETE ROOM
# =========================

@app.route(
    "/api/rooms/<int:room_id>",
    methods=["DELETE"]
)
def delete_room(room_id):

    from models import Room

    room = db.session.get(
        Room,
        room_id
    )

    if not room:

        return {
            "error":
                "Room not found"
        }, 404


    if room.occupied > 0:

        return {
            "error":
                "Cannot delete a room that is currently occupied."
        }, 400


    db.session.delete(
        room
    )

    db.session.commit()

    return {

        "message":
            "Room deleted successfully!"

    }, 200


# =========================
# MARK ROOM AS FREE
# =========================

@app.route(
    "/api/rooms/<int:room_id>/free",
    methods=["PUT"]
)
def mark_room_as_free(
    room_id
):

    from models import Room

    room = db.session.get(
        Room,
        room_id
    )

    if not room:

        return {
            "error":
                "Room not found"
        }, 404


    room.occupied = 0

    db.session.commit()

    return {

        "message":
            "Room marked as free successfully!",

        "room": {

            "id":
                room.id,

            "room_number":
                room.room_number,

            "capacity":
                room.capacity,

            "occupied":
                room.occupied,

            "available_spaces":
                room.capacity -
                room.occupied

        }

    }, 200


# =========================
# STUDENTS
# =========================

@app.route(
    "/api/students",
    methods=["GET"]
)
def get_students():

    from models import Student

    students = Student.query.all()

    results = []

    for student in students:

        results.append({

            "id":
                student.id,

            "full_name":
                student.full_name,

            "email":
                student.email,

            "phone":
                student.phone,

            "institution_id":
                student.institution_id

        })

    return results


# =========================
# CREATE STUDENT
# =========================

@app.route(
    "/api/students",
    methods=["POST"]
)
def create_student():

    from models import Student
    from werkzeug.utils import secure_filename
    import os
    from datetime import datetime

    # =========================
    # GET FORM DATA
    # =========================

    full_name = request.form.get(
        "full_name"
    )

    email = request.form.get(
        "email"
    )

    phone = request.form.get(
        "phone"
    )

    date_of_birth = request.form.get(
        "date_of_birth"
    )

    gender = request.form.get(
        "gender"
    )

    institution_id = request.form.get(
        "institution_id"
    )

    funding_type = request.form.get(
        "funding_type"
    )

    password = request.form.get(
        "password"
    )

    funding_document = request.files.get(
        "funding_document"
    )

    # =========================
    # VALIDATION
    # =========================

    if not full_name:
        return {
            "error": "Full name is required."
        }, 400

    if not email:
        return {
            "error": "Email address is required."
        }, 400

    if not date_of_birth:
        return {
            "error": "Date of birth is required."
        }, 400

    if not gender:
        return {
            "error": "Gender is required."
        }, 400

    if not institution_id:
        return {
            "error": "Institution is required."
        }, 400

    if not funding_type:
        return {
            "error": "Funding type is required."
        }, 400

    if not password:
        return {
            "error": "Password is required."
        }, 400

    if not funding_document:
        return {
            "error":
                "Funding approval document is required."
        }, 400

    # =========================
    # CHECK EMAIL
    # =========================

    existing_student = Student.query.filter_by(
        email=email
    ).first()

    if existing_student:

        return {
            "error":
                "An account with this email already exists."
        }, 400

    # =========================
    # VALIDATE DATE
    # =========================

    try:

        parsed_date_of_birth = datetime.strptime(
            date_of_birth,
            "%Y-%m-%d"
        ).date()

    except ValueError:

        return {
            "error":
                "Invalid date of birth."
        }, 400

    # =========================
    # VALIDATE FILE
    # =========================

    allowed_extensions = {
        "pdf",
        "jpg",
        "jpeg",
        "png"
    }

    filename = secure_filename(
        funding_document.filename
    )

    if not filename:

        return {
            "error":
                "Invalid funding document."
        }, 400

    file_extension = (
        filename.rsplit(".", 1)[1].lower()
        if "." in filename
        else ""
    )

    if file_extension not in allowed_extensions:

        return {
            "error":
                "Invalid file type. Please upload a PDF, JPG, JPEG or PNG document."
        }, 400

    # =========================
    # CREATE UPLOAD FOLDER
    # =========================

    upload_folder = os.path.join(
        "uploads",
        "funding_documents"
    )

    os.makedirs(
        upload_folder,
        exist_ok=True
    )

    # =========================
    # SAVE DOCUMENT
    # =========================

    file_path = os.path.join(
        upload_folder,
        filename
    )

    funding_document.save(
        file_path
    )

    # =========================
    # CREATE STUDENT
    # =========================

    student = Student(

        full_name=
            full_name,

        email=
            email,

        phone=
            phone,

        date_of_birth=
            parsed_date_of_birth,

        gender=
            gender,

        funding_type=
            funding_type,

        funding_document=
            file_path,

        institution_id=
            int(institution_id),

        password=
            password
    )

    db.session.add(
        student
    )

    db.session.commit()

    return {

        "message":
            "Student created successfully!",

        "id":
            student.id

    }, 201

# =========================
# APPLICATIONS
# =========================

@app.route(
    "/api/applications",
    methods=["GET"]
)
def get_applications():

    from models import Application

    applications = Application.query.all()

    results = []

    for application in applications:

        results.append({

            "id":
                application.id,

            "student": {

                "id":
                    application.student.id,

                "name":
                    application.student.full_name,

                "email":
                    application.student.email

            },

            "accommodation": {

                "id":
                    application.accommodation.id,

                "name":
                    application.accommodation.name,

                "address":
                    application.accommodation.address

            },

            "room": {

                "id":
                    application.room.id,

                "room_number":
                    application.room.room_number,

                "room_type":
                    application.room.room_type,

                "price":
                    application.room.price

            },

            "status":
                application.status

        })

    return results


# =========================
# CREATE APPLICATION
# =========================

@app.route(
    "/api/applications",
    methods=["POST"]
)
def create_application():

    from models import (
        Application,
        Student,
        Accommodation,
        Room
    )

    data = request.get_json()


    # Find student

    student = db.session.get(
        Student,
        data["student_id"]
    )


    # Find accommodation

    accommodation = db.session.get(
        Accommodation,
        data["accommodation_id"]
    )


    # Find room

    room = db.session.get(
        Room,
        data["room_id"]
    )


    # =========================
    # CHECK STUDENT
    # =========================

    if not student:

        return {
            "error":
                "Student not found"
        }, 404


    # =========================
    # CHECK ACCOMMODATION
    # =========================

    if not accommodation:

        return {
            "error":
                "Accommodation not found"
        }, 404


    # =========================
    # CHECK ROOM
    # =========================

    if not room:

        return {
            "error":
                "Room not found"
        }, 404


    # =========================
    # CHECK ROOM AVAILABILITY
    # =========================

    available_spaces = (
        room.capacity -
        room.occupied
    )

    if available_spaces <= 0:

        return {
            "error":
                "This room is full"
        }, 400


    # =========================
    # CHECK EXISTING APPLICATION
    # =========================

    existing_application = (
        Application.query.filter_by(

            student_id=
                student.id,

            room_id=
                room.id

        ).first()
    )

    if existing_application:

        return {
            "error":
                "You have already applied for this room."
        }, 400


    # =========================
    # CHECK PENDING APPLICATION
    # =========================

    pending_application = (
        Application.query.filter_by(

            student_id=
                student.id,

            status=
                "Pending"

        ).first()
    )

    if pending_application:

        return {
            "error":
                "You already have a pending application."
        }, 400


    # =========================
    # CREATE APPLICATION
    # =========================

    application = Application(

        student_id=
            student.id,

        accommodation_id=
            accommodation.id,

        room_id=
            room.id,

        status=
            "Pending"

    )

    db.session.add(
        application
    )

    db.session.commit()

    return {

        "message":
            "Application submitted successfully!",

        "application_id":
            application.id,

        "status":
            application.status

    }, 201


# =========================
# APPROVE APPLICATION
# =========================

@app.route(
    "/api/applications/<int:application_id>/approve",
    methods=["PUT"]
)
def approve_application(
    application_id
):

    from models import Application

    application = db.session.get(
        Application,
        application_id
    )

    if not application:

        return {
            "error":
                "Application not found"
        }, 404


    if application.status != "Pending":

        return {
            "error":
                "Application has already been processed"
        }, 400


    room = application.room

    available_spaces = (
        room.capacity -
        room.occupied
    )

    if available_spaces <= 0:

        return {
            "error":
                "The room is already full"
        }, 400


    # Approve application

    application.status = "Approved"


    # Increase room occupancy

    room.occupied += 1


    db.session.commit()


    return {

        "message":
            "Application approved successfully!",

        "application_id":
            application.id,

        "status":
            application.status,

        "room_number":
            room.room_number,

        "occupied":
            room.occupied,

        "available_spaces":
            room.capacity -
            room.occupied

    }, 200


# =========================
# REJECT APPLICATION
# =========================

@app.route(
    "/api/applications/<int:application_id>/reject",
    methods=["PUT"]
)
def reject_application(
    application_id
):

    from models import Application

    application = db.session.get(
        Application,
        application_id
    )

    if not application:

        return {
            "error":
                "Application not found"
        }, 404


    if application.status != "Pending":

        return {
            "error":
                "Application has already been processed"
        }, 400


    application.status = "Rejected"

    db.session.commit()


    return {

        "message":
            "Application rejected successfully!",

        "application_id":
            application.id,

        "status":
            application.status

    }, 200


# =========================
# STUDENT LOGIN
# =========================

@app.route(
    "/api/login",
    methods=["POST"]
)
def login():

    from models import Student

    data = request.get_json()

    email = data.get("email")

    password = data.get("password")


    student = Student.query.filter_by(
        email=email
    ).first()


    if not student:

        return {
            "error":
                "Invalid email or password"
        }, 401


    if student.password != password:

        return {
            "error":
                "Invalid email or password"
        }, 401


    return {

        "message":
            "Login successful!",

        "student": {

            "id":
                student.id,

            "full_name":
                student.full_name,

            "email":
                student.email,

            "phone":
                student.phone,

            "institution_id":
                student.institution_id

        }

    }, 200


# =========================
# CREATE DATABASE TABLES
# =========================

with app.app_context():

    from models import (
        Student,
        Institution,
        Accommodation,
        Room,
        Application
    )

    db.create_all()


# =========================
# START SERVER
# =========================

if __name__ == "__main__":

    app.run(
        debug=True
    )