# Database Architecture Document for Drum Class Attendance App

## Overview
This document outlines the Supabase database architecture for a drum class attendance app designed for a music academy. The app supports the following features:

- **Recurring Schedules**: Classes occur weekly on fixed days and hourly time slots (e.g., "1-2pm").
- **Class Types**: Classes can have an arbitrary number of students (n students), defined by a maximum capacity.
- **Teacher Control**: Teachers manage attendance, rescheduling, class details, student details, and notes.
- **Attendance Tracking**: Classes are marked as "ongoing" at the start and "attended" or otherwise at the end.
- **Digital Signatures**: Students provide a digital signature for each class they attend, captured using `react-signature-canvas` when the class starts, stored in Supabase Storage.
- **Notes**: Teachers write per-student notes after each class, viewable in a time-based notes screen.
- **Rescheduling**: Students can reschedule missed classes.
- **Payments**: Support for 1- or 3-month payments, with expiry based on attended classes and rescheduling.
- **Substitute Teachers**: Teachers can act as substitutes for specific classes, gaining access to those students.
- **Role-Based Access (RBAC)**:
  - Teachers only see their assigned students, unless they are substitutes for a specific class.
  - Super admin (also a teacher) sees only their own students by default, with a toggle to view all students.
- **Teacher Home Page**: Displays the current ongoing class (n students) and the next upcoming class (n students).

The architecture leverages Supabase’s PostgreSQL database with row-level security (RLS) for access control, ensuring scalability, security, and efficiency.

---

## Database Structure

### Tables

#### 1. `profiles`
- **Purpose**: Links Supabase auth users to roles and teacher records.
- **Fields**:
  | Column      | Type       | Description                         | Example                  |
  |-------------|------------|-------------------------------------|--------------------------|
  | `user_id`   | UUID       | Primary key, references `auth.users.id` | "uuid-1234"          |
  | `role`      | Text       | User role ("super_admin" or "teacher") | "super_admin"         |
  | `teacher_id`| UUID       | Foreign key to `teachers`, nullable | "teacher001" or NULL     |

- **Notes**: 
  - Integrates with Supabase `auth.users` for authentication.
  - Super admin has `role = 'super_admin'` and an optional `teacher_id` if they teach.

#### 2. `teachers`
- **Purpose**: Stores teacher details.
- **Fields**:
  | Column        | Type   | Description                         | Example                          |
  |---------------|--------|-------------------------------------|----------------------------------|
  | `id`          | UUID   | Primary key                         | "teacher001"                    |
  | `name`        | Text   | Teacher’s full name                | "Jane Smith"                    |
  | `contact_info`| JSONB  | Contact details                    | `{"email": "jane@example.com"}` |

#### 3. `students`
- **Purpose**: Stores student data, linking to recurring slots and payments.
- **Fields**:
  | Column             | Type   | Description                         | Example                          |
  |--------------------|--------|-------------------------------------|----------------------------------|
  | `id`               | UUID   | Primary key                         | "student123"                    |
  | `name`             | Text   | Student’s full name                | "John Doe"                      |
  | `contact_info`     | JSONB  | Contact details                    | `{"email": "john@example.com"}` |
  | `recurring_slot_id`| UUID   | Foreign key to `class_slots`, nullable | "slot001" or NULL            |
  | `assigned_teacher_id`| UUID | Foreign key to `teachers`         | "teacher001"                    |
  | `active_payment_id`| UUID   | Foreign key to `payments`, nullable | "payment001" or NULL         |

- **Notes**: 
  - `assigned_teacher_id` defines the primary teacher for RBAC.
  - `recurring_slot_id` links to recurring n-student class schedules.

#### 4. `class_slots`
- **Purpose**: Defines recurring weekly schedules for classes with n students.
- **Fields**:
  | Column       | Type   | Description                         | Example       |
  |--------------|--------|-------------------------------------|---------------|
  | `id`         | UUID   | Primary key                         | "slot001"     |
  | `day_of_week`| Text   | Day of the week                    | "Monday"      |
  | `time_slot`  | Text   | Hourly slot                        | "1-2pm"       |
  | `teacher_id` | UUID   | Foreign key to `teachers`          | "teacher001"  |
  | `max_students`| Int   | Maximum number of students (n)     | 5             |

- **Notes**: 
  - `max_students` sets the capacity for n-student classes, enforced by application logic.

