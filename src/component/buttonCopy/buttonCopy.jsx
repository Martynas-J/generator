import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function CopyButton({ textToCopy }) {
  const [copied, setCopied] = useState(false);
  const textRef = useRef(null);

  const copyToClipboard = () => {
    const range = document.createRange();
    range.selectNodeContents(textToCopy); // Pasirenkame turinį
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      // Kopijuojame pasirinktą turinį
      document.execCommand("copy");
      setCopied(true);
      toast.success("Tekstas nukopijuotas į iškarpinę!");
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (error) {
      console.error("Kopijavimas nepavyko:", error);
    } finally {
      selection.removeAllRanges(); // Valome pasirinkimą
    }
  };

  return (
    <div>
      <button
        onClick={copyToClipboard}
        className={`p-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          copied ? "bg-green-500" : ""
        }`}
      >
        {copied ? (
          <span className="text-yellow-700 font-semibold">Nukopijuota!</span>
        ) : (
          "Kopijuoti"
        )}
      </button>
    </div>
  );
}
