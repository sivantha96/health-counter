import { Request, Response } from 'express';
import insufficientParameter from '../modules/common/services/insufficient-parameter';
import { gender, response_status_codes } from '../modules/common/models/common.model';
import { UserService } from '../modules/family/services/family.service';
import { IFamily, IGetFamily } from '../modules/family/models/family.model';
import internalServerError from '../modules/common/services/internal-server-error';

export class UserController {

    private user_service: UserService = new UserService();

    public create_family_details(req: Request, res: Response) {
        if (req.body.is_aboard !== null && req.body.is_aboard !== undefined &&
            req.body.n_family_members &&
            req.body.is_patient_contacted !== null && req.body.is_patient_contacted !== undefined) {
                const family: IFamily = {
                    n_family_members: req.body.n_family_members,
                    is_aboard: req.body.is_aboard,
                    is_patient_contacted: req.body.is_patient_contacted
                }
                this.user_service.createFamily(family, (err: any, inserted_data: any) => {
                    if (err) {
                        internalServerError(err, res);
                    } else {
                        res.status(response_status_codes.success).json({
                            STATUS: 'SUCCESS',
                            MESSAGE: 'Family details added successfully',
                            DATA: { id: inserted_data.insertedId}
                        });
                    }
                });
        } else {
           
            insufficientParameter(res);
        }

    }
        
}