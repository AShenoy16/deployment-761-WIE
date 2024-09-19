import { Request, Response } from "express";

/**
 * Controller to get all role models from the database and return to client
 */
export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = {}; // currently not implemented
    return res.status(200).json(testimonials);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
