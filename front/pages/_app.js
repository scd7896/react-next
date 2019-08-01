import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import{ Provider } from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import withRedux from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga';

import AppLayout from '../components/AppLayout';
import reducer from '../reducers'
import rootSaga from '../sagas';


const NodeBird = ({Component, store})=>{
    return(
        <Provider store = {store}>  
            <Head>
                <title>nodebird</title>
                <link rel = 'stylesheet' href = 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css' />
            </Head>
            <AppLayout>
                <Component />
            </AppLayout>
        </Provider>
    )
}

NodeBird.propTypes = {
    Component : PropTypes.elementType,
    store : PropTypes.object
}
export default withRedux((initalState, options)=>{ //next에서 리덕스 사용방식
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware]; //넣고싶은 미들웨어 있으면 넣으면됨.
    const enhancer = process.env.NODE_ENV ==='production'?
     compose(applyMiddleware(...middlewares)) :
     compose(applyMiddleware(...middlewares),
    !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? 
        window.__REDUX_DEVTOOLS_EXTENSION__() :(f)=>f)
        
    const store = createStore(reducer, initalState, enhancer);
    sagaMiddleware.run(rootSaga)
    return store;
})(NodeBird);//hoc라고도하고 nodebird의 기능 확장