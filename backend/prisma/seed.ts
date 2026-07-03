import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// --- Data Generators ---
const firstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
  'Diya', 'Saanvi', 'Aanya', 'Priya', 'Riya', 'Aarohi', 'Ananya', 'Shruti', 'Neha', 'Pooja',
  'Rahul', 'Rohit', 'Amit', 'Karan', 'Sanjay', 'Sunil', 'Vijay', 'Rajesh', 'Suresh', 'Ramesh',
  'Sneha', 'Kavya', 'Pooja', 'Deepa', 'Swati', 'Nisha', 'Megha', 'Kiran', 'Divya', 'Priyanka'
];

const lastNames = [
  'Kumar', 'Sharma', 'Singh', 'Patel', 'Reddy', 'Rao', 'Yadav', 'Gupta', 'Deshmukh', 'Joshi',
  'Verma', 'Chauhan', 'Nair', 'Menon', 'Iyer', 'Pillai', 'Das', 'Bose', 'Chatterjee', 'Sen'
];

const cities = ['Hyderabad', 'Secunderabad', 'Warangal', 'Nizamabad', 'Karimnagar'];
const areas = ['Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Kukatpally', 'Gachibowli', 'Ameerpet', 'Begumpet'];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function generateName(gender?: 'Male' | 'Female'): string {
  // Simplification: Not strictly matching gender to name array for this generic generator
  const first = randomElement(firstNames);
  const last = randomElement(lastNames);
  return `${first} ${last}`;
}

function generatePhone(): string {
  return '9' + Math.floor(100000000 + Math.random() * 900000000).toString();
}

function generateDOB(classLevel: number): Date {
  const currentYear = new Date().getFullYear();
  // Typical age for Class 1 is 6 years, so DOB year is currentYear - classLevel - 5
  const birthYear = currentYear - classLevel - 5;
  const month = Math.floor(Math.random() * 12);
  const day = Math.floor(Math.random() * 28) + 1;
  return new Date(birthYear, month, day);
}

