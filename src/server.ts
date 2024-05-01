import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { ValidateEnv } from '@utils/validateEnv';
import { ProductRoute } from './routes/products.route';

ValidateEnv();

const app = new App([new ProductRoute()]);

app.listen();
