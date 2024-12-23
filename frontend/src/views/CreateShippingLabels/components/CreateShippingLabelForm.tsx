import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateShippingLabel } from "../../../hooks/useShippingLables";
import Loader from "../../common/Loader";
import { toast } from "react-toastify";

type Inputs = {
  shippingLabel: string;
}

const CreateShippingLabelForm: React.FC = () => {

  const { isError, error, isPending, mutateAsync } = useCreateShippingLabel();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();

  const handleAddShippingLabel = handleSubmit(async data => {
    try {
      const response: any = await mutateAsync(data);

      if (response.statusCode === 201) {
        toast.success(response.message);
      }
      reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  });

  useEffect(() => {
    if (isError) {
      throw new Error(`Error: ${error.message}`);
    }
  }, [error, isError]);

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
        <div className={`py-2 px-4 text-white rounded-md transition-all bg-green-500 hover:bg-green-600 duration-300 flex items-center gap-4 ${isPending && "cursor-not-allowed opacity-80"}`}>
          <input
            className={`${isPending ? "cursor-not-allowed" : "cursor-pointer"}`}
            type="submit"
            value="Create label"
          />
          { isPending && <Loader/> }
        </div>
      </div>
    </form>
  );
};

export default CreateShippingLabelForm;
