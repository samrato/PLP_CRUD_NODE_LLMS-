Got it ✅ Here’s a **well-documented `README.md`** you can use directly in your GitHub repository for your **Node.js CRUD Application**.

---

# 📚 Node.js CRUD Application (Students & Courses)

This is a simple **CRUD (Create, Read, Update, Delete)** application built with **Node.js, Express, and MongoDB**.
It demonstrates how to manage two entities: **Students** and **Courses**, with RESTful API endpoints.

---

## 🚀 Features

* Manage **Students** (Create, Read, Update, Delete).
* Manage **Courses** (Create, Read, Update, Delete).
* MongoDB database integration with **Mongoose ODM**.
* REST API with JSON responses.
* Environment variables with `.env` file.

---

## 📂 Project Structure

```
crud-app-node/
│── models/
│   ├── studentModel.js       # Student schema
│   ├── courseModel.js        # Course schema
│── routes/
│   ├── studentRoutes.js      # Student routes
│   ├── courseRoutes.js       # Course routes
│── server.js                 # Main entry point
│── .env                      # Environment variables
│── package.json              # Dependencies & scripts
│── README.md                 # Project documentation
```

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/samrato/crud-app-node.git
cd crud-app-node
```

### 2. Install dependencies

```

### 3. Setup environment variables

Create a `.env` file in the project root:

```
MONGO_URI=mongodb://localhost:27017/crudDB
```

### 4. Run the application

* For production:

```bash
npm start
```

* For development (with auto-restart using nodemon):

```bash
npm run dev
```

---

## 🌐 API Endpoints

### 🔹 Students

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| POST   | `/api/students`     | Create a new student |
| GET    | `/api/students`     | Get all students     |
| GET    | `/api/students/:id` | Get student by ID    |
| PUT    | `/api/students/:id` | Update student by ID |
| DELETE | `/api/students/:id` | Delete student by ID |

**Example Request (POST /api/students)**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 21
}
```

---

### 🔹 Courses

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/api/courses`     | Create a new course |
| GET    | `/api/courses`     | Get all courses     |
| GET    | `/api/courses/:id` | Get course by ID    |
| PUT    | `/api/courses/:id` | Update course by ID |
| DELETE | `/api/courses/:id` | Delete course by ID |

**Example Request (POST /api/courses)**

```json
{
  "title": "Database Systems",
  "description": "Learn relational databases and SQL",
  "credits": 3
}
```

---

## 🧪 Testing the API

You can test the endpoints using:

* **Postman** (recommended)
* **cURL** in terminal

Example with `cURL`:

```bash
curl -X GET http://localhost:5000/api/students
```

---

## 📦 Dependencies

* [Express](https://expressjs.com/) – Web framework
* [Mongoose](https://mongoosejs.com/) – MongoDB ODM
* [Cors](https://www.npmjs.com/package/cors) – Enable cross-origin requests
* [Dotenv](https://www.npmjs.com/package/dotenv) – Manage environment variables
* [Nodemon](https://nodemon.io/) – Auto-restart (development only)

---

## 📌 Future Improvements

* Add relationship between Students & Courses (e.g., enrollments).
* Add authentication & role-based access.
* Add pagination & filtering for large datasets.

---

## 👨‍💻 Author

* **Your Name**
* GitHub: [@your-username](https://github.com/your-username)

---

⚡ Now you can push this project to GitHub and share it!


