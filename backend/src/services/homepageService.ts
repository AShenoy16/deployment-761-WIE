import HomePage from "../models/HomepageModel";

export const getHomePageData = async () => {
  const homePage = await HomePage.findOne();
  return homePage;
};

export const updateHomePageData = async (data: any) => {
  const homePage = await HomePage.findOne();
  if (!homePage) throw new Error("Home page content not found");

  Object.assign(homePage, data);
  await homePage.save();

  return homePage;
};
