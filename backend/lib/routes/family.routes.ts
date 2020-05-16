import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import * as cors from 'cors';

export class UserRoutes {

    private user_controller : UserController = new UserController();

    public route(app: Application) {
        app.use(cors());
        app.post('/family/details', (req: Request, res: Response) => {
            this.user_controller.create_family_details(req, res);
        })
    }
}