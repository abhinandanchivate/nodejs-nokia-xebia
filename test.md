# Telecom Subscriber & Asset Management System – Complete Implementation Guide & API Specification

## 🚀 Objective

Build a secure, modular RESTful backend for a telecom company to manage subscribers, plans, and physical assets (e.g., SIMs and routers). Use proper authentication, validation, business rules, and environment separation.

---

## 🛠️ Technologies & Practices to Use

* **MongoDB (Mongoose)**
* **Express.js**
* **express-validator**
* **JWT (Authentication)**
* **bcryptjs (Password encryption)**
* **Role-based access control (admin vs subscriber)**
* **Environment configuration with `config` or `.env` for development/production**

---

## 📦 Entities

### 1. Subscriber

* **Fields**:

  * `name`: String (required)
  * `email`: String (required, unique)
  * `mobileNumber`: String (10 digits, required, unique)
  * `password`: String (hashed)
  * `role`: Enum \[`subscriber`, `admin`] (default: `subscriber`)
  * `planId`: ObjectId (optional, ref to Plan)

### 2. Plan

* **Fields**:

  * `planName`: String (required, unique)
  * `dataLimitGB`: Number (required)
  * `validityDays`: Number (required)
  * `price`: Number (required)
  * `isActive`: Boolean (default: true)

### 3. Asset

* **Fields**:

  * `assetName`: String (required)
  * `assetType`: Enum \[`SIM`, `Router`, `Modem`] (required)
  * `assignedTo`: ObjectId (optional, ref to Subscriber)
  * `status`: Enum \[`available`, `assigned`, `maintenance`, `lost`] (default: `available`)
  * `issuedDate`: Date (auto-set when assigned)

---

## ✅ GENERAL EXPECTATIONS

| Area               | Expectation                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **Code Quality**   | Modular, layered code (routes, controllers, models, middleware)                              |
| **Security**       | JWT authentication and role-based route protection                                           |
| **Validation**     | Use `express-validator` in **every request**                                                 |
| **Error Handling** | Return meaningful errors with proper HTTP status codes                                       |
| **Config**         | Different environments (dev, test, prod) must be separated via `.env` and/or `config` folder |
| **Testing**        | Postman collection or Swagger to verify endpoints                                            |

---

## 🔧 Configuration Requirement (Mandatory)

* Use `.env` for storing:

  * `PORT`
  * `MONGO_URI`
  * `JWT_SECRET`
* Use a `config/` folder for:

  * Loading environment-specific variables (e.g., `config.dev.js`, `config.prod.js`)
  * Exporting consistent settings (e.g., DB, JWT, logging)

---

## 🧱 Step-by-Step Implementation Rhythm (No Code – Just Expectations)

### STEP 1: Project Setup & Environment Configuration

* Initialize `npm` project
* Create `.env` and `config/` structure
* Environment switch should control DB connection and log behavior

### STEP 2: MongoDB Connection

* Use Mongoose
* Modularize DB logic
* Add error handling

### STEP 3: Subscriber Registration & Login

* `POST /api/subscribers/register`
* `POST /api/subscribers/login`
* `GET /api/subscribers/me`
* `PUT /api/subscribers/me`
* `PUT /api/subscribers/me/plan`

### STEP 4: JWT Middleware + Role Middleware

* Middleware validates JWT token
* Middleware restricts by role (`admin`, `subscriber`)

### STEP 5: CRUD for Plans (Admin Only)

* `POST /api/plans`
* `GET /api/plans`
* `GET /api/plans/:id`
* `PUT /api/plans/:id`
* `DELETE /api/plans/:id` (soft delete using `isActive`)

### STEP 6: CRUD for Assets (Admin Only)

* `POST /api/assets`
* `GET /api/assets`
* `GET /api/assets/:id`
* `PUT /api/assets/:id`
* `PUT /api/assets/assign/:id`
* `PUT /api/assets/lost/:id`
* `DELETE /api/assets/:id` (Optional: Admin hard delete)

### STEP 7: Subscriber Profile & Plan Change (Self-Service)

* Same as Step 3 (repeat for clarity)

### STEP 8: Testing & Verification

* Prepare Postman Collection or Swagger
* Test success, edge, and error cases

---

## 🔐 Authentication & Route Protection

| API                       | Auth | Role Required                 |
| ------------------------- | ---- | ----------------------------- |
| /api/subscribers/register | ❌    | -                             |
| /api/subscribers/login    | ❌    | -                             |
| /api/subscribers/me       | ✅    | subscriber                    |
| /api/subscribers/me/plan  | ✅    | subscriber                    |
| /api/plans                | ✅    | admin / subscriber (GET only) |
| /api/plans/\:id           | ✅    | admin (GET, PUT, DELETE)      |
| /api/assets               | ✅    | admin only                    |
| /api/assets/assign/\:id   | ✅    | admin only                    |
| /api/assets/lost/\:id     | ✅    | admin only                    |

