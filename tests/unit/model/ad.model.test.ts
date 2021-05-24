import AdModel from '../../../src/models/ad.model';

const adMock: any= {
    id: "7bf158f4-61ee-4564-b3eb-879a79df5aa7",
    title: "My To-do list",
    link: '',
    offers: [],
    asset: '',
};
describe('Model/Ad.model', () => {

    describe('Ensure entity mapping', () => {
        it('should return an object with all of the entity values', () => {
            const myAdModel = new AdModel(adMock);
            const myAdModelEntityMapping = myAdModel.getEntityMappings();
            expect(myAdModelEntityMapping.id).toEqual(myAdModel.id);
        });
    });
});  