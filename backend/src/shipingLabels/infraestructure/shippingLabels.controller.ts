import { Router, Request, Response } from "express";
import { createShippingLabel } from "../application/shippingLabel.service";

const shippingLabelsRouter = Router();

shippingLabelsRouter.post('/create-shipping-label', async (req: Request, res: Response): Promise<any> => {
  const { shippingLabel } = req.body;

  try {
    const response = await createShippingLabel(shippingLabel);

    return res.status(201).json({
      statusCode: 201,
      message: "Shipping label created successfully!",
      data: response,
    });

  } catch (error: any) {
    throw new Error(`Error creating the shipping label: ${error.message}`);
  }
});

export default shippingLabelsRouter;