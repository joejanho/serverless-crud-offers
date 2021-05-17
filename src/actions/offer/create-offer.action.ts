import {APIGatewayProxyHandler, APIGatewayEvent, Context, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {validate} from 'class-validator';
// Models
import OfferModel from "../../models/offer.model";
import ResponseModel from "../../models/response.model";

// Services
import DatabaseService from "../../services/database.service";
import { StatusCode } from 'src/enums/status-code.enum';

export const createOffer: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  // Initialize response variable
    let response;
    // Parse request parameters
    const requestedData = JSON.parse(event.body);
    if(requestedData === null){
      response =  new ResponseModel({}, StatusCode.ERROR, 'Offer cannot be created');
    }else{
      try {
        const requestedModel = new OfferModel(requestedData);
        await validate(requestedModel, { validationError: { target: false } }).then(async errors => {
          // errors is an array of validation errors
          if (errors.length > 0) {
            response = (errors instanceof ResponseModel) ? errors : new ResponseModel({errors}, StatusCode.ERROR, 'Offer cannot be created');
          } else {
            const databaseService = new DatabaseService();
            // Get model data
            const data = requestedModel.getEntityMappings();
        
            // Initialise DynamoDB PUT parameters
            console.log('process.env.OFFERS_TABLE', process.env.OFFERS_TABLE);
            const params = {
                TableName: process.env.OFFERS_TABLE,
                Item: {
                    id: data.id,
                    title: data.title,
                    offerType: data.offerType,
                    offerValue: data.offerValue,
                    activationDate: data.activationDate,
                    endDate: data.endDate,
                    createdAt: data.timestamp,
                    updatedAt: data.timestamp,
                    articleTpes: data.articleTpes,
                }
            }
            // Inserts item into DynamoDB table
            await databaseService.create(params);
            response = new ResponseModel({id:data.id}, 200, 'Offer successfully created');
          }
      });        
      } catch (error) {
        console.log(error);
        response =  new ResponseModel({}, StatusCode.ERROR, 'Offer cannot be created');
      }
    }
    console.log(response);
    return response.generate();
}