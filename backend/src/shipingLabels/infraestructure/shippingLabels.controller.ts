import { Router, Request, Response } from "express";
import { generateAuthToken, createShippingLabel } from "../application/shippingLabel.service";

const shippingLabelsRouter = Router();

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
    console.log('errrrrpr', error);
    throw new Error(`Error creating token: ${error.message}`);
  }
});

export default shippingLabelsRouter;