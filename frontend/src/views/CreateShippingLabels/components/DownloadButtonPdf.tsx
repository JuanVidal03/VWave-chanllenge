import { handleDownloadPDF } from "../../../utils/convertBase64";

interface Props {
  value: string;
}

const DownloadButtonPdf = ({ value }: Props): JSX.Element => {
  return (
    <button
      className="btn-download font-bold text-center w-full underline text-blue-950"
      onClick={() => handleDownloadPDF(value)}
    >
      Download
  </button>
  );
};

export default DownloadButtonPdf;
