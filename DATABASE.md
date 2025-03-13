# Firestore Architecture Document for Drum Class Attendance and Payment Tracking App

## Overview
This document outlines the Firestore database architecture for an app designed to track drum class attendance and payments at a music academy. The app supports the following requirements:

- **Recurring Schedules**: Classes occur weekly on fixed days and hourly time slots (e.g., 1-2pm, not 1:30-2:30pm).
- **Class Types**: Solo (1 student) or duo (2 students) classes.
- **Teacher Control**: Teachers manage attendance, rescheduling, class details, student details, notes, and payment tracking.
- **Super User Control**: A super user role can view all details of teachers and students and edit any data in the system.
- **Attendance Tracking**: Classes are marked as "ongoing" at the start and "attended" or otherwise at the end.
- **Notes**: Teachers write per-student notes after each class, viewable in a time-based notes screen.
- **Rescheduling**: Students can reschedule missed classes, potentially having two classes in a week.
- **Flexibility**: Teachers can edit schedules, remove students from the weekly schedule (preserving historical data), and view upcoming classes.
- **Payment Tracking**: Supports payments for 1 or 3 months (solo or duo classes), tracks payment details (payment date, start date), manages payment expiry based on attended classes and rescheduling, and provides a teacher interface to view and manage students with payments due.

The architecture is designed to be efficient, scalable, and cost-effective, targeting Firebase's free tier for an academy with 200-300 students.

---

## Database Structure

### Collections
The Firestore database consists of four main collections, extended to handle payment tracking:

#### 1. `Students`
- **Purpose**: Stores student information, links to their recurring class slot, and tracks their active payment status.
- **Document ID**: Unique `studentId` (e.g., "student123").
- **Fields**:
  | Field            | Type   | Description                                      | Example                          |
  |------------------|--------|--------------------------------------------------|----------------------------------|
  | `name`           | String | Student's full name                             | "John Doe"                      |
  | `contactInfo`    | Object | Contact details                                 | `{ email: "john@example.com", phone: "123-456-7890" }` |
  | `recurringSlot`  | String | Reference to the recurring `ClassSlots` document | "Monday_1-2pm" or `null`        |
  | `currentPayment` | Object | Tracks active payment status                    | See below                       |

- **`currentPayment` Object**:
  - `startDate`: Timestamp (e.g., "2023-10-01") – When the payment period begins.
  - `endDate`: Timestamp (e.g., "2023-10-31") – When the payment period expires, adjusted dynamically.
  - `classesPaid`: Number (e.g., 4 for 1 month, 12 for 3 months) – Total classes covered by the payment.
  - `classesAttended`: Number (e.g., 3) – Classes attended so far.
  - `classType`: String (e.g., "solo" or "duo") – Type of class paid for.

- **Notes**: 
  - `recurringSlot` is set to `null` when a student is removed from the weekly schedule, preserving historical data in `ClassInstances`.

#### 2. `Teachers`
- **Purpose**: Stores teacher details, allowing scalability for multiple teachers.
- **Document ID**: Unique `teacherId` (e.g., "teacher001").
- **Fields**:
  | Field            | Type   | Description                                      | Example                          |
  |------------------|--------|--------------------------------------------------|----------------------------------|
  | `name`           | String | Teacher's full name                             | "Jane Smith"                    |
  | `contactInfo`    | Object | Contact details                                 | `{ email: "jane@example.com", phone: "987-654-3210" }` |

- **Notes**: 
  - Included for future scalability; super users can view and edit all teacher records.

#### 3. `ClassSlots`
- **Purpose**: Defines the recurring weekly schedule for classes.
- **Document ID**: Unique `slotId` (e.g., "Monday_1-2pm").
- **Fields**:
  | Field            | Type        | Description                                      | Example                          |
  |------------------|-------------|--------------------------------------------------|----------------------------------|
  | `dayOfWeek`      | String      | Day of the week                                 | "Monday"                        |
  | `timeSlot`       | String      | Hourly time slot                                | "1-2pm"                         |
  | `teacherId`      | String      | Reference to `Teachers`                         | "teacher001"                    |
  | `students`       | Array       | Student IDs assigned to this slot (1 or 2)      | `["student123", "student456"]`  |

