export interface IRoleModel {
  _id: number;
  name: string;
  title: string;
  description: string;
  photoUrl: string;
  bio?: string;
  socialMediaLinks?: ISocialMediaLinks;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISocialMediaLinks {
  linkedin?: string;
}
