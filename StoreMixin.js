var StoreMixin = {
    getInitialState: function() {
        if (!this.getStoreState) {
            var err = new Error('Require `getStoreState()` when using `StoreMixin`');
            console.warn(err.stack);
        }

        return this.getStoreState();
    },
    componentDidMount: function() {
        this._isMounted = true;

        // Make sure state is up-to-date
        this.onStoreChange();
    },
    onStoreChange: function() {
        if (this._isMounted) {
            this.setState(this.getStoreState());
        }
    },
    componentWillUnmount: function() {
        this._isMounted = false;
    },
};

module.exports = StoreMixin;
