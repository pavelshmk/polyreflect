import { History } from "history";

export { RouterStore } from "mobx-react-router";
export { RootStore } from "./RootStore";
export { WalletStore } from './WalletStore';
export { Clock } from './Clock';

// @ts-ignore
export class HistoryStore implements History {}
