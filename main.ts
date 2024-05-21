#! /usr/bin/env node


class Student {
    name: string;
    studentId: string;
    courses: Course[];
    balance: number;

    constructor(name: string) {
        this.name = name;
        this.studentId = this.generateStudentId();
        this.courses = [];
        this.balance = 0;
    }

    generateStudentId(): string {
        // Generate a 5-digit unique student ID (you can customize this further)
        return Math.random().toString(36).substr(2, 5).toUpperCase();
    }

    enroll(course: Course): void {
        this.courses.push(course);
        this.balance += course.cost;
    }

    viewBalance(): number {
        return this.balance;
    }

    payTuition(amount: number): void {
        this.balance -= amount;
    }

    showStatus(): void {
        console.log(`Name: ${this.name}`);
        console.log(`Student ID: ${this.studentId}`);
        console.log("Courses Enrolled:");
        this.courses.forEach(course => {
            console.log(`- ${course.name}`);
        });
        console.log(`Balance: ${this.balance}`);
    }
}

class Course {
    name: string;
    code: string;
    cost: number;

    constructor(name: string, code: string, cost: number) {
        this.name = name;
        this.code = code;
        this.cost = cost;
    }
}

class ManagementSystem {
    students: Student[];
    courses: Course[];

    constructor() {
        this.students = [];
        this.courses = [];
    }

    addStudent(name: string): void {
        const student = new Student(name);
        this.students.push(student);
    }

    addCourse(name: string, code: string, cost: number): void {
        const course = new Course(name, code, cost);
        this.courses.push(course);
    }

    enrollStudent(studentName: string, courseName: string): void {
        const student = this.students.find(s => s.name === studentName);
        if (student) {
            const course = this.courses.find(c => c.name === courseName);
            if (course) {
                student.enroll(course);
            } else {
                console.log("Course not found.");
            }
        } else {
            console.log("Student not found.");
        }
    }

    displayStudentStatus(studentName: string): void {
        const student = this.students.find(s => s.name === studentName);
        if (student) {
            student.showStatus();
        } else {
            console.log("Student not found.");
        }
    }
}

// Example usage:
const managementSystem = new ManagementSystem();

managementSystem.addStudent("Alice");
managementSystem.addCourse("Math", "M101", 100);
managementSystem.addCourse("English", "E101", 150);

managementSystem.enrollStudent("Alice", "Math");
managementSystem.enrollStudent("Alice", "English");

managementSystem.displayStudentStatus("Alice");
