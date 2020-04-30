import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import * as bearerToken from 'express-bearer-token';
import { UserRoutes } from "../routes/family.routes";
import environment from "../environment";
import { CommonRoutes } from "../routes/common.route";
class App {
   public app: express.Application;
   public mongoUrl: string = 'mongodb://localhost/' + environment.getDBName();

   private user_route: UserRoutes = new UserRoutes();
   private common_route: CommonRoutes = new CommonRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
      this.user_route.route(this.app);
      this.common_route.route(this.app);
   }

   private config(): void {
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
      // Add authentication
      this.app.use(bearerToken());

      // Add headers
      this.app.use(function (req, res, next) {
         // If request comes with the '/api' prefix, then have to remove it.
         if (req.url.substr(0, 4) === '/api') {
            req.url = req.url.substr(4);
         }
         // Pass th next layer of middleware
         next();
      });

   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
   }

}

export default new App().app;