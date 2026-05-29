import {z} from "zod";
import AppError from "../utils/AppError.js";

const validate = schema => (req, res, next) => {
  const parsedData = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!parsedData.success) {
    const errMsg = parsedData.error.issues.map(issue => issue.message).join(", ");
    throw new AppError(400, `Invalid input data: ${errMsg}`);
  }

  req.body = parsedData.data.body;
  next();
};

export {validate};
