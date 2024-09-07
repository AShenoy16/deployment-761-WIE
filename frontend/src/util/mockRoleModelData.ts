import { IRoleModel } from "../types/RoleModel";

const mockRoleModelData: IRoleModel[] = [
  {
    _id: 1,
    name: "Alyssa Morris",
    title: "Product Manager, Intel",
    description:
      "Bio-Engineer Jane Doe is a leader in her field excelling in all aspects.",
    photoUrl:
      "https://www.womeninscience.africa/wp-content/uploads/2022/11/Unsung-Black-Female-Engineers.jpg", // updated to photoUrl
    bio: "Alyssa Morris is an experienced product manager at Intel, focusing on innovation and technology in no-code platforms.",
    socialMediaLinks: {
      linkedin: "https://www.linkedin.com/in/alyssamorris", // moved inside socialMediaLinks
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 2,
    name: "Samantha Smith",
    title: "Software Engineer, Google",
    description:
      "Bio-Engineer Jane Doe is a leader in her field excelling in all aspects.",
    photoUrl:
      "https://nzmanufacturer.co.nz/wp-content/uploads/2023/08/Women-In-Engineering-PIC.jpg", // updated to photoUrl
    bio: "Alyssa Morris is an experienced product manager at Intel, focusing on innovation and technology in no-code platforms.",
    socialMediaLinks: {
      linkedin: "https://www.linkedin.com/in/samanthasmith",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Mock API function
export const mockRoleModels = async (): Promise<IRoleModel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRoleModelData);
    }, 1000);
  });
};
