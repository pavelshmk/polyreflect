import { createAtom, IAtom } from "mobx";
import { DateTime } from "luxon";

export class Clock {
    atom: IAtom;
    intervalHandler = null
    currentDateTime: DateTime;

    constructor() {
        // Creates an atom to interact with the MobX core algorithm.
        this.atom = createAtom(
            // 1st parameter:
            // - Atom's name, for debugging purposes.
            "Clock",
            // 2nd (optional) parameter:
            // - Callback for when this atom transitions from unobserved to observed.
            () => this.startTicking(),
            // 3rd (optional) parameter:
            // - Callback for when this atom transitions from observed to unobserved.
            () => this.stopTicking()
            // The same atom transitions between these two states multiple times.
        )
    }

    getTime() {
        // Let MobX know this observable data source has been used.
        //
        // reportObserved will return true if the atom is currently being observed
        // by some reaction. If needed, it will also trigger the startTicking
        // onBecomeObserved event handler.
        if (this.atom.reportObserved()) {
            return this.currentDateTime
        } else {
            // getTime was called, but not while a reaction was running, hence
            // nobody depends on this value, and the startTicking onBecomeObserved
            // handler won't be fired.
            //
            // Depending on the nature of your atom it might behave differently
            // in such circumstances, like throwing an error, returning a default
            // value, etc.
            return DateTime.utc();
        }
    }

    tick() {
        this.currentDateTime = DateTime.utc()
        this.atom.reportChanged() // Let MobX know that this data source has changed.
    }

    startTicking() {
        this.tick() // Initial tick.
        this.intervalHandler = setInterval(() => this.tick(), 1000)
    }

    stopTicking() {
        clearInterval(this.intervalHandler)
        this.intervalHandler = null
    }
}
