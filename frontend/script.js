const API_URL = "http://127.0.0.1:5000";

let allAccommodations = [];


// ===============================
// LOAD ACCOMMODATIONS
// ===============================

async function loadAccommodations() {

    try {

        const response = await fetch(
            `${API_URL}/api/accommodations`
        );


        if (!response.ok) {

            throw new Error(
                "Failed to load accommodations"
            );

        }


        const accommodations =
            await response.json();


        allAccommodations =
            accommodations;


        displayAccommodations(
            accommodations
        );


    } catch (error) {

        console.error(
            "Error loading accommodations:",
            error
        );


        const container =
            document.getElementById(
                "accommodation-list"
            );


        if (container) {

            container.innerHTML = `
                <p>
                    Unable to load accommodation.
                    Please try again later.
                </p>
            `;

        }

    }

}


// ===============================
// DISPLAY ACCOMMODATIONS
// ===============================

async function displayAccommodations(
    accommodations
) {

    const container =
        document.getElementById(
            "accommodation-list"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (accommodations.length === 0) {

        container.innerHTML = `
            <p>
                No accommodation matches
                your search.
            </p>
        `;

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/rooms`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load rooms"
            );

        }


        const rooms =
            await response.json();


        accommodations.forEach(
            accommodation => {

                const accommodationRooms =
                    rooms.filter(
                        room =>
                            Number(
                                room.accommodation_id
                            ) ===
                            Number(
                                accommodation.id
                            )
                    );


                const availableSpaces =
                    accommodationRooms.reduce(
                        function (
                            total,
                            room
                        ) {

                            return (
                                total +
                                Number(
                                    room.available_spaces ||
                                    0
                                )
                            );

                        },
                        0
                    );


                const roomTypes =
                    [
                        ...new Set(
                            accommodationRooms.map(
                                room =>
                                    room.room_type
                            )
                        )
                    ];


                const roomTypeText =
                    roomTypes.length > 0
                        ? roomTypes.join(" & ")
                        : "Rooms coming soon";


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "accommodation-card";


                card.innerHTML = `

                    <div
                        class="accommodation-image"
                        style="
                            background-image:
                            url('${accommodation.image_url || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80"}');
                        "
                    >
                    </div>


                    <div
                        class="accommodation-content"
                    >

                        <h3>
                            ${accommodation.name}
                        </h3>


                        <span
                            class="accredited-badge"
                        >

                            ${
                                accommodation.accredited
                                ? "✓ Accredited"
                                : "Not Accredited"
                            }

                        </span>


                        <p
                            class="accommodation-address"
                        >
                            ${accommodation.address}
                        </p>


                        <p
                            class="accommodation-description"
                        >

                            ${
                                accommodation.description ||
                                "Student accommodation in Mbombela."
                            }

                        </p>


                        <div
                            class="accommodation-info"
                        >

                            <div
                                class="info-item"
                            >

                                <strong>
                                    ${availableSpaces}
                                </strong>

                                <span>
                                    Spaces Available
                                </span>

                            </div>


                            <div
                                class="info-item"
                            >

                                <strong>
                                    ${roomTypeText}
                                </strong>

                                <span>
                                    Room Type
                                </span>

                            </div>

                        </div>


                        <p>

                            ${
                                accommodation.contact_number ||
                                "Contact details coming soon"
                            }

                        </p>


                        <a
                            href="#"
                            class="accommodation-button"
                            onclick="
                                loadRooms(
                                    ${accommodation.id}
                                );
                                return false;
                            "
                        >
                            View Rooms
                        </a>


                        <div
                            id="rooms-${accommodation.id}"
                            class="rooms-container"
                        >
                        </div>

                    </div>

                `;


                container.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(
            "Error displaying accommodations:",
            error
        );

    }

}


// ===============================
// LOAD ROOMS
// ===============================

async function loadRooms(
    accommodationId
) {

    const container =
        document.getElementById(
            `rooms-${accommodationId}`
        );


    if (!container) {

        return;

    }


    // ===============================
    // TOGGLE ONLY THIS ROOM SECTION
    // ===============================

    if (
        container.style.display === "block"
    ) {

        container.style.display =
            "none";

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/rooms`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load rooms"
            );

        }


        const rooms =
            await response.json();


        const accommodationRooms =
            rooms.filter(
                room =>
                    Number(
                        room.accommodation_id
                    ) ===
                    Number(
                        accommodationId
                    )
            );


        if (
            accommodationRooms.length === 0
        ) {

            container.innerHTML = `
                <div class="no-rooms">

                    <p>
                        No rooms are currently
                        available for this accommodation.
                    </p>

                </div>
            `;


            container.style.display =
                "block";


            return;

        }


        container.innerHTML = `

            <h4 class="rooms-title">
                Available Rooms
            </h4>

        `;


        accommodationRooms.forEach(
            room => {

                const roomCard =
                    document.createElement(
                        "div"
                    );


                roomCard.className =
                    "room-card";


                const isAvailable =
                    Number(
                        room.available_spaces
                    ) > 0;


                roomCard.innerHTML = `

                    <div
                        class="room-card-header"
                    >

                        <h4>
                            Room
                            ${room.room_number}
                        </h4>


                        ${
                            isAvailable

                            ? `
                                <span
                                    class="room-available-badge"
                                >
                                    Available
                                </span>
                            `

                            : `
                                <span
                                    class="room-full-badge"
                                >
                                    Full
                                </span>
                            `
                        }

                    </div>


                    <div
                        class="room-details"
                    >

                        <p>

                            <strong>
                                Room Type:
                            </strong>

                            ${room.room_type}

                        </p>


                        <p>

                            <strong>
                                Monthly Price:
                            </strong>

                            R${Number(
                                room.price
                            ).toLocaleString()}

                        </p>


                        <p>

                            <strong>
                                Capacity:
                            </strong>

                            ${room.capacity}

                        </p>


                        <p>

                            <strong>
                                Occupied:
                            </strong>

                            ${room.occupied}

                        </p>


                        <p
                            class="${
                                isAvailable
                                ? "spaces-available"
                                : "spaces-full"
                            }"
                        >

                            ${
                                isAvailable

                                ? `✓ ${room.available_spaces} space(s) available`

                                : "✕ No spaces available"

                            }

                        </p>

                    </div>


                    ${
                        isAvailable

                        ? `

                            <button
                                class="apply-button"
                                onclick="
                                    openApplicationModal(
                                        ${room.id}
                                    )
                                "
                            >
                                Apply for Room
                            </button>

                        `

                        : `

                            <button
                                class="full-button"
                                disabled
                            >
                                Room Full
                            </button>

                        `
                    }

                `;


                container.appendChild(
                    roomCard
                );

            }
        );


        container.style.display =
            "block";


    } catch (error) {

        console.error(
            "Error loading rooms:",
            error
        );


        container.innerHTML = `
            <p>
                Unable to load rooms.
                Please try again.
            </p>
        `;


        container.style.display =
            "block";

    }

}


