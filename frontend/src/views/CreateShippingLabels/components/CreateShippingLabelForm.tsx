import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useCreateShippingLabel } from "../../../hooks/useShippingLables";
import { useGetAddressesToComplete } from "../../../hooks/useShippingLables"; 
import Loader from "../../common/Loader";
import { toast } from "react-toastify";
import AddressOptions from "./AddressOptions";
import { ShippingLabelContext } from "../../../context/shippingLabel.context";

type Inputs = {
  shippingLabel: string;
}

const CreateShippingLabelForm: React.FC = () => {
  const { selectedShippingLabel, setSelectedShippingLabel } = useContext(ShippingLabelContext);

  const [shippingLabel, setShippingLabel] = useState<string>("");

  const { isError, error, isPending, mutateAsync, isSuccess } = useCreateShippingLabel();  
  const { data: getShippingLabel } = useGetAddressesToComplete(shippingLabel);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<Inputs>();

  const addressToAutocomplete = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setShippingLabel(e.target.value);
    setSelectedShippingLabel("");
  };

  // update input value
  useEffect(() => {
    if (selectedShippingLabel) {
      setShippingLabel(selectedShippingLabel);
      setValue("shippingLabel", selectedShippingLabel);
    }
  }, [selectedShippingLabel, setValue]);

  const handleAddShippingLabel = handleSubmit(async (data: Inputs): Promise<void> => {
    await mutateAsync(data);
    reset();
  });

  useEffect(() => {
    if (isError) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("Error creating shipping label, try again.");
      }
    }
  }, [error, isError]);

  useEffect(() => {
    if (isSuccess && !isPending) {
      toast.success("Shipping label created successfully!");
    }
  }, [isSuccess, isPending]);

  return (
    <form className="w-[60%] relative my-8" onSubmit={handleAddShippingLabel}>
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
          onChange={(e) => addressToAutocomplete(e)}
        />
        { errors.shippingLabel && <span className="text-red-500">{ errors.shippingLabel.message }</span> }
      </div>
      {
        getShippingLabel?.data.length > 0 && !selectedShippingLabel && (
          <AddressOptions
            addresses={getShippingLabel?.data}
          />
        ) 
      }
      <div className="flex justify-end items-center">
        <div className={`py-2 px-4 text-white rounded-md transition-all bg-green-500 hover:bg-green-600 duration-300 flex items-center gap-4 ${isPending && "cursor-not-allowed opacity-80"}`}>
          <input
            className={`${isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
            type="submit"
            value="Create shipping label"
          />
          { isPending && <Loader/> }
        </div>
      </div>
    </form>
  );
};

export default CreateShippingLabelForm;
