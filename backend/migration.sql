-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "linked_entity_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "AdminId" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("AdminId")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "TeacherId" SERIAL NOT NULL,
    "EmployeeId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT,
    "Qualification" TEXT,
    "Experience" TEXT,
    "Status" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("TeacherId")
);

-- CreateTable
CREATE TABLE "Parent" (
    "ParentId" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT,
    "Occupation" TEXT,
    "Address" TEXT,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("ParentId")
);

-- CreateTable
CREATE TABLE "Student" (
    "StudentId" SERIAL NOT NULL,
    "AdmissionNo" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "DOB" TIMESTAMP(3) NOT NULL,
    "Gender" TEXT NOT NULL,
    "CurrentClassId" INTEGER NOT NULL,
    "CurrentSectionId" INTEGER NOT NULL,
    "ParentId" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("StudentId")
);

-- CreateTable
CREATE TABLE "Class" (
    "ClassId" SERIAL NOT NULL,
    "ClassName" TEXT NOT NULL,
    "AcademicYear" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("ClassId")
);

-- CreateTable
CREATE TABLE "Section" (
    "SectionId" SERIAL NOT NULL,
    "ClassId" INTEGER NOT NULL,
    "SectionName" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("SectionId")
);

-- CreateTable
CREATE TABLE "Subject" (
    "SubjectId" SERIAL NOT NULL,
    "SubjectName" TEXT NOT NULL,
    "ClassId" INTEGER NOT NULL,
    "Description" TEXT,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("SubjectId")
);

-- CreateTable
CREATE TABLE "TeacherAssignment" (
    "AssignmentId" SERIAL NOT NULL,
    "TeacherId" INTEGER NOT NULL,
    "ClassId" INTEGER NOT NULL,
    "SectionId" INTEGER NOT NULL,
    "SubjectId" INTEGER NOT NULL,

    CONSTRAINT "TeacherAssignment_pkey" PRIMARY KEY ("AssignmentId")
);

-- CreateTable
CREATE TABLE "Exam" (
    "ExamId" SERIAL NOT NULL,
    "ClassId" INTEGER NOT NULL,
    "SectionId" INTEGER NOT NULL,
    "SubjectId" INTEGER NOT NULL,
    "ExamType" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "MaxMarks" INTEGER NOT NULL,
    "CreatedByTeacher" INTEGER NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("ExamId")
);

-- CreateTable
CREATE TABLE "Mark" (
    "MarkId" SERIAL NOT NULL,
    "StudentId" INTEGER NOT NULL,
    "ExamId" INTEGER NOT NULL,
    "ObtainedMarks" DOUBLE PRECISION NOT NULL,
    "Grade" TEXT,
    "Remarks" TEXT,

    CONSTRAINT "Mark_pkey" PRIMARY KEY ("MarkId")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "AttendanceId" SERIAL NOT NULL,
    "ClassId" INTEGER NOT NULL,
    "SectionId" INTEGER NOT NULL,
    "SubjectId" INTEGER NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL,
    "StudentId" INTEGER NOT NULL,
    "Status" TEXT NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("AttendanceId")
);

-- CreateTable
CREATE TABLE "LeaveRequest" (
    "LeaveId" SERIAL NOT NULL,
    "StudentId" INTEGER NOT NULL,
    "RequestedBy" TEXT NOT NULL,
    "FromDate" TIMESTAMP(3) NOT NULL,
    "ToDate" TIMESTAMP(3) NOT NULL,
    "Reason" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "ApprovedBy" INTEGER,

    CONSTRAINT "LeaveRequest_pkey" PRIMARY KEY ("LeaveId")
);

-- CreateTable
CREATE TABLE "AcademicYear" (
    "YearId" SERIAL NOT NULL,
    "YearName" TEXT NOT NULL,
    "StartDate" TIMESTAMP(3) NOT NULL,
    "EndDate" TIMESTAMP(3) NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AcademicYear_pkey" PRIMARY KEY ("YearId")
);

