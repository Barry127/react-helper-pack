export const reactComponentMethods = [
  'constructor',
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
  'render',
  'setState',
  'forceUpdate'
];

export default function bindMethods (instance, methods) {
  if (typeof instance !== 'object') {
    throw new TypeError('[react-helper-pack]: bindMethods: Argument instance must be of type object');
  }

  if (methods === undefined) {
    methods = [];
    for( const property of Object.getOwnPropertyNames(Object.getPrototypeOf(instance))) {
      if (typeof instance[property] === 'function') {
        methods.push(property);
      }
    }
  } else if (typeof methods === 'string') {
    methods = [ methods ];
  } else if (!Array.isArray(methods)) {
    throw new TypeError('[react-helper-pack]: bindMethods: Argument methods must be of type array or string');
  }

  methods
    .filter(method => reactComponentMethods.indexOf(method) === -1)
    .forEach(method => {
      if (typeof instance[method] !== 'function') {
        throw new TypeError(`[react-helper-pack]: bindMethods: Expected ${method} to be a function`);
      }
      instance[method] = instance[method].bind(instance)
    });
}
