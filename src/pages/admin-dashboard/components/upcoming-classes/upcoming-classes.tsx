import StudentCard from "@/components/student-card/student-card";
import type { StudentClassInstance } from "@/types/student";
import { UpcomingClassCard } from "./upcoming-class-card";

import { CARD_TYPE } from "@/utils/constants";

export const UpcomingClasses = (props: { data: StudentClassInstance[] }) => {
  const { data } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        {data.map((instance) => (
          <StudentCard
            key={instance.classInstanceId + instance.studentId}
            student={instance}
            cardType={CARD_TYPE.UPCOMING}
          >
            <UpcomingClassCard student={instance} />
          </StudentCard>
        ))}
      </div>
    </div>
  );
};