// ===============================
// APPLY FOR ROOM
// ===============================

async function applyForRoom(roomId) {

    const studentData =
        localStorage.getItem("student");


    // Check login
    if (!studentData) {

        alert(
            "Please login before applying for accommodation."
        );

        window.location.href =
            "login.html";

        return;

    }


    const student =
        JSON.parse(studentData);


    try {

        // =========================
        // LOAD ROOMS
        // =========================

        const roomsResponse =
            await fetch(
                `${API_URL}/api/rooms`
            );


        if (!roomsResponse.ok) {

            throw new Error(
                "Unable to load room information."
            );

        }


        const rooms =
            await roomsResponse.json();


        const room =
            rooms.find(
                r =>
                    Number(r.id) ===
                    Number(roomId)
            );


        // Room does not exist
        if (!room) {

            alert(
                "Sorry, this room could not be found. It may have been removed."
            );

            return;

        }


        // Room is full
        if (
            Number(room.available_spaces) <= 0
        ) {

            alert(
                "Sorry, this room is already full. Please choose another room."
            );

            return;

        }


        // =========================
        // LOAD EXISTING APPLICATIONS
        // =========================

        const applicationsResponse =
            await fetch(
                `${API_URL}/api/applications`
            );


        if (!applicationsResponse.ok) {

            throw new Error(
                "Unable to check existing applications."
            );

        }


        const applications =
            await applicationsResponse.json();


        // Check whether student already
        // applied for this room
        const existingApplication =
            applications.find(
                application =>

                    Number(
                        application.student?.id
                    ) ===
                    Number(student.id)

                    &&

                    Number(
                        application.room?.id
                    ) ===
                    Number(room.id)

                    &&

                    (
                        application.status ===
                        "Pending"

                        ||

                        application.status ===
                        "Approved"
                    )
            );


        if (existingApplication) {

            if (
                existingApplication.status ===
                "Approved"
            ) {

                alert(
                    "You have already been approved for this room."
                );

            } else {

                alert(
                    "You already have a pending application for this room."
                );

            }

            return;

        }


        // =========================
        // SUBMIT APPLICATION
        // =========================

        const response =
            await fetch(
                `${API_URL}/api/applications`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        student_id:
                            student.id,

                        accommodation_id:
                            room.accommodation_id,

                        room_id:
                            room.id

                    })

                }
            );


        const data =
            await response.json();


        // =========================
        // SUCCESS
        // =========================

        if (response.ok) {

            alert(
                "Application submitted successfully! You can track your application from your dashboard."
            );


            window.location.href =
                "dashboard.html";


        }

        // =========================
        // SERVER ERROR
        // =========================

        else {

            alert(
                data.error ||
                "We could not submit your application. Please try again."
            );

        }


    } catch (error) {

        console.error(
            "Application error:",
            error
        );


        alert(
            "We could not connect to ResLink. Please check that the server is running and try again."
        );

    }

}


// ===============================
// START APPLICATION
// ===============================

loadAccommodations();


// ===============================
// STUDENT REGISTRATION
// ===============================

