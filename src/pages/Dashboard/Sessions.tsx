import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Text,
} from '@chakra-ui/react';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import drum from '@/components/Assets/drum.json';
import { Meteors } from '@/components/Effects';
import { NoSession } from '@/pages/Dashboard/components/NoSession';
import { SessionCard } from '@/pages/Dashboard/components/SessionCard';

import { cn } from '@/utils/cn';

export const Sessions = () => {
  const [sessions, setSessions] = useState<any>([]);

  if (sessions.length === 0) {
    return (
      <NoSession
        sessions={sessions}
        onClick={() => {
          setSessions([1]);
        }}
      />
    );
  }

  return (
    <>
      <Card
        className={cn(
          '!rounded-t-xl !rounded-b-none !bg-main dark:!text-white h-full mt-2 !sticky !top-0 !z-10 ',
          '!border-b-8 !border-b-main',
        )}
      >
        <CardHeader className="flex flex-row w-full items-center rounded-xl dark:!bg-secondary justify-center !py-4 !overflow-hidden relative ">
          <Text className="font-sans text-2xl text-center">
            Upcoming Practice Sessions
          </Text>
        </CardHeader>
      </Card>

      <Card
        className={cn(
          '!rounded-xl dark:!bg-secondary dark:!text-white h-full mt-2',
        )}
      >
        <CardBody className="flex flex-col w-full">
          <SessionCard date="Today" people="Only you" time="12pm - 1pm" solo />
          <Divider className="my-4 !border-main" />
          <SessionCard date="Tomorrow" people="Only you" time="2pm - 3pm" />
          <Divider className="my-4 !border-main" />
          <SessionCard date="21st Feb" people="Only you" time="12pm - 1pm" />
          <Divider className="my-4 !border-main" />
          <SessionCard date="28th Feb" people="Only you" time="12pm - 1pm" />
        </CardBody>
      </Card>
    </>
  );
};
