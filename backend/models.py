from extensions import db

# Student model
class Student(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)

    full_name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    phone = db.Column(
        db.String(20),
        nullable=True
    )

    date_of_birth = db.Column(
        db.Date,
        nullable=True
    )

    gender = db.Column(
        db.String(30),
        nullable=True
    )

    funding_type = db.Column(
        db.String(50),
        nullable=True
    )

    funding_document = db.Column(
        db.String(500),
        nullable=True
    )

    institution_id = db.Column(
        db.Integer,
        db.ForeignKey("institutions.id"),
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

    institution = db.relationship(
        "Institution",
        back_populates="students"
    )

    applications = db.relationship(
        "Application",
        back_populates="student",
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<Student {self.full_name}>"

# Institution model
class Institution(db.Model):
    __tablename__ = "institutions"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=True, nullable=False)
    location = db.Column(db.String(150), nullable=False)

    students = db.relationship(
        "Student",
        back_populates="institution"
    )

    accommodations = db.relationship(
        "Accommodation",
        back_populates="institution"
    )

    def __repr__(self):
        return f"<Institution {self.name}>"

# accommodation models
class Accommodation(db.Model):
    __tablename__ = "accommodations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    accredited = db.Column(db.Boolean, default=False)
    description = db.Column(db.Text, nullable=True)
    contact_number = db.Column(db.String(20), nullable=True)
    
    image_url = db.Column(
        db.String(500),
        nullable=True
    )

    institution_id = db.Column(
        db.Integer,
        db.ForeignKey("institutions.id"),
        nullable=False
    )

    institution = db.relationship(
        "Institution",
        back_populates="accommodations"
    )

    rooms = db.relationship(
        "Room",
        back_populates="accommodation",
        cascade="all, delete-orphan"
    )

    applications = db.relationship(
        "Application",
        back_populates="accommodation"
    )

    def __repr__(self):
        return f"<Accommodation {self.name}>"

# Room model
class Room(db.Model):
    __tablename__ = "rooms"

    id = db.Column(db.Integer, primary_key=True)
    room_number = db.Column(db.String(50), nullable=False)
    room_type = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    occupied = db.Column(db.Integer, default=0)

    accommodation_id = db.Column(
        db.Integer,
        db.ForeignKey("accommodations.id"),
        nullable=False
    )

    accommodation = db.relationship(
        "Accommodation",
        back_populates="rooms"
    )

    applications = db.relationship(
        "Application",
        back_populates="room"
    )

    def __repr__(self):
        return f"<Room {self.room_number}>"

# Application model
class Application(db.Model):
    __tablename__ = "applications"

    id = db.Column(db.Integer, primary_key=True)

    student_id = db.Column(
        db.Integer,
        db.ForeignKey("students.id"),
        nullable=False
    )

    accommodation_id = db.Column(
        db.Integer,
        db.ForeignKey("accommodations.id"),
        nullable=False
    )

    room_id = db.Column(
        db.Integer,
        db.ForeignKey("rooms.id"),
        nullable=False
    )

    status = db.Column(
        db.String(50),
        default="Pending",
        nullable=False
    )

    student = db.relationship(
        "Student",
        back_populates="applications"
    )

    accommodation = db.relationship(
        "Accommodation",
        back_populates="applications"
    )

    room = db.relationship(
        "Room",
        back_populates="applications"
    )

    def __repr__(self):
        return f"<Application {self.id}>"