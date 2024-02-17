import { Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react';

import { cn } from '@/utils/cn';

interface MetaDataProps {
  title: string;
  subtitle: string;
  className?: string;
}
export const MetaDataCard = ({ title, subtitle, className }: MetaDataProps) => {
  return (
    <Card className={cn('!rounded-[20px]', className)}>
      <CardBody>
        <Flex className="items-center gap-x-4">
          <Heading className="mb-2 !text-5xl">{title}</Heading>
        </Flex>
        <Text className="mb-2 text-lg font-medium">{subtitle}</Text>
      </CardBody>
    </Card>
  );
};