const registerForm =
    document.getElementById(
        "register-form"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const fullName =
                document.getElementById(
                    "full_name"
                ).value;


            const email =
                document.getElementById(
                    "email"
                ).value;


            const phone =
                document.getElementById(
                    "phone"
                ).value;


            const dateOfBirth =
                document.getElementById(
                    "date_of_birth"
                ).value;


            const gender =
                document.getElementById(
                    "gender"
                ).value;


            const institutionId =
                document.getElementById(
                    "institution_id"
                ).value;


            const fundingType =
                document.getElementById(
                    "funding_type"
                ).value;


            const fundingDocument =
                document.getElementById(
                    "funding_document"
                ).files[0];


            const password =
                document.getElementById(
                    "password"
                ).value;


            const message =
                document.getElementById(
                    "register-message"
                );


            // ===============================
            // BASIC VALIDATION
            // ===============================

            if (!fundingDocument) {

                message.textContent =
                    "Please upload your funding approval document.";

                message.style.color =
                    "red";

                return;
            }


            // ===============================
            // CREATE FORM DATA
            // ===============================

            const formData =
                new FormData();


            formData.append(
                "full_name",
                fullName
            );


            formData.append(
                "email",
                email
            );


            formData.append(
                "phone",
                phone
            );


            formData.append(
                "date_of_birth",
                dateOfBirth
            );


            formData.append(
                "gender",
                gender
            );


            formData.append(
                "institution_id",
                institutionId
            );


            formData.append(
                "funding_type",
                fundingType
            );


            formData.append(
                "funding_document",
                fundingDocument
            );


            formData.append(
                "password",
                password
            );


            try {

                const response =
                    await fetch(
                        `${API_URL}/api/students`,
                        {
                            method: "POST",

                            body: formData
                        }
                    );


                const data =
                    await response.json();


                if (response.ok) {

                    message.textContent =
                        "Account created successfully!";

                    message.style.color =
                        "green";


                    registerForm.reset();


                    setTimeout(() => {

                        window.location.href =
                            "login.html";

                    }, 1500);


                } else {

                    message.textContent =
                        data.error ||
                        "Registration failed.";

                    message.style.color =
                        "red";

                }


            } catch (error) {

                console.error(error);


                message.textContent =
                    "Could not connect to the server.";

                message.style.color =
                    "red";

            }

        }
    );

}




// ===============================
// STUDENT LOGIN
// ===============================

const loginForm =
    document.getElementById(
        "login-form"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "login-email"
                ).value;


            const password =
                document.getElementById(
                    "login-password"
                ).value;


            const message =
                document.getElementById(
                    "login-message"
                );


            try {

                const response =
                    await fetch(
                        `${API_URL}/api/login`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                email:
                                    email,

                                password:
                                    password

                            })

                        }
                    );


                const data =
                    await response.json();


                if (response.ok) {

                    message.textContent =
                        "Login successful!";


                    message.style.color =
                        "green";


                    localStorage.setItem(
                        "student",
                        JSON.stringify(
                            data.student
                        )
                    );


                    setTimeout(() => {

                        window.location.href =
                            "dashboard.html";

                    }, 1000);


                } else {

                    message.textContent =
                        data.error ||
                        "Invalid email or password.";


                    message.style.color =
                        "red";

                }


            } catch (error) {

                console.error(error);


                message.textContent =
                    "Could not connect to the server.";


                message.style.color =
                    "red";

            }

        }
    );

}


// ===============================
// STUDENT DASHBOARD
// ===============================

const studentData =
    localStorage.getItem(
        "student"
    );


if (studentData) {

    const student =
        JSON.parse(
            studentData
        );


    const studentName =
        document.getElementById(
            "student-name"
        );


    const profile =
        document.getElementById(
            "student-profile"
        );


    if (studentName) {

        studentName.textContent =
            student.full_name;

    }


    if (profile) {

        profile.innerHTML = `

            <div class="profile-item">

                <strong>
                    Full Name
                </strong>

                ${student.full_name}

            </div>


            <div class="profile-item">

                <strong>
                    Email
                </strong>

                ${student.email}

            </div>


            <div class="profile-item">

                <strong>
                    Phone
                </strong>

                ${student.phone || "Not provided"}

            </div>

        `;

    }


    loadStudentApplications(
        student.id
    );

}


// ===============================
// LOAD STUDENT APPLICATIONS
// ===============================