-- CreateTable
CREATE TABLE "StudentClassHistory" (
    "HistoryId" SERIAL NOT NULL,
    "StudentId" INTEGER NOT NULL,
    "ClassId" INTEGER NOT NULL,
    "SectionId" INTEGER NOT NULL,
    "YearId" INTEGER NOT NULL,

    CONSTRAINT "StudentClassHistory_pkey" PRIMARY KEY ("HistoryId")
);

-- CreateTable
CREATE TABLE "UIConfig" (
    "ConfigId" SERIAL NOT NULL,
    "Role" TEXT NOT NULL,
    "ConfigType" TEXT NOT NULL,
    "ConfigData" JSONB NOT NULL,

    CONSTRAINT "UIConfig_pkey" PRIMARY KEY ("ConfigId")
);

-- CreateTable
CREATE TABLE "Notice" (
    "NoticeId" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedBy" INTEGER NOT NULL,
    "TargetRole" TEXT,

    CONSTRAINT "Notice_pkey" PRIMARY KEY ("NoticeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_Email_key" ON "Admin"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_EmployeeId_key" ON "Teacher"("EmployeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_Email_key" ON "Teacher"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Parent_Email_key" ON "Parent"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_AdmissionNo_key" ON "Student"("AdmissionNo");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_ParentId_fkey" FOREIGN KEY ("ParentId") REFERENCES "Parent"("ParentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_CurrentClassId_fkey" FOREIGN KEY ("CurrentClassId") REFERENCES "Class"("ClassId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_CurrentSectionId_fkey" FOREIGN KEY ("CurrentSectionId") REFERENCES "Section"("SectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_ClassId_fkey" FOREIGN KEY ("ClassId") REFERENCES "Class"("ClassId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_ClassId_fkey" FOREIGN KEY ("ClassId") REFERENCES "Class"("ClassId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherAssignment" ADD CONSTRAINT "TeacherAssignment_TeacherId_fkey" FOREIGN KEY ("TeacherId") REFERENCES "Teacher"("TeacherId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherAssignment" ADD CONSTRAINT "TeacherAssignment_ClassId_fkey" FOREIGN KEY ("ClassId") REFERENCES "Class"("ClassId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherAssignment" ADD CONSTRAINT "TeacherAssignment_SectionId_fkey" FOREIGN KEY ("SectionId") REFERENCES "Section"("SectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherAssignment" ADD CONSTRAINT "TeacherAssignment_SubjectId_fkey" FOREIGN KEY ("SubjectId") REFERENCES "Subject"("SubjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_ClassId_fkey" FOREIGN KEY ("ClassId") REFERENCES "Class"("ClassId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_SectionId_fkey" FOREIGN KEY ("SectionId") REFERENCES "Section"("SectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_SubjectId_fkey" FOREIGN KEY ("SubjectId") REFERENCES "Subject"("SubjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mark" ADD CONSTRAINT "Mark_StudentId_fkey" FOREIGN KEY ("StudentId") REFERENCES "Student"("StudentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mark" ADD CONSTRAINT "Mark_ExamId_fkey" FOREIGN KEY ("ExamId") REFERENCES "Exam"("ExamId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_ClassId_fkey" FOREIGN KEY ("ClassId") REFERENCES "Class"("ClassId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_SectionId_fkey" FOREIGN KEY ("SectionId") REFERENCES "Section"("SectionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_SubjectId_fkey" FOREIGN KEY ("SubjectId") REFERENCES "Subject"("SubjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_StudentId_fkey" FOREIGN KEY ("StudentId") REFERENCES "Student"("StudentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveRequest" ADD CONSTRAINT "LeaveRequest_StudentId_fkey" FOREIGN KEY ("StudentId") REFERENCES "Student"("StudentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClassHistory" ADD CONSTRAINT "StudentClassHistory_StudentId_fkey" FOREIGN KEY ("StudentId") REFERENCES "Student"("StudentId") ON DELETE RESTRICT ON UPDATE CASCADE;

