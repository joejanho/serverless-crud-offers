export enum ResponseMessage {
    CREATE_LIST_SUCCESS = 'Item successfully created',
    CREATE_LIST_FAIL = 'Item cannot be created',
    DELETE_LIST_SUCCESS = 'Item successfully deleted',
    DELETE_LIST_FAIL = 'Item cannot be deleted',
    GET_LIST_SUCCESS = 'list successfully retrieved',
    GET_LIST_FAIL = 'list not found',
    UPDATE_LIST_SUCCESS = 'Item successfully updated',
    UPDATE_LIST_FAIL = 'Item cannot be updated',
    ERROR = 'Unknown error.',
    INVALID_REQUEST = 'Invalid Request!',
    GET_ITEM_ERROR = 'Item does not exist',
}