async function loadStudentApplications(
    studentId
) {

    const container =
        document.getElementById(
            "my-applications"
        );


    if (!container) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/applications`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load applications"
            );

        }


        const applications =
            await response.json();


        const studentApplications =
            applications.filter(
                application =>
                    Number(
                        application.student.id
                    ) ===
                    Number(
                        studentId
                    )
            );


        if (
            studentApplications.length === 0
        ) {

            container.innerHTML = `

                <div class="no-applications">

                    <h3>
                        No Applications Yet
                    </h3>

                    <p>
                        You have not submitted
                        any accommodation applications.
                    </p>

                    <a
                        href="index.html"
                        class="dashboard-button"
                    >
                        Find Accommodation
                    </a>

                </div>

            `;


            return;

        }


        container.innerHTML = "";


        studentApplications.forEach(
            application => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "application-card";


                const status =
                    application.status
                        .toLowerCase();


                let statusMessage =
                    "";


                if (
                    application.status ===
                    "Pending"
                ) {

                    statusMessage =
                        "Your application is currently being reviewed.";

                }


                if (
        application.status ===
                "Approved"
                ) {

                statusMessage =
              "Congratulations! Your accommodation application has been approved. Your room has been allocated successfully.";

                }


                if (
                    application.status ===
                    "Rejected"
                ) {

                    statusMessage =
                        "Your application was not approved. You can browse other available rooms.";

                }


                card.innerHTML = `

                    <div
                        class="application-card-header"
                    >

                        <div>

                            <h3>
                                ${application.accommodation.name}
                            </h3>


                            <p
                                class="application-address"
                            >
                                ${application.accommodation.address}
                            </p>

                        </div>


                        <span
                            class="
                                status
                                status-${status}
                            "
                        >
                            ${application.status}
                        </span>

                    </div>


                    <div
                        class="application-details"
                    >

                        <div
                            class="application-detail"
                        >

                            <span>
                                Room
                            </span>

                            <strong>
                                ${application.room.room_number}
                            </strong>

                        </div>


                        <div
                            class="application-detail"
                        >

                            <span>
                                Room Type
                            </span>

                            <strong>
                                ${application.room.room_type}
                            </strong>

                        </div>


                        <div
                            class="application-detail"
                        >

                            <span>
                                Monthly Price
                            </span>

                            <strong>
                                R${Number(
                                    application.room.price
                                ).toLocaleString()}
                            </strong>

                        </div>

                    </div>


                    <div
                        class="
                            application-status-message
                            status-message-${status}
                        "
                    >
                        ${statusMessage}
                    </div>


                    ${
                        application.status ===
                        "Rejected"

                        ? `

                            <a
                                href="index.html"
                                class="dashboard-button"
                            >
                                Browse Other Rooms
                            </a>

                        `

                        : ""

                    }

                `;


                container.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(
            "Error loading applications:",
            error
        );


        container.innerHTML = `

            <div class="no-applications">

                <p>
                    Could not load your applications.
                    Please try again later.
                </p>

            </div>

        `;

    }

}


// ===============================
// LOGOUT
// ===============================

const logoutLink =
    document.getElementById(
        "logout-link"
    );


const adminLogout =
    document.getElementById(
        "admin-logout"
    );


function logoutUser(event) {

    event.preventDefault();


    localStorage.removeItem(
        "student"
    );


    window.location.href =
        "index.html";

}


if (logoutLink) {

    logoutLink.addEventListener(
        "click",
        logoutUser
    );

}


if (adminLogout) {

    adminLogout.addEventListener(
        "click",
        logoutUser
    );

}


// ===============================
// ADMIN DASHBOARD
// ===============================

async function loadAdminDashboard() {

    const adminApplications =
        document.getElementById(
            "admin-applications"
        );


    const adminRooms =
        document.getElementById(
            "admin-rooms"
        );


    if (
        !adminApplications &&
        !adminRooms
    ) {

        return;

    }


    try {

        // =========================
        // LOAD ACCOMMODATIONS
        // =========================

        const accommodationResponse =
            await fetch(
                `${API_URL}/api/accommodations`
            );


        const accommodations =
            await accommodationResponse.json();


        const totalAccommodations =
            document.getElementById(
                "total-accommodations"
            );


        if (totalAccommodations) {

            totalAccommodations.textContent =
                accommodations.length;

        }


        // =========================
        // LOAD ROOMS
        // =========================

        const roomResponse =
            await fetch(
                `${API_URL}/api/rooms`
            );


        const rooms =
            await roomResponse.json();


        const totalRooms =
            document.getElementById(
                "total-rooms"
            );


        if (totalRooms) {

            totalRooms.textContent =
                rooms.length;

        }


        // =========================
        // LOAD STUDENTS
        // =========================

        const studentResponse =
            await fetch(
                `${API_URL}/api/students`
            );


        const students =
            await studentResponse.json();


        const totalStudents =
            document.getElementById(
                "total-students"
            );


        if (totalStudents) {

            totalStudents.textContent =
                students.length;

        }


        // =========================
        // LOAD APPLICATIONS
        // =========================

        const applicationResponse =
            await fetch(
                `${API_URL}/api/applications`
            );


        const applications =
            await applicationResponse.json();


        const pendingApplications =
            applications.filter(
                application =>
                    application.status ===
                    "Pending"
            );


        const pendingElement =
            document.getElementById(
                "pending-applications"
            );


        if (pendingElement) {

            pendingElement.textContent =
                pendingApplications.length;

        }


        // =========================
        // DISPLAY APPLICATIONS
        // =========================

        if (adminApplications) {

            if (
                applications.length === 0
            ) {

                adminApplications.innerHTML =
                    "<p>No applications found.</p>";

            } else {

                adminApplications.innerHTML =
                    "";


                applications.forEach(
                    application => {

                        const card =
                            document.createElement(
                                "div"
                            );


                        card.className =
                            "admin-application";


                        card.innerHTML = `

                            <h3>

                                ${
                                    application.student
                                    ? application.student.full_name
                                    : "Student"
                                }

                            </h3>


                            <p>

                                <strong>
                                    Accommodation:
                                </strong>

                                ${
                                    application.accommodation
                                    ? application.accommodation.name
                                    : "Not available"
                                }

                            </p>


                            <p>

                                <strong>
                                    Room:
                                </strong>

                                ${
                                    application.room
                                    ? application.room.room_number
                                    : "Not available"
                                }

                            </p>


                            <p>

                                <strong>
                                    Room Type:
                                </strong>

                                ${
                                    application.room
                                    ? application.room.room_type
                                    : "Not available"
                                }

                            </p>


                            <p>

                                <strong>
                                    Monthly Price:
                                </strong>

                                ${
                                    application.room

                                    ? `R${Number(
                                        application.room.price
                                    ).toLocaleString()}`

                                    : "Not available"

                                }

                            </p>


                            <p>

                                <strong>
                                    Status:
                                </strong>

                                ${application.status}

                            </p>


                            ${
                                application.status ===
                                "Pending"

                                ? `

                                    <button
                                        type="button"
                                        class="approve-button"
                                        onclick="
                                            approveApplication(
                                                ${application.id}
                                            )
                                        "
                                    >
                                        Approve
                                    </button>


                                    <button
                                        type="button"
                                        class="reject-button"
                                        onclick="
                                            rejectApplication(
                                                ${application.id}
                                            )
                                        "
                                    >
                                        Reject
                                    </button>

                                `

                                : ""

                            }

                        `;


                        adminApplications.appendChild(
                            card
                        );

                    }
                );

            }

        }


        // =========================
        // DISPLAY ROOMS
        // =========================

        if (adminRooms) {

            if (
                rooms.length === 0
            ) {

                adminRooms.innerHTML =
                    "<p>No rooms found.</p>";

            } else {

                adminRooms.innerHTML =
                    "";


                rooms.forEach(
                    room => {

                        const card =
                            document.createElement(
                                "div"
                            );


                        card.className =
                            "admin-room";


                        const available =
                            Number(
                                room.available_spaces
                            );


                        const occupied =
                            Number(
                                room.occupied
                            );


                        const capacity =
                            Number(
                                room.capacity
                            );


                        const roomStatus =
                            available > 0
                                ? "Available"
                                : "Full";


                        const roomStatusClass =
                            available > 0
                                ? "room-available"
                                : "room-full";


                        card.innerHTML = `

                            <h3>
                                Room
                                ${room.room_number}
                            </h3>


                            <p>

                                <strong>
                                    Type:
                                </strong>

                                ${room.room_type}

                            </p>


                            <p>

                                <strong>
                                    Price:
                                </strong>

                                R${Number(
                                    room.price
                                ).toLocaleString()}
                                / month

                            </p>


                            <p>

                                <strong>
                                    Capacity:
                                </strong>

                                ${capacity}

                            </p>


                            <p>

                                <strong>
                                    Occupied:
                                </strong>

                                ${occupied}

                            </p>


                            <p
                                class="${roomStatusClass}"
                            >

                                <strong>
                                    Status:
                                </strong>

                                ${roomStatus}

                            </p>


                            <p
                                class="${
                                    available > 0
                                    ? "room-available"
                                    : "room-full"
                                }"
                            >

                                ${
                                    available > 0

                                    ? `${available} space(s) available`

                                    : "No spaces available"

                                }

                            </p>


                            <div
                                class="admin-room-actions"
                            >

                                ${
                                    occupied > 0

                                    ? `

                                        <button
                                            type="button"
                                            class="free-room-button"
                                            onclick="
                                                markRoomAsFree(
                                                    ${room.id}
                                                )
                                            "
                                        >
                                            Mark as Free
                                        </button>

                                    `

                                    : `

                                        <button
                                            type="button"
                                            class="free-room-button"
                                            disabled
                                        >
                                            Already Free
                                        </button>

                                    `
                                }


                                ${
                                    occupied === 0

                                    ? `

                                        <button
                                            type="button"
                                            class="delete-room-button"
                                            onclick="
                                                deleteRoom(
                                                    ${room.id}
                                                )
                                            "
                                        >
                                            Delete Room
                                        </button>

                                    `

                                    : `

                                        <button
                                            type="button"
                                            class="delete-room-button"
                                            disabled
                                        >
                                            Cannot Delete Occupied Room
                                        </button>

                                    `
                                }

                            </div>

                        `;


                        adminRooms.appendChild(
                            card
                        );

                    }
                );

            }

        }


    } catch (error) {

        console.error(
            "Admin dashboard error:",
            error
        );

    }

}


// ===============================
// APPROVE APPLICATION
// ===============================

async function approveApplication(
    applicationId
) {

    const confirmed =
        confirm(
            "Are you sure you want to approve this application?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/applications/${applicationId}/approve`,
                {
                    method: "PUT"
                }
            );


        const data =
            await response.json();


        if (response.ok) {

            alert(
                "Application approved successfully!"
            );


            loadAdminDashboard();


        } else {

            alert(
                data.error ||
                "Could not approve application."
            );

        }


    } catch (error) {

        console.error(error);


        alert(
            "Could not connect to the server."
        );

    }

}


