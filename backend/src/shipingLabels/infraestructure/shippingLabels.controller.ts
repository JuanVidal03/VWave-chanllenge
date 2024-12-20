import { Router, Request, Response } from "express";
import { generateAuthToken } from "../application/shippingLabel.service";

const shippingLabelsRouter = Router();

// this is not necesary, its nice to have
shippingLabelsRouter.post('/generate-token', async(req: Request, res: Response) => {
  try {
    const token = await generateAuthToken();
    res.json(token);
  } catch (error: any) {
    throw new Error(`Error generating token: ${error.message}`);
  }
});

export default shippingLabelsRouter;
