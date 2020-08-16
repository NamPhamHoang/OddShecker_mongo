const mongoose = require("mongoose");
const event = require("./models/oc_event");

const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const { diffCompareAndUpdateMarkets } = require("./utils");
mongoose.set("useFindAndModify", false);

module.exports = {
  connect: function () {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("[Database] Connecting");
        var db = await mongoose.connect(
          "mongodb+srv://new-user34234:qD025C8n9Gh9fB58@cluster0.cy2r8.mongodb.net/smarterodds?retryWrites=true&w=majority",
          { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log("[Database] Connected");
        return resolve(db);
      } catch (error) {
        console.log(error);
        return reject();
      }
    });
  },

  disconnect: function (db) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("[Database] Disconnecting");
        await db.disconnect();
        console.log("[Database] Disonnected");
        return resolve();
      } catch (error) {
        console.log(error);
        return reject();
      }
    });
  },

  // saveEvent: function (evententry) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       console.log("[Database] Saving");
  //       evententry.save(function (err, evententry) {
  //         if (err) {
  //           console.log(err);
  //           return reject();
  //         }
  //         console.log("[Database] Saved");
  //         return resolve();
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       return reject();
  //     }
  //   });
  // },

  // findEvent: function (event) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       console.log("[Database] Finding");

  //       event.find({}, function (err, data) {
  //         if (err) {
  //           console.log(err);
  //           return reject();
  //         }
  //         console.log("[Database] Found");
  //         console.log(data);
  //         return resolve();
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       return reject();
  //     }
  //   });
  // },

  //update db

  CheckAndUpdateEvent: async function (evententry) {
    try {
      const {
        eventName,
        eventStartTime,
        competition,
        markets,
        sport,
        country,
        __v,
      } = evententry;
      // console.log("eventData");
      // check have event in db
      const dataEvent = await event.findOne({ eventName, eventStartTime });
      // if it not have event in db
      if (dataEvent !== null) {
        if (dataEvent.markets.length <= 0) {
          console.log("Cannot find this markets. Create new markets");
          await event.findOneAndUpdate(
            { eventName, eventStartTime },
            {
              competition,
              markets,
              sport,
              country,
              __v,
            },
            { new: true, useFindAndModify: false, upsert: true }
          );
          return evententry;
        }

        // handle duplicated data
        const updatedMarkets = diffCompareAndUpdateMarkets(
          dataEvent.markets,
          markets
        );

        // update event event
        await event.findOneAndUpdate(
          { eventName, eventStartTime },
          {
            competition,
            markets: updatedMarkets,
            sport,
            country,
            __v,
          },
          { new: true, useFindAndModify: false, upsert: true }
        );
        return evententry;
      } else {
        //creat new event
        console.log("create new event");
        await event.create(evententry);
        return evententry;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
