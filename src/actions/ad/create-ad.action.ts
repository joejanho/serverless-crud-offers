import {APIGatewayProxyHandler, APIGatewayEvent, Context, APIGatewayProxyResult} from 'aws-lambda';
import 'source-map-support/register';
import {validate} from 'class-validator';
// Models
import AdModel from "../../models/ad.model";
import ResponseModel from "../../models/response.model";

// Services
import DatabaseService from "../../services/database.service";
import { StatusCode } from 'src/enums/status-code.enum';
import { ResponseMessage } from 'src/enums/response-message.enum';

export const createAd: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
  // Initialize response variable
    let response;
    // Parse request parameters
    const requestedData = JSON.parse(event.body);
    if(requestedData === null){
      response =  new ResponseModel({}, StatusCode.ERROR, 'Offer cannot be created');
    }else{
      try {
        const requestedModel = new AdModel(requestedData);
        await validate(requestedModel, { validationError: { target: false } }).then(async errors => {
          // errors is an array of validation errors
          if (errors.length > 0) {
            response = (errors instanceof ResponseModel) ? errors : new ResponseModel({errors}, StatusCode.ERROR, 'Offer cannot be created');
          } else {
            const databaseService = new DatabaseService();
            // Get model data
            const data = requestedModel.getEntityMappings();
        
            // Initialise DynamoDB PUT parameters
            console.log('process.env.ADS_TABLE', process.env.ADS_TABLE);
            const params = {
                TableName: process.env.ADS_TABLE,
                Item: {
                    id: data.id,
                    title: data.title,
                    asset: data.asset,
                    link: data.link,
                    offers: data.offers,
                    createdAt: data.timestamp,
                    updatedAt: data.timestamp,
                }
            }
            // Inserts item into DynamoDB table
            await databaseService.create(params);
            response = new ResponseModel({id:data.id}, 200, 'Offer successfully created');
          }
      });        
      } catch (error) {
        console.log(error);
        response =  new ResponseModel({}, StatusCode.ERROR, ResponseMessage.CREATE_LIST_FAIL);
      }
    }
    console.log(response);
    return response.generate();
}