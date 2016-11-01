# react-helper-pack
A collection of react helper functions.

## Install

```
npm install react-helper-pack
```

## Docs

#### filterEvents

_filterEvents([props], [ignore])_

 * **props** A props object to filter react events
 * **ignore** (optional) array of events not to filter

```
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

### 0.1.1

 * fix exporting
