jest.setTimeout(30 * 1000);
const database = require("../database");
const mongoose = require("mongoose");
const event = require("../models/oc_event");
const data_test = require("../__fixtures__/data_test.fixtures");
const eventData = require("../__fixtures__/event_data.json");
describe("Check:UpdateEvent", () => {
  let connection;

  beforeAll(async () => {
    connection = await mongoose.connect(
      "mongodb+srv://new-user34234:qD025C8n9Gh9fB58@cluster0.cy2r8.mongodb.net/smarterodds?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    db = await mongoose.connection;
  });

  afterAll(async () => {
    await connection.close();
  });


  it('should addinng one event name 1_event_test if not exist', async () => {

    await database.CheckAndUpdateEvent(data_test.Create_event_data)

    const events = await event.findOne({ eventName: "1_event_test" });

    expect(events.eventName).toBe("1_event_test")
  })


  it('should update event if exist', async () => {

    await database.CheckAndUpdateEvent(data_test.Update_one_event_data)

    const events = await event.findOne({ eventName: "1_event_test" });

    expect(
      {
        eventName: events.eventName,
        country: events.country,
        competition: events.competition
      }).toMatchObject({
        eventName: "1_event_test",
        country: "LA",
        competition: "Test changename"
      })
  })

  it(`should adding new market if not exist `, async () => {

    await database.CheckAndUpdateEvent(data_test.Update_event_data)

    const events = await event.findOne({ eventName: "1_event_test" });

    const isAddedMarket = (() => {
      let isAdded = false;
      events.markets.forEach((market) => {
        if (market.marketName === "market_test--2") isAdded = true;
      });
      return isAdded;
    })();

    expect(
      {
        eventName: events.eventName,
        totalMarket: events.markets.length,
        isAddedMarket
      }).toMatchObject({
        eventName: "1_event_test",
        totalMarket: 2,
        isAddedMarket: true
      })
  });

  it(`should add new runner if not exist `, async () => {

    await database.CheckAndUpdateEvent(data_test.Update_event_data)

    const events = await event.findOne({ eventName: "1_event_test" });

    const isAddedRunner = (() => {
      let isAdded = false;
      events.markets[0].runners.forEach((runner) => {
        if (runner.runnerName === "runner_test--2") isAdded = true;
      });
      return isAdded;
    })();

    expect(
      {
        eventName: events.eventName,
        totalRunner: events.markets[0].runners.length,
        isAddedRunner
      }).toMatchObject({
        eventName: "1_event_test",
        totalRunner: 2,
        isAddedRunner: true
      })
  });

  it(`should update new runner if not exist `, async () => {

    await database.CheckAndUpdateEvent(data_test.Update_event_data)

    const events = await event.findOne({ eventName: "1_event_test" });

    expect(
      {
        eventName: events.eventName,
        runnerName: events.markets[0].runners[0].runnerName,
        isNonRunner: events.markets[0].runners[0].isNonRunner
       
      }).toMatchObject({
        eventName: "1_event_test",
        runnerName: "runner_test--1",
        isNonRunner: false
      })
  });


  it(`should add new odd if not exist `, async () => {

    await database.CheckAndUpdateEvent(data_test.Update_event_data)

    const events = await event.findOne({ eventName: "1_event_test" });

    const isAddedOdd = (() => {
      let isAdded = false;
      events.markets[0].runners[0].odds.forEach((odd) => {
        if (odd.bookmaker === "bookmaker_test--2") isAdded = true;
      });
      return isAdded;
    })();

    expect(
      {
        eventName: events.eventName,
        marketName: events.markets[0].marketName,
        runner: events.markets[0].runners[0].runnerName,
        totalOdd: events.markets[0].runners.length,
        isAddedOdd
      }).toMatchObject({
        eventName: "1_event_test",
        marketName: "market_test--1",
        runner: "runner_test--1",
        totalOdd: 2,
        isAddedOdd: true
      })
  });


  it(`should update old odd `, async () => {

    await database.CheckAndUpdateEvent(data_test.Update_event_data)

    const events = await event.findOne({ eventName: "1_event_test" });


    expect(
      {
        eventName: events.eventName,
        marketName: events.markets[0].marketName,
        runner: events.markets[0].runners[0].runnerName,
        backPriceFrac: events.markets[0].runners[0].odds[0].backPriceFrac,
        places: events.markets[0].runners[0].odds[0].places,
        placeTerms: events.markets[0].runners[0].odds[0].placeTerms,
      }).toMatchObject({
        eventName: "1_event_test",
        marketName: "market_test--1",
        runner: "runner_test--1",
        backPriceFrac: "5",
        places: 4,
        placeTerms: "1/5"
      })
  });



  // it.only(`should adding new runner if have more than 1 market `, async () => {
  //   // jest.spyOn(database, "CheckAndUpdateEvent").mockImplementation((data) => {
  //   //   console.log(data);
  //   //   throw new Error("");
  //   // });
  //   const spyFindOneAndUpate = jest
  //     .spyOn(event, "findOneAndUpdate")
  //     .mockImplementation(() => {});
  //   jest.spyOn(event, "findOne").mockReturnValue({
  //     markets: event_data.markets,
  //   });
  //   await database.CheckAndUpdateEvent(eventData);
  //   expect(spyFindOneAndUpate).toHaveBeenCalledTimes(1);
  // });
});
