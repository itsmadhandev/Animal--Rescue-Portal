# PawFinds - Pet Adoption System (Java Spring Boot)

A full-stack pet adoption web application built with **Java Spring Boot** for the backend and **HTML, CSS, JavaScript** for the frontend. This system allows users to browse available pets, submit adoption requests, and enables administrators to manage pets and adoption requests.

![PawFinds](https://img.shields.io/badge/Java-Spring%20Boot-green)
![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-blue)
![Database](https://img.shields.io/badge/Database-H2%2FMySQL-orange)

## 🌟 Features

### User Features
- **Browse Pets**: View all available pets with detailed information
- **Filter & Search**: Filter pets by type, status, gender, etc.
- **Pet Details**: View comprehensive information about each pet
- **Adoption Application**: Submit adoption requests with detailed forms
- **Post Pets**: Users can post pets for adoption
- **Responsive Design**: Beautiful UI that works on all devices

### Admin Features
- **Dashboard**: Overview of all pets and adoption requests
- **Manage Pets**: Add, edit, delete pet listings
- **Adoption Requests**: Review and approve/reject adoption applications
- **Adoption History**: Track all completed adoptions
- **Secure Login**: Admin authentication system

## 🛠️ Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA** - Database operations
- **Spring Security** - Authentication & Authorization
- **H2 Database** - Development (In-memory)
- **MySQL** - Production (Optional)
- **Maven** - Dependency management

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with modern animations
- **JavaScript (Vanilla)** - Interactivity
- **Font Awesome** - Icons
- **Fetch API** - REST API calls

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Java JDK 17 or higher** - [Download here](https://www.oracle.com/java/technologies/downloads/)
- **Maven 3.6+** - [Download here](https://maven.apache.org/download.cgi)
- **Git** - [Download here](https://git-scm.com/downloads)
- **MySQL 8.0+** (Optional, for production) - [Download here](https://dev.mysql.com/downloads/)

### Verify Installation

```bash
# Check Java version
java -version

# Check Maven version
mvn -version

# Check Git version
git --version
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd PawFinds-Java
```

### 2. Configure Database

#### Option A: Use H2 Database (Development - Default)
No additional configuration needed! The application comes pre-configured with H2.

#### Option B: Use MySQL (Production)

1. Create a MySQL database:
```sql
CREATE DATABASE pawfinds_db;
```

2. Update `src/main/resources/application.properties`:
```properties
# Comment out H2 configuration
# spring.datasource.url=jdbc:h2:mem:pawfindsdb
# spring.datasource.driverClassName=org.h2.Driver
# spring.h2.console.enabled=true

# Uncomment MySQL configuration
spring.datasource.url=jdbc:mysql://localhost:3306/pawfinds_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

### 3. Build the Project

```bash
mvn clean install
```

This will:
- Download all dependencies
- Compile the Java code
- Run tests (if any)
- Package the application

### 4. Run the Application

```bash
mvn spring-boot:run
```

Or run the JAR file directly:
```bash
java -jar target/pawfinds-adoption-system-1.0.0.jar
```

The application will start on **http://localhost:8080**

### 5. Access the Application

- **Frontend**: http://localhost:8080
- **H2 Console** (if using H2): http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:pawfindsdb`
  - Username: `sa`
  - Password: (leave empty)

## 📁 Project Structure

```
PawFinds-Java/
├── src/
│   ├── main/
│   │   ├── java/com/pawfinds/adoption/
│   │   │   ├── PawFindsApplication.java          # Main application class
│   │   │   ├── config/                           # Configuration classes
│   │   │   │   ├── SecurityConfig.java           # Security configuration
│   │   │   │   └── WebConfig.java                # Web MVC configuration
│   │   │   ├── controller/                       # REST API controllers
│   │   │   │   ├── PetController.java
│   │   │   │   ├── AdoptionFormController.java
│   │   │   │   └── AdminController.java
│   │   │   ├── model/                            # Entity classes
│   │   │   │   ├── Pet.java
│   │   │   │   ├── AdoptionForm.java
│   │   │   │   └── Admin.java
│   │   │   ├── repository/                       # JPA repositories
│   │   │   │   ├── PetRepository.java
│   │   │   │   ├── AdoptionFormRepository.java
│   │   │   │   └── AdminRepository.java
│   │   │   └── service/                          # Business logic
│   │   │       ├── PetService.java
│   │   │       ├── AdoptionFormService.java
│   │   │       └── AdminService.java
│   │   └── resources/
│   │       ├── application.properties            # Application configuration
│   │       └── static/                           # Frontend files
│   │           ├── index.html                    # Home page
│   │           ├── pets.html                     # Browse pets
│   │           ├── services.html                 # Services page
│   │           ├── contact.html                  # Contact page
│   │           ├── adoption-form.html            # Adoption application
│   │           ├── admin-login.html              # Admin login
│   │           ├── admin-panel.html              # Admin dashboard
│   │           ├── css/
│   │           │   └── style.css                 # Main stylesheet
│   │           └── js/
│   │               ├── api.js                    # API configuration
│   │               ├── main.js                   # Home page logic
│   │               ├── pets.js                   # Pets page logic
│   │               ├── services.js               # Services logic
│   │               ├── contact.js                # Contact logic
│   │               ├── adoption-form.js          # Adoption form logic
│   │               ├── admin-login.js            # Admin login logic
│   │               └── admin-panel.js            # Admin panel logic
└── pom.xml                                       # Maven configuration
```

## 🔐 API Endpoints

### Pet Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pets` | Get all pets |
| GET | `/api/pets/{id}` | Get pet by ID |
| GET | `/api/pets/status/{status}` | Get pets by status |
| GET | `/api/pets/type/{type}` | Get pets by type |
| GET | `/api/pets/available` | Get available pets |
| POST | `/api/pets` | Create new pet |
| PUT | `/api/pets/{id}` | Update pet |
| PATCH | `/api/pets/{id}/status` | Update pet status |
| DELETE | `/api/pets/{id}` | Delete pet |

### Adoption Form Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/adoption-forms` | Get all forms |
| GET | `/api/adoption-forms/{id}` | Get form by ID |
| GET | `/api/adoption-forms/status/{status}` | Get forms by status |
| POST | `/api/adoption-forms` | Submit adoption form |
| PATCH | `/api/adoption-forms/{id}/status` | Update form status |
| DELETE | `/api/adoption-forms/{id}` | Delete form |

### Admin Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/register` | Register new admin |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/validate` | Validate admin session |

## 👤 Admin Account

### Creating an Admin Account

1. Navigate to: http://localhost:8080/admin-login.html
2. Click on "Register here"
3. Fill in the registration form:
   - Username: `admin`
   - Email: `admin@pawfinds.com`
   - Full Name: `Admin User`
   - Password: `admin123`
4. Click "Register"
5. Login with your credentials

### Default Admin Features
- View dashboard with statistics
- Manage all pet listings
- Review adoption requests
- Approve/reject adoptions
- View adoption history

## 🎨 Features Showcase

### User Interface
- **Modern Design**: Clean and attractive UI with gradient colors
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Fade-in effects and hover animations
- **Interactive Cards**: Pet cards with images and details
- **Modal Dialogs**: Popup forms and detail views

### Security Features
- **Password Encryption**: BCrypt password hashing
- **CORS Configuration**: Secure cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: JPA prevents SQL injection

## 🧪 Testing the Application

### Manual Testing Steps

1. **Browse Pets**
   - Go to http://localhost:8080/pets.html
   - Apply filters to see different pets
   - Click on "View Details" to see pet information

2. **Submit Adoption Request**
   - Click "Adopt" on any available pet
   - Fill out the adoption form
   - Submit and check admin panel

3. **Post a Pet**
   - Go to http://localhost:8080/services.html
   - Click "Post Your Pet"
   - Fill in pet details and submit

4. **Admin Panel**
   - Login at http://localhost:8080/admin-login.html
   - View dashboard statistics
   - Approve/reject adoption requests
   - Manage pet listings

## 🛠️ Development

### Running in Development Mode

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### Building for Production

```bash
mvn clean package -DskipTests
```

The JAR file will be created in `target/` directory.

### Hot Reload (DevTools)

Spring Boot DevTools is included for automatic restart on code changes.

## 📝 Configuration Options

Edit `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:h2:mem:pawfindsdb
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# File Upload Size
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# Logging
logging.level.com.pawfinds.adoption=DEBUG
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in application.properties
server.port=8081
```

### Database Connection Issues
- Verify MySQL is running
- Check username/password in application.properties
- Ensure database exists

### Build Failures
```bash
# Clean and rebuild
mvn clean install -U

# Skip tests if needed
mvn clean install -DskipTests
```

### CORS Issues
- Check `SecurityConfig.java` for CORS settings
- Ensure frontend is accessing correct API URL

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Spring Security](https://spring.io/projects/spring-security)
- [H2 Database](http://www.h2database.com/)
- [Maven Documentation](https://maven.apache.org/guides/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ for pet adoption

## 🙏 Acknowledgments

- Images from Unsplash
- Icons from Font Awesome
- Inspired by the original MERN stack version

---

**Happy Pet Adoption! 🐾**

For support or queries, please contact: info@pawfinds.com
