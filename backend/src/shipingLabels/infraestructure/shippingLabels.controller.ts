import { Router, Request, Response } from "express";
import { createShippingLabel, getAllShippingLabels } from "../application/shippingLabel.service";

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

shippingLabelsRouter.get('/shipping-labels', async (req: Request, res: Response): Promise<any> => {
  try {
    
    const response = await getAllShippingLabels();
    return res.status(200).json({
      statusCode: 200,
      message: "Get all shipping labels successfully!",
      data: response,
    });

  } catch (error: any) {
    return res.status(500).json({
      statusCode: 500,
      message: "Something bad",
    });
  }
});

export default shippingLabelsRouter;