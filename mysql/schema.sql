CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    role ENUM(
        'HR_ADMIN',
        'HR_EXECUTIVE',
        'RECRUITER'
    )
);