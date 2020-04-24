import { Response } from 'express';
import { response_status_codes } from '../models/common.model';

class InternalErrorResponseService {
    public response( err: any, res: Response) {
        res.status(response_status_codes.internal_server_error).json({
            STATUS: 'FAILURE',
            MESSAGE: 'Internal server error',
            DATA: err
        });
    }
}

export default new InternalErrorResponseService().response;