// ===============================
// REJECT APPLICATION
// ===============================

async function rejectApplication(
    applicationId
) {

    const confirmed =
        confirm(
            "Are you sure you want to reject this application?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/applications/${applicationId}/reject`,
                {
                    method: "PUT"
                }
            );


        const data =
            await response.json();


        if (response.ok) {

            alert(
                "Application rejected successfully!"
            );


            loadAdminDashboard();


        } else {

            alert(
                data.error ||
                "Could not reject application."
            );

        }


    } catch (error) {

        console.error(error);


        alert(
            "Could not connect to the server."
        );

    }

}


// ===============================
// START ADMIN DASHBOARD
// ===============================

loadAdminDashboard();

loadAdminAccommodations();

loadRoomAccommodations();


// ===============================
// APPLICATION MODAL
// ===============================

let selectedRoomId = null;


// ===============================
// OPEN APPLICATION MODAL
// ===============================

async function openApplicationModal(
    roomId
) {

    try {

        const response =
            await fetch(
                `${API_URL}/api/rooms`
            );


        const rooms =
            await response.json();


        const room =
            rooms.find(
                r =>
                    Number(r.id) ===
                    Number(roomId)
            );


        if (!room) {

            alert(
                "Room information could not be found."
            );


            return;

        }


        if (
            room.available_spaces <= 0
        ) {

            alert(
                "This room is already full."
            );


            return;

        }


        selectedRoomId =
            room.id;


        const details =
            document.getElementById(
                "application-room-details"
            );


        details.innerHTML = `

            <h3>
                Room ${room.room_number}
            </h3>


            <p>

                <strong>
                    Room Type:
                </strong>

                ${room.room_type}

            </p>


            <p>

                <strong>
                    Monthly Price:
                </strong>

                R${Number(
                    room.price
                ).toLocaleString()}

            </p>


            <p>

                <strong>
                    Capacity:
                </strong>

                ${room.capacity}

            </p>


            <p>

                <strong>
                    Spaces Available:
                </strong>

                ${room.available_spaces}

            </p>

        `;


        const modal =
            document.getElementById(
                "application-modal"
            );


        modal.style.display =
            "flex";


        const student =
            JSON.parse(
                localStorage.getItem(
                    "student"
                )
            );


        if (student) {

            document.getElementById(
                "application-name"
            ).value =
                student.full_name || "";


            document.getElementById(
                "application-email"
            ).value =
                student.email || "";


            document.getElementById(
                "application-phone"
            ).value =
                student.phone || "";

        }


    } catch (error) {

        console.error(
            "Error opening application modal:",
            error
        );


        alert(
            "Unable to load room information."
        );

    }

}


