import { Router, Request, Response } from "express";
import { createShippingLabel, getAllShippingLabels, getAddressesToAutocomplete } from "../application/shippingLabel.service";
import { ObjectId } from "mongodb";
import { GetAllShippingLablesResponse } from "../domain/interfaces/getAllShippingLablesResponse.interface";

const shippingLabelsRouter = Router();

shippingLabelsRouter.post('/create-shipping-label', async (req: Request, res: Response): Promise<void> => {
  const { shippingLabel } = req.body;

  try {
    const response: GetAllShippingLablesResponse = await createShippingLabel(shippingLabel);

    res.status(201).json({
      statusCode: 201,
      message: "Shipping label created successfully!",
      data: response,
    });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: 'Error creating the shipping label',
        statusCode: 500,
        error: error.message,
      });
      return;
    } 

    res.status(500).json({
      message: 'Error creating the shipping label',
      statusCode: 500,
    });
    return;
  }
});

shippingLabelsRouter.get('/shipping-labels', async (req: Request, res: Response): Promise<void> => {
  try {
    
    const response: GetAllShippingLablesResponse[] = await getAllShippingLabels();
    res.status(200).json({
      statusCode: 200,
      message: "Get all shipping labels successfully!",
      data: response,
    });

    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: 'Error getting all the shipping labels',
        statusCode: 500,
        error: error.message,
      });
      return;
    } 

    res.status(500).json({
      statusCode: 500,
      message: "Unknow error getting the shipping labels",
    });
    return;
  }
});

shippingLabelsRouter.get('/address-autocomplete/:address', async (req: Request, res: Response): Promise<void> => {
  const { address } = req.params;

  try {
    const response = await getAddressesToAutocomplete(address);

    res.status(200).json({
      message: 'Get addresses successfully',
      statusCode: 200,
      data: response,
    });
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: 'Error getting the shipping labels',
        statusCode: 500,
        error: error.message,
      });
      return;
    } 

    res.status(500).json({
      message: 'Error getting the shipping labels',
      statusCode: 500,
    });
    return;
  }
});

export default shippingLabelsRouter;
