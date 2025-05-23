# Drum-Class Attendance App — Supabase Database Architecture (v2)

## Overview

This document describes a **PostgreSQL + Supabase** schema for a drum-school attendance platform.
The design is opinionated toward simplicity, auditability, and query speed while respecting the latest functional rules:

* **Exactly one weekly “home” slot per student**  →  students belong to **one** `class_series`; any make-ups appear as extra dated `class_instances`.
* **Single substitute per class**  →  a nullable `actual_teacher_id` column (no many-to-many).
* **Instant teacher dashboard**  →  ≤5 ms queries (or 1-minute materialised view) for

  * **ongoing** class (now),
  * **previous** slot (last finished),
  * **next** slot (upcoming).
* **Calendar view**  →  one query retrieves all classes and per-student data for any chosen day.

### Supported product features

| Area                     | Capability                                                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **Scheduling**           | Weekly recurring classes (`class_series`) on fixed day + time-range; max-capacity per series.                          |
| **Per-student limit**    | A student can belong to one series; reschedules create *extra* instances in the same week without altering the rule.   |
| **Teacher control**      | Teachers start/end classes, mark attendance, add notes, upload signatures, and reschedule classes they teach.          |
| **Attendance lifecycle** | `scheduled → ongoing → completed/ cancelled` for the class; `pending → attended / absent / cancelled` per student.     |
| **Digital signatures**   | Collected at class start via `react-signature-canvas`; saved in Supabase Storage and referenced by URL.                |
| **Notes**                | Free-text per student per class; displayed chronologically.                                                            |
| **Payments**             | 1- or 3-month plans; trigger-driven roll-up of “classes used” keeps truth in sync with attendance.                     |
| **Substitutes**          | One optional substitute teacher per class; acquires visibility of that class’s students.                               |
| **RBAC**                 | Row-Level Security restricts every table: teachers see only their own or substituted classes; super-admin can see all. |
| **Teacher home page**    | Lightning-fast cards for *ongoing*, *previous*, *next* classes plus student roster.                                    |
| **Calendar view**        | Day-level agenda listing with attendance & signatures.                                                                 |
| **Scalability & audit**  | Native Postgres enums, constraints, and audit columns; triggers handle counters and timestamps.                        |

---

## What the architecture must achieve

1. **Uphold business invariants**

   * Single weekly series per student.
   * Capacity never exceeded.
   * History is append-only: reschedules insert new rows, never overwrite.
2. **Enforce security**

   * RLS predicates rely on JWT claims (`role`, `teacher_id`).
   * Super-admin access via one policy instead of many toggles.
3. **Deliver sub-10 ms UX-critical queries**

   * Composite indexes cover `class_instances` for date + time + teacher look-ups.
   * Optional 1-minute materialised view powers the dashboard without sacrificing real-time feel.
4. **Stay Supabase-idiomatic**

   * Works with Supabase Studio migrations.
   * Storage buckets for signatures; edge functions for Cron tasks if needed.
   * Auth signup hook injects custom claims for RLS speed.
5. **Remain simple to reason about**

   * Clear separation: **Pattern (`class_series`) → Event (`class_instances`) → Fact (`attendance`)**.
   * No nullable “magic” FKs for optional relationships—every concern has its own table or column.


# Database Architecture — Drum-Class Attendance (Supabase edition, v2 “single-series”)

This version folds-in your new constraints:

1. **Exactly one active weekly series per student** (reschedules create *extra* instances, not new series).
2. **Only one substitute per class** (`actual_teacher_id` column).
3. **Fast teacher home-page cards**: *ongoing*, *previous*, *next* class.
4. **Calendar day view** for any date.

---

## 1 Overview

* **Pattern → Event → Fact**
  *`class_series`* (weekly pattern)   ➜  *`class_instances`* (dated event)   ➜  *`attendance`* (per-student facts).
* **Single-series rule** enforced at the schema level (one `series_id` on `students`).
* Queries for teacher dashboards hit a **covering index** or an optional **materialised view** refreshed by Supabase cron jobs.

---

## 2 Tables

> All timestamp columns default to `now()` and have a tiny trigger to keep `updated_at` in sync.

### 2.1 `profiles`

