import type { StudentClassInstance } from "@/types/student";
import { useEffect } from "react";
import { OngoingClassesSection as OngoingClasses } from "./components/ongoing-classes";
import { RecentClasses } from "./components/recent-classs/recent-classes";
import { UpcomingClasses } from "./components/upcoming-classes/upcoming-classes";

import {
  ATTENDANCE_STATUS,
  CLASS_INSTANCE_STATUS,
  CLASS_TYPE,
} from "@/utils/constants";

const upcomingClasses: StudentClassInstance[] = [
  {
    studentId: "1",
    studentName: "James Harrid",
    classInstanceId: "ci-upcoming-1",
    date: "2024-04-10",
    timeSlot: "11pm-12pm",
    classType: CLASS_TYPE.SOLO,
    attendance: "pending",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat enim diam, non malesuada massa blandit ut. Nulla elementum commodo luctus. Curabitur ultricies risus eget maximus ullamcorper. Proin mauris augue, dictum a neque at, vehicula vestibulum neque. Duis in elit lacus. Fusce ut eros vitae elit rutrum aliqu",
  },
  {
    studentId: "2",
    studentName: "Anna Hunt",
    classInstanceId: "ci-upcoming-2",
    date: "2024-04-11",
    timeSlot: "11am-12pm",
    classType: CLASS_TYPE.SOLO,
    attendance: "pending",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat enim diam, non malesuada massa blandit ut. Nulla elementum commodo luctus. Curabitur ultricies risus eget maximus ullamcorper. Nam pretium posuere ligula, non gravida dolor tempor nec. Proin aliquet, eros non rhoncus porttitor, risus odio sodales velit, non egestas urna erat nec enim. ",
  },
];

const recentClasses: StudentClassInstance[] = [
  {
    studentId: "1",
    studentName: "Jane Cooper",
    classInstanceId: "ci-recent-1",
    date: "2024-04-01",
    timeSlot: "12pm-1pm",
    classType: CLASS_TYPE.SOLO,
    attendance: ATTENDANCE_STATUS.ATTENDED,
    classInstanceStatus: CLASS_INSTANCE_STATUS.COMPLETED,
    notes: "Good progress on rudiments.",
  },
  {
    studentId: "2",
    studentName: "James Harrid",
    classInstanceId: "ci-recent-2",
    date: "2024-04-01",
    timeSlot: "11am-12pm",
    classType: CLASS_TYPE.SOLO,
    attendance: ATTENDANCE_STATUS.MISSED,
    classInstanceStatus: CLASS_INSTANCE_STATUS.COMPLETED,
    notes: "Needs to practice paradiddles more.",
  },
  {
    studentId: "3",
    studentName: "James Harrid",
    classInstanceId: "ci-recent-3",
    date: "2024-04-02",
    timeSlot: "11am-12pm",
    classType: CLASS_TYPE.SOLO,
    attendance: ATTENDANCE_STATUS.PENDING,
    classInstanceStatus: CLASS_INSTANCE_STATUS.SCHEDULED,
    notes: "Scheduled but not yet completed.",
  },
];

const ongoingStudents: StudentClassInstance[] = [
  {
    studentId: "1",
    studentName: "James Harrid",
    classInstanceId: "ci-ongoing-1",
    date: "2024-04-08",
    timeSlot: "11am-12pm",
    classType: CLASS_TYPE.SOLO,
    attendance: "pending",
    notes:
      "Ongoing class notes placeholder.Ongoing class notes placeholder for duo student 1 Ongoing class notes placeholder for duo student 1 Ongoing class notes placeholder for duo student 1 Ongoing class notes placeholder for duo student 1",
  },
  {
    studentId: "2",
    studentName: "Anna Hunt",
    classInstanceId: "ci-ongoing-2",
    date: "2024-04-08",
    timeSlot: "11am-12pm",
    classType: CLASS_TYPE.DUO,
    attendance: "pending",
    notes: "Ongoing class notes placeholder for duo student 1.",
  },
  {
    studentId: "3",
    studentName: "Ben Carter",
    classInstanceId: "ci-ongoing-2",
    date: "2024-04-08",
    timeSlot: "11am-12pm",
    classType: CLASS_TYPE.DUO,
    attendance: "pending",
    notes: "Ongoing class notes placeholder for duo student 2.",
  },
];

const AdminDashboard = () => {
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 1,
        behavior: "smooth",
      });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="flex w-full max-w-2xl mx-auto flex-col px-6 py-4 min-h-[100dvh]">
      <div id="ongoing">
        <h2 className="text-xl font-bold font-overpass tracking-wider bg-background py-2 sticky top-0 z-1">
          ongoing classes
        </h2>
        <OngoingClasses ongoingStudents={ongoingStudents} />
      </div>
      <div id="recent">
        <h2 className="text-xl font-bold font-overpass tracking-wider bg-background py-2 sticky top-0 z-1">
          recent classes
        </h2>
        <RecentClasses data={recentClasses} />
      </div>
      <div id="upcoming">
        <h2 className="text-xl font-bold font-overpass tracking-wider bg-background py-2 sticky top-0 z-1">
          upcoming classes
        </h2>
        <UpcomingClasses data={upcomingClasses} />
      </div>
    </div>
  );
};

export default AdminDashboard;
