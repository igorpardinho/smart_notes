import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/NotFoundError";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
    console.log("error: ",err)
  if (err.errors) {
    return res.status(400).json({
      status: "error",
      message: "validação falhou",
      details: err.errors,
    });
  }

  if (err instanceof NotFoundError) {
    return res
      .status(err.statusCode)
      .json({ status: "error", message: err.message });
  }

  return res.status(500).json({ error: "Erro interno do servidor" });
};