---

## 📌 API Request, Response & Business Rules

### Subscriber Endpoints

#### Register – POST `/api/subscribers/register`

**Business Rules:**

* Email and mobile number must be unique
* Password must be encrypted
* All fields are mandatory
* JWT token must be generated and returned

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobileNumber": "9876543210",
  "password": "Secure@123"
}
```

**Response:**

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "subscriberId",
    "name": "John Doe",
    "role": "subscriber"
  }
}
```

#### Login – POST `/api/subscribers/login`

**Business Rules:**

* Email must exist
* Password must match (bcrypt)
* On success, JWT token should be returned
* On failure, error response with HTTP 401

```json
{
  "email": "john@example.com",
  "password": "Secure@123"
}
```

**Response:** Same as Register

#### Get Profile – GET `/api/subscribers/me`

**Business Rules:**

* JWT required
* Only the logged-in subscriber can access
* Must exclude password from response

#### Update Profile – PUT `/api/subscribers/me`

**Business Rules:**

* JWT required
* Cannot update role field
* Email/mobile must remain unique
* Only update own profile

#### Request Plan Change – PUT `/api/subscribers/me/plan`

**Business Rules:**

* Plan must exist and be active
* Cannot assign same plan again
* Only the logged-in subscriber can request plan change

```json
{
  "planId": "validPlanObjectId"
}
```

### Plan Endpoints

#### Create – POST `/api/plans`

**Business Rules:**

* Admin only
* planName must be unique
* All values must be positive
* isActive should default to true

```json
{
  "planName": "Ultra 5G",
  "dataLimitGB": 100,
  "validityDays": 30,
  "price": 299
}
```

#### Read All – GET `/api/plans`

**Business Rules:**

* Admin sees all plans
* Subscribers see only active plans
* Must support optional filters (e.g., minPrice, maxPrice)

#### Read One – GET `/api/plans/:id`

**Business Rules:**

* Admin only
* Must return 404 for invalid or deleted plans

#### Update – PUT `/api/plans/:id`

**Business Rules:**

* Admin only
* Cannot update if plan is deleted (`isActive = false`)
* planName must remain unique

#### Soft Delete – DELETE `/api/plans/:id`

**Business Rules:**

* Admin only
* Instead of deleting, set `isActive = false`
* Cannot delete plan in use

### Asset Endpoints

#### Create – POST `/api/assets`

**Business Rules:**

* Admin only
* `assetType` must be one of `SIM`, `Router`, `Modem`
* Initial status must be `available`

```json
{
  "assetName": "SIM-JIO-101",
  "assetType": "SIM"
}
```

#### Read All – GET `/api/assets`

**Business Rules:**

* Admin sees all assets
* Subscribers see only their assigned assets
* Must support optional filters (e.g., status, assetType)

#### Read One – GET `/api/assets/:id`

**Business Rules:**

* Admin only
* Return 404 if asset not found

#### Update – PUT `/api/assets/:id`

**Business Rules:**

* Admin only
* Cannot update `assignedTo` directly
* Cannot update lost asset

#### Assign – PUT `/api/assets/assign/:id`

**Business Rules:**

* Admin only
* Asset must be `available`
* Subscriber must exist
* One SIM per subscriber constraint
* Update `status` to `assigned` and set `issuedDate`

```json
{
  "subscriberId": "subscriberObjectId"
}
```

#### Mark Lost – PUT `/api/assets/lost/:id`

**Business Rules:**

* Admin only
* Set `status` to `lost`
* Clear `assignedTo`
* Cannot assign asset once marked lost

---

## 📌 Mandatory Deliverables from Each Participant

| Deliverable            | Description                                       |
| ---------------------- | ------------------------------------------------- |
| Folder Structure       | Clean and modular, follows REST principles        |
| Environment Separation | `.env` + `config/` handling dev and prod settings |
| CRUD APIs              | Subscriber, Plan, Asset with constraints          |
| JWT & Role Auth        | Token-based and role-based authorization          |
| Data Validation        | `express-validator` used in all routes            |
| Postman or Swagger     | Documented API endpoints for verification         |

---

## ✅ Coverage Summary (Audit)

| Entity     | CRUD Complete? | ≥ 7 Business Constraints? | Comments                              |
| ---------- | -------------- | ------------------------- | ------------------------------------- |
| Subscriber | ✅              | ✅ (8)                     | Delete not required (optional)        |
| Plan       | ✅              | ✅ (9)                     | Fully covered with soft delete        |
| Asset      | ✅              | ✅ (10)                    | Robust handling, SIM logic emphasized |

---


