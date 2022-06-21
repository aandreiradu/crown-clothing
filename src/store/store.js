import {compose,createStore,applyMiddleware} from 'redux';
import { persistStore,persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {loggerMiddleware} from './middleware/logger';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
// thunk section
// import thunk from 'redux-thunk';

// saga section
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga';


const sagaMiddleware = createSagaMiddleware();

// with thunk
// const middleWares = [process.env.NODE_ENV === 'development' &&  logger,thunk].filter(Boolean);

// with saga
const middleWares = [process.env.NODE_ENV === 'development' &&  logger,sagaMiddleware].filter(Boolean);


const persistConfig = { 
    key: 'root', 
    storage,
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig,rootReducer);

const composedEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||  compose

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

// export const store = createStore(rootReducer,undefined,composedEnhancers);
export const store = createStore(persistedReducer,undefined,composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);