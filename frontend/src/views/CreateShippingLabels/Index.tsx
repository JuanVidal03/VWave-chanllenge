import React from "react";
import CreateShippingLabelForm from "./components/CreateShippingLabelForm";

const Index: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[80%] flex justify-center items-center border-b">
        <h1 className="text-3xl font-bold my-4">Create a new shipping labels</h1>
      </div>
      <CreateShippingLabelForm/>
    </div>
  );
};

export default Index;