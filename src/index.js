import express from 'express';
import env from 'dotenv';

import middlewareLoader from './middlewares';
import routerLoader from './routers';

env.config();
const port = process.env.PORT

const app = express();
middlewareLoader(app);
routerLoader(app);

app.use('*', (req, res) => res.status(404).json({ message: 'Not found!' }));
app.use((req, res, next, err) => {
    if(err.status) return res.json({ message: err.message });
    console.log(JSON.stringify(err, null, 2));
    process.exit(0);
});

app.listen(port, () => {
    console.log(`server is up and running on http://localhost:${port}`);
});