#### 5. `class_instances`
- **Purpose**: Records specific class occurrences, including substitutes.
- **Fields**:
  | Column           | Type   | Description                         | Example            |
  |------------------|--------|-------------------------------------|--------------------|
  | `id`             | UUID   | Primary key                         | "instance001"      |
  | `date`           | Date   | Class date                          | "2023-10-09"       |
  | `time_slot`      | Text   | Hourly slot                        | "1-2pm"            |
  | `teacher_id`     | UUID   | Scheduled teacher (foreign key)    | "teacher001"       |
  | `actual_teacher_id`| UUID | Substitute teacher, nullable       | "teacher002" or NULL |
  | `status`         | Text   | Lifecycle status                   | "ongoing"          |

- **Notes**: 
  - `actual_teacher_id` tracks substitutes, set when a different teacher conducts the class.

#### 6. `class_instance_students`
- **Purpose**: Junction table linking class instances to students, storing attendance, notes, and digital signatures.
- **Fields**:
  | Column           | Type   | Description                         | Example         |
  |------------------|--------|-------------------------------------|-----------------|
  | `class_instance_id`| UUID | Foreign key to `class_instances`   | "instance001"   |
  | `student_id`     | UUID   | Foreign key to `students`          | "student123"    |
  | `attendance`     | Text   | Status per student                 | "attended"      |
  | `notes`          | Text   | Notes per student                  | "Good progress" |
  | `signature_url`  | Text   | URL to stored signature image      | "https://..."   |

- **Primary Key**: `(class_instance_id, student_id)`.
- **Notes**: 
  - `signature_url` stores the URL of the digital signature, captured at class start and uploaded to Supabase Storage.

#### 7. `payments`
- **Purpose**: Tracks payment history and status.
- **Fields**:
  | Column         | Type      | Description                         | Example            |
  |----------------|-----------|-------------------------------------|--------------------|
  | `id`           | UUID      | Primary key                         | "payment001"       |
  | `student_id`   | UUID      | Foreign key to `students`          | "student123"       |
  | `payment_date` | Timestamp | Date of payment                    | "2023-09-25"       |
  | `months_paid`  | Integer   | Payment duration (1 or 3)          | 1                  |
  | `class_type`   | Text      | "solo", "duo", or "group"          | "group"            |
  | `start_date`   | Date      | Payment period start               | "2023-10-01"       |
  | `end_date`     | Date      | Payment period end, adjustable     | "2023-10-31"       |
  | `classes_paid` | Integer   | Total classes (e.g., 4/month)      | 4                  |
  | `classes_attended`| Integer| Classes attended, default 0       | 3                  |

- **Notes**: 
  - `class_type = "group"` supports n-student classes.
  - Payment expires when `classes_attended >= classes_paid`.

---

### Relationships
```
[profiles]
  | user_id → auth.users
  | teacher_id
  +--> [teachers]
  |      | id
  |      +--> [class_slots]
  |      |      | teacher_id
  |      |      | id
  |      +--> [students]
  |      |      | assigned_teacher_id
  |      |      | recurring_slot_id
  |      |      | active_payment_id
  |      +--> [class_instances]
  |      |      | teacher_id
  |      |      | actual_teacher_id
  |      |      | id
  |      +--> [payments]
  |             | student_id
  +--> [class_instance_students]
         | class_instance_id
         | student_id
```

- **profiles ↔ teachers**: Links users to teacher records.
- **teachers → students/class_slots/class_instances**: Teachers are assigned to students and classes.
- **students ↔ class_slots**: Many-to-one via `recurring_slot_id`.
- **class_instances ↔ students**: Many-to-many via `class_instance_students`.
- **students ↔ payments**: One-to-many, with `active_payment_id` for the current payment.

---

## Payment Logic
- **New Payment**: 
  - Insert into `payments` with `classes_attended = 0`.
  - Update `students.active_payment_id` to the new payment ID.
  - Example: 1-month group class → `classes_paid = 4`, `end_date = start_date + 30 days`.
- **Attendance**: 
  - Increment `classes_attended` in the active payment when `attendance = "attended"`.
- **Rescheduling**: 
  - Update `class_instances.date`. Extend `payments.end_date` if the new date exceeds it.
- **Expiry**: 
  - Payment expires when `classes_attended >= classes_paid`, setting `active_payment_id` to NULL.

---

## Role-Based Access (RLS Policies)
RLS ensures teachers only see their assigned students, with access to students in classes where they are substitutes. Super admin can toggle between their own students and all students.

