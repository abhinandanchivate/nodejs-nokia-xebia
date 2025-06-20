# Telecom Subscriber & Asset Management System – Final API Specification with Complete Endpoint Breakdown

## 🔧 Endpoint Format for All Routes

For each endpoint:

* **Endpoint Name**
* **Details** (Purpose)
* **Type**: Public / Private
* **Middleware Required**
* **Business Requirements / Validations**
* **Request Payload**
* **Response Payload**

## 📁 Folder Structure

```
telecom-api/
├── config/
│   ├── config.dev.js
│   ├── config.prod.js
│   └── db.js
├── controllers/
│   ├── subscriberController.js
│   ├── planController.js
│   └── assetController.js
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models/
│   ├── Subscriber.js
│   ├── Plan.js
│   └── Asset.js
├── routes/
│   ├── subscriberRoutes.js
│   ├── planRoutes.js
│   └── assetRoutes.js
├── validators/
│   ├── subscriberValidator.js
│   ├── planValidator.js
│   └── assetValidator.js
├── utils/
│   └── generateToken.js
├── .env
├── server.js
└── package.json
```

## 📌 Full API Documentation for Each Endpoint

---

### 👤 Subscriber Endpoints

#### 1. Register Subscriber

* **Endpoint**: POST `/api/subscribers/register`
* **Details**: Register a new subscriber account
* **Type**: Public
* **Middleware**: express-validator
* **Business Requirements**:

  * Email and mobile must be unique
  * Password must be hashed
