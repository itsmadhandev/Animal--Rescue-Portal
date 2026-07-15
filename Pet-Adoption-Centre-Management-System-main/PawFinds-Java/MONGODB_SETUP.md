# MongoDB Integration for PawFinds Pet Adoption System

## Prerequisites

### Install MongoDB
1. **Download MongoDB Community Server**: https://www.mongodb.com/try/download/community
2. **Install MongoDB** following the installer instructions
3. **Start MongoDB service**:
   ```powershell
   # Windows (as Administrator)
   net start MongoDB
   
   # Or start manually
   mongod --dbpath "C:\data\db"
   ```

### Verify MongoDB is Running
```powershell
# Check if MongoDB is running
mongo --eval "db.runCommand({ connectionStatus: 1 })"

# Or connect to MongoDB shell
mongo
```

## Configuration

### Local MongoDB (Default)
The application is configured to connect to local MongoDB at `mongodb://localhost:27017/pawfinds_db`

### MongoDB Atlas (Cloud - Optional)
To use MongoDB Atlas:
1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Get your connection string
3. Update `application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster.mongodb.net/pawfinds_db?retryWrites=true&w=majority
   ```

## API Endpoints (MongoDB)

All adoption form data is now stored in MongoDB via these endpoints:

### Get All Adoption Forms
```
GET http://localhost:8081/api/mongo/adoption-forms
```

### Get Adoption Form by ID
```
GET http://localhost:8081/api/mongo/adoption-forms/{id}
```

### Get Adoption Forms by Status
```
GET http://localhost:8081/api/mongo/adoption-forms/status/{status}
```
Example: `GET http://localhost:8081/api/mongo/adoption-forms/status/Pending`

### Get Adoption Forms by Email
```
GET http://localhost:8081/api/mongo/adoption-forms/email/{email}
```

### Get Adoption Forms by Pet ID
```
GET http://localhost:8081/api/mongo/adoption-forms/pet/{petId}
```

### Submit Adoption Form
```
POST http://localhost:8081/api/mongo/adoption-forms
Content-Type: application/json

{
  "adopterName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "address": "123 Main St, City",
  "occupation": "Software Engineer",
  "petId": 1,
  "petName": "Buddy",
  "reasonForAdoption": "I love pets and have experience",
  "hasExperience": true,
  "hasOtherPets": false,
  "otherPetsDetails": "",
  "hasYard": true
}
```

### Update Adoption Form Status (Admin)
```
PATCH http://localhost:8081/api/mongo/adoption-forms/{id}/status
Content-Type: application/json

{
  "status": "Approved",
  "comments": "Great candidate for adoption"
}
```

### Delete Adoption Form
```
DELETE http://localhost:8081/api/mongo/adoption-forms/{id}
```

## Database Structure

### Collection: adoption_forms
```javascript
{
  "_id": "ObjectId",
  "adopterName": "String",
  "email": "String",
  "phone": "String",
  "address": "String",
  "occupation": "String",
  "petId": "Integer",
  "petName": "String",
  "reasonForAdoption": "String",
  "hasExperience": "Boolean",
  "hasOtherPets": "Boolean",
  "otherPetsDetails": "String",
  "hasYard": "Boolean",
  "status": "String", // Pending, Approved, Rejected, Adopted
  "submittedDate": "DateTime",
  "reviewedDate": "DateTime",
  "adminComments": "String"
}
```

## Testing MongoDB Connection

### Using MongoDB Compass (GUI)
1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Navigate to `pawfinds_db` database
4. View `adoption_forms` collection

### Using MongoDB Shell
```bash
# Connect to MongoDB
mongo

# Switch to database
use pawfinds_db

# View all adoption forms
db.adoption_forms.find().pretty()

# Count documents
db.adoption_forms.count()

# Find by status
db.adoption_forms.find({status: "Pending"}).pretty()
```

## Running the Application

```powershell
# Make sure MongoDB is running
net start MongoDB

# Start the Spring Boot application
cd "C:\path\to\PawFinds-Java"
java -jar target\pawfinds-adoption-system-1.0.0.jar
```

## Troubleshooting

### MongoDB Connection Error
```
Error: com.mongodb.MongoTimeoutException: Timed out after 30000 ms
```
**Solution**: 
- Ensure MongoDB service is running: `net start MongoDB`
- Check firewall settings
- Verify connection string in `application.properties`

### Database Not Created
MongoDB creates the database automatically when you insert the first document. Submit an adoption form to create the database.

### Port Already in Use
If port 27017 is already in use:
1. Stop the MongoDB service
2. Change the port in `application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27018/pawfinds_db
   ```
3. Start MongoDB on the new port: `mongod --port 27018 --dbpath "C:\data\db"`

## Features

✅ **Adoption Forms stored in MongoDB**
✅ **Flexible schema for easy updates**
✅ **Fast document retrieval**
✅ **Scalable cloud deployment with MongoDB Atlas**
✅ **Original H2/JPA endpoints still work for Pets and Admins**

## Dual Database Support

This application now supports **both databases**:
- **MongoDB**: For adoption forms (flexible, document-based)
- **H2/JPA**: For pets and admin data (relational)

You can use either or both based on your needs!