// ===============================
// CLOSE APPLICATION MODAL
// ===============================

function closeApplicationModal() {

    const modal =
        document.getElementById(
            "application-modal"
        );


    modal.style.display =
        "none";


    selectedRoomId =
        null;

}


// ===============================
// SUBMIT APPLICATION FORM
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const form =
            document.getElementById(
                "application-form"
            );


        if (!form) {

            return;

        }


        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                // =========================
                // CHECK LOGIN
                // =========================

                const studentData =
                    localStorage.getItem(
                        "student"
                    );


                if (!studentData) {

                    alert(
                        "Please login before applying for accommodation."
                    );


                    window.location.href =
                        "login.html";


                    return;

                }


                const student =
                    JSON.parse(
                        studentData
                    );


                // =========================
                // CHECK ROOM SELECTION
                // =========================

                if (!selectedRoomId) {

                    alert(
                        "Please select a room before submitting your application."
                    );


                    return;

                }


                try {

                    // =========================
                    // CHECK ROOM
                    // =========================

                    const roomsResponse =
                        await fetch(
                            `${API_URL}/api/rooms`
                        );


                    if (!roomsResponse.ok) {

                        throw new Error(
                            "Unable to load rooms."
                        );

                    }


                    const rooms =
                        await roomsResponse.json();


                    const room =
                        rooms.find(
                            r =>
                                Number(r.id) ===
                                Number(
                                    selectedRoomId
                                )
                        );


                    if (!room) {

                        alert(
                            "Sorry, this room is no longer available."
                        );


                        closeApplicationModal();


                        return;

                    }


                    // =========================
                    // CHECK ROOM AVAILABILITY
                    // =========================

                    if (
                        Number(
                            room.available_spaces
                        ) <= 0
                    ) {

                        alert(
                            "Sorry, this room has just become full. Please choose another room."
                        );


                        closeApplicationModal();


                        return;

                    }


                    // =========================
                    // CHECK EXISTING APPLICATIONS
                    // =========================

                    const applicationsResponse =
                        await fetch(
                            `${API_URL}/api/applications`
                        );


                    if (
                        !applicationsResponse.ok
                    ) {

                        throw new Error(
                            "Unable to check applications."
                        );

                    }


                    const applications =
                        await applicationsResponse.json();


                    // Check same room
                    const existingApplication =
                        applications.find(
                            application =>

                                Number(
                                    application.student?.id
                                ) ===
                                Number(
                                    student.id
                                )

                                &&

                                Number(
                                    application.room?.id
                                ) ===
                                Number(
                                    room.id
                                )

                                &&

                                (
                                    application.status ===
                                    "Pending"

                                    ||

                                    application.status ===
                                    "Approved"
                                )
                        );


                    if (
                        existingApplication
                    ) {

                        if (
                            existingApplication.status ===
                            "Approved"
                        ) {

                            alert(
                                "You have already been approved for this room."
                            );

                        } else {

                            alert(
                                "You already have a pending application for this room."
                            );

                        }


                        closeApplicationModal();


                        return;

                    }


                    // =========================
                    // SUBMIT APPLICATION
                    // =========================

                    const response =
                        await fetch(
                            `${API_URL}/api/applications`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({

                                    student_id:
                                        student.id,

                                    accommodation_id:
                                        room.accommodation_id,

                                    room_id:
                                        room.id

                                })

                            }
                        );


                    const data =
                        await response.json();


                    // =========================
                    // SUCCESS
                    // =========================

                    if (response.ok) {

                        alert(
                            "Application submitted successfully! You can track your application from your dashboard."
                        );


                        closeApplicationModal();


                        window.location.href =
                            "dashboard.html";


                    }

                    // =========================
                    // SERVER ERROR
                    // =========================

                    else {

                        alert(
                            data.error ||
                            "We could not submit your application. Please try again."
                        );

                    }


                } catch (error) {

                    console.error(
                        "Application error:",
                        error
                    );


                    alert(
                        "We could not connect to ResLink. Please check that the server is running and try again."
                    );

                }

            }
        );

    }
);

