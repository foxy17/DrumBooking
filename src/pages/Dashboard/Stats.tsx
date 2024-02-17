import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { ActivityRings } from '@jonasdoesthings/react-activity-rings';
import { Meteors } from '@/components/Effects';
import { MetaDataCard } from '@/pages/Dashboard/components/MetaDataCard';

const Stats = () => {
  return (
    <>
      <ActivityRings
        rings={[
          { filledPercentage: 0.3, color: '#FDC1E1FF' },
          { filledPercentage: 0.7, color: '#F4F824' },
        ]}
        options={{
          initialRadius: 20,
          backgroundOpacity: 0.3,
          containerHeight: '18rem',
          paddingBetweenRings: 4,
          animationTimingFunction: 'cubic-bezier(.47,1.64,.36,-0.19)',
          animationDurationMillis: 4000,
        }}
      />
      <Flex className="tracking-wider text-white -mt-8 text-xl font-bold font-sans mb-2">
        This Month
      </Flex>
      <Flex className="flex-col h-fit w-full pb-8">
        <SimpleGrid columns={2} spacing={2}>
          <MetaDataCard
            title="04"
            subtitle="Practice Attended"
            className="!bg-pop-pink"
          />
          <MetaDataCard
            title="04"
            subtitle="Classes Attended"
            className="!bg-pop-yellow"
          />
        </SimpleGrid>
        <Card className="!rounded-[20px] mt-2">
          <CardBody>
            <Flex className="flex-col items-center gap-y-4 w-full">
              <Text className="!text-xl text-center">
                Looking for next Practice session?
              </Text>
              <Button className="!bg-dark-green !text-white !px-12 !py-7 !rounded-full !text-xl">
                Book Practice
              </Button>
            </Flex>
          </CardBody>
        </Card>
        <Card className="!bg-dark-green !rounded-[20px] mt-2">
          <CardBody>
            <Flex className="flex-col items-center gap-y-4 w-full">
              <Text className="!text-xl text-center text-white">
                Have a class right now?
              </Text>
              <Button className="!bg-white !px-12 !py-7 !rounded-full !text-xl">
                Check In
              </Button>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};

export default Stats;