| column       | type                                      | notes | example       |
| ------------ | ----------------------------------------- | ----- | ------------- |
| `user_id`    | `uuid` PK → `auth.users`                  |       | `"uuid-1234"` |
| `role`       | `role_enum` (`'super_admin'`,`'teacher'`) |       | `"teacher"`   |
| `teacher_id` | `uuid` FK → `teachers.id` NULLABLE        |       | `"t-001"`     |

---

### 2.2 `teachers`

| column         | type    | example                        |
| -------------- | ------- | ------------------------------ |
| `id` PK        | `uuid`  | `"t-001"`                      |
| `name`         | `text`  | `"Jane Smith"`                 |
| `contact_info` | `jsonb` | `{"email":"jane@example.com"}` |

---

### 2.3 `class_series`

A weekly recurring slot.

| column         | type                      | notes                               |
| -------------- | ------------------------- | ----------------------------------- |
| `id` PK        | `uuid`                    |                                     |
| `day_of_week`  | `smallint`                | 0 = Sun … 6 = Sat                   |
| `time_slot`    | `tstzrange`               | e.g. `'13:00'..'14:00'` (date-less) |
| `teacher_id`   | `uuid` FK → `teachers.id` |                                     |
| `max_students` | `int` > 0                 |                                     |
| `start_date`   | `date`                    |                                     |
| `end_date`     | `date` NULL               |                                     |

*Uniqueness*: `(day_of_week, time_slot, teacher_id, start_date)` prevents duplicates.

---

### 2.4 `students`

| column                | type                                       | notes                  |
| --------------------- | ------------------------------------------ | ---------------------- |
| `id` PK               | `uuid`                                     |                        |
| `name`                | `text`                                     |                        |
| `contact_info`        | `jsonb`                                    |                        |
| `series_id`           | `uuid` FK → `class_series.id` **NOT NULL** | **single-series rule** |
| `assigned_teacher_id` | `uuid` FK → `teachers.id`                  |                        |
| `active_payment_id`   | `uuid` FK → `payments.id` NULL             |                        |

---

### 2.5 `class_instances`

A concrete occurrence (automatic job or manual reschedule).

| column              | type                                                   | example        |
| ------------------- | ------------------------------------------------------ | -------------- |
| `id` PK             | `uuid`                                                 | `"ci-101"`     |
| `series_id`         | `uuid` FK → `class_series.id`                          |                |
| `class_date`        | `date`                                                 | `"2025-05-23"` |
| `teacher_id`        | `uuid` ( scheduled )                                   | `"t-001"`      |
| `actual_teacher_id` | `uuid` ( substitute ) NULL                             | `"t-009"`      |
| `status`            | `text` (`scheduled`,`ongoing`,`completed`,`cancelled`) | `"ongoing"`    |

**Indexes**

```sql
CREATE INDEX ON class_instances
  (class_date, lower(time_slot), teacher_id, actual_teacher_id, status);
```

---

### 2.6 `attendance`

| column              | type                                                          | notes |
| ------------------- | ------------------------------------------------------------- | ----- |
| `class_instance_id` | `uuid` FK → `class_instances.id`                              |       |
| `student_id`        | `uuid` FK → `students.id`                                     |       |
| `attendance_state`  | `attendance_enum` (`pending`,`attended`,`absent`,`cancelled`) |       |
| `notes`             | `text`                                                        |       |
| `signature_url`     | `text`                                                        |       |

PK = `(class_instance_id, student_id)`.

---

### 2.7 `payments`

| column                    | type                                       |   |
| ------------------------- | ------------------------------------------ | - |
| `id` PK                   | `uuid`                                     |   |
| `student_id`              | `uuid` FK → `students.id`                  |   |
| `plan_type`               | `payment_plan_enum` (`solo`,`duo`,`group`) |   |
| `months_paid`             | `int` CHECK (1 OR 3)                       |   |
| `start_date` / `end_date` | `date`                                     |   |

*Attendance-trigger* updates a **materialised view** `mv_payment_usage` so counters never drift.

---

## 3 Constraints & Triggers

* **Single-series rule**: the `series_id` column makes it structurally impossible to hold two active series.
* **Capacity check**: `AFTER INSERT OR UPDATE ON attendance` ensures `count(attended|pending) ≤ class_series.max_students`.
* **Auto-instance generator**: a Postgres cron (or Supabase Edge Function) rolls future `class_instances` 30 days in advance.

---

## 4 Row-Level Security (extracts)

