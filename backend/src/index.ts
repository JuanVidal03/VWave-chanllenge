import express from 'express';
import cors from 'cors';
import shippingLabelsRouter from './shipingLabels/infraestructure/shippingLabels.controller';

const app = express();
const port = process.env.PORT || 8080;
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', shippingLabelsRouter);

app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));
