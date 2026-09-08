# ResLink Mbombela

## Student Accommodation Discovery and Management Platform

## About the Project

ResLink Mbombela is a **student-developed web application** designed to make it easier for students to find and apply for student accommodation in Mbombela.

The project was developed as a practical portfolio project to apply the knowledge and technical skills I have gained through my Information Technology studies to a real-world problem.

### Why I Started ResLink

The idea for ResLink came from a problem I personally experienced when looking for student accommodation in Mbombela.

Many student accommodation providers in Mbombela do not have websites or online platforms where students can easily view accommodation information, room types, prices and available spaces.

As a result, students may have to physically travel from one residence to another to ask whether rooms are available. This can be time-consuming, costly and frustrating, especially for students who are new to the area or have limited time to find accommodation.

I experienced this challenge myself, which motivated me to develop ResLink as a possible digital solution.

### The Problem

Students looking for accommodation in Mbombela may struggle to:

* Find information about different student residences in one place.
* Know which residences have available spaces.
* Compare different accommodation options.
* Find room types and prices before visiting a residence.
* Submit accommodation applications conveniently.
* Track the status of their applications.

The lack of accessible online accommodation information can result in students travelling from residence to residence simply to find out whether space is available.

### The Solution

ResLink provides a centralised platform where students can discover student accommodation before physically visiting a residence.

Students can use the platform to:

* Find accommodation in Mbombela.
* View accommodation information.
* View accommodation associated with their institution.
* View available rooms and spaces.
* View room types and prices.
* Submit accommodation applications.
* Track application status.
* View their allocated room when an application is approved.

The platform also provides administrators with functionality to manage accommodation properties, rooms, occupancy and student applications.

The overall goal of ResLink is to reduce the time and effort students spend searching for available accommodation while providing accommodation providers with a digital platform through which their available spaces can become more visible.

## Project Objectives

The main objectives of ResLink Mbombela are to:

* Provide a centralised platform for student accommodation discovery.
* Allow students to register and create accounts.
* Allow students to log in to the platform.
* Allow students to browse accommodation.
* Display room types, prices, capacity, occupancy and available spaces.
* Allow students to submit accommodation applications.
* Prevent duplicate applications for the same room.
* Allow administrators to manage accommodation properties.
* Allow administrators to manage rooms.
* Allow administrators to approve or reject applications.
* Automatically update room occupancy when an application is approved.
* Provide students with a dashboard for tracking their applications.

## Key Features

### Student Features

* Student registration.
* Student login.
* Student dashboard.
* Student profile information.
* Accommodation browsing.
* Accommodation search.
* Room availability information.
* Room type and pricing information.
* Accommodation applications.
* Application status tracking.
* Approved room allocation information.
* Funding approval document upload.

### Administrator Features

* Administrator dashboard.
* Accommodation management.
* Room management.
* Room availability management.
* Student application management.
* Application approval.
* Application rejection.
* Room occupancy management.
* Ability to free rooms.
* Accommodation deletion.
* Room deletion.

## Technology Stack

### Frontend

* HTML
* CSS
* JavaScript
* Fetch API
* Responsive Web Design

### Backend

* Python
* Flask
* Flask-CORS
* Flask-SQLAlchemy
* PyMySQL

### Database

* MySQL

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Python Virtual Environment

## System Architecture

ResLink Mbombela uses a client-server architecture consisting of a frontend, Flask backend and MySQL database.
<img width="658" height="645" alt="image" src="https://github.com/user-attachments/assets/aa06a5df-6e4c-42a3-8b98-fcb9f1d80259" />

## Database Design

ResLink uses MySQL as its relational database management system.

The main entities in the system are:

* Students
* Institutions
* Accommodations
* Rooms
* Applications

### Students

Stores information about registered students.

Key information includes:

* Student ID
* Full name
* Email
* Phone number
* Institution
* Date of birth
* Gender
* Funding type
* Funding approval document
* Password

### Institutions

Stores information about educational institutions.

Key information includes:

* Institution ID
* Institution name
* Location

### Accommodations

Stores student accommodation information.

Key information includes:

* Accommodation ID
* Name
* Address
* Accreditation status
* Description
* Contact number
* Image
* Institution

### Rooms

Stores room information for each accommodation.

Key information includes:

