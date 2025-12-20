import { Request, Response, NextFunction } from "express";

export function validateUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = Number(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: " User Id is invaild" });
  }

  next();
}

export function validateRequiredUserData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: " Email and password are required" });
  }

  next();
}

export function validatePartialUserData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  if (!email && !password) {
    return res
      .status(400)
      .json({
        error:
          " At least one field (email or password) must be provided to update ",
      });
  }

  next();
}
