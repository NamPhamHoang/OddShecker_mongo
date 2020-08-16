const utils = require("../utils");
const { MarketBuilder, OddBuilder, RunnerBuilder } = require("../test_helper");
const {
  old,
  new: newMarket,
} = require("../__fixtures__/diff_comare.fixtures.json");
describe("Utils", () => {
  it("should  add new market if doesn't exists", () => {
    const oldMarkets = [
      new MarketBuilder().setMarketName("Market.1").data,
      new MarketBuilder().setMarketName("Market.2").data,
      new MarketBuilder().setMarketName("Market.3").data,
      new MarketBuilder().setMarketName("Market.4").data,
    ];
    const newMarkets = [
      new MarketBuilder().setMarketName("Market.1").data,
      new MarketBuilder().setMarketName("Market.2").data,
      new MarketBuilder().setMarketName("Market.3").data,
      
    ];
    const updatedMarkets = utils.diffCompareAndUpdateMarkets(
      oldMarkets,
      newMarkets
    );
    const isHaveBeenAdded = (() => {
      let isAdded = false;
      updatedMarkets.forEach((market) => {
        if (market.marketName === "Market.3") isAdded = true;
      });
      return isAdded;
    })();
    expect({
      isHaveBeenAdded,
      total: updatedMarkets.length,
    }).toMatchObject({
      isHaveBeenAdded: true,
      total: 3,
    });
  });

  it("should add new Runner if doesn't exists", () => {
    const oldMarkets = [
      new MarketBuilder()
        .setMarketName("Market.1")
        .setMarketTime("2020-08-15T06:50:00.000+00:00")
        .addRunner(new RunnerBuilder().setRunnerName("Runner.2").data)
        .addRunner(new RunnerBuilder().setRunnerName("Runner.4").data).data,
    ];
    const newMarkets = [
      new MarketBuilder()
        .setMarketName("Market.1")
        .setMarketTime("2020-08-15T06:50:00.000+00:00")
        .addRunner(new RunnerBuilder().setRunnerName("Runner.1").data)
        .addRunner(new RunnerBuilder().setRunnerName("Runner.3").data).data,    
    ];

    const updatedMarkets = utils.diffCompareAndUpdateMarkets(
      oldMarkets,
      newMarkets
    );
    expect(updatedMarkets[0].runners.length).toBe(4);
  });

  it("should update old Runner", () => {
    const oldMarkets = [
      new MarketBuilder()
        .setMarketName("Market.1")
        .setMarketTime("2020-08-15T06:50:00.000+00:00")
        .addRunner(new RunnerBuilder().setRunnerName("Runner.2").data)
        .addRunner(new RunnerBuilder().setRunnerName("Runner.3").data).data
    ];
    const newMarkets = [
      new MarketBuilder()
        .setMarketName("Market.1")
        .setMarketTime("2020-08-15T06:50:00.000+00:00")
        .addRunner(new RunnerBuilder().setRunnerName("Runner.4").data)
        .addRunner(new RunnerBuilder().setRunnerName("Runner.2").setRunnerInfo(true).data).data
    ];

    const updatedMarkets = utils.diffCompareAndUpdateMarkets(
      oldMarkets,
      newMarkets
    );
    expect(updatedMarkets[0].runners.length).toBe(3);
    expect(updatedMarkets[0].runners[1].isNonRunner).toBe(true)
  });

  //add new odd
  it("should add new odd if doesn't exists", () => {
    const oldMarkets = [
      new MarketBuilder()
      .addRunner(new RunnerBuilder().setRunnerName("Runner.1")
      .addOdd(new OddBuilder().setBookerMarker("book1").data).data).data
    ];
    
    const newMarkets = [
      new MarketBuilder()
      .addRunner(new RunnerBuilder().setRunnerName("Runner.1")
      .addOdd(new OddBuilder().setBookerMarker("book2").data)
      .addOdd(new OddBuilder().setBookerMarker("book3").data).data).data
    ];

    const updatedMarkets = utils.diffCompareAndUpdateMarkets(
          oldMarkets,
          newMarkets
        );
    expect(updatedMarkets[0].runners[0].odds.length).toBe(3);
  });

  it("should update old odd", () => {
    const oldMarkets = [
      new MarketBuilder()
      .addRunner(new RunnerBuilder().setRunnerName("Runner.1")
      .addOdd(new OddBuilder().setBookerMarker("book1").data).data).data
    ];
    
    const newMarkets = [
      new MarketBuilder()
      .addRunner(new RunnerBuilder().setRunnerName("Runner.1")
      .addOdd(new OddBuilder().setBookerMarker("book1").setOddInfor(6,"5","5/2").data).data).data,
    ];
    
    const updatedMarkets = utils.diffCompareAndUpdateMarkets(
          oldMarkets,
          newMarkets
        );
    expect({
      backPriceDec: updatedMarkets[0].runners[0].odds[0].backPriceDec,
      backPriceFrac: updatedMarkets[0].runners[0].odds[0].backPriceFrac,
      placeTerms: updatedMarkets[0].runners[0].odds[0].placeTerms,
    }).toMatchObject({
      backPriceDec: 6,
      backPriceFrac: "5",
      placeTerms: "5/2"
    });
  });
});