* Room ID
* Room number
* Room type
* Price
* Capacity
* Occupied spaces
* Accommodation

### Applications

Stores student accommodation applications.

Key information includes:

* Application ID
* Student
* Accommodation
* Room
* Application status

## Room Availability

ResLink calculates the number of available spaces in a room using the following formula:

```text
Available Spaces = Capacity - Occupied Spaces
```

For example:

```text
Capacity = 4
Occupied = 2

Available Spaces = 4 - 2

Available Spaces = 2
```

The available spaces are calculated dynamically by the backend when room information is retrieved.

## Application Workflow

The student accommodation application process follows these steps:

<img width="486" height="689" alt="image" src="https://github.com/user-attachments/assets/d9aedb3e-1db5-403c-9950-e0f362acc727" />


## Application Rules

The system implements several rules when processing accommodation applications.

### Room Availability

A student cannot apply for a room when there are no available spaces.

### Duplicate Room Applications

A student cannot submit another application for the same room if an existing application for that room is already pending or approved.

### Application Approval

When an administrator approves a pending application:

* The application status changes to `Approved`.
* The room's occupied spaces increase by one.
* The room's available spaces decrease accordingly.

The system also checks whether the room still has available space before approving the application.

### Application Rejection

When an administrator rejects a pending application:

* The application status changes to `Rejected`.
* The room occupancy is not increased.

## Project Structure

The project is organised into separate frontend and backend components.

```text
RESLINK-MBOMBELA/

backend/
    app.py
    models.py
    extensions.py
    config.py
    requirements.txt
    uploads/
    funding_documents/

frontend/
    index.html
   login.html
   register.html
   dashboard.html
   admin.html
   script.js
   style.css

  .gitignore
   README.md
```

> Note: The project structure above represents the current structure used during development. Additional files or folders may be added as the project continues to evolve.

## API Endpoints

The Flask backend provides REST API endpoints for communicating with the frontend.

### General Endpoints

| Method | Endpoint   | Purpose                               |
| ------ | ---------- | ------------------------------------- |
| GET    | `/`        | Test whether the Flask API is running |
| GET    | `/test-db` | Test the MySQL database connection    |

### Accommodation Endpoints

| Method | Endpoint                   | Purpose                     |
| ------ | -------------------------- | --------------------------- |
| GET    | `/api/accommodations`      | Retrieve all accommodations |
| POST   | `/api/accommodations`      | Create a new accommodation  |
| DELETE | `/api/accommodations/<id>` | Delete an accommodation     |

### Room Endpoints

| Method | Endpoint               | Purpose                         |
| ------ | ---------------------- | ------------------------------- |
| GET    | `/api/rooms`           | Retrieve rooms and availability |
| POST   | `/api/rooms`           | Create a new room               |
| DELETE | `/api/rooms/<id>`      | Delete a room                   |
| PUT    | `/api/rooms/<id>/free` | Mark a room as free             |

### Student Endpoints

| Method | Endpoint        | Purpose                      |
| ------ | --------------- | ---------------------------- |
| GET    | `/api/students` | Retrieve registered students |
| POST   | `/api/students` | Register a new student       |

### Application Endpoints

| Method | Endpoint                         | Purpose                             |
| ------ | -------------------------------- | ----------------------------------- |
| GET    | `/api/applications`              | Retrieve accommodation applications |
| POST   | `/api/applications`              | Submit an accommodation application |
| PUT    | `/api/applications/<id>/approve` | Approve an application              |
| PUT    | `/api/applications/<id>/reject`  | Reject an application               |

### Authentication

| Method | Endpoint     | Purpose                           |
| ------ | ------------ | --------------------------------- |
| POST   | `/api/login` | Authenticate a registered student |

## Installation and Setup

### 1. Clone the Repository

Clone the project from GitHub:

```bash
git clone https://github.com/SabeloM-ST10435860/RESLINK-MBOMBELA.git
cd RESLINK-MBOMBELA
```

### 2. Create a Python Virtual Environment

Navigate to the backend folder:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

### 3. Install the Required Python Packages

Install the required dependencies:

```bash
pip install flask flask-cors flask-sqlalchemy pymysql
```

Alternatively, if the dependencies are listed in `requirements.txt`, install them using:

```bash
pip install -r requirements.txt
```

