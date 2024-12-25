import React, { useEffect, useState } from "react";
import { useGetAllShippingLables } from "../../../hooks/useShippingLables";
import Loader from "../../common/Loader";


const ShippingLablesTable: React.FC = () => {

  const { data, isSuccess, isPending, isError, error } = useGetAllShippingLables();

  const [shippingLabels, setShipingLabels] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setShipingLabels(data.data.reverse());
    }
  }, [isSuccess, data]);


  useEffect(() => {
    if (isError) {
      throw new Error(`Error: ${error.message}`);
    }
  }, [error, isError]);


  if (isPending) {
    return <Loader />;
  }

  return (
    <table className="border w-[80%]">
      <thead>
        <tr className="border bg-green-400 text-white">
          <th className="border p-4">Country</th>
          <th className="border p-4">City</th>
          <th className="border p-4">Postal Code</th>
          <th className="border p-4">Street</th>
          <th className="border p-4">Address 1</th>
          <th className="border p-4">Address 2</th>
          <th className="border p-4">View Label</th>
        </tr>
      </thead>
      <tbody>
        {
          shippingLabels?.map((shippingLabel: any) => (
            <tr className="border transition-all duration-150 hover:bg-gray-100" key={shippingLabel._id}>
              <td className="border p-4">{shippingLabel.address.country}</td>
              <td className="border p-4">{shippingLabel.address.city}</td>
              <td className="border p-4">{shippingLabel.address.postcode}</td>
              <td className="border p-4">{shippingLabel.address.street}</td>
              <td className="border p-4">{shippingLabel.address.address_line1}</td>
              <td className="border p-4">{shippingLabel.address.address_line2}</td>
              <td className="border p-4 text-center">View PDF</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default ShippingLablesTable;
