import type { Response } from "express";

export const ServerError = (res: Response, error: unknown) => {
  console.error(error);

  return res.status(500).json({
    message: "Internal server Error"
  })
}