import { faker } from '@faker-js/faker';
import db from './models/index.js';
import dotenv from 'dotenv';

dotenv.config();

const NUM_TEACHERS = 50;
const NUM_COURSES = 100;
const NUM_STUDENTS = 2000;

async function seed() {
    try {
        await db.sequelize.sync({ force: true }); // drop and recreate all tables
        console.log('Database synced.');

        // Create teachers
        const teachers = [];
        for (let i = 0; i < NUM_TEACHERS; i++) {
            const teacher = await db.Teacher.create({
                name: faker.person.fullName(),
                department: faker.commerce.department(),
            });
            teachers.push(teacher);
        }

        // Create courses with random teachers
        const courses = [];
        for (let i = 0; i < NUM_COURSES; i++) {
            const course = await db.Course.create({
                title: faker.company.catchPhrase(),
                description: faker.lorem.paragraph(),
                TeacherId: faker.helpers.arrayElement(teachers).id,
            });
            courses.push(course);
        }

        // Create students and enroll them in random courses
        for (let i = 0; i < NUM_STUDENTS; i++) {
            const student = await db.Student.create({
                name: faker.person.fullName(),
                email: faker.internet.email(),
            });

            // Enroll each student in 1-3 random courses
            const randomCourses = faker.helpers.arrayElements(courses, {
                min: 1,
                max: 3,
            });

            await student.addCourses(randomCourses);
        }

        console.log('Seeding complete!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}

seed();
