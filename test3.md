# Telecom Subscriber & Asset Management System

## 🔄 Overview

This document provides a **step-by-step development guide** for building a scalable **Telecom Subscriber & Asset Management System** using **Node.js, Express.js, MongoDB**, and modern best practices such as modular routing, middleware architecture, validation, and secure configuration.

---

## 📂 Project Structure

```
telecom-api/
├── config/
│   ├── default.js                # Default config for development
│   ├── production.js             # Overrides for production environment
│   └── db.js                     # MongoDB connection logic
│
├── controllers/
│   ├── subscriberController.js   # Subscriber business logic
│   ├── planController.js         # Plan management logic
│   └── assetController.js        # Asset management logic
│
├── middleware/
│   ├── authMiddleware.js         # JWT token validation
│   ├── roleMiddleware.js         # Admin role guard
│   └── errorHandler.js           # Centralized error handling
│
├── models/
│   ├── Subscriber.js             # Schema for subscribers
│   ├── Plan.js                   # Schema for plans
│   └── Asset.js                  # Schema for telecom assets
│
├── routes/
│   ├── subscriberRoutes.js       # Subscriber endpoints
│   ├── planRoutes.js             # Plan endpoints
│   ├── assetRoutes.js            # Asset endpoints
│   └── rootRouter.js             # Aggregates all feature routes
│
├── validators/
│   ├── subscriberValidator.js    # Input validation for subscribers
│   ├── planValidator.js          # Input validation for plans
│   └── assetValidator.js         # Input validation for assets
│
├── utils/
│   ├── generateToken.js          # JWT token generator utility
│   └── validateObjectId.js       # MongoDB ObjectId checker (optional)
│
├── logs/
│   └── access.log                # Log file for production
│
├── .env                          # Optional fallback for environment vars
├── .gitignore                    # Ignore node_modules, .env, logs
├── app.js                        # App instance config (middleware, routers)
├── server.js                     # Starts server and connects DB
├── package.json                  # NPM dependencies and scripts
└── README.md                     # Project intro and usage
```

---

## 🔧 Development Workflow

The development journey for this telecom management system is divided into 10 strategic phases. Each phase builds upon the previous, ensuring the system evolves logically from a raw project scaffold to a feature-rich backend API. Below is a narrative-style explanation of what each phase involves and why it is important:

### ✅ Phase 1: Project Initialization

This is the birth of your application. You initialize your Node.js project with `npm init` to set the foundation. After creating your `package.json`, you bring in essential libraries that power modern RESTful APIs—like `express` for routing, `mongoose` for database management, `bcryptjs` and `jsonwebtoken` for secure user handling, and `express-validator` for input validation. You also set up development tooling like `nodemon` to enhance your productivity. This phase is your first step into structure, maintainability, and modularity.

* Run `npm init -y` to create package.json
* Install packages: `express`, `mongoose`, `dotenv`, `express-validator`, `bcryptjs`, `jsonwebtoken`, `config`, `cors`
* Install dev dependencies: `nodemon`

### ✅ Phase 2: Configuration

Every robust application needs configuration management. In this phase, you integrate the `config` package to load different settings for different environments—such as development and production. You abstract out sensitive values like `mongoURI` and `jwtSecret` to `default.js` and override them via `production.js` using environment variables. This ensures security, scalability, and deployment readiness from the get-go.

* Create `config/default.js` with keys:

  * `mongoURI`, `jwtSecret`, `port`
* Create `config/production.js` for production overrides
* Use `config.get("mongoURI")` instead of hardcoding values

### ✅ Phase 3: Database

This is where your app connects to the persistent world—MongoDB. You create a separate `db.js` file to encapsulate the connection logic using `mongoose.connect`. This design isolates responsibility and ensures cleaner entry points. You use your config setup to fetch the Mongo URI, keeping secrets secure and centralizing all environment-based logic.

* In `db.js`, connect to MongoDB using Mongoose
* Use config values for URI and options
* Call connectDB from `server.js`

### ✅ Phase 4: Entry Points

With your project now able to connect to the database, it's time to set up its operational engine. You use `server.js` purely as the bootstrapper—it connects the DB, loads `app.js`, and starts the server. The real magic happens in `app.js`, which configures middleware like body parsing, CORS support, the root router, and the global error handler. This clear separation of setup and boot logic is a hallmark of production-grade design.