- **Notes**: 
  - Represents the default schedule unless overridden by `ClassInstances`.

#### 4. `ClassInstances`
- **Purpose**: Records specific class occurrences, including attendance and notes, for past classes and future classes with changes (e.g., reschedules). Used to update `classesAttended` in `Students`.
- **Document ID**: Unique identifier combining date and time slot (e.g., "2023-10-09_1-2pm").
- **Fields**:
  | Field             | Type        | Description                                      | Example                          |
  |-------------------|-------------|--------------------------------------------------|----------------------------------|
  | `date`            | String      | Date of the class                               | "2023-10-09"                    |
  | `timeSlot`        | String      | Hourly time slot                                | "1-2pm"                         |
  | `teacherId`       | String      | Reference to `Teachers`                         | "teacher001"                    |
  | `scheduledStudents`| Array      | Students scheduled for this instance            | `["student123", "student456"]`  |
  | `attendance`      | Map         | Attendance status per student                   | `{ "student123": "attended", "student456": "rescheduled" }` |
  | `notes`           | Map         | Notes per student                               | `{ "student123": "Practiced rolls", "student456": "Will make up" }` |
  | `status`          | String      | Class lifecycle status                          | "planned", "ongoing", "completed" |

- **Notes**: 
  - Created for all past classes to store attendance and notes.
  - Created for future classes only when there are changes (e.g., rescheduling).

#### 5. `Payments` Subcollection under `Students`
- **Purpose**: Stores historical payment records for each student.
- **Document ID**: Unique `paymentId` (e.g., "payment001").
- **Fields**:
  | Field            | Type        | Description                                      | Example                          |
  |------------------|-------------|--------------------------------------------------|----------------------------------|
  | `paymentDate`    | Timestamp   | When the payment was made                       | "2023-09-25"                    |
  | `monthsPaid`     | Number      | Duration of the payment                         | 1 or 3                          |
  | `classType`      | String      | Type of class                                   | "solo" or "duo"                 |
  | `startDate`      | Timestamp   | Start of the payment period                     | "2023-10-01"                    |
  | `endDate`        | Timestamp   | Initial expiry date                             | "2023-10-31"                    |
  | `classesPaid`    | Number      | Total classes paid for                          | 4 or 12                         |

---

### Relationships (Text-Based Diagram)
Below is a textual representation of the relationships between collections:

```
[Teachers]
  | teacherId
  +--> [ClassSlots]
  |      | teacherId
  |      | students (array of studentIds)
  |      +--> [Students]
  |             | recurringSlot (references ClassSlots)
  |             | currentPayment
  |             +--> [Payments] (subcollection)
  |
  +--> [ClassInstances]
         | teacherId
         | scheduledStudents (array of studentIds)
         +--> [Students]
```

- **Students ↔ ClassSlots**: 
  - `Students.recurringSlot` references `ClassSlots.slotId`.
  - `ClassSlots.students` contains an array of `studentId`s.
- **Teachers → ClassSlots and ClassInstances**: 
  - Both reference `teacherId` to associate classes with a teacher.
- **ClassSlots → ClassInstances**: 
  - Logical relationship; `ClassInstances` overrides `ClassSlots` for specific dates and slots.
- **Students → Payments**: 
  - `Payments` is a subcollection under each student, storing payment history.
  - `currentPayment` in `Students` reflects the active payment.

---

## Key Operations and Queries

### 1. Displaying the Schedule for a Specific Day
- **Objective**: Show all classes for a given day (e.g., "2023-10-09", a Monday).
- **Steps**:
  1. Query `ClassInstances` where `date == "2023-10-09"`.
  2. Fetch all `ClassSlots` where `dayOfWeek == "Monday"`.
  3. For each time slot (e.g., "1-2pm", "2-3pm"), use the `ClassInstances` data if available; otherwise, use the `ClassSlots` data.