// ===============================
// ADMIN - LOAD ACCOMMODATIONS
// ===============================

async function loadAdminAccommodations() {

    const container =
        document.getElementById(
            "admin-accommodations"
        );


    if (!container) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/accommodations`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to load accommodations"
            );

        }


        const accommodations =
            await response.json();


        if (
            accommodations.length === 0
        ) {

            container.innerHTML = `
                <p>
                    No accommodations found.
                </p>
            `;


            return;

        }


        container.innerHTML = "";


        accommodations.forEach(
            accommodation => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "admin-accommodation-card";


                card.innerHTML = `

                    <div>

                        <h3>
                            ${accommodation.name}
                        </h3>


                        <p>
                            ${accommodation.address}
                        </p>


                        <p>

                            ${
                                accommodation.contact_number ||
                                "Not provided"
                            }

                        </p>


                        <p>

                            ${
                                accommodation.description ||
                                "No description provided."
                            }

                        </p>

                    </div>


                    <div>

                        <span
                            class="
                                admin-accreditation-badge
                                ${
                                    accommodation.accredited
                                    ? "accredited"
                                    : "not-accredited"
                                }
                            "
                        >

                            ${
                                accommodation.accredited
                                ? "Accredited"
                                : "Not Accredited"
                            }

                        </span>


                        <button
                            type="button"
                            class="delete-accommodation-button"
                            onclick="
                                deleteAccommodation(
                                    ${accommodation.id}
                                )
                            "
                        >
                            Delete Accommodation
                        </button>

                    </div>

                `;


                container.appendChild(
                    card
                );

            }
        );


    } catch (error) {

        console.error(
            "Error loading accommodations:",
            error
        );


        container.innerHTML = `
            <p>
                Could not load accommodations.
            </p>
        `;

    }

}


// ===============================
// ADMIN - CREATE ACCOMMODATION
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const form =
            document.getElementById(
                "accommodation-form"
            );


        if (!form) {

            return;

        }


        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "accommodation-name"
                    ).value.trim();


                const address =
                    document.getElementById(
                        "accommodation-address"
                    ).value.trim();


                const imageUrl =
                    document.getElementById(
                        "accommodation-image"
                    ).value.trim();


                const contactNumber =
                    document.getElementById(
                        "accommodation-contact"
                    ).value.trim();


                const institutionId =
                    document.getElementById(
                        "accommodation-institution"
                    ).value;


                const description =
                    document.getElementById(
                        "accommodation-description"
                    ).value.trim();


                const accredited =
                    document.getElementById(
                        "accommodation-accredited"
                    ).checked;


                try {

                    const response =
                        await fetch(
                            `${API_URL}/api/accommodations`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({

                                    name:
                                        name,

                                    address:
                                        address,

                                    image_url:
                                        imageUrl,

                                    contact_number:
                                        contactNumber,

                                    description:
                                        description,

                                    accredited:
                                        accredited,

                                    institution_id:
                                        Number(
                                            institutionId
                                        )

                                })

                            }
                        );


                    const data =
                        await response.json();


                    if (response.ok) {

                        alert(
                            "Accommodation added successfully!"
                        );


                        form.reset();


                        document.getElementById(
                            "accommodation-accredited"
                        ).checked = true;


                        loadAdminAccommodations();


                        loadAdminDashboard();


                    } else {

                        alert(
                            data.error ||
                            "Could not add accommodation."
                        );

                    }


                } catch (error) {

                    console.error(
                        "Error creating accommodation:",
                        error
                    );


                    alert(
                        "Could not connect to the server."
                    );

                }

            }
        );

    }
);


// ===============================
// ADMIN - LOAD ACCOMMODATION OPTIONS
// ===============================

async function loadRoomAccommodations() {

    const select =
        document.getElementById(
            "room-accommodation"
        );


    if (!select) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/accommodations`
            );


        const accommodations =
            await response.json();


        select.innerHTML = `

            <option value="">
                Select accommodation
            </option>

        `;


        accommodations.forEach(
            accommodation => {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    accommodation.id;


                option.textContent =
                    accommodation.name;


                select.appendChild(
                    option
                );

            }
        );


    } catch (error) {

        console.error(
            "Error loading accommodations:",
            error
        );

    }

}


