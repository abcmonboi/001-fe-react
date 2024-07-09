import { createStore, applyMiddleware  } from 'redux';
import {thunk} from 'redux-thunk'
import rootReducer from './reducers/rootReducer';
import {persistStore} from "redux-persist";

const reduxStore = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk));// thực hiện bất đồng bộ
    const persistor = persistStore(store);
    return {store, persistor};
}

export default reduxStore;