- **Sample Code**:
  ```javascript
  const date = "2023-10-09";
  const dayOfWeek = "Monday"; // Derived from date
  const instances = await db.collection("ClassInstances").where("date", "==", date).get();
  const slots = await db.collection("ClassSlots").where("dayOfWeek", "==", dayOfWeek).get();

  const instanceMap = Object.fromEntries(instances.docs.map(doc => [doc.data().timeSlot, doc.data()]));
  const slotMap = Object.fromEntries(slots.docs.map(doc => [doc.data().timeSlot, doc.data()]));

  const timeSlots = ["1-2pm", "2-3pm", "3-4pm" /* ... */];
  const schedule = timeSlots.map(slot => instanceMap[slot] || slotMap[slot] || null);
  ```

### 2. Marking Attendance
- **Objective**: Record attendance and notes for a class, updating payment tracking.
- **Steps**:
  1. Create or fetch the `ClassInstances` document for the date and time slot (e.g., "2023-10-09_1-2pm").
  2. Update `status` to "ongoing" at the start.
  3. Update `attendance` and `notes` maps during/after the class.
  4. Set `status` to "completed" when finished.
  5. Update `Students.currentPayment.classesAttended` if "attended".
- **Example Document Update**:
  ```json
  {
    "date": "2023-10-09",
    "timeSlot": "1-2pm",
    "teacherId": "teacher001",
    "scheduledStudents": ["student123", "student456"],
    "attendance": { "student123": "attended", "student456": "absent" },
    "notes": { "student123": "Good progress", "student456": "Missed class" },
    "status": "completed"
  }
  ```

### 3. Rescheduling a Missed Class
- **Objective**: Reschedule a student to a new slot and adjust payment expiry if needed.
- **Steps**:
  1. Update the original `ClassInstances` document (e.g., "2023-10-09_1-2pm") with `attendance[studentId] = "rescheduled"`.
  2. Find an available slot (fewer than 2 students) for a future date (e.g., "2023-10-11_3-4pm").
  3. Create or update the future `ClassInstances` document, adding the student to `scheduledStudents`.
  4. If the rescheduled class extends beyond `currentPayment.endDate`, update `endDate` in `Students.currentPayment`.
- **Availability Check**:
  - Query `ClassInstances` for the future date and slot; if it exists, check `scheduledStudents.length`.
  - If no `ClassInstances` document, use `ClassSlots` for that day and slot to check `students.length`.

### 4. Changing a Student’s Recurring Schedule
- **Objective**: Move a student to a new weekly slot.
- **Steps**:
  1. Remove the `studentId` from the old `ClassSlots` document’s `students` array.
  2. Add the `studentId` to the new `ClassSlots` document’s `students` array (if < 2 students).
  3. Update `Students.recurringSlot` to the new `slotId`.
- **Transaction**: Use a Firestore transaction to ensure atomic updates.

### 5. Time-Based Notes per Student
- **Objective**: Display a student’s notes history.
- **Query**:
  - `db.collection("ClassInstances").where("attendance.student123", "==", "attended").orderBy("date", "desc").limit(20)`
  - Extract `notes.student123` from each result.
- **Result Example**:
  ```json
  [
    { "date": "2023-10-02", "notes": { "student123": "Improved tempo" } },
    { "date": "2023-09-25", "notes": { "student123": "Practiced rolls" } }
  ]
  ```

### 6. When a Student Makes a Payment
- **Objective**: Record a new payment and update the active payment status.
- **Steps**:
  - The teacher or super user marks the student as paid, selecting 1 or 3 months and solo or duo class type.
  - Add a new record to the `Payments` subcollection.
  - Update the `currentPayment` field in the `Students` document.
- **Example**:
  - A student pays for 1 month of solo classes on September 25, 2023, starting October 1, 2023.
  - `classesPaid` is set to 4 (4 classes per month).
  - `endDate` is initially set to October 31, 2023.
  - `classesAttended` starts at 0.
- **Firestore Operation**:
  ```javascript
  const studentRef = db.collection("Students").doc("student123");
  const paymentRef = studentRef.collection("Payments").doc();
  await paymentRef.set({
    paymentDate: "2023-09-25",
    monthsPaid: 1,
    classType: "solo",
    startDate: "2023-10-01",
    endDate: "2023-10-31",
    classesPaid: 4
  });
  await studentRef.update({
    currentPayment: {
      startDate: "2023-10-01",
      endDate: "2023-10-31",
      classesPaid: 4,
      classesAttended: 0,
      classType: "solo"
    }
  });
  ```