// ===============================
// ADMIN - CREATE ROOM
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const form =
            document.getElementById(
                "room-form"
            );


        if (!form) {

            return;

        }


        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const accommodationId =
                    document.getElementById(
                        "room-accommodation"
                    ).value;


                const roomNumber =
                    document.getElementById(
                        "room-number"
                    ).value.trim();


                const roomType =
                    document.getElementById(
                        "room-type"
                    ).value;


                const price =
                    document.getElementById(
                        "room-price"
                    ).value;


                const capacity =
                    document.getElementById(
                        "room-capacity"
                    ).value;


                const occupied =
                    document.getElementById(
                        "room-occupied"
                    ).value;


                try {

                    const response =
                        await fetch(
                            `${API_URL}/api/rooms`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify({

                                    room_number:
                                        roomNumber,

                                    room_type:
                                        roomType,

                                    price:
                                        Number(
                                            price
                                        ),

                                    capacity:
                                        Number(
                                            capacity
                                        ),

                                    occupied:
                                        Number(
                                            occupied
                                        ),

                                    accommodation_id:
                                        Number(
                                            accommodationId
                                        )

                                })

                            }
                        );


                    const data =
                        await response.json();


                    if (response.ok) {

                        alert(
                            "Room added successfully!"
                        );


                        form.reset();


                        document.getElementById(
                            "room-occupied"
                        ).value = 0;


                        loadAdminDashboard();


                    } else {

                        alert(
                            data.error ||
                            "Could not add room."
                        );

                    }


                } catch (error) {

                    console.error(
                        "Error creating room:",
                        error
                    );


                    alert(
                        "Could not connect to the server."
                    );

                }

            }
        );

    }
);


// ===============================
// ADMIN - ROOM MANAGEMENT
// ===============================

async function deleteRoom(
    roomId
) {

    const confirmed =
        confirm(
            "Are you sure you want to permanently delete this room?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/rooms/${roomId}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (response.ok) {

            alert(
                "Room deleted successfully!"
            );


            loadAdminDashboard();


        } else {

            alert(
                data.error ||
                "Could not delete room."
            );

        }


    } catch (error) {

        console.error(
            "Error deleting room:",
            error
        );


        alert(
            "Could not connect to the server."
        );

    }

}


// ===============================
// ADMIN - MARK ROOM AS FREE
// ===============================

async function markRoomAsFree(
    roomId
) {

    const confirmed =
        confirm(
            "Are you sure you want to mark this room as free? This will remove all current occupancy from the room."
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/rooms/${roomId}/free`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    }
                }
            );


        const data =
            await response.json();


        if (response.ok) {

            alert(
                "Room has been marked as free!"
            );


            loadAdminDashboard();


        } else {

            alert(
                data.error ||
                "Could not mark room as free."
            );

        }


    } catch (error) {

        console.error(
            "Error marking room as free:",
            error
        );


        alert(
            "Could not connect to the server."
        );

    }

}


// ===============================
// ADMIN - DELETE ACCOMMODATION
// ===============================

async function deleteAccommodation(
    accommodationId
) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this accommodation?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/accommodations/${accommodationId}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (response.ok) {

            alert(
                "Accommodation deleted successfully!"
            );


            loadAdminAccommodations();


            loadRoomAccommodations();


            loadAdminDashboard();


        } else {

            alert(
                data.error ||
                "Could not delete accommodation."
            );

        }


    } catch (error) {

        console.error(
            "Error deleting accommodation:",
            error
        );


        alert(
            "Could not connect to the server."
        );

    }

}


// ===============================
// ACCOMMODATION SEARCH
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const accommodationSearch =
            document.getElementById(
                "accommodation-search"
            );


        if (!accommodationSearch) {

            return;

        }


        accommodationSearch.addEventListener(
            "input",
            function () {

                const searchTerm =
                    accommodationSearch.value
                        .toLowerCase()
                        .trim();


                const filteredAccommodations =
                    allAccommodations.filter(
                        function (
                            accommodation
                        ) {

                            const name =
                                String(
                                    accommodation.name ||
                                    ""
                                ).toLowerCase();


                            const address =
                                String(
                                    accommodation.address ||
                                    ""
                                ).toLowerCase();


                            const description =
                                String(
                                    accommodation.description ||
                                    ""
                                ).toLowerCase();


                            return (
                                name.includes(
                                    searchTerm
                                ) ||

                                address.includes(
                                    searchTerm
                                ) ||

                                description.includes(
                                    searchTerm
                                )
                            );

                        }
                    );


                displayAccommodations(
                    filteredAccommodations
                );

            }
        );

    }
);