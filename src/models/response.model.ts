import {StatusCode} from '../enums/status-code.enum';

// Interfaces
type ResponseHeader = { [header: string]: string | number | boolean; }
interface IResponseBody {
    data: any;
    message: string;
    status?: string;
}

interface IResponse {
    statusCode: number;
    headers: ResponseHeader;
    body: string;
}


const RESPONSE_HEADERS: ResponseHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
};

/**
 * class ResponseModel
 */
export default class ResponseModel {
    private body: IResponseBody;
    private code: number;

    /**
     * ResponseModel Constructor
     * @param data
     * @param code
     * @param message
     */
    constructor(data = {}, code = 402, message = '') {
        this.body = {
            data: data,
            message: message,
            status: StatusCode[code],
        };
        this.code = code;
    }

    /**
     * Add or update a body variable
     * @param variable
     * @param value
     */
    setBodyVariable = (variable: string, value: string): void => {
        this.body[variable] = value;
    }

    /**
     * Set Data
     * @param data
     */
    setData = (data: any): void => {
        this.body.data = data;
    }

    /**
     * Set Status Code
     * @param code
     */
    setCode = (code: number): void => {
        this.code = code;
    }

    /**
     * Get Status Code
     * @return {*}
     */
    getCode = (): number => {
        return this.code;
    }

    /**
     * Set message
     * @param message
     */
    setMessage = (message: string): void => {
        this.body.message = message;
    }

    /**
     * Get Message
     * @return {string|*}
     */
    getMessage = (): any => {
        return this.body.message;
    }

    /**
     * Geneate a response
     * @return {IResponse}
     */
    generate = (): IResponse => {
        return {
            statusCode: this.code,
            headers: RESPONSE_HEADERS,
            body: JSON.stringify(this.body),
        };
    }
}