### 7. Updating Payment Expiry
- **Objective**: Adjust payment status based on attendance and rescheduling.
- **Logic**:
  - There are 4 classes per month. The student can attend up to `classesPaid` classes (e.g., 4 for 1 month, 12 for 3 months).
  - After each class:
    - If the student **attends**, increment `classesAttended`.
    - If the student **reschedules**, adjust the `endDate` to the rescheduled class date, ensuring they still get their 4th class.
  - The payment expires after the student attends `classesPaid` classes or the `endDate` passes, whichever comes later when rescheduling occurs.
- **Example**:
  - A student paid for 1 month (4 classes) starting October 1, attends 3 classes, and reschedules the 4th to November 5, 2023.
  - `classesAttended` becomes 3 after the third class.
  - `endDate` is updated to November 5, 2023.
- **Firestore Operation**:
  ```javascript
  const studentRef = db.collection("Students").doc("student123");
  const currentPayment = (await studentRef.get()).data().currentPayment;
  if (attendance === "attended") {
    await studentRef.update({
      "currentPayment.classesAttended": currentPayment.classesAttended + 1
    });
  } else if (attendance === "rescheduled") {
    await studentRef.update({
      "currentPayment.endDate": "2023-11-05" // Rescheduled class date
    });
  }
  ```

### 8. Viewing and Managing Payments Due
- **Objective**: Show students whose payment is due this week and allow marking them as paid.
- **Steps**:
  - Query students where `currentPayment.endDate` falls within the current week.
  - The teacher or super user can mark a student as paid, triggering a new payment record and updating `currentPayment`.
- **Firestore Query**:
  ```javascript
  const startOfWeek = new Date(/* e.g., "2023-10-30" */);
  const endOfWeek = new Date(/* e.g., "2023-11-05" */);
  const dueStudents = await db.collection("Students")
    .where("currentPayment.endDate", ">=", startOfWeek)
    .where("currentPayment.endDate", "<=", endOfWeek)
    .get();
  dueStudents.forEach(doc => {
    console.log(doc.id, doc.data().currentPayment);
  });
  ```

### 9. Super User Access: Viewing All Teachers and Students
- **Objective**: Allow super users to view and edit all teacher and student data.
- **Steps**:
  - Fetch all documents from `Teachers` and `Students` collections.
  - Optionally fetch related `ClassSlots`, `ClassInstances`, and `Payments` data for a complete overview.
- **Sample Code**:
  ```javascript
  const teachers = await db.collection("Teachers").get();
  const students = await db.collection("Students").get();
  teachers.forEach(doc => console.log(doc.id, doc.data()));
  students.forEach(async doc => {
    console.log(doc.id, doc.data());
    const payments = await doc.ref.collection("Payments").get();
    payments.forEach(payment => console.log(payment.id, payment.data()));
  });
  ```

---

## Teacher and Super User Interface
- **Teacher Interface**:
  - **View Schedule**: Displays daily or weekly schedules based on `ClassSlots` and `ClassInstances`.
  - **Mark Attendance**: Allows updating `ClassInstances` with attendance and notes.
  - **Reschedule Classes**: Interface to find available slots and update `ClassInstances`.
  - **View Students with Payments Due**:
    - Displays a list of students where `currentPayment.endDate` is within the current week.
    - Shows details like student name, `endDate`, and `classType`.
  - **Mark as Paid**:
    - Form with options: months (1 or 3) and class type (solo or duo).
    - On submission, creates a new `Payments` document and updates `currentPayment`.

- **Super User Interface**:
  - **View All Data**: Access to all `Teachers`, `Students`, `ClassSlots`, `ClassInstances`, and `Payments` data.
  - **Edit Anything**: Full write access to modify schedules, student details, teacher details, attendance, notes, and payment records.
  - **Example Actions**:
    - Edit a teacher’s contact info in `Teachers`.
    - Adjust a student’s `currentPayment` or add a manual payment to `Payments`.
    - Reassign students to different `ClassSlots`.