```sql
-- Example: teachers on attendance
CREATE POLICY teacher_attendance ON attendance
FOR ALL TO authenticated
USING (
    EXISTS (
      SELECT 1
      FROM class_instances ci
      WHERE ci.id = attendance.class_instance_id
        AND (ci.teacher_id = (SELECT teacher_id FROM profiles WHERE user_id = auth.uid())
             OR ci.actual_teacher_id = (SELECT teacher_id FROM profiles WHERE user_id = auth.uid()))
    )
);
-- Super-admin: single blanket policy on every table.
```

---

## 5 Fast teacher home-page queries

### 5.1 Materialised view (optional but ⚡ fast)

```sql
CREATE MATERIALIZED VIEW teacher_class_snapshot AS
SELECT
  ci.*,
  CASE
    WHEN ci.status = 'ongoing' THEN 'ongoing'
    WHEN ci.class_date = current_date
         AND lower(ci.time_slot) < now()  THEN 'previous'
    WHEN ci.class_date = current_date
         AND lower(ci.time_slot) > now()  THEN 'next'
  END AS bucket
FROM class_instances ci
WHERE ci.status IN ('scheduled','ongoing','completed')
  AND ci.class_date BETWEEN current_date - 1 AND current_date + 1;

-- refresh every minute
SELECT cron.schedule('refresh_snapshot','* * * * *', $$REFRESH MATERIALIZED VIEW CONCURRENTLY teacher_class_snapshot$$);
```

> **GraphQL** (from Supabase):

```graphql
query TeacherHome($teacherId: uuid!) {
  ongoing: teacher_class_snapshot(
    where: {bucket: {_eq: "ongoing"},
            _or: [{teacher_id: {_eq: $teacherId}},
                  {actual_teacher_id: {_eq: $teacherId}}]}) {
    id class_date time_slot
  }
  previous: teacher_class_snapshot(
    where: {bucket: {_eq: "previous"},
            _or: [{teacher_id: {_eq: $teacherId}},
                  {actual_teacher_id: {_eq: $teacherId}}]},
    order_by: {class_date: desc, time_slot: desc},
    limit: 1) {
    id class_date time_slot
  }
  next: teacher_class_snapshot(
    where: {bucket: {_eq: "next"},
            _or: [{teacher_id: {_eq: $teacherId}},
                  {actual_teacher_id: {_eq: $teacherId}}]},
    order_by: {class_date: asc, time_slot: asc},
    limit: 1) {
    id class_date time_slot
  }
}
```

*Without the MV* you can run the same CTE directly; the covering index shown above keeps it quick (<5 ms typ).

---

## 6 Calendar day view

```graphql
query Calendar($teacherId: uuid!, $date: date!) {
  class_instances(
    where: {
      class_date: {_eq: $date},
      _or: [{teacher_id: {_eq: $teacherId}},
            {actual_teacher_id: {_eq: $teacherId}}]
    },
    order_by: {time_slot: asc}
  ) {
    id time_slot status
    teacher { name }
    actual_teacher { name }
    attendance {
      student { id name }
      attendance_state notes signature_url
    }
  }
}
```

The `class_date, time_slot` composite index guarantees sequential scans for full-day calendars are avoided.

---

## 7 Digital signatures (unchanged)

*Bucket*: `signatures` in Supabase Storage.
The signed URL is stored in `attendance.signature_url`.
Client flow identical to the earlier example.

---

## 8 Payment logic (trigger-driven)

```sql
CREATE FUNCTION fn_sync_payment_usage() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND NEW.attendance_state = 'attended'
     AND OLD.attendance_state <> 'attended' THEN
    INSERT INTO payment_usage(payment_id, class_instance_id)
      SELECT s.active_payment_id, NEW.class_instance_id
      FROM students s
      WHERE s.id = NEW.student_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_payment_usage
AFTER INSERT OR UPDATE OF attendance_state ON attendance
FOR EACH ROW EXECUTE FUNCTION fn_sync_payment_usage();
```

Materialised view `mv_payment_usage` rolls these rows into **classes\_remaining** for dashboards.

---

## 9 Indexes recap

| table             | columns                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| `class_instances` | `(class_date, lower(time_slot), teacher_id, actual_teacher_id, status)` |
| `attendance`      | `(student_id)` (include `attendance_state`)                             |
| `students`        | `(series_id)`                                                           |
| `payments`        | `(student_id, start_date DESC)`                                         |

---