### 4. Configure the MySQL Database

ResLink Mbombela uses MySQL as its database.

Create a database for the project:

```sql
CREATE DATABASE reslink;
```

### 5. Configure the Database Connection

The database configuration is stored in:

```text
backend/config.py
```

Make sure the configuration contains the correct MySQL database name, username, password and connection settings.

The Flask application loads the database configuration using:

```python
from config import (
    SQLALCHEMY_DATABASE_URI,
    SQLALCHEMY_TRACK_MODIFICATIONS
)
```

Database credentials and other sensitive information should not be committed to GitHub.

### 6. Start the Flask Backend

From the `backend` directory, run:

```bash
python app.py
```

The Flask development server will run at:

```text
http://127.0.0.1:5000
```

### 7. Test the Backend

Open the following address in a browser:

```text
http://127.0.0.1:5000/
```

A successful response should display:

```json
{
    "message": "ResLink Mbombela API connected!"
}
```

To test the MySQL database connection, open:

```text
http://127.0.0.1:5000/test-db
```

A successful connection should return:

```json
{
    "status": "success",
    "message": "MySQL database connected successfully!"
}
```

### 8. Run the Frontend

Open the ResLink frontend files using Visual Studio Code.

The frontend communicates with the Flask API through:

```javascript
const API_URL = "http://127.0.0.1:5000";
```

The frontend can be opened using a local development server such as the Visual Studio Code Live Server extension.

### 9. Database Tables

When the Flask application starts, it creates the required database tables using:

```python
with app.app_context():
    db.create_all()
```

The main database tables are:

* Students
* Institutions
* Accommodations
* Rooms
* Applications

### 10. Funding Document Uploads

During student registration, ResLink allows students to upload a funding approval document.

The supported file formats are:

* PDF
* JPG
* JPEG
* PNG

Uploaded funding documents are stored in:

```text
uploads/funding_documents
```

The backend validates the uploaded file before saving it.

### 11. Stop the Application

To stop the Flask development server, press:

```text
CTRL + C
```

To deactivate the Python virtual environment:

```bash
deactivate
```

## Testing

Testing was performed during development to verify that the main ResLink functionality worked correctly.

### API Testing

The Flask API was tested to confirm that:

* The application starts correctly.
* API endpoints return the expected responses.
* HTTP requests are processed correctly.
* Errors are handled appropriately.

### Database Testing

The database connection was tested using:

```text
GET /test-db
```

This confirmed that the Flask application could successfully connect to the MySQL database.

### Accommodation Testing

Accommodation functionality was tested by:

* Retrieving accommodation records.
* Creating accommodation records.
* Checking accommodation information.
* Testing accommodation deletion.
* Checking validation when attempting to delete accommodation containing rooms or applications.

### Room Testing

Room functionality was tested by:

* Creating rooms.
* Retrieving rooms.
* Calculating available spaces.
* Checking room capacity.
* Updating occupancy.
* Marking rooms as free.
* Testing room deletion restrictions.

### Student Testing

Student functionality was tested by:

* Registering students.
* Validating required registration information.
* Checking duplicate email handling.
* Uploading funding documents.
* Retrieving student information.
* Testing student login.

### Application Testing

The application process was tested by:

* Creating accommodation applications.
* Checking room availability.
* Preventing duplicate applications for the same room.
* Approving applications.
* Rejecting applications.
* Updating room occupancy after approval.
* Recalculating available spaces.

### End-to-End Testing

The main student workflow was tested from beginning to end:

```text
Student Registration
        ↓
Student Login
        ↓
Browse Accommodation
        ↓
View Room
        ↓
Submit Application
        ↓
Administrator Reviews Application
        ↓
Approve or Reject
        ↓
Student Views Application Status
```

These tests helped identify and resolve development issues throughout the project.

## Challenges and Solutions

During the development of ResLink Mbombela, several technical challenges were encountered and resolved.

### 1. Flask and CORS Configuration

One of the initial challenges was configuring Flask-CORS so that the JavaScript frontend could communicate with the Flask backend.

This was resolved by installing Flask-CORS and configuring it in `app.py`:

```python
from flask_cors import CORS

CORS(app)
```

This allowed the frontend to communicate with the Flask API during local development.

### 2. MySQL Database Connection

