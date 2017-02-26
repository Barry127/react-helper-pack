# react-helper-pack
A collection of react helper functions.

## Install

```
npm install react-helper-pack
```

## Docs

#### bindMethods

_bindMethods (instance, [methods])_

 * **instance** Current React Component instance (usually this)
 * **methods** (optional) array of methods to bind. If none is given all methods will be bound

```javascript
import { bindMethods } from 'react-helper-pack';

class MyComponent extends Component {

  constructor () {
    super();
    bindMethods(this, ['onClick']);
  }

  dontBindThisMethod () {
    // ... this method will not be bound
  }

  onClick (ev) {
    // ...do something here
  }

  render () {
    // render component
  }
}
 ```

#### filterEvents

_filterEvents (props, [ignore])_

 * **props** A props object to filter react events
 * **ignore** (optional) array of events not to filter

```javascript
import { filterEvents } from 'react-helper-pack';

const props = {
  disabled: true,
  onClick: myOnClickFunction,
  onMouseUp: myMouseFunction
};

let events = filterEvents(props, ['onMouseUp']);

console.log(events);
// Returns:
// { onClick: myOnClickFunction }
```

## Changelog

### 0.1.2
 * Add build script should work fine now from npm

### 0.1.1

 * fix exporting