* **Request Payload**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobileNumber": "9876543210",
  "password": "Secure@123"
}
```

* **Response Payload**:

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

#### 2. Login

* **Endpoint**: POST `/api/subscribers/login`
* **Details**: Authenticate subscriber and return JWT
* **Type**: Public
* **Middleware**: express-validator
* **Business Requirements**:

  * Email must exist
  * Password must match
* **Request Payload**:

```json
{
  "email": "john@example.com",
  "password": "Secure@123"
}
```

* **Response Payload**:

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

#### 3. Get Profile

* **Endpoint**: GET `/api/subscribers/me`
* **Details**: Retrieve logged-in subscriber's profile
* **Type**: Private
* **Middleware**: JWT auth
* **Business Requirements**:

  * Only own profile allowed
* **Request Payload**: None
* **Response Payload**:

```json
{
  "id": "subscriberId",
  "name": "John Doe",
  "email": "john@example.com",
  "mobileNumber": "9876543210",
  "role": "subscriber"
}
```

#### 4. Update Profile

* **Endpoint**: PUT `/api/subscribers/me`
* **Details**: Update subscriber profile fields
* **Type**: Private
* **Middleware**: JWT + express-validator
* **Business Requirements**:

  * Cannot update role
  * Email/mobile must remain unique
* **Request Payload**:

```json
{
  "name": "John Updated",
  "email": "new@example.com",
  "mobileNumber": "9876543211"
}
```

* **Response Payload**:

```json
{
  "message": "Profile updated successfully"
}
```

#### 5. Request Plan Change

* **Endpoint**: PUT `/api/subscribers/me/plan`
* **Details**: Change the current plan of the subscriber
* **Type**: Private
* **Middleware**: JWT + express-validator
* **Business Requirements**:

  * Plan must be active and valid
* **Request Payload**:

```json
{
  "planId": "planObjectId"
}
```

* **Response Payload**:

```json
{
  "message": "Plan updated successfully"
}
```

---

### 📶 Plan Endpoints

#### 6. Create Plan

* **Endpoint**: POST `/api/plans`
* **Details**: Admin creates a new telecom plan
* **Type**: Private
* **Middleware**: JWT + Admin + express-validator
* **Business Requirements**:

  * Unique plan name
* **Request Payload**:

```json
{
  "planName": "Premium 4G",
  "dataLimitGB": 100,
  "validityDays": 30,
  "price": 299
}
```

* **Response Payload**:

```json
{
  "message": "Plan created successfully"
}
```

#### 7. Get All Plans

* **Endpoint**: GET `/api/plans`
* **Details**: Admin sees all; subscriber sees active only
* **Type**: Private
* **Middleware**: JWT
* **Request Payload**: None
* **Response Payload**:

```json
[
  {
    "_id": "planId",
    "planName": "Premium 4G",
    "dataLimitGB": 100,
    "validityDays": 30,
    "price": 299,
    "isActive": true
  }
]
```

#### 8. Get Plan by ID

* **Endpoint**: GET `/api/plans/:id`
* **Details**: Fetch specific plan details
* **Type**: Private
* **Middleware**: JWT + Admin
* **Request Payload**: None
* **Response Payload**:

```json
{
  "_id": "planId",
  "planName": "Premium 4G",
  "dataLimitGB": 100,
  "validityDays": 30,
  "price": 299,
  "isActive": true
}
```

#### 9. Update Plan

* **Endpoint**: PUT `/api/plans/:id`
* **Details**: Admin updates plan details
* **Type**: Private
* **Middleware**: JWT + Admin + express-validator
* **Request Payload**:

```json
{
  "price": 349
}
```

* **Response Payload**:

```json
{
  "message": "Plan updated successfully"
}
```

#### 10. Soft Delete Plan

* **Endpoint**: DELETE `/api/plans/:id`
* **Details**: Mark plan as inactive
* **Type**: Private
* **Middleware**: JWT + Admin
* **Response Payload**:

```json
{
  "message": "Plan marked as inactive"
}
```

---

### 📦 Asset Endpoints

#### 11. Create Asset

* **Endpoint**: POST `/api/assets`
* **Details**: Create a new telecom asset
* **Type**: Private
* **Middleware**: JWT + Admin + express-validator
* **Request Payload**:

```json
{
  "assetName": "SIM-ABC123",
  "assetType": "SIM"
}
```

* **Response Payload**:

```json
{
  "message": "Asset created successfully"
}
```

#### 12. Get All Assets

* **Endpoint**: GET `/api/assets`
* **Type**: Private
* **Middleware**: JWT
* **Response Payload**:

```json
[
  {
    "_id": "assetId",
    "assetName": "SIM-ABC123",
    "assetType": "SIM",
    "status": "available"
  }
]
```

#### 13. Get Asset by ID

* **Endpoint**: GET `/api/assets/:id`
* **Type**: Private
* **Middleware**: JWT + Admin
* **Response Payload**:

```json
{
  "_id": "assetId",
  "assetName": "SIM-ABC123",
  "status": "assigned"
}
```

#### 14. Update Asset

* **Endpoint**: PUT `/api/assets/:id`
* **Type**: Private
* **Middleware**: JWT + Admin
* **Request Payload**:

```json
{
  "assetName": "SIM-NEW-456"
}
```

* **Response Payload**:

```json
{
  "message": "Asset updated successfully"
}
```

#### 15. Assign Asset

* **Endpoint**: PUT `/api/assets/assign/:id`
* **Middleware**: JWT + Admin + express-validator
* **Request Payload**:

```json
{
  "subscriberId": "subscriberObjectId"
}
```

* **Response Payload**:

```json
{
  "message": "Asset assigned successfully"
}
```

#### 16. Mark Asset as Lost

* **Endpoint**: PUT `/api/assets/lost/:id`
* **Middleware**: JWT + Admin
* **Response Payload**:

```json
{
  "message": "Asset marked as lost"
}
```

#### 17. Delete Asset (Optional)

* **Endpoint**: DELETE `/api/assets/:id`
* **Middleware**: JWT + Admin
* **Response Payload**:

```json
{
  "message": "Asset deleted successfully"
}
```

---

### 🚀 Future Enhancements

#### 18. Get Audit Logs

* **Endpoint**: GET `/api/logs`
* **Type**: Private
* **Middleware**: JWT + Admin
* **Details**: Retrieve audit logs for actions like assign/lost/update
* **Business Requirements**:

  * Logs must capture action, user, target entity, and timestamp
  * Only admins are allowed to access this endpoint
* **Request Payload**: None
* **Response Payload**:

```json
[
  {
    "action": "assigned",
    "user": "adminId",
    "targetAsset": "assetId",
    "timestamp": "2025-06-20T10:00:00Z"
  }
]
```

#### 19. Paginated Asset List

* **Endpoint**: GET `/api/assets?limit=10&page=2`
* **Type**: Private
* **Middleware**: JWT
* **Details**: Return a paginated list of assets
* **Business Requirements**:

  * Query params `limit` and `page` must be valid positive integers
  * Default limit should be 10 if not provided
* **Request Payload**: None (query params only)
* **Response Payload**:

```json
{
  "total": 97,
  "page": 2,
  "limit": 10,
  "assets": [
    {
      "_id": "assetId",
      "assetName": "SIM-XYZ123",
      "assetType": "SIM",
      "status": "available"
    }
  ]
}
```

#### 20. Filter Assets by Status or Type

* **Endpoint**: GET `/api/assets?status=lost&type=SIM`
* **Type**: Private
* **Middleware**: JWT
* **Details**: Enable asset filtering based on type or status
* **Business Requirements**:

  * `status` must be one of: `available`, `assigned`, `maintenance`, `lost`
  * `assetType` must be one of: `SIM`, `Router`, `Modem`
  * If no filter is passed, return all assets
* **Request Payload**: None (query params only)
* **Response Payload**:

```json
[
  {
    "_id": "assetId",
    "assetName": "SIM-JIO-109",
    "assetType": "SIM",
    "status": "lost"
  }
]
```
