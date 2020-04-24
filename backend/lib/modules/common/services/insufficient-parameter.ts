import { Response } from 'express';
import { response_status_codes } from '../models/common.model';

class InsufficientParameterResponseService {
    public response(res: Response) {
        res.status(response_status_codes.success).json({
            STATUS: 'FAILURE',
            MESSAGE: 'Insufficient Parameters',
            DATA: {}
        });
    }
}

export default new InsufficientParameterResponseService().response;
