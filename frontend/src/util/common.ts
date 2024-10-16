export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const possibleSpecs = [
  "Biomedical",
  "Chemmat",
  "Civil",
  "Compsys",
  "Electrical",
  "Engsci",
  "Mechanical",
  "Mechatronics",
  "Software",
  "Structural",
];

export const specAbbreviationMap: { [abbreviation: string]: string } = {
  Biomedical: "Biomedical Engineering",
  Chemmat: "Chemical and Materials Engineering",
  Civil: "Civil Engineering",
  Compsys: "Computer Systems Engineering",
  Electrical: "Electrical Engineering",
  Engsci: "Engineering Science",
  Mechanical: "Mechanical Engineering",
  Mechatronics: "Mechatronics Engineering",
  Software: "Software Engineering",
  Structural: "Structural Engineering",
};

export const reverseSpecAbbreviationMap: { [fullName: string]: string } =
  Object.entries(specAbbreviationMap).reduce(
    (acc, [abbreviation, fullName]) => {
      acc[fullName] = abbreviation;
      return acc;
    },
    {} as { [abbreviation: string]: string }
  );
