import { Application, Request, Response } from 'express';

export class CommonRoutes {
    public route(app: Application) {

        app.get('/checkalive/:key', (req: Request, res: Response) => {
            const key = 'covid-counter';
            if (req.params.key === key) {
                res.json({
                    STATUS: 'SUCCESS',
                    MESSAGE: 'ALIVE'
                });
            }
        });
        
        // default route
        app.get('/', function (req: Request, res: Response) {
            res.status(200).send({ error: true, message: 'Hi..!' });
        });

        // Mismatch URL
        app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ error: true, message: 'Check your URL please' });
        });


    }
}
