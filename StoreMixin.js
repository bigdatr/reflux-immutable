var StoreMixin = {
    getInitialState: function() {
        if (!this.getStoreState) {
            var err = new Error('Require `getStoreState()` when using `StoreMixin`');
            console.warn(err.stack);
        }

        return this.getStoreState();
    },
    componentDidMount: function() {
        // Make sure state is up-to-date
        this.onStoreChange();
    },
    onStoreChange: function() {
        if (this.isMounted()) {
            this.setState(this.getStoreState());
        }
    }
};

module.exports = StoreMixin;