Connecting the Flask application to the MySQL database required correct database configuration and SQLAlchemy setup.

The database configuration was separated into `config.py`, while the SQLAlchemy database instance was placed in `extensions.py`.

This improved the organisation of the backend and helped the Flask application initialise the database correctly.

### 3. Circular Import Problems

A circular import problem occurred when the database and application components depended on each other.

This was resolved by moving the SQLAlchemy database instance into `extensions.py` and importing it where required.

This resulted in a cleaner Flask application structure.

### 4. Room Availability Management

The system needed to calculate how many spaces were available in each room.

This was implemented using:

```text
Available Spaces = Capacity - Occupied
```

The API calculates available spaces dynamically when room information is requested.

### 5. Application Approval and Room Occupancy

Another challenge was ensuring that approving an accommodation application correctly updates room occupancy.

When an application is approved:

* The application status changes to `Approved`.
* Room occupancy increases by one.
* Available spaces decrease.

The system also checks that the room is not already full before approving an application.

### 6. Duplicate Applications

The system needed to prevent students from submitting duplicate applications for the same room.

Before creating a new application, the backend checks whether the student already has an application for the selected room.

If an existing application is found, the new application is rejected.

### 7. Accommodation and Room Deletion

Deleting accommodation or rooms required additional validation.

The system prevents:

* Deleting an accommodation that still contains rooms.
* Deleting an accommodation that has applications.
* Deleting a room that is currently occupied.

These checks help protect the integrity of the database.

### 8. Student Funding Document Uploads

Student registration includes the submission of a funding approval document.

The backend validates the uploaded file and accepts:

* PDF
* JPG
* JPEG
* PNG

The uploaded document is stored in the `uploads/funding_documents` directory.

### 9. Frontend and Backend Integration

Another challenge was connecting the JavaScript frontend to the Flask API.

The frontend uses the Fetch API to communicate with the backend through:

```javascript
const API_URL = "http://127.0.0.1:5000";
```

This allows the frontend to retrieve accommodation information, manage applications, authenticate students and communicate with the backend database.

## Lessons Learned

The development of ResLink Mbombela provided practical experience in:

* Flask API development.
* REST API design.
* MySQL database integration.
* SQLAlchemy.
* JavaScript Fetch API.
* CRUD operations.
* Database relationships.
* File uploads.
* Error handling.
* Frontend and backend integration.
* Debugging and problem solving.
* Version control.
* Project documentation.

Most importantly, the project helped me understand how the different components of a full-stack application work together.

## Future Improvements

ResLink Mbombela was developed as a student project to demonstrate how software development can be used to address a real-world student accommodation problem.

Although the current version provides the core functionality required to discover accommodation, manage rooms, submit applications and manage occupancy, several improvements could be made in future versions.

### 1. Secure Password Management

The current login functionality was implemented as part of the learning process.

A future version should use secure password hashing instead of storing passwords in plain text.

Possible improvements include:

* Werkzeug password hashing.
* Secure authentication mechanisms.
* Session-based authentication.
* JWT authentication.

### 2. Role-Based Access Control

A future version could introduce different user roles, such as:

* Student
* Accommodation Administrator
* System Administrator

Each role would have access only to the functionality required for that role.

### 3. Improved Authentication and Authorisation

Future versions could introduce:

* Protected API endpoints.
* User sessions.
* JWT authentication.
* Password reset functionality.
* Email verification.
* Login attempt protection.
* Improved account management.

### 4. Email Notifications

A future version could automatically notify students when their application status changes.

Students could receive notifications when:

* An application is submitted.
* An application is approved.
* An application is rejected.
* A room has been allocated.

### 5. Accommodation Provider Accounts

Future versions could allow accommodation providers to create and manage their own accounts.

Accommodation providers could:

* Add accommodation.
* Add and update rooms.
* Update room availability.
* View student applications.
* Approve or reject applications.
* Manage occupied spaces.

### 6. Accommodation Verification

The current project includes an accreditation field for accommodation.

A future version could introduce a more advanced verification process where accommodation providers submit documentation that can be reviewed before their accommodation is listed as verified.

### 7. Advanced Search and Filtering

The search functionality could be expanded to allow students to filter results by:

* Institution.
* Location.
* Price range.
* Room type.
* Single or shared accommodation.
* Available spaces.
* Accreditation status.

