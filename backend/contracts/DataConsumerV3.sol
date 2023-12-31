
// File: @chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol


pragma solidity ^0.8.0;

interface AggregatorV3Interface {
  function decimals() external view returns (uint8);

  function description() external view returns (string memory);

  function version() external view returns (uint256);

  function getRoundData(
    uint80 _roundId
  ) external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);

  function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
}

// File: contracts/getValue.sol

pragma solidity ^0.8.7;

 
contract NFT {
 
    AggregatorV3Interface internal dataFeed;
 
    int public storedBTCToUSDConversion;
 
    // Network: Sepolia
    // Aggregator: BTC/USD
    // Address: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
 
    constructor() {
        dataFeed = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
    }
 
    // return the latest answer for the conversion from Chainlink
 
    function getChainlinkDataFeedLatestAnswer(address pair) external view returns (int) {
        (/* uint80 roundID */,
            int answer,
            /* uint startedAy */,
            /* uint timeStamp */,
            /*uint80 answeredInRound*/) = AggregatorV3Interface(pair).latestRoundData();
 
        // storedBTCToUSDConversion = answer;
        return answer;
    }
}