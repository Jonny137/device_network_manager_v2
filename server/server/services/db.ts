import mongoose from 'mongoose';
import logger from './logger';

const dbOptions: object = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
};

mongoose.connection.on('error', (err: any) =>
    logger.error('Mongoose error:', err)
);

mongoose.connection.on('connected', () =>
    logger.info('Connection to DB established successfully')
);

mongoose.Promise = global.Promise;

export default () => {
    mongoose.connect(process.env.MONGO_URI || '', dbOptions);
};
