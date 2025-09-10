

* Project overview
* Tech stack used
* Database schema (students, courses)
* How to set up (Postgres, env, install deps, run)
* API Endpoints for both **Students** and **Courses**
* Example **payloads (request + response)**

Here’s the complete README:

---

````markdown
# 📚 Node.js + Express + PostgreSQL CRUD API

A simple **CRUD (Create, Read, Update, Delete) API** built with **Node.js, Express, and PostgreSQL**.  
This project manages **Students** and **Courses**, with full validation and error handling.

---

## 🚀 Tech Stack
- **Node.js** (JavaScript runtime)
- **Express.js** (Web framework)
- **PostgreSQL** (Database)
- **pg** (Postgres client for Node)
- **dotenv** (Environment variables)

---

## 🗄️ Database Schema

### Students Table
```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  age INT CHECK (age >= 10 AND age <= 100)
);
````

### Courses Table

```sql
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  credits INT CHECK (credits > 0)
);
```

---

## ⚙️ Setup Instructions

1. **Clone repository**

   ```bash
   git clone https://github.com/samrato/PLP_CRUD_NODE_LLMS-.git
   cd PLP_CRUD_NODE_LLMS
   ```
2. **Install dependencies**
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root folder:

   ```env
   PORT=5000
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
   ```

4. **Run the server**
   npm start
   ```

   The API will be running at:
   👉 `http://localhost:5000`

---

## 📌 API Endpoints

### 🔹 Students

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | `/api/students`     | Get all students           |
| GET    | `/api/students/:id` | Get a student by ID        |
| POST   | `/api/students`     | Create a new student       |
| PUT    | `/api/students/:id` | Update an existing student |
| DELETE | `/api/students/:id` | Delete a student           |

#### Example: Create Student

**Request**

```json
POST /api/students
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 22
}
```

**Response**

```json
{
  "id": 1,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 22
}
```

---

### 🔹 Courses

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| GET    | `/api/courses`     | Get all courses           |
| GET    | `/api/courses/:id` | Get a course by ID        |
| POST   | `/api/courses`     | Create a new course       |
| PUT    | `/api/courses/:id` | Update an existing course |
| DELETE | `/api/courses/:id` | Delete a course           |

#### Example: Create Course

**Request**

```json
POST /api/courses
{
  "title": "Introduction to Programming",
  "description": "Learn the basics of programming using Python.",
  "credits": 3
}
```

**Response**

```json
{
  "id": 1,
  "title": "Introduction to Programming",
  "description": "Learn the basics of programming using Python.",
  "credits": 3
}
```

---

## ✅ Validations & Error Handling

* Student `email` must be **unique** and in valid format.
* Student `age` must be between **10 and 100**.
* Course `credits` must be **greater than 0**.
* Returns proper **status codes** (`400`, `404`, `500`) with clear error messages.

---

## 🛠️ Testing

 **cURL** to test the endpoints.

Example with cURL:

```bash
curl -X POST http://localhost:5000/api/students \
-H "Content-Type: application/json" \
-d '{"name":"John Doe","email":"john@example.com","age":25}'
```

---


```

---


