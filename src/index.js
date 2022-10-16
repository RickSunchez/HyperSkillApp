import App from './app/app';
import { config } from './app/params/config';
import { configTest } from './app/params/configTest';
import * as css from './styles/index.css'


const app = new App(config);
app.start();
