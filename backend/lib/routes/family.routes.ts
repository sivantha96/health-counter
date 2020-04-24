import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';

export class UserRoutes {

    private user_controller : UserController = new UserController();

    public route(app: Application) {
        app.post('/family/details', (req: Request, res: Response) => {
            this.user_controller.create_family_details(req, res);
        })
    }
}