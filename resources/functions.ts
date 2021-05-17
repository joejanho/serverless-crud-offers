export default {
    createOffer: {
        handler: 'handler.createOffer',
        events: [
            {
                http: {
                    method: 'POST',
                    path: 'offer/create',
                    cors: true
                }
            }
        ]
    },
    listOffers: {
        handler: 'handler.getOffers',
        events: [
            {
                http: {
                    method: 'GET',
                    path: 'offers',
                    cors: true
                }
            }
        ]
    },
    createAd: {
        handler: 'handler.createAd',
        events: [
            {
                http: {
                    method: 'POST',
                    path: 'ad/create',
                    cors: true
                }
            }
        ]
    },
    listAds: {
        handler: 'handler.getAds',
        events: [
            {
                http: {
                    method: 'GET',
                    path: 'ads',
                    cors: true
                }
            }
        ]
    },
}