import { useEffect, useState } from "react";
import { useGetAllShippingLables } from "../../../hooks/useShippingLables";
import Loader from "../../common/Loader";
import { toast } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { ColDef, AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import DownloadButtonPdf from "./DownloadButtonPdf";
import { ShippingLabel } from "../../../interfaces/shippingLabel.interface";

ModuleRegistry.registerModules([AllCommunityModule]);

const ShippingLablesTable = (): JSX.Element => {
  const [colDefs, setColDefs] = useState<ColDef<ShippingLabel>[]>([
    { headerName: "Country", field: "address.country", flex: 1 },
    { headerName: "City", field: "address.city", flex: 1, filter: true },
    { headerName: "Postal Code", field: "address.postcode", flex: 1, filter: true },
    { headerName: "Street", field: "address.street", flex: 1, filter: true },
    { headerName: "Address 1", field: "address.address_line1", flex: 1, filter: true },
    { headerName: "Address 2", field: "address.address_line2", flex: 1, filter: true },
    {
      headerName: "Download PDF",
      field: "shippingInfo.label.b64",
      cellRenderer: ({ value }: { value: string }) => <DownloadButtonPdf value={value} />,
      flex: 1,
      filter: false,
    },
  ]);

  const { data: shippingLabels, isError, error, isSuccess, isLoading } = useGetAllShippingLables();

  useEffect(() => {
    if (isError) {
      toast.error(`Error: ${error.message}`);
    }
  }, [error, isError]);

  if (isLoading && !isSuccess) {
    return <Loader />;
  }

  const paginationSelector = [10, 20, 30, 50];

  return (
    <div className="h-full w-[80%] mb-12">
      <AgGridReact
        className="shipping-labels-table"
        rowData={shippingLabels?.data}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={paginationSelector}
        detailRowAutoHeight={true}
        domLayout={"autoHeight"}
      />
    </div>
  );
};

export default ShippingLablesTable;
