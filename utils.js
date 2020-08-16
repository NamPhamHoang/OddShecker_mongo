const _ = require("lodash");
const moment = require('moment')
const diffCompareAndUpdateMarkets = (oldMarkets, newMarkets) => {
  newMarkets.forEach((newMarket) => {
    oldMarkets.forEach((oldMarket, dataIndex) => {
      let oldMarketInfo = {
        marketName: oldMarket.marketName,
        marketStartTime: moment(oldMarket.marketStartTime).toISOString(),
      };

      let newmarketInfo = {
        marketName: newMarket.marketName,
        marketStartTime: moment(newMarket.marketStartTime).toISOString(),
      };
      //check markets match or not
      if (_.isEqual(oldMarketInfo, newmarketInfo)) {
        const aRunners = newMarket.runners;
        const dRunners = oldMarket.runners;
        //check runner match or not
        aRunners.forEach((aRunner) => {
          dRunners.forEach((dRunner, dRIndex) => {
            if (aRunner.runnerName === dRunner.runnerName) {
              const apiOdds = aRunner.odds;
              const dataOdds = dRunner.odds;
              apiOdds.forEach((apiOdd) => {
                dataOdds.forEach((dataOdd, dOIndex) => {
                  if (apiOdd.bookmaker === dataOdd.bookmaker) {
                    dataOdds.splice(dOIndex, 1);
                  }
                });
              });
              if (dataOdds.length > 0) {
                dataOdds.forEach((ele) => {
                  apiOdds.push(ele);
                });
              }
              dRunners.splice(dRIndex, 1);
            }
          });
        });
        if (dRunners.length > 0) {
          dRunners.forEach((data) => {
            aRunners.push(data);
          });
        }
        oldMarkets.splice(dataIndex, 1);
      }
    });
  });
  if (oldMarkets.length > 0) {
    oldMarkets.forEach((data) => {
      newMarkets.push(data);
    });
  }
  return newMarkets;
};

module.exports = {
  diffCompareAndUpdateMarkets,
};