#### `students`
- **Super Admin**: Full access if `view_all_students = true`, otherwise only their assigned students.
- **Teacher**: Access assigned students or students in classes where they substitute.
```sql
CREATE POLICY "Super admin access" ON students
FOR ALL TO authenticated
USING (
  (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'super_admin' AND 
  (SELECT view_all_students FROM user_settings WHERE user_id = auth.uid()) = true
);

CREATE POLICY "Teacher access" ON students
FOR ALL TO authenticated
USING (
  assigned_teacher_id = (SELECT teacher_id FROM profiles WHERE user_id = auth.uid()) OR
  EXISTS (
    SELECT 1 FROM class_instance_students cis
    JOIN class_instances ci ON cis.class_instance_id = ci.id
    WHERE cis.student_id = students.id AND ci.actual_teacher_id = (SELECT teacher_id FROM profiles WHERE user_id = auth.uid())
  )
);
```

#### `teachers`
- **Super Admin**: Full access.
- **Teachers**: View only.
```sql
CREATE POLICY "Super admin manage teachers" ON teachers
FOR ALL TO authenticated
USING ((SELECT role FROM profiles WHERE user_id = auth.uid()) = 'super_admin');

CREATE POLICY "Teachers view teachers" ON teachers
FOR SELECT TO authenticated
USING (true);
```

#### `class_slots`
- **Super Admin**: Full access.
- **Teacher**: Access their slots.
```sql
CREATE POLICY "Super admin access" ON class_slots
FOR ALL TO authenticated
USING ((SELECT role FROM profiles WHERE user_id = auth.uid()) = 'super_admin');

CREATE POLICY "Teacher access" ON class_slots
FOR ALL TO authenticated
USING (teacher_id = (SELECT teacher_id FROM profiles WHERE user_id = auth.uid()));
```

#### `class_instances`
- **Super Admin**: Full access.
- **Teacher**: Access if scheduled or actual teacher.
```sql
CREATE POLICY "Super admin access" ON class_instances
FOR ALL TO authenticated
USING ((SELECT role FROM profiles WHERE user_id = auth.uid()) = 'super_admin');

CREATE POLICY "Teacher access" ON class_instances
FOR ALL TO authenticated
USING (
  teacher_id = (SELECT teacher_id FROM profiles WHERE user_id = auth.uid()) OR 
  actual_teacher_id = (SELECT teacher_id FROM profiles WHERE user_id = auth.uid())
);
```

#### `class_instance_students`
- **Super Admin**: Full access.
- **Teacher**: Access via their class instances.
```sql
CREATE POLICY "Super admin access" ON class_instance_students
FOR ALL TO authenticated
USING ((SELECT role FROM profiles WHERE user_id = auth.uid()) = 'super_admin');

CREATE POLICY "Teacher access" ON class_instance_students
FOR ALL TO authenticated
USING (
  (SELECT teacher_id FROM class_instances WHERE id = class_instance_students.class_instance_id) = 
  (SELECT teacher_id FROM profiles WHERE user_id = auth.uid()) OR 
  (SELECT actual_teacher_id FROM class_instances WHERE id = class_instance_students.class_instance_id) = 
  (SELECT teacher_id FROM profiles WHERE user_id = auth.uid())
);
```

#### `payments`
- **Super Admin**: Full access.
- **Teacher**: Access their students’ payments.
```sql
CREATE POLICY "Super admin access" ON payments
FOR ALL TO authenticated
USING ((SELECT role FROM profiles WHERE user_id = auth.uid()) = 'super_admin');

CREATE POLICY "Teacher access" ON payments
FOR ALL TO authenticated
USING (
  (SELECT assigned_teacher_id FROM students WHERE id = payments.student_id) = 
  (SELECT teacher_id FROM profiles WHERE user_id = auth.uid()) OR
  EXISTS (
    SELECT 1 FROM class_instance_students cis
    JOIN class_instances ci ON cis.class_instance_id = ci.id
    WHERE cis.student_id = payments.student_id AND ci.actual_teacher_id = (SELECT teacher_id FROM profiles WHERE user_id = auth.uid())
  )
);
```

---

## Digital Signatures
- **Storage**: Stored in Supabase Storage.
- **Process**:
  1. Capture signature using `react-signature-canvas` when starting a class.
  2. Upload to Supabase Storage.
  3. Store the public URL in `class_instance_students.signature_url`.

**Example Code**:
```javascript
const { data, error } = await supabase.storage
  .from('signatures')
  .upload(`student_${studentId}_class_${classInstanceId}.png`, signatureImage);
if (!error) {
  const signatureUrl = supabase.storage.from('signatures').getPublicUrl(`student_${studentId}_class_${classInstanceId}.png`).data.publicUrl;
  await supabase.from('class_instance_students').update({ signature_url: signatureUrl })
    .eq('class_instance_id', classInstanceId)
    .eq('student_id', studentId);
}
```

---

