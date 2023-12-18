// src/App.js
import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [pair, setPair] = useState(
    "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43"
  );
  const [conversion, setConversion] = useState("");
  const [contractAddress] = useState(
    "0x847541F2927d6b5fDF2f04f4eC5bD823df62F95A"
  );
  const [provider] = useState(
    new ethers.JsonRpcProvider(
      "https://sepolia.infura.io/v3/83b607a9da6648eda62e165bb0d12e4f"
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
      const result = await contract.getChainlinkDataFeedLatestAnswer(pair);
      setConversion(Number(result.toString()) / 10 ** 8);
    } catch (error) {
      // console.log(pair);
      console.error("Error converting:", error.message);
    }
  };

  return (
    <div className="main-div">
      <h1>Currency Converter DApp</h1>
      <div>
        <label>
          Select Currency Pair:
          <select value={pair} onChange={(e) => setPair(e.target.value)}>
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
        <button onClick={handleConvert}>Submit</button>
        <div className="conversion">
          <p>Conversion Result: {conversion}</p>
        </div>
      </div>
      <div className="footer">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/athika-fatima-1a59121aa/"
            className="key-styling"
          >
            Athika Fatima
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
