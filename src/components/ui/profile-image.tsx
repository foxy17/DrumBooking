interface ProfileImageProps {
  profile: {
    image: string;
    name: string;
  };
}

export const ProfileImage = ({ profile }: ProfileImageProps) => (
  <>
    {profile.image && (
      <img
        src={profile.image}
        alt={profile.name}
        className="w-14 h-14 rounded-full "
      />
    )}
  </>
);
