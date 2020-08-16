// class Market {
//   marketName;
//   marketStartTime;
// }

// class Runner {
//   runnerName;
// }
// class Odd {
//   bookmaker;
// }
const moment = require("moment");

class MarketBuilder {
  data = {
    _id: "5f38160273cbb665a0e59aa0",
    marketName: "Winner",
    marketStartTime: moment("2020-08-15T06:50:00.000Z").toISOString(),
    runners: [
      // {
      //   _id: "5f38160273cbb665a0e59aa1",
      //   selectionId: 26541605696,
      //   runnerName: "Saint Lawrence",
      //   isNonRunner: false,
      //   odds: [
      //     {
      //       _id: "5f38160273cbb665a0e59aa2",
      //       bookmaker: "Bet365",
      //       backPriceDec: 7,
      //       backPriceFrac: "6",
      //       places: 2,
      //       placeTerms: "1/4",
      //       timeStamp: "2020-08-15T17:06:10.220Z",
      //     },
      //   ],
      // },
    ],
  };
  setId(id) {
    this.data._id = id;
    return this;
  }
  setMarketName(name) {
    this.data.marketName = name;
    return this;
  }
  setMarketTime(date) {
    this.data.marketStartTime = moment(date).toISOString();
    return this;
  }
  addRunner(runner) {
    this.data.runners.push(runner);
    return this;
  }
}

class RunnerBuilder {
  data = {
    _id: "5f38160273cbb665a0e59aa1",
    selectionId: 26541605696,
    runnerName: "Saint Lawrence",
    isNonRunner: false,
    odds: [
      // {
      //   _id: "5f38160273cbb665a0e59aa2",
      //   bookmaker: "Bet365",
      //   backPriceDec: 7,
      //   backPriceFrac: "6",
      //   places: 2,
      //   placeTerms: "1/4",
      //   timeStamp: "2020-08-15T17:06:10.220Z",
      // },
    ],
  };
  
  setRunnerName(name) {
    this.data.runnerName = name;
    return this;
  }
  addOdd(odd) {
    this.data.odds.push(odd);
    return this;
  }
  setRunnerInfo(isNonRunner) {
    this.data.isNonRunner = isNonRunner
    return this
  }
}

class OddBuilder {
  data = {
    _id: "5f38160273cbb665a0e59aa2",
    bookmaker: "Bet365",
    backPriceDec: 7,
    backPriceFrac: "6",
    places: 2,
    placeTerms: "1/4",
    timeStamp: "2020-08-15T17:06:10.220Z",
  };
  setBookerMarker(name) {
    this.data.bookmaker = name;
    return this;
  }
  setOddInfor(backPriceDec,backPriceFrac,placeTerms) {
    this.data.backPriceDec = backPriceDec;
    this.data.backPriceFrac = backPriceFrac;
    this.data.placeTerms = placeTerms;
    return this;
  }
  
}
module.exports = {
  OddBuilder,
  RunnerBuilder,
  MarketBuilder,
};
