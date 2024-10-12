import HomePage from "../models/HomepageModel";

/**
 * Fetches the home page data from the database.
 * @returns {Promise<any>} - Returns a promise that resolves to the home page data document.
 * @throws {Error} - Throws an error if there is an issue with the database query.
 */
export const getHomePageData = async () => {
  // Fetch the home page data from the database
  const homePage = await HomePage.findOne();

  // Return the home page data
  return homePage;
};

/**
 * Updates the home page data with the provided content.
 * Finds the home page document and updates its fields based on the input data.
 * @param {any} data - The data to update in the home page document. This should include the fields to be updated.
 * @returns {Promise<any>} - Returns a promise that resolves to the updated home page document.
 * @throws {Error} - Throws an error if the home page content is not found or if the update operation fails.
 */
export const updateHomePageData = async (data: any) => {
  // Fetch the existing home page data from the database
  const homePage = await HomePage.findOne();

  // If no home page data is found, throw an error
  if (!homePage) throw new Error("Home page content not found");

  // Update the home page document with the new data
  Object.assign(homePage, data);

  // Save the updated document to the database
  await homePage.save();

  // Return the updated home page data
  return homePage;
};
