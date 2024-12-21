import React from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  shippingLabel: string;
}

const CreateShippingLabelForm: React.FC = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();

  const handleAddShippingLabel = handleSubmit(async data => {
    reset();
  });

  return (
    <form className="w-[60%] my-8" onSubmit={handleAddShippingLabel}>
      <div className="flex flex-col w-full space-y-2 mb-4">
        <label className="font-semibold">Where to ship?</label>
        <input
          type="text"
          placeholder="Kurt-Schumacher-Str. 20"
          className="border p-2 rounded-lg transition-all focus:bg-gray-100 outline-none focus:outline-none"
          { ...register("shippingLabel", {
            required: {
              value: true,
              message: "This is required.",
            },
          })}
        />
        { errors.shippingLabel && <span className="text-red-500">{ errors.shippingLabel.message }</span> }
      </div>
      <div className="flex justify-end items-center">
        <input
          className="cursor-pointer py-2 px-4 bg-green-500 text-white rounded-md transition-all hover:bg-green-600 duration-300"
          type="submit"
          value="Create label"
        />
      </div>
    </form>
  );
};

export default CreateShippingLabelForm;