* `server.js`:

  * Calls `connectDB()`
  * Loads `.env` if needed
  * Imports `app.js` and starts server
* `app.js`:

  * Sets up middleware: `express.json()`, `cors`, etc.
  * Uses `rootRouter`
  * Attaches error handler

### ✅ Phase 5: Routing

As your system grows, so will its endpoints. To keep everything modular, you use dedicated routers for each domain—subscribers, plans, and assets. These routes are then aggregated using a central `rootRouter.js` file. By mounting all domain routes from a single location, `app.js` stays clean and focused. This architecture also allows for easier testing and debugging as every domain lives in its own routing space.

* `rootRouter.js` imports:

  * `/api/subscribers` from `subscriberRoutes`
  * `/api/plans` from `planRoutes`
  * `/api/assets` from `assetRoutes`
* Each route file imports controller functions and validators

### ✅ Phase 6: Middleware

Middleware functions act like bodyguards for your routes. Here, you create JWT-based authentication middleware to ensure that only logged-in users can access certain routes. You also build role-based authorization (`roleMiddleware.js`) so only admins can manage assets and plans. Lastly, you set up a central error handler that catches and formats every thrown error in a standardized way—making debugging and monitoring much simpler.

* `authMiddleware.js` validates JWT tokens and sets `req.user`
* `roleMiddleware.js` ensures `req.user.role === 'admin'`
* `errorHandler.js` catches and formats errors

### ✅ Phase 7: Mongoose Models

#### 📘 Subscriber Entity

* **Collection:** `subscribers`
* **Purpose:** Represents a telecom user registered on the platform.
* **Fields:**

  * `name` (String, required): Full name of the subscriber.
  * `email` (String, required, unique): Used for authentication and notifications.
  * `mobileNumber` (String, required, unique): Contact number and secondary identifier.
  * `password` (String, hashed): Encrypted password stored using bcrypt.
  * `role` (String, default: 'subscriber'): Indicates access level (e.g., subscriber, admin).
  * `planId` (ObjectId, ref: `Plan`): Active plan currently assigned to the subscriber.
  * `createdAt`, `updatedAt` (Timestamps): Automatically managed by Mongoose.

#### 📘 Plan Entity

* **Collection:** `plans`
* **Purpose:** Represents telecom data plans offered to subscribers.
* **Fields:**

  * `planName` (String, required, unique): Unique name of the plan.
  * `dataLimitGB` (Number, required): Monthly or total data allocation in GB.
  * `validityDays` (Number, required): Number of valid days after activation.
  * `price` (Number, required): Cost of the plan in currency units.
  * `isActive` (Boolean, default: true): Indicates if the plan can be chosen by subscribers.
  * `createdAt`, `updatedAt` (Timestamps): Lifecycle tracking.

#### 📘 Asset Entity

* **Collection:** `assets`

* **Purpose:** Tracks physical telecom infrastructure (e.g., SIMs, routers) issued to subscribers.

* **Fields:**

  * `assetName` (String, required): Descriptive name or serial ID of the asset.
  * `assetType` (String, required): Categorization of asset (e.g., SIM, Router).
  * `status` (String, enum: \[available, assigned, maintenance, lost], default: "available"): Lifecycle state of the asset.
  * `assignedTo` (ObjectId, ref: `Subscriber`): Which subscriber (if any) the asset is assigned to.
  * `deployedDate` (Date): The date when the asset was issued or installed.
  * `createdAt`, `updatedAt` (Timestamps): Managed automatically.

* **Business Rules:**

  * Assets must be assigned only to valid subscriber IDs.
  * A lost asset cannot be reassigned until recovered or marked as recovered.
  * Only available assets are eligible for assignment.### ✅ Phase 8: Controller Logic
    Controllers are where your business logic lives. In this phase, you implement actionable features for your users:

* Subscribers can register, login, view and update their profile, and request plan changes.

* Admins can manage all available plans—create, update, and deactivate them.

* Assets like SIMs and routers can be created, assigned to users, marked as lost, or updated.
  Every controller must interact cleanly with the model, apply validations, and return structured responses. This phase defines the system’s intelligence.

* `subscriberController.js` handles:

  * Register
  * Login
  * Get Profile
  * Update Profile
  * Request Plan Change

