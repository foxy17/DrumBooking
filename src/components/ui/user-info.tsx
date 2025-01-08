import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { type Class } from '@/types/appointment';

interface UserInfoProps {
  classData: Class;
}

export const UserInfo = ({ classData }: UserInfoProps) => {
  return (
    <div className="w-[60%] flex items-center">
      <Avatar className="h-12 w-12 mr-4">
        <AvatarImage src={classData.image} alt={classData.name} />
        <AvatarFallback className="text-lg">
          {classData.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start">
        <span className="font-semibold text-white">{classData.name}</span>
        <span className="font-semibold text-sm text-zinc-400">
          {classData.time}
        </span>
      </div>
    </div>
  );
};
