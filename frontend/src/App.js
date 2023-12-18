import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [selectedPair, setSelectedPair] = useState(
    "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43"
  );
  const [conversionResult, setConversionResult] = useState("");
  const [contractAddress] = useState(
    "0xE125a64f15a0E48c4Fa952aA79e6224738dB1A61"
  );
  const [provider] = useState(
    new ethers.JsonRpcProvider(
      "https://sepolia.infura.io/v3/ba6ba1e27d974fe4869b9ed530f3ce18"
    )
  );

  const handleConvert = async () => {
    try {
      const contract = new ethers.Contract(
        contractAddress,
        [
          "function getChainlinkDataFeedLatestAnswer(address pair) external view returns (int)",
        ],
        provider
      );
      const result = await contract.getChainlinkDataFeedLatestAnswer(
        selectedPair
      );
      setConversionResult(Number(result.toString()) / 10 ** 8);
    } catch (error) {
      console.error("Error converting:", error.message);
    }
  };

  return (
    <div className="main-container">
      <h1>Crypto Converter App</h1>
      <div>
        <label>
          Select Currency Pair:
          <select
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
          >
            <option value="0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43">
              BTC to USD
            </option>
            <option value="0x694AA1769357215DE4FAC081bf1f309aDC325306">
              ETH to USD
            </option>
            <option value="0xc59E3633BAAC79493d908e63626716e204A45EdF">
              LINK to USD
            </option>
            <option value="0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22">
              BTC to ETH
            </option>
          </select>
        </label>
        <button onClick={handleConvert}>Convert</button>
        <div className="result">
          <p>Conversion Result: {conversionResult}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
