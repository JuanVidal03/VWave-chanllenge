import { useContext } from "react";
import { ShippingLabelContext } from "../../../context/shippingLabel.context";

interface Address {
  address_line1: string;
  address_line2?: string;
  city: string;
  country: string;
  postCode?: string;
  state?: string;
  street?: string;
}

interface Addressoptions {
  addresses: Address[];
}

const AddressOptions = ({ addresses }: Addressoptions): JSX.Element => {
  const { setSelectedShippingLabel } = useContext(ShippingLabelContext);

  const formatAddress = (address: Address): string => {
    const { address_line1, city, country, postCode, state } = address;
    return  `${ address_line1 }, ${ postCode || "" } ${ city  }, ${ `${ state ? `${state},` : "" }` } ${ country }`;
  };

  return (
    <div className='w-full absolute top-[58%] border flex flex-col gap-1 border-gray-200 p-4 rounded-lg shadow-lg bg-gray-50 z-10'>
      {
        addresses.map((address: Address) => {
          const addressFormated:string = formatAddress(address);
          return (
            <p
              className="transition-all p-2 rounded-lg hover:bg-gray-100 cursor-pointer space-y-2"
              key={`${address.state}-${address.address_line1}-${address.state}-${address.country}`}
              onClick={() => setSelectedShippingLabel(addressFormated)}
            >
                {address.address_line1}, { address.postCode ? address?.postCode : "" } { address?.city }, <span className="text-gray-500">{ address?.state ? `${address.state},`: "" } { address.country }</span>
            </p>
          );
        }
        )
      }
    </div>
  );
};

export default AddressOptions;