---

## Indexing for Fast Queries
To ensure queries perform efficiently, Firestore requires appropriate indexes:

### Required Indexes
1. **Single-Field Indexes**:
   - **`ClassInstances.date`**:
     - Used in: Displaying daily schedules (`where("date", "==", "2023-10-09")`).
     - Firestore automatically creates this index.
   - **`ClassSlots.dayOfWeek`**:
     - Used in: Fetching recurring slots (`where("dayOfWeek", "==", "Monday")`).
     - Firestore automatically creates this index.
   - **`Students.currentPayment.endDate`**:
     - Used in: Payment-due queries (`where("currentPayment.endDate", ">=", startOfWeek)`).
     - Requires manual index creation in Firestore console.

2. **Automatic Indexes**:
   - **Arrays** (e.g., `ClassInstances.scheduledStudents`, `ClassSlots.students`):
     - Supported for `array-contains` queries (e.g., finding all classes for a student).
   - **Maps** (e.g., `ClassInstances.attendance`, `ClassInstances.notes`):
     - Supported for queries like `where("attendance.student123", "==", "attended")`.

3. **Composite Indexes**:
   - For `where("attendance.student123", "==", "attended").orderBy("date", "desc")`, Firestore uses the `date` index. If needed, Firestore will suggest a composite index (e.g., `attendance.student123` + `date` descending).
   - No composite index explicitly required unless suggested by Firestore console.

### Verification
- Test queries in the Firestore console or app. If an index is missing, Firestore provides a link to create it automatically.

---

## Security Rules
Restrict access to authenticated teachers and super users with differentiated permissions:
```json
{
  "rules": {
    "Students": {
      ".read": "auth != null && (auth.token.role == 'teacher' || auth.token.role == 'superuser')",
      ".write": "auth != null && (auth.token.role == 'teacher' || auth.token.role == 'superuser')",
      "Payments": {
        ".read": "auth != null && (auth.token.role == 'teacher' || auth.token.role == 'superuser')",
        ".write": "auth != null && (auth.token.role == 'teacher' || auth.token.role == 'superuser')"
      }
    },
    "Teachers": {
      ".read": "auth != null && (auth.token.role == 'teacher' || auth.token.role == 'superuser')",
      ".write": "auth != null && auth.token.role == 'superuser'" // Only super users can edit Teachers
    },
    "ClassSlots": {
      ".read": "auth != null && (auth.token.role == 'teacher' || auth.token.role == 'superuser')",
      ".write": "auth != null && (auth.token.role == 'teacher' || auth.token.role == 'superuser')"
    },
    "ClassInstances": {
      ".read": "auth != null && (auth.token.role == 'teacher' || auth.token.role == 'superuser')",
      ".write": "auth != null && (auth.token.role == 'teacher' || auth.token.role == 'superuser')"
    }
  }
}
```
- **Setup**: Use Firebase Authentication with custom claims (`role: "teacher"` or `role: "superuser"`) for user accounts.
- **Permissions**:
  - **Teachers**: Read/write access to `Students`, `ClassSlots`, `ClassInstances`, and `Payments` subcollection; read-only access to `Teachers` (cannot edit their own or others' details).
  - **Super Users**: Full read/write access to all collections, including the ability to edit `Teachers`.

---

## Summary
This Firestore architecture efficiently handles recurring schedules, attendance, rescheduling, notes, and payment tracking for a drum class app with 200-300 students, with added support for a super user role. Key features include:
- **Scalability**: Supports multiple teachers and students.
- **Efficiency**: Optimized queries with minimal indexing needs.
- **Cost-Effectiveness**: Fits within the free tier.
- **Flexibility**: Manages exceptions, historical data, and payment adjustments seamlessly.
- **Payment Integration**: Tracks payment history in `Payments`, active status in `currentPayment`, adjusts expiry dynamically, and provides a teacher interface for payment management.
- **Super User Role**: Full visibility and edit access to all data, enhancing administrative oversight.
