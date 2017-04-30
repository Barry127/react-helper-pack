export const eventsList = [
  // Clipboard Events
  'onCopy',
  'onCut',
  'onPaste',

  // Composition Events
  'onCompositionEnd',
  'onCompositionStart',
  'onCompositionUpdate',

  // Keyboard Events
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',

  // Focus Events
  'onFocus',
  'onBlur',

  // Form Events
  'onChange',
  'onInput',
  'onSubmit',

  // Mouse Events
  'onClick',
  'onContextMenu',
  'onDoubleClick',
  'onDrag',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',

  // Selection Events
  'onSelect',

  // Touch Events
  'onTouchCancel',
  'onTouchEnd',
  'onTouchMove',
  'onTouchStart',

  // UI Events
  'onScroll',

  // Wheel Events
  'onWheel',

  // Media Events
  'onAbort',
  'onCanPlay',
  'onCanPlayThrough',
  'onDurationChange',
  'onEmptied',
  'onEncrypted',
  'onEnded',
  'onError',
  'onLoadedData',
  'onLoadedMetadata',
  'onLoadStart',
  'onPause',
  'onPlay',
  'onPlaying',
  'onProgress',
  'onRateChange',
  'onSeeked',
  'onSeeking',
  'onStalled',
  'onSuspend',
  'onTimeUpdate',
  'onVolumeChange',
  'onWaiting',

  // Image Events
  'onLoad',
  'onError',

  // Animation Events
  'onAnimationStart',
  'onAnimationEnd',
  'onAnimationIteration',

  // Transition Events
  'onTransitionEnd'
];

export default function filterEvents (props, ignore = []) {
  if (typeof props !== 'object') {
    throw new TypeError('[react-helper-pack]: filterEvents: Argument props must be type object');
  }

  if (typeof ignore === 'string') {
    ignore = [ignore];
  }

  if (!Array.isArray(ignore)) {
    throw new TypeError('[react-helper-pack]: filterEvents: Argument ignore must be of type array or string');
  }

  let events = {};

  for (let property in props) {
    if (
      props.hasOwnProperty(property) &&
      eventsList.indexOf(property) !== -1 &&
      ignore.indexOf(property) === -1
    ) {
      events[property] = props[property]
    }
  }

  return events;
}
