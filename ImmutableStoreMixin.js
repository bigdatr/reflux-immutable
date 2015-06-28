var Immutable = require('immutable');
var _localStorage = require('./lib/localStorage');

var ImmutableStoreMixin = {
    state: Immutable.Map(),
    init: function() {
        // Update state with cached data
        this.setState(this._getCachedState(), false);
    },
    setState: function(nextState, triggerUpdate) {
        if (!nextState) {
            return null;
        }

    	var _targetState = this.state.merge(nextState);

    	if (_targetState !== this.state) {
    		this.state = _targetState;

            if (triggerUpdate !== false) {
                this.trigger();
                this._updateLocalStorage();
            }
    	}
    },
    get: function(key) {
        if (this.onFirstRequest && !this._ImmutableStoreMixinRequested) {
            this._ImmutableStoreMixinRequested = true;
            this.onFirstRequest();
        }

		return this.state.get(key);
    },
    _updateLocalStorage: function() {
        if (!this.localStorageKey) {
            // Don't save state unless we need too
            return null;
        }

        var _stateString;

        if (this.stateToString) {
            // Custom conversion to string
            _stateString = this.stateToString(this.state);

            if (!_stateString) {
                var err = new Error('`stateToString()` must return a valid JSON string');
                console.warn(err.stack);
                return null;
            }
        }
        else {
            _stateString = JSON.stringify(this.state.toJS());
        }

        _localStorage.setItem(this.localStorageKey, _stateString);
    },
    _getCachedState: function() {
        if (!this.localStorageKey) {
            // Don't get state unless we need too
            return null;
        }

        var _stateString = _localStorage.getItem(this.localStorageKey);

        if (!_stateString || _stateString === '') {
            return null;
        }

        var _cachedState;

        if (this.stateFromString) {
            _cachedState = this.stateFromString(_stateString);

            if (!_cachedState) {
                var err = new Error('`stateFromString()` must return a Immutable.Map');
                console.warn(err.stack);
                return null;
            }
        }
        else {
            var _cachedJSON = JSON.parse(_stateString);
            _cachedState = Immutable.fromJS(_cachedJSON);
        }

        return _cachedState;
    }
};

module.exports = ImmutableStoreMixin;
