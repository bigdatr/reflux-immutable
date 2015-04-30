reflux-immutable
===================

## Install

```sh
npm install reflux-immutable --save
```

## Useage

##### MyStore.js
```js

var Reflux = require('reflux');
var ImmutableStoreMixin = require('reflux-immutable/ImmutableStoreMixin');

var SomeActions = require('./SomeActions');

var MyStore = Reflux.createStore({
    listenables: SomeActions,
    mixins: [
        ImmutableStoreMixin
    ],
    init: function() {
        this.setState({
            message: 'Initial Value'
        });
    },
    onMyAction: function() {
        this.setState({
            message: 'myAction has been triggered!'
        });
    }
});

module.exports = MyStore;

```

##### MyComponent.js
```js

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var Reflux = require('reflux');
var StoreMixin = require('reflux-immutable/StoreMixin');

var MyStore = require('./MyStore');

var MyComponent = React.createClass({
    displayName: 'MyComponent',
    mixins: [
        PureRenderMixin,
        StoreMixin,
        Reflux.listenTo(MyStore, 'onStoreChange')
    ],
    getStoreState: function() {
        return {
            message: MyStore.get('message')
        };
    },
    render: function() {
        return (
            <div>
                message = {this.state.message}
            </div>
        );
    }
});

```