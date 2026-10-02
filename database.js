const Database = require("better-sqlite3");

const db = new Database("school.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS Students (
        student_id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        class_id INTEGER
    );

    CREATE TABLE IF NOT EXISTS Teachers (
        teacher_id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Classes (
        class_id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS Subjects (
        subject_id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject_name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS Results (
        result_id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        subject_id INTEGER NOT NULL,
        marks INTEGER CHECK(marks >= 0 AND marks <= 100),
        FOREIGN KEY (student_id) REFERENCES Students(student_id),
        FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id)
    );

    CREATE TABLE IF NOT EXISTS Users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL
    );
`);
db.exec(`
    CREATE INDEX IF NOT EXISTS idx_students_email
    ON Students(email);

    CREATE INDEX IF NOT EXISTS idx_results_student
    ON Results(student_id);

    CREATE INDEX IF NOT EXISTS idx_results_subject
    ON Results(subject_id);
`);

console.log("Database and tables created successfully.");

db.close();