// --- Main Seeder Function ---
async function main() {
  console.log('Starting dataset seeding...');

  // 1. Clean existing data (Careful in production!)
  console.log('Clearing existing data...');
  await prisma.mark.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.teacherAssignment.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.leaveRequest.deleteMany();
  await prisma.studentClassHistory.deleteMany();
  await prisma.student.deleteMany();
  await prisma.section.deleteMany();
  await prisma.class.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.user.deleteMany();
  await prisma.notice.deleteMany();
  await prisma.uIConfig.deleteMany();
  await prisma.academicYear.deleteMany();

  // Create Academic Year
  const academicYear = await prisma.academicYear.create({
    data: {
      YearName: '2023-2024',
      StartDate: new Date('2023-06-01'),
      EndDate: new Date('2024-04-30'),
      IsActive: true
    }
  });

  const defaultPasswordHash = await bcrypt.hash('admin123', 10);
  const teacherPasswordHash = await bcrypt.hash('teacher123', 10);
  const parentPasswordHash = await bcrypt.hash('parent123', 10);
  const studentPasswordHash = await bcrypt.hash('student123', 10);

  // 2. Admins
  console.log('Creating Admins...');
  for (let i = 1; i <= 3; i++) {
    const admin = await prisma.admin.create({
      data: {
        Name: `Admin ${i}`,
        Email: `admin${i}@school.com`,
        Phone: generatePhone(),
      }
    });

    await prisma.user.create({
      data: {
        username: `admin${i}`,
        password_hash: defaultPasswordHash,
        role: 'Admin',
        linked_entity_id: admin.AdminId,
        status: 'Active'
      }
    });
  }

  // 3. Teachers
  console.log('Creating Teachers...');
  const teacherEntities = [];
  for (let i = 1; i <= 25; i++) {
    const tName = generateName();
    const teacher = await prisma.teacher.create({
      data: {
        EmployeeId: `EMP${1000 + i}`,
        Name: tName,
        Email: `teacher${i}@school.com`,
        Phone: generatePhone(),
        Qualification: randomElement(['B.Ed', 'M.Ed', 'M.Sc', 'M.A']),
        Experience: `${Math.floor(Math.random() * 15) + 1} years`,
        Status: 'Active'
      }
    });

    await prisma.user.create({
      data: {
        username: `teacher${i}`,
        password_hash: teacherPasswordHash,
        role: 'Teacher',
        linked_entity_id: teacher.TeacherId,
        status: 'Active'
      }
    });
    teacherEntities.push(teacher);
  }

  // 4. Classes and Sections and Subjects
  console.log('Creating Classes, Sections, and Subjects...');
  const classEntities = [];
  const subjectEntities = [];
  const sectionEntities = [];

  for (let c = 1; c <= 10; c++) {
    const cls = await prisma.class.create({
      data: {
        ClassName: `Class ${c}`,
        AcademicYear: academicYear.YearName
      }
    });
    classEntities.push(cls);

    // Sections A and B
    for (const secName of ['A', 'B']) {
      const section = await prisma.section.create({
        data: {
          ClassId: cls.ClassId,
          SectionName: secName
        }
      });
      sectionEntities.push(section);
    }

    // Subjects
    const subjectsList = c <= 5 
      ? ['English', 'Mathematics', 'EVS', 'Hindi', 'Telugu']
      : ['English', 'Mathematics', 'Science', 'Social Studies', 'Hindi', 'Telugu', 'Computer Science'];

    for (const subName of subjectsList) {
      const sub = await prisma.subject.create({
        data: {
          SubjectName: subName,
          ClassId: cls.ClassId,
          Description: `${subName} for Class ${c}`
        }
      });
      subjectEntities.push(sub);
    }
  }

  // 5. Teacher Assignments
  console.log('Assigning Teachers to Classes and Subjects...');
  for (const subject of subjectEntities) {
    // Find sections for this subject's class
    const classSections = sectionEntities.filter(s => s.ClassId === subject.ClassId);
    
    for (const section of classSections) {
      // Pick a random teacher
      const randomT = randomElement(teacherEntities);
      await prisma.teacherAssignment.create({
        data: {
          TeacherId: randomT.TeacherId,
          ClassId: subject.ClassId,
          SectionId: section.SectionId,
          SubjectId: subject.SubjectId
        }
      });
    }
  }

  // 6. Parents & Students
  console.log('Creating Parents and Students...');
  let studentCounter = 1;
  const studentEntities = [];
  
  for (const cls of classEntities) {
    const cLevel = parseInt(cls.ClassName.replace('Class ', ''));
    const classSections = sectionEntities.filter(s => s.ClassId === cls.ClassId);

    for (const section of classSections) {
      // 20 students per section
      for (let s = 1; s <= 20; s++) {
        const studentName = generateName();
        const fatherName = generateName('Male');
        const motherName = generateName('Female');
        const parentLName = fatherName.split(' ')[1] || 'Kumar';

        // Create Parent
        const parent = await prisma.parent.create({
          data: {
            Name: fatherName, // Primary contact
            Email: `parent${studentCounter}@mail.com`,
            Phone: generatePhone(),
            Occupation: randomElement(['Engineer', 'Doctor', 'Business', 'Teacher', 'Government']),
            Address: `${Math.floor(Math.random()*100)}, ${randomElement(areas)}, ${randomElement(cities)}`
          }
        });

        await prisma.user.create({
          data: {
            username: `parent${studentCounter}`,
            password_hash: parentPasswordHash,
            role: 'Parent',
            linked_entity_id: parent.ParentId,
            status: 'Active'
          }
        });

        // Create Student
        const student = await prisma.student.create({
          data: {
            AdmissionNo: `ADM${20230000 + studentCounter}`,
            Name: studentName,
            DOB: generateDOB(cLevel),
            Gender: randomElement(['Male', 'Female']),
            CurrentClassId: cls.ClassId,
            CurrentSectionId: section.SectionId,
            ParentId: parent.ParentId,
            Status: 'Active'
          }
        });

        await prisma.user.create({
          data: {
            username: `student${studentCounter}`,
            password_hash: studentPasswordHash,
            role: 'Student',
            linked_entity_id: student.StudentId,
            status: 'Active'
          }
        });

        studentEntities.push(student);
        studentCounter++;
      }
    }
  }

  // 7. Attendance
  console.log('Generating Attendance (Last 90 days)...');
  // For realistic generation without massive DB load, we'll do random day samples per class
  // instead of day * subject * student to avoid creating 400 * 90 * 6 = 216,000 records sequentially in the seed.
  // We'll generate a reasonable subset to test views.
  const today = new Date();
  const pastDays = Array.from({ length: 30 }, (_, i) => { // Doing 30 days for faster seeding
    const d = new Date();
    d.setDate(today.getDate() - (i + 1));
    return d;
  });

  const attendanceBatch = [];
  for (const student of studentEntities) {
    const studentSubjects = subjectEntities.filter(s => s.ClassId === student.CurrentClassId);
    
    // Pick 5 random days to insert attendance records for this student to keep seed size manageable but realistic
    for(let i = 0; i < 5; i++) {
        const d = randomElement(pastDays);
        const subj = randomElement(studentSubjects);
        const r = Math.random();
        let status = 'Present';
        if (r > 0.85 && r <= 0.95) status = 'Absent';
        else if (r > 0.95) status = 'Leave';

        attendanceBatch.push({
          ClassId: student.CurrentClassId,
          SectionId: student.CurrentSectionId,
          SubjectId: subj.SubjectId,
          Date: d,
          StudentId: student.StudentId,
          Status: status
        });
    }
  }
  await prisma.attendance.createMany({ data: attendanceBatch });

  // 8. Exams and Marks
  console.log('Generating Exams and Marks...');
  const examTypes = ['Slip Test', 'Unit Test', 'FA1', 'SA1', 'FA2', 'SA2'];
  
  for (const cls of classEntities) {
    const classSections = sectionEntities.filter(s => s.ClassId === cls.ClassId);
    const classSubjects = subjectEntities.filter(s => s.ClassId === cls.ClassId);
    
    for (const section of classSections) {
      for (const eType of examTypes) {
        for (const subject of classSubjects) {
          const exam = await prisma.exam.create({
            data: {
              ClassId: cls.ClassId,
              SectionId: section.SectionId,
              SubjectId: subject.SubjectId,
              ExamType: eType,
              Date: new Date(),
              MaxMarks: 100,
              CreatedByTeacher: teacherEntities[0].TeacherId // simplifiction
            }
          });

          // Generate marks for all students in this section
          const sectionStudents = studentEntities.filter(s => s.CurrentSectionId === section.SectionId);
          const marksData = sectionStudents.map(student => {
            const marks = Math.floor(Math.random() * 65) + 35; // 35 to 100
            let grade = 'F';
            if (marks >= 90) grade = 'A+';
            else if (marks >= 80) grade = 'A';
            else if (marks >= 70) grade = 'B+';
            else if (marks >= 60) grade = 'B';
            else if (marks >= 50) grade = 'C';
            else if (marks >= 35) grade = 'D';

            return {
              StudentId: student.StudentId,
              ExamId: exam.ExamId,
              ObtainedMarks: marks,
              Grade: grade,
              Remarks: grade === 'A+' ? 'Excellent' : 'Good'
            };
          });

          await prisma.mark.createMany({ data: marksData });
        }
      }
    }
  }

  // 9. Leave Requests
  console.log('Generating Leave Requests...');
  for (let i = 0; i < 100; i++) {
    const s = randomElement(studentEntities);
    await prisma.leaveRequest.create({
      data: {
        StudentId: s.StudentId,
        RequestedBy: randomElement(['Parent', 'Student']),
        FromDate: new Date(),
        ToDate: new Date(new Date().setDate(new Date().getDate() + 2)),
        Reason: randomElement(['Fever', 'Family Function', 'Out of station']),
        Status: randomElement(['Pending', 'Approved', 'Rejected'])
      }
    });
  }

  // 10. Notices
  console.log('Generating Notices...');
  const noticeTitles = ['Holiday Announcement', 'Exam Schedule', 'Parent Meeting', 'Sports Day', 'Annual Day'];
  for (let i = 0; i < 25; i++) {
    await prisma.notice.create({
      data: {
        Title: randomElement(noticeTitles) + ` - ${i+1}`,
        Content: 'This is a detailed announcement regarding the upcoming school events. Please mark your calendars.',
        CreatedBy: randomElement(teacherEntities).TeacherId,
        TargetRole: randomElement(['Student', 'Parent', 'Teacher', null])
      }
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
