import App from './app/app';
import { config } from './appConfig';
import * as css from './styles/index.css'

const app = new App();
app.start(config);
