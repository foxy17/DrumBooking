import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

interface UserInfoProps {
  userInfo: {
    id: string;
    name: string;
    image: string;
    time: string;
  };
}

export const UserInfo = ({ userInfo }: UserInfoProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="w-[60%] flex items-center">
      <Avatar className="md:h-12 md:w-12 mr-4 h-10 w-10">
        <AvatarImage src={userInfo.image} alt={userInfo.name} />
        <AvatarFallback className="text-lg">
          {userInfo.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start text-left max-w-[calc(100%-4rem)]">
        <span
          className={`font-semibold text-white w-full ${
            expanded ? "whitespace-normal break-words" : "truncate"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {userInfo.name}
        </span>
        <span className="font-semibold text-xs text-zinc-300">
          {userInfo.time}
        </span>
      </div>
    </div>
  );
};
