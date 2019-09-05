import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import{ Provider } from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import withRedux from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga';
import withReduxSaga from 'next-redux-saga' //사가환경 ssr사용하기위한거
import axios from 'axios'

import {LOAD_USER_REQUEST} from '../reducers/user'
import AppLayout from '../components/AppLayout';
import reducer from '../reducers'
import rootSaga from '../sagas';



const NodeBird = ({Component, store, pageProps})=>{
    return(
        <Provider store = {store}>  
            <Head>
                <title>nodebird</title>
                <link rel = 'stylesheet' href = 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css' />
                <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <AppLayout>
            
                <Component {...pageProps}/>
            </AppLayout>
        </Provider>
    )
}

NodeBird.propTypes = {
    Component : PropTypes.elementType,
    store : PropTypes.object,
    pageProps: PropTypes.object.isRequired
}

NodeBird.getInitialProps = async(context)=>{
    const {ctx, Component} = context
    let pageProps = {}
    const state = ctx.store.getState()
    const cookie = ctx.isServer? ctx.req.headers.cookie:''
    // const token = ctx.req.headers.Authorization 

    if(ctx.isServer && cookie){
        axios.defaults.headers.Cookie = cookie;
        //axios.defaults.headers.Authorization = token
    }
    
    if(!state.user.me){
        ctx.store.dispatch({
            type:LOAD_USER_REQUEST    
        })
    }
    if(Component.getInitialProps){
        pageProps = await Component.getInitialProps(ctx)
    }
    
    return {pageProps}
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
    store.sagaTask = sagaMiddleware.run(rootSaga)
    return store;
})(withReduxSaga(NodeBird));//hoc라고도하고 nodebird의 기능 확장