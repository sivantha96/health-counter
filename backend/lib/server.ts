import app from "./config/app";
import environment from "./environment";

app.listen(environment.getPort(), () => {
   console.log('Express server listening on port ' + environment.getPort());
})