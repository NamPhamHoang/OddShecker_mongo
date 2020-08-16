module.exports = {

    //data test for create event test
    Create_event_data: {
        sport: "horse racing",
        country: "NA",
        competition: "Pontefract",
        eventName: "1_event_test",
        eventStartTime: "2020-08-14T05:15:00.000+00:00",
        markets: [
            {
                marketId: 3498218202,
                marketName: 'market_test--1',
                eventName: 'event_test1',
                marketStartTime: "2020-08-14T05:15:00.000Z",
                runners: [
                    {
                        selectionId: 232132311,
                        runnerName: "runner_test--1",
                        isNonRunner: true,
                        odds: [
                            {
                                bookmaker: "bookemaker_test--1",
                                backPriceDec: 5,
                                backPriceFrac: "3",
                                places: 3,
                                placeTerms: "1/5",
                                timeStamp: "2020-08-14T15:11:54.389+00:00"
                            },
                        ]
                    },  
                ]
            },
        ],
    },

    Update_one_event_data: {
        sport: "horse racing",
        country: "LA",
        competition: "Test changename",
        eventName: "1_event_test",
        eventStartTime: "2020-08-14T05:15:00.000+00:00",
        markets: [
            {
                marketId: 3498218202,
                marketName: 'market_test--1',
                eventName: 'event_test1',
                marketStartTime: "2020-08-14T05:15:00.000Z",
                runners: [
                    {
                        selectionId: 232132311,
                        runnerName: "runner_test--1",
                        isNonRunner: true,
                        odds: [
                            {
                                bookmaker: "bookemaker_test--1",
                                backPriceDec: 5,
                                backPriceFrac: "3",
                                places: 3,
                                placeTerms: "1/5",
                                timeStamp: "2020-08-14T15:11:54.389+00:00"
                            },
                        ]
                    },  
                ]
            },
        ],
    },

    Update_event_data: {
        sport: "horse racing",
        country: "LA",
        competition: "Test changename",
        eventName: "1_event_test",
        eventStartTime: "2020-08-14T05:15:00.000+00:00",
        markets: [ 
            {
                marketId: 3498218202,
                marketName: 'market_test--1', //changing marketName
                eventName: '2-event_test',
                marketStartTime: "2020-08-14T05:15:00.000Z",
                runners: [
                    {
                        selectionId: 232132311,
                        runnerName: "runner_test--1", 
                        isNonRunner: false, // update true -> false
                        odds: [
                            {
                                bookmaker: "bookmaker_test--1",
                                backPriceDec: 5,
                                backPriceFrac: "5", //change odds price frac 3 -> 5
                                places: 4, //change odds price frac 3 -> 4
                                placeTerms: "1/5",
                                timeStamp: "2020-08-14T15:11:54.389+00:00"
                            },
                            //adding more odds not included in event name devegroup
                            {
                                bookmaker: "bookmaker_test--2",
                                backPriceDec: 5,
                                backPriceFrac: "3",
                                places: 3,
                                placeTerms: "1/5",
                                timeStamp: "2020-08-14T15:11:54.389+00:00"
                            },
                        ]
                    },
                    {
                        selectionId: 232132311,
                        runnerName: "runner_test--2", //runner not included db
                        isNonRunner: true,
                        odds: [
                            {
                                bookmaker: "bookmaker_test--1",
                                backPriceDec: 5,
                                backPriceFrac: "5", //change odds price frac 3 -> 5
                                places: 3,
                                placeTerms: "1/5",
                                timeStamp: "2020-08-14T15:11:54.389+00:00"
                            },
                            //adding more odds not included in event name devegroup
                            {
                                bookmaker: "bookmaker_test--2",
                                backPriceDec: 5,
                                backPriceFrac: "3",
                                places: 3,
                                placeTerms: "1/5",
                                timeStamp: "2020-08-14T15:11:54.389+00:00"
                            },
                            {
                                bookmaker: "bookmaker_test--3",
                                backPriceDec: 5,
                                backPriceFrac: "3",
                                places: 3,
                                placeTerms: "1/5",
                                timeStamp: "2020-08-14T15:11:54.389+00:00"
                            }
                        ]
                    }
                ]
            },
            {
                marketId: 3498218202,
                marketName: 'market_test--2', //changing marketName
                eventName: '2-event_test',
                marketStartTime: "2020-08-14T05:15:00.000Z",
                runners: [
                    {
                        selectionId: 232132311,
                        runnerName: "runner_test--1", 
                        isNonRunner: false, // update true -> false
                        odds: [
                            {
                                bookmaker: "bookmaker_test--1",
                                backPriceDec: 5,
                                backPriceFrac: "5", //change odds price frac 3 -> 5
                                places: 4, //change odds price frac 3 -> 4
                                placeTerms: "1/5",
                                timeStamp: "2020-08-14T15:11:54.389+00:00"
                            },
                            //adding more odds not included in event name devegroup
                            {
                                bookmaker: "bookmaker_test--2",
                                backPriceDec: 5,
                                backPriceFrac: "3",
                                places: 3,
                                placeTerms: "1/5",
                                timeStamp: "2020-08-14T15:11:54.389+00:00"
                            },
                        ]
                    },
                    {
                        selectionId: 232132311,
                        runnerName: "runner_test--2", //runner not included db
                        isNonRunner: true,
                        odds: [
                            {
                                bookmaker: "bookmaker_test--1",
                                backPriceDec: 5,
                                backPriceFrac: "5", //change odds price frac 3 -> 5
                                places: 3,
                                placeTerms: "1/5",
                                timeStamp: "2020-08-14T15:11:54.389+00:00"
                            },
                            //adding more odds not included in event name devegroup
                            {
                                bookmaker: "bookmaker_test--2",
                                backPriceDec: 5,
                                backPriceFrac: "3",
                                places: 3,
                                placeTerms: "1/5",
                                timeStamp: "2020-08-14T15:11:54.389+00:00"
                            },
                            {
                                bookmaker: "bookmaker_test--3",
                                backPriceDec: 5,
                                backPriceFrac: "3",
                                places: 3,
                                placeTerms: "1/5",
                                timeStamp: "2020-08-14T15:11:54.389+00:00"
                            }
                        ]
                    }
                ]
            },
        ],
    },
    
}