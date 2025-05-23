import StudentCard from "@/components/student-card/student-card";
import type { StudentClassInstance } from "@/types/student";
import { OngoingClassCard } from "./ongoing-class-card";

import { CARD_TYPE } from "@/utils/constants";

interface OngoingClassesSectionProps {
  ongoingStudents: StudentClassInstance[];
}

export const OngoingClassesSection: React.FC<OngoingClassesSectionProps> = ({
  ongoingStudents,
}) => {
  if (ongoingStudents.length === 0) {
    return (
      <div className="mb-1">
        <div className="neo-card p-6 pb-1 flex flex-col items-center justify-center">
          <p className="text-pop-white-100">No ongoing classes right now</p>
          <p className="text-sm text-pop-white-300/50 mt-1">
            Check upcoming classes below
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        {ongoingStudents.map((instance) => (
          <StudentCard
            key={instance.classInstanceId + instance.studentId}
            student={instance}
            cardType={CARD_TYPE.ONGOING}
          >
            <OngoingClassCard student={instance} />
          </StudentCard>
        ))}
      </div>
    </div>
  );
};