### 8. Maps and Location Services

A future version could integrate a mapping service to show accommodation locations.

Students could view:

* Accommodation locations.
* Distance from their institution.
* Nearby transport options.
* Nearby shops and essential services.

### 9. Additional Application Documents

The application process could eventually allow students to upload additional documents securely.

Possible documents could include:

* Student registration proof.
* Proof of registration.
* Funding documentation.
* Other accommodation-related documents.

This would require stronger document security and access controls.

### 10. Cloud Deployment

The current project has been developed and tested in a local development environment.

A future version could be deployed to a cloud platform such as:

* Microsoft Azure.
* Amazon Web Services (AWS).
* Google Cloud Platform.

Cloud deployment would allow the application to be accessed over the internet.

### 11. Mobile Application

The current version is a web application.

A future development could include an Android and iOS mobile application, allowing students to search for accommodation and manage applications from mobile devices.

### 12. Data Analytics

As the platform grows, accommodation data could be analysed to provide useful insights, such as:

* Popular accommodation areas.
* Popular room types.
* Average accommodation prices.
* Occupancy rates.
* Number of applications per institution.
* Accommodation demand trends.

### 13. AI-Powered Accommodation Recommendations

A future version could introduce Artificial Intelligence to recommend accommodation based on student preferences.

The system could consider:

* Institution.
* Budget.
* Preferred room type.
* Location.
* Availability.
* Previous searches.

The system could then recommend accommodation options that best match the student's requirements.

### 14. Improved Security

As ResLink develops beyond a student prototype, additional security measures would be required.

Possible improvements include:

* HTTPS.
* Secure environment variables.
* Strong input validation.
* API authentication.
* Role-based authorisation.
* Secure file storage.
* Database security.
* Rate limiting.
* Protection against common web vulnerabilities.

### 15. Scalability and Performance

The current application was designed primarily as a learning and portfolio project.

If the system were developed into a larger real-world platform, the architecture would need to be improved to support a larger number of students, accommodation providers and applications.

Possible improvements include:

* Cloud infrastructure.
* Database optimisation.
* Caching.
* Load balancing.
* API optimisation.
* Monitoring and logging.

### Future Vision

The long-term vision for ResLink Mbombela is to develop the project from a student prototype into a more complete digital accommodation platform that can help students find suitable accommodation without having to physically visit multiple residences just to check availability.

The project could eventually combine web development, cloud computing, data analytics and Artificial Intelligence to create a more intelligent and accessible accommodation discovery experience.

## Skills Demonstrated

Developing ResLink Mbombela as a student project provided practical experience across several areas of Information Technology and software development.

### Software Development

* Developed a full-stack web application using HTML, CSS, JavaScript and Python Flask.
* Designed and implemented frontend user interfaces.
* Developed REST API endpoints.
* Connected the frontend to the backend using the JavaScript Fetch API.
* Implemented CRUD operations.
* Tested and debugged application functionality.

### Backend Development

* Developed REST API endpoints using Flask.
* Used Flask-CORS for frontend-backend communication.
* Implemented request validation and error handling.
* Created application logic for accommodation applications.
* Implemented room occupancy and availability management.
* Developed student registration and login functionality.
* Implemented funding document upload functionality.

### Database Development

* Designed a relational database structure using MySQL.
* Used Flask-SQLAlchemy to interact with the database.
* Created relationships between students, institutions, accommodations, rooms and applications.
* Implemented database queries and data retrieval.
* Used foreign keys to maintain database relationships.
* Implemented validation to protect database integrity.

### Frontend Development

* Created responsive web pages using HTML and CSS.
* Used JavaScript to create interactive functionality.
* Developed accommodation listings.
* Developed room information displays.
* Created student dashboards.
* Created an administrative dashboard.
* Implemented search and application functionality.
* Designed registration and management forms.

### API Integration

* Connected the JavaScript frontend to the Flask backend.
* Used HTTP methods including GET, POST, PUT and DELETE.
* Processed JSON responses.
* Implemented frontend handling of API errors and successful responses.

### Problem Solving and Debugging

During development, I encountered and resolved several technical problems, including:

* Python package and dependency errors.
* Flask-CORS configuration issues.
* MySQL connection problems.
* Circular import problems.
* Database relationship issues.
* Room availability and occupancy logic.
* Frontend-backend communication issues.
* Application validation issues.
* Duplicate application handling.

