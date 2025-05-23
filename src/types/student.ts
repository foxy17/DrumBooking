import type {
  AttendanceStatusType,
  ClassInstanceStatusType,
  ClassType,
} from "@/utils/constants";

/**
 * Represents a student's participation details for a specific class instance.
 * Based on the database schema combining information from students, class_instances,
 * class_instance_students, and potentially payments tables.
 * Fields are made optional where appropriate to tolerate missing data from GraphQL queries.
 */
export interface StudentClassInstance {
  // Core Identifiers (Likely always present)
  studentId: string;
  studentName: string;
  classInstanceId: string;

  // Core Class Details (Likely always present)
  date: string; // Consider using Date type if appropriate for your logic
  timeSlot: string; // e.g., "1-2pm", directly from class_instances.time_slot
  classType: ClassType; // Derived from payments.class_type or other logic

  // Fields from class_instance_students (May be null/missing)
  attendance?: AttendanceStatusType | null;
  notes?: string | null;
  signatureUrl?: string | null; // URL to stored signature image

  // Fields from class_instances (May be null/missing)
  teacherId?: string | null; // Scheduled teacher ID for this instance
  actualTeacherId?: string | null; // Substitute teacher ID, if applicable
  classInstanceStatus?: ClassInstanceStatusType | null;

  // Fields from students (May be null/missing)
  studentContactInfo?: {
    email?: string | null;
    phone?: string | null;
  } | null;
  studentAssignedTeacherId?: string | null; // Student's primary assigned teacher

  // Derived fields (May be null/missing)
  paymentStatus?: "Active" | "Expired" | "Due Soon" | string | null; // Derived payment status for the student
}
