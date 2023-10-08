"use client";
import CopyButton from "@/component/buttonCopy/buttonCopy";
import React, { useRef, useState } from "react";

function TextProcessor() {
  const [inputText, setInputText] = useState("");
  const [extractedData, setExtractedData] = useState({
    id: null,
    topic: null,
    security: null,
    inviteLink: null,
    passcode: null,
  });
  const contentRef = useRef(null);

  const extractData = () => {
    const idRegex = /Meeting ID\s*\n*(\d{3}\s\d{4}\s\d{4})/;
    const topicRegex = /Topic\s*([\w\s-:]+)/;
    const securityRegex = /Passcode(\d+)/;
    const inviteLinkRegex = /Invite Link\s*(https?:\/\/[^\s]+)/;

    const idMatch = inputText.match(idRegex);
    const topicMatch = inputText.match(topicRegex);
    const securityMatch = inputText.match(securityRegex);
    const inviteLinkMatch = inputText.match(inviteLinkRegex);

    const extractedData = {
      id: idMatch && idMatch.length > 1 ? idMatch[1].trim() : null,
      topic: topicMatch && topicMatch.length > 1 ? topicMatch[1].trim() : null,
      security:
        securityMatch && securityMatch.length > 1
          ? securityMatch[1].trim()
          : null,
      inviteLink:
        inviteLinkMatch && inviteLinkMatch.length > 1
          ? inviteLinkMatch[1].trim()
          : null,
    };

    setExtractedData(extractedData);
  };

  const pasteFromClipboard = () => {
    navigator.clipboard.readText().then(
      function (text) {
        setInputText(text);
      },
      function (err) {
        alert("Klaida įklijuojant duomenis iš iškarpinės.");
      }
    );
  };

  return (
    <div className="container mx-auto py-10 ">
      <textarea
        rows="5"
        cols="50"
        placeholder="Įkelkite visą tekstą"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="border-4 p-4 mt-4 mb-4"
      />
      <button
        className="bg-blue-500 text-white p-3 rounded hover:bg-blue-700"
        onClick={extractData}
      >
        Išgauti duomenis
      </button>

      <button
        className="bg-yellow-500 text-white p-3 rounded hover:bg-yellow-700 ml-2"
        onClick={pasteFromClipboard}
      >
        Įklijuoti
      </button>
      <div ref={contentRef}>
        <div >
          {extractedData.id !== null && (
            <div className="mt-4">
              <div className="pb-5">
                Nutolusi šalis prie teismo posedžio gali prisijungti šiais
                budais:
              </div>
              <div>
                1. Parsisiunciant ZOOM programa iš zoom.us arba Android
                irenginiams iš Google Play, o Apple irenginiams – iš APPSTORE
                arba jungiantis adresu https://zoom.us/join . Pasirinkus viena
                iš minetu prisijungimo variantu reikes ivesti žemiau nurodytus
                prisijungimo duomenis (ID ir slaptažodi);{" "}
              </div>
              <div className="pb-5">
                2. Paspausti nuoroda {extractedData.inviteLink} ir suvesti
                prisijungimo slaptažodi, kuris yra nurodytas žemiau.
              </div>
              <div className="pb-5">Posedžio prisijungimo duomenys:</div>
              <div>Prisijungimo nuoroda - https://zoom.us/</div>
              <div>
                Prisijungimo ID –{" "}
                <span className="font-semibold">{extractedData.id}</span>
              </div>
              <div>
                Slaptažodis -{" "}
                <span className="font-semibold">{extractedData.security}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-2">
        {extractedData.id !== null && (
          <CopyButton textToCopy={contentRef?.current} />
        )}
      </div>
    </div>
  );
}

export default TextProcessor;
