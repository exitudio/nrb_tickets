import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import store from './redux/store'
import {Provider} from 'react-redux'

import Layout from './components/main/Layout.jsx'

import Async from 'react-code-splitting'

const AsyncHome = () => <Async load={import(/* webpackChunkName: "Home" */ './components/home/Home.jsx')} />
// import AsyncHome from './components/home/Home.jsx'
const AsyncNotFoundPage = () => <Async load={import(/* webpackChunkName: "Not_Found_Page" */ './components/main/notfoundpage/NotFoundPage.jsx')} />
// import AsyncNotFoundPage from './components/main/notfoundpage/NotFoundPage.jsx'

const app = document.getElementById('app')
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" name="home" component={AsyncHome} />
                    <Route path='*' component={AsyncNotFoundPage} />
                </Switch>
            </Layout>
        </BrowserRouter>
    </Provider>,
app)
