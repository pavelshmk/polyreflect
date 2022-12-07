import React  from 'react';
import { Router, Switch, Route } from "react-router-dom";
import { RootStore } from "./stores";
import { ToastContainer } from "react-toastify";
import { Provider } from "inversify-react";
import Main from "./pages/Main";
import Whitepaper from './pages/Whitepaper';
import CabinetPage from "./pages/CabinetPage";

export const rootStore = new RootStore();
const container = rootStore.container

class Application extends React.Component {
    componentDidMount() {
        // rootStore.walletStore.tryReconnect();
    }

    render() {
        return (
            <Provider container={container}>
                <Router history={rootStore.historyStore}>
                    <ToastContainer/>

                    <Switch>
                        <Route exact path='/' component={Main} />
                        <Route path='/whitepaper' component={Whitepaper} />
                        <Route path='/cabinet' component={CabinetPage} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default Application;
