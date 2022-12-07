import * as stores from './';
import { createBrowserHistory, History } from "history";
import { syncHistoryWithStore } from "mobx-react-router";
import { wrapHistory } from "oaf-react-router";
import { Container } from 'inversify';

export class RootStore {
    public historyStore: History;
    public routerStore: stores.RouterStore;
    public walletStore: stores.WalletStore;
    public clock: stores.Clock;

    public container: Container;

    public constructor() {
        const browserHistory = createBrowserHistory();
        wrapHistory(browserHistory, {
            smoothScroll: true,
            primaryFocusTarget: 'body',
        });

        this.routerStore = new stores.RouterStore();
        this.historyStore = syncHistoryWithStore(browserHistory, this.routerStore);
        this.clock = new stores.Clock();
        this.walletStore = new stores.WalletStore(this);

        this.container = new Container();
        this.container.bind(stores.RouterStore).toConstantValue(this.routerStore);
        this.container.bind(stores.HistoryStore).toConstantValue(this.historyStore);
        this.container.bind(stores.WalletStore).toConstantValue(this.walletStore);
        this.container.bind(stores.Clock).toConstantValue(this.clock);
    }
}
