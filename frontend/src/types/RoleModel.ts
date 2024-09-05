export type RoleModel = {
  name: string;
  description: string;
  photoUrl: string;
  socialMediaLinks: {
    linkedin: string | undefined;
    instagram: string | undefined;
  };
  createdAt: Date;
  updatedAt: Date;
};
