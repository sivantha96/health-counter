import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import * as cors from 'cors';

export class PersonRoutes {

    private user_controller : UserController = new UserController();

    public route(app: Application) {
        app.use(cors());
        app.post('/person/details', (req: Request, res: Response) => {
            this.user_controller.save_person_details(req, res);
        })
    }
}