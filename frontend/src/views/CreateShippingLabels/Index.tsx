import React from "react";
import CreateShippingLabelForm from "./components/CreateShippingLabelForm";
import ShippingLablesTable from "./components/ShippingLablesTable";
import ShippingLabelProvider from "../../context/shippingLabel.context";

const Index: React.FC = () => {

  document.title = "Create Shipping Labels in Germany";

  return (
    <ShippingLabelProvider>
      <div className="flex flex-col items-center">
        <div className="w-[80%] flex justify-center items-center border-b">
          <h1 className="text-3xl font-bold my-4">Create a new shipping labels</h1>
        </div>
        <CreateShippingLabelForm/>
        <ShippingLablesTable/>
      </div>
    </ShippingLabelProvider>
  );
};

export default Index;
