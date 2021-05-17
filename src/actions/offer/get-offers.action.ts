import {
    APIGatewayProxyHandler,
    APIGatewayEvent,
    Context,
    APIGatewayProxyResult
} from 'aws-lambda';
import 'source-map-support/register';

// Models
import ResponseModel from "../../models/response.model";

// Services
import DatabaseService from "../../services/database.service";

// Enums
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";



export const getOffers: APIGatewayProxyHandler = async (_event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResult> => {
    // Initialize response variable
    let response;

    // Initialise database service
    const databaseService = new DatabaseService();

    // Destructure process.env
    const { OFFERS_TABLE } = process.env;

    // Validate against constraints
    const items = await (await databaseService.getItems(OFFERS_TABLE)).Items as any;
    response = new ResponseModel(items, StatusCode.OK, ResponseMessage.GET_LIST_SUCCESS);
    return response.generate()
}