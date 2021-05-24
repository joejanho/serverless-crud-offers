import handler from '../../lib/actions/handler';

type Response = {
    data: any;
    message: string;
    status: string;
}

const requestData = {
    title: "My To do list"
}

describe('POST /list/create - Create list', () => {
    let response, statusCode;

    // Before running the tests, send a request to the endpoint.
    beforeEach(function (done) {
        handler.createAd(requestData)
            .then((body) => {
                statusCode = 200;
                response = body;
                done();
            })
            .catch((error) => {
                statusCode = error.response.statusCode;
                response = error.response.body;
                done();
            });
    });

    it('should expect a 200 status code', (done) => {
        expect(statusCode).toEqual(200);
        done();
    });

    it('should expect a success message', (done) => {
        expect(response.message).toEqual('Offer cannot be created');
        done();
    });

    it('should check that data exists in DynamoDB', function () {
        handler.getAds({ id: response.data.id })
            .then((response) => {
                const properResponse = response as Response;
                expect(properResponse.data.id).toEqual(properResponse.data.listId);
            })
            .catch(() => {
                expect(true).toEqual(false);
            });

    });

})