These challenges provided practical experience in debugging, troubleshooting and improving an application through iterative development.

### Software Development Practices

The project also provided experience with:

* Git and GitHub.
* Visual Studio Code.
* Python virtual environments.
* REST API development.
* Database management.
* Version control.
* Testing.
* Documentation.
* Responsive web design.
* Project organisation.

### Technologies Used

| Category                | Technologies          |
| ----------------------- | --------------------- |
| Frontend                | HTML, CSS, JavaScript |
| Backend                 | Python, Flask         |
| Database                | MySQL                 |
| ORM                     | Flask-SQLAlchemy      |
| Database Driver         | PyMySQL               |
| API Communication       | Fetch API             |
| Cross-Origin Requests   | Flask-CORS            |
| Development Environment | Visual Studio Code    |
| Version Control         | Git and GitHub        |

### What I Learned

Building ResLink Mbombela helped me move beyond theoretical coursework and apply what I have learned as an Information Technology student to a practical problem.

The project strengthened my understanding of how different components of a software application work together, including the frontend, backend, API and database.

Most importantly, the project gave me practical experience in taking an idea based on a real-world problem, designing a possible solution, developing the application, testing its functionality and documenting the development process.

## My Contribution

ResLink Mbombela was developed as an **individual student project** to apply the knowledge and skills I have gained through my Information Technology studies.

I was responsible for planning, designing, developing, testing and documenting the application.

### Project Planning

I identified a real-world problem faced by students searching for accommodation in Mbombela and developed the idea of ResLink as a possible digital solution.

I planned the main functionality of the system, including:

* Student registration and login.
* Accommodation discovery.
* Room availability management.
* Accommodation applications.
* Application approval and rejection.
* Student application tracking.
* Administrative accommodation management.
* Student funding document uploads.

### Frontend Development

I designed and developed the frontend using:

* HTML.
* CSS.
* JavaScript.

I created the main user interfaces for students and administrators, including:

* Home page.
* Login page.
* Registration page.
* Student dashboard.
* Accommodation listings.
* Room information.
* Application functionality.
* Admin dashboard.
* Accommodation management.
* Room management.
* Application management.

### Backend Development

I developed the backend using Python and Flask.

My backend development included:

* Creating REST API endpoints.
* Implementing CRUD functionality.
* Connecting the application to MySQL.
* Implementing database queries.
* Handling student registration and login.
* Managing accommodation and room information.
* Processing accommodation applications.
* Implementing application approval and rejection.
* Managing room occupancy and available spaces.
* Implementing funding document uploads.
* Adding validation and error handling.

### Database Development

I designed and implemented the MySQL database structure used by the application.

The database includes relationships between:

* Students.
* Institutions.
* Accommodations.
* Rooms.
* Applications.

I used Flask-SQLAlchemy to connect the Flask backend to the MySQL database and manage database operations.

### Testing and Debugging

I tested the application during development to identify and resolve technical problems.

This included testing:

* API endpoints.
* Database connectivity.
* Student registration.
* Student login.
* Accommodation creation and retrieval.
* Room creation and availability.
* Accommodation applications.
* Application approval and rejection.
* Room occupancy updates.
* Error handling.
* Frontend-backend communication.

I also investigated and resolved development issues involving Python dependencies, Flask-CORS, MySQL connectivity, circular imports and application logic.

### Documentation

I documented the project to explain:

* The problem being addressed.
* The purpose of the application.
* The technologies used.
* The system functionality.
* The API structure.
* The database design.
* Testing performed.
* Development challenges.
* Possible future improvements.

### Overall Contribution

As a student developer, I took the project from an initial idea based on a real-world problem through to a working full-stack web application.

The project allowed me to apply concepts from my Information Technology studies in a practical environment while developing my skills in web development, backend programming, databases, APIs, debugging and software development.

This project represents my current student-level experience and provides a foundation that I can continue building on as I develop professionally in the technology industry.

## Project Status

ResLink Mbombela is currently a **working student-developed prototype**.

The core functionality of the application has been implemented and tested in a local development environment.

### Currently Working

The current version includes:

