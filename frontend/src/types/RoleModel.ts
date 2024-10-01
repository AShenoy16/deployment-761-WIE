export interface IRoleModel {
  _id: string;
  name: string;
  title: string;
  specName: string;
  description: string;
  photoUrl: string;
  bio: string;
  socialMediaLinks?: ISocialMediaLinks;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISocialMediaLinks {
  linkedin?: string;
}
