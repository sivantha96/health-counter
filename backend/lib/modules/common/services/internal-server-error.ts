import { Response } from 'express';
import { response_status_codes } from '../models/common.model';

class InternalErrorResponseService {
    public response( err: any, res: Response) {
        res.status(response_status_codes.mongo_error).json({
            STATUS: 'FAILURE',
            MESSAGE: 'Mongo error',
            DATA: err
        });
    }
}

export default new InternalErrorResponseService().response;