* Student registration.
* Student login.
* Student profile information.
* Funding approval document upload.
* Accommodation listing.
* Accommodation information display.
* Room management.
* Room availability calculation.
* Room occupancy management.
* Accommodation applications.
* Application status tracking.
* Application approval and rejection.
* Student dashboard.
* Administrator dashboard.
* Accommodation management.
* Room management.
* Application management.
* MySQL database integration.
* Flask REST API.
* Frontend-backend integration using JavaScript Fetch API.
* Basic validation and error handling.

### Current Development Environment

The application has been developed and tested locally using:

* Visual Studio Code.
* Python.
* Flask.
* MySQL.
* HTML.
* CSS.
* JavaScript.
* Git and GitHub.

The current application is intended primarily for **learning, demonstration and portfolio purposes**.

It has not yet been deployed as a production system for public use.

### Areas for Future Development

The following areas could be improved in future versions:

* Secure password hashing.
* Stronger authentication and authorisation.
* Role-based access control.
* Email notifications.
* Accommodation provider accounts.
* Advanced accommodation filtering.
* Map and location integration.
* Improved document security.
* Cloud deployment.
* Mobile application development.
* Data analytics.
* AI-powered accommodation recommendations.
* Improved scalability and security.

### Project Development Stage

The project can be considered a functional prototype because the main workflow can be demonstrated from student registration through to accommodation application and administrative processing.

The development process is ongoing, and additional features can be added as I continue improving my software development skills.

### Project Purpose

The main purpose of the current version is to demonstrate my ability as an Information Technology student to:

* Identify a real-world problem.
* Design a possible technology-based solution.
* Develop a working full-stack application.
* Work with frontend and backend technologies.
* Integrate a relational database.
* Develop and consume REST APIs.
* Implement business logic.
* Test and debug an application.
* Document a software project.

ResLink Mbombela represents my practical learning and development as a student and serves as a foundation for further development as I progress into the technology industry.

## Screenshots

The following screenshots demonstrate the main functionality and user interfaces of the ResLink Mbombela student accommodation application.

### Home Page

The home page introduces ResLink Mbombela and provides students with access to the accommodation discovery functionality.

![ResLink Mbombela Home Page](screenshots/homepage.png)

### Accommodation Listings

The accommodation section allows students to view available student residences and information about each accommodation option.

![Accommodation Listings](screenshots/accommodation-listings.png)

### Student Registration

The registration page allows students to create an account and provide the information required to use the platform.

![Student Registration](screenshots/student-registration.png)

### Student Login

Registered students can access their account through the login page.

![Student Login](screenshots/student-login.png)

### Student Dashboard

The student dashboard provides students with access to their profile information and accommodation applications.

![Student Dashboard](screenshots/student-dashboard.png)

### Accommodation Application

Students can select an available room and submit an accommodation application through the platform.

![Accommodation Application](screenshots/accommodation-application.png)

### Application Status

Students can view the status of their accommodation applications from their dashboard.

![Application Status](screenshots/application-status.png)

### Admin Dashboard

The administrator dashboard provides functionality for managing accommodation, rooms and student applications.

![Admin Dashboard](screenshots/admin-dashboard.png)

### Accommodation Management

Administrators can add, view and manage accommodation information through the administration interface.

![Accommodation Management](screenshots/accommodation-management.png)

### Room Management

Administrators can manage rooms, including room type, capacity, occupancy and available spaces.

![Room Management](screenshots/room-management.png)

### Application Management

Administrators can review student applications and approve or reject applications.

![Application Management](screenshots/application-management.png)

## Author

### Sabelo Mahlalela

I am an Information Technology Management student with an interest in software development, data, cloud computing and Artificial Intelligence.

ResLink Mbombela was developed as a student portfolio project to apply the knowledge and technical skills I have gained through my studies to a real-world problem.

Through this project, I gained practical experience in frontend development, backend development, REST APIs, MySQL databases, JavaScript, Python Flask, Git and GitHub.

### Connect With Me

* GitHub: https://github.com/SabeloM-ST10435860
* LinkedIn: https://www.linkedin.com/in/sabelo-mahlalela-456a96238

### Project

**ResLink Mbombela**

A student-developed web application designed to help students discover student accommodation, view room availability and submit accommodation applications.

This project represents part of my ongoing development as an Information Technology student and my preparation for entering the technology industry.