* `planController.js` handles:

  * Create, Read, Update, Soft Delete plans (admin only)

* `assetController.js` handles:

  * Create, Read, Assign, Mark Lost, Update, Delete assets (admin only)

### ✅ Phase 9: Validators

Here, you enforce your data contracts. Using `express-validator`, you ensure that no garbage or malicious data can enter your system. You validate required fields like emails and passwords, enforce uniqueness, and protect against injection attacks. Validators are attached directly to your route handlers, ensuring input is sanitized before reaching controllers.

* `subscriberValidator.js`: Validates name, email, password, etc.
* `planValidator.js`: Validates plan fields
* `assetValidator.js`: Validates asset input and subscriber ID

### ✅ Phase 10: Utilities

Utility functions make your code DRY (Don’t Repeat Yourself). In this phase, you build helpers like `generateToken.js` to centralize JWT token generation and `validateObjectId.js` to ensure MongoDB IDs are valid. These tools are imported and reused wherever needed, improving code readability, testability, and reuse.

* `generateToken.js`: JWT generator using `jsonwebtoken`
* `validateObjectId.js`: Optional check for MongoDB ObjectId

---

## 💼 Deployment Notes

* `NODE_ENV=production` triggers `production.js`
* Use process managers like `pm2` or containers like Docker for deployment
* Enable logging to `logs/access.log`
* Add rate limiting and security headers using `helmet` and `express-rate-limit`

---

## 🎈 Suggested Enhancements

| Feature                | Why It Helps                      |
| ---------------------- | --------------------------------- |
| Audit Logs             | Tracks asset assignments/updates  |
| Health Check API       | Monitoring & DevOps integration   |
| Paginated Assets       | Improve performance on large data |
| Filter Assets by Query | Quick status/type-based filtering |
| Role Promotion API     | Admin promotes a subscriber       |

---

## 📆 Recommended NPM Scripts

```json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}
```

---

## 🚧 Common Pitfalls to Avoid

When building complex backend systems like this Telecom API, even experienced developers can fall into some avoidable traps. Here are common mistakes and how to prevent them:

### 1. **Hardcoding Configuration Values**

**Problem:** Using plain strings for DB URIs or JWT secrets in the code.
**Solution:** Always use the `config` package or `.env` files, especially for secrets. Use `config.get('mongoURI')` instead of hardcoding it in source files.

### 2. **Skipping Input Validation**

**Problem:** Accepting user input without validation can lead to inconsistent data and security flaws.
**Solution:** Always use `express-validator` and sanitize/validate all incoming requests, especially on registration, login, and asset creation.

### 3. **Improper Error Handling**

**Problem:** Returning generic or unformatted error messages.
**Solution:** Use a centralized error handler (`errorHandler.js`) to format and control error outputs.

### 4. **Inconsistent Route Protection**

**Problem:** Allowing public access to sensitive endpoints like `/plans` or `/assets`.
**Solution:** Always verify if routes should be protected with JWT and/or role middleware.

### 5. **Poor Folder and File Organization**

**Problem:** Mixing logic (routes, validation, and controllers) in one file.
**Solution:** Keep a clear separation of concerns: use the layered structure with `/controllers`, `/routes`, `/validators`, and `/models`.

### 6. **No Logging or Monitoring**

**Problem:** Debugging issues in production without logs.
**Solution:** Use tools like `morgan`, write logs to `logs/access.log`, and optionally integrate with logging services.

### 7. **Not Handling Token Expiry**

**Problem:** Tokens may expire without proper feedback.
**Solution:** Always handle JWT expiry and refresh logic where applicable. Return meaningful messages like `"Session expired"`.

### 8. **Lack of Pagination or Filters on Large Lists**

**Problem:** Returning all assets or plans at once can degrade performance.
**Solution:** Implement pagination and filtering on all listing endpoints.

### 9. **Overuse of Admin Privileges**

**Problem:** Giving subscribers access to admin functionality.
**Solution:** Strictly enforce role-based access control with `roleMiddleware`.

### 10. **Ignoring Deployment Best Practices**

**Problem:** Deploying without using process managers or ignoring security headers.
**Solution:** Use `pm2`, `helmet`, rate limiters, and a `.gitignore` file to protect secrets.

---