## Teacher Home Page
- **Current Ongoing Class**: 
  - Query `class_instances` where `status = 'ongoing'` and `actual_teacher_id` matches the logged-in teacher.
- **Next Upcoming Class**: 
  - Query `class_instances` where `date >= now()` and `teacher_id` or `actual_teacher_id` matches, ordered by `date` and `time_slot`.

**GraphQL Query**:
```graphql
query TeacherHome {
  ongoingClass: class_instances(where: { status: { _eq: "ongoing" }, actual_teacher_id: { _eq: "current_teacher_id" } }) {
    id date time_slot
    students { student_id attendance signature_url }
  }
  nextClass: class_instances(where: { date: { _gte: "now()" }, _or: [{ teacher_id: { _eq: "current_teacher_id" } }, { actual_teacher_id: { _eq: "current_teacher_id" } }] }, order_by: { date: asc, time_slot: asc }, limit: 1) {
    id date time_slot
  }
}
```

---

## Super Admin Toggle
- **Mechanism**: A `user_settings` table tracks the toggle state.
- **Fields**:
  | Column            | Type    | Description                  | Example    |
  |-------------------|---------|------------------------------|------------|
  | `user_id`         | UUID    | Foreign key to `auth.users` | "uuid-1234"|
  | `view_all_students`| Boolean| Toggle for super admin      | true       |

- **RLS Adjustment**: Policies check `view_all_students` for super admin.

**Example RLS for `students`**:
```sql
CREATE POLICY "Super admin toggle access" ON students
FOR ALL TO authenticated
USING (
  (SELECT role FROM profiles WHERE user_id = auth.uid()) = 'super_admin' AND 
  (SELECT view_all_students FROM user_settings WHERE user_id = auth.uid()) = true
);
```

---

## Key Operations (GraphQL Examples)

#### 1. Start a Class and Capture Signature
```graphql
mutation StartClass($instanceId: UUID!, $studentId: UUID!, $signatureUrl: String!) {
  update_class_instances(
    where: { id: { _eq: $instanceId } },
    _set: { status: "ongoing" }
  ) {
    returning { id status }
  }
  insert_class_instance_students_one(
    object: { class_instance_id: $instanceId, student_id: $studentId, attendance: "pending", signature_url: $signatureUrl }
  ) {
    class_instance_id student_id signature_url
  }
}
```

#### 2. Mark Attendance
```graphql
mutation MarkAttendance($instanceId: UUID!, $studentId: UUID!, $attendance: String!, $notes: String) {
  update_class_instance_students(
    where: { class_instance_id: { _eq: $instanceId }, student_id: { _eq: $studentId } },
    _set: { attendance: $attendance, notes: $notes }
  ) {
    returning { class_instance_id student_id attendance notes }
  }
  update_class_instances(
    where: { id: { _eq: $instanceId } },
    _set: { status: "completed" }
  ) {
    returning { id status }
  }
}
```
- If `attendance = "attended"`, increment `payments.classes_attended`.

#### 3. Reschedule a Class
```graphql
mutation RescheduleClass($instanceId: UUID!, $newDate: Date!, $newTimeSlot: String) {
  update_class_instances(
    where: { id: { _eq: $instanceId } },
    _set: { date: $newDate, time_slot: $newTimeSlot }
  ) {
    returning { id date time_slot }
  }
}
```

#### 4. Add a Payment
```graphql
mutation AddPayment($studentId: UUID!, $monthsPaid: Int!, $classType: String!) {
  insert_payments_one(object: {
    student_id: $studentId,
    payment_date: "now()",
    months_paid: $monthsPaid,
    class_type: $classType,
    start_date: "2023-10-01",
    end_date: "2023-10-31",
    classes_paid: 4,
    classes_attended: 0
  }) {
    id
  }
  update_students(
    where: { id: { _eq: $studentId } },
    _set: { active_payment_id: $id }
  ) {
    returning { id active_payment_id }
  }
}
```

---

## Indexing
- `class_instances`: `date`, `time_slot`.
- `class_slots`: `day_of_week`, `time_slot`.
- `students`: `assigned_teacher_id`, `recurring_slot_id`.
- `payments`: `student_id`, `payment_date`.

---

## Summary
This architecture supports:
- **N-Student Classes**: Via `class_slots.max_students` and junction table `class_instance_students`.
- **Digital Signatures**: Captured at class start with `react-signature-canvas`, stored in Supabase Storage, and linked via `signature_url`.
- **RBAC**: Teachers see only their assigned students, with substitute access; super admin toggles between their students and all students.
- **Teacher Home Page**: Displays ongoing and next n-student classes.

The system is secure, scalable, and integrates with Apollo GraphQL for efficient operations.