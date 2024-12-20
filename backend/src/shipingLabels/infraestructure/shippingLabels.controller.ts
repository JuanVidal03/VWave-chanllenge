import { Router, Request, Response } from "express";
import { generateAuthToken, createShippingLabel } from "../application/shippingLabel.service";

const shippingLabelsRouter = Router();

// this is not necesary, but its nice to have
shippingLabelsRouter.post('/generate-token', async(req: Request, res: Response) => {
  try {
    const token = await generateAuthToken();
    res.json(token);
  } catch (error: any) {
    throw new Error(`Error generating token: ${error.message}`);
  }
});

shippingLabelsRouter.post('/create-shipping-label', async (req: Request, res: Response): Promise<any> => {
  const { shippingLabel } = req.body;

  try {
    const response = await createShippingLabel(shippingLabel);

    return res.json({
      statusCode: 201,
      message: "It's working!",
      data: response,
    });

  } catch (error: any) {
    throw new Error(`Error creating token: ${error.message}`);
  }
});

export default shippingLabelsRouter;