import { expect } from 'chai';
import bindMethods from './bindMethods';

describe('bindMethods', () => {

  class Component {

    constructor () {
      this.myValue = 'myValue';
    }

  }

  function makeMyComponent (constructor) {
    class MyComponent extends Component {

      constructor () {
        super();
        constructor.apply(this);
      }

      componentDidMount () {
        return this.myValue;
      }

      componentWillUnmount () {
        return this.myValue;
      }

      customMethod1 () {
        return this.myValue;
      }

      customMethod2 () {
        return this.myValue;
      }

      customMethod3 () {
        return this.myValue;
      }

      render () {
        return this.myValue;
      }

    }

    return MyComponent;
  }

  it('binds all methods if no methods argument is passed', () => {
    const MyComponent = makeMyComponent(function () {
      bindMethods(this);
    });

    const instance = new MyComponent();
    const customMethod1 = instance.customMethod1;
    const customMethod2 = instance.customMethod2;
    const customMethod3 = instance.customMethod3;

    expect(customMethod1()).to.equal('myValue');
    expect(customMethod2()).to.equal('myValue');
    expect(customMethod3()).to.equal('myValue');
  });

  it('binds only the given method as string', () => {
    const MyComponent = makeMyComponent(function () {
      bindMethods(this, 'customMethod1');
    });

    const instance = new MyComponent();
    const customMethod1 = instance.customMethod1;
    const customMethod2 = instance.customMethod2;
    const customMethod3 = instance.customMethod3;

    expect(customMethod1()).to.equal('myValue');
    expect(customMethod2).to.throw(TypeError, /Cannot read property 'myValue'/);
    expect(customMethod3).to.throw(TypeError, /Cannot read property 'myValue'/);
  });

  it('binds only the given methods as array', () => {
    const MyComponent = makeMyComponent(function () {
      bindMethods(this, [
        'customMethod2',
        'customMethod3'
      ]);
    });

    const instance = new MyComponent();
    const customMethod1 = instance.customMethod1;
    const customMethod2 = instance.customMethod2;
    const customMethod3 = instance.customMethod3;

    expect(customMethod1).to.throw(TypeError, /Cannot read property 'myValue'/);
    expect(customMethod2()).to.equal('myValue');
    expect(customMethod3()).to.equal('myValue');
  });

  it('does not bind React Component methods', () => {

    const MyComponent1 = makeMyComponent(function () {
      bindMethods(this);
    });

    const MyComponent2 = makeMyComponent(function () {
      bindMethods(this, [
        'constructor',
        'customMethod1',
        'render'
      ]);
    });

    const instance1 = new MyComponent1();
    const instance2 = new MyComponent2();

    const instance1ComponentDidMount = instance1.componentDidMount;
    const instance1ComponentWillUnmount = instance1.componentWillUnmount;
    const instance1CustomMethod1 = instance1.customMethod1;
    const instance1CustomMethod2 = instance1.customMethod2;
    const instance1CustomMethod3 = instance1.customMethod3;
    const instance1Render = instance1.render;

    const instance2ComponentDidMount = instance2.componentDidMount;
    const instance2ComponentWillUnmount = instance2.componentWillUnmount;
    const instance2CustomMethod1 = instance2.customMethod1;
    const instance2CustomMethod2 = instance2.customMethod2;
    const instance2CustomMethod3 = instance2.customMethod3;
    const instance2Render = instance2.render;

    expect(instance1ComponentDidMount).to.throw(TypeError, /Cannot read property 'myValue'/);
    expect(instance1ComponentWillUnmount).to.throw(TypeError, /Cannot read property 'myValue'/);
    expect(instance1CustomMethod1()).to.equal('myValue');
    expect(instance1CustomMethod2()).to.equal('myValue');
    expect(instance1CustomMethod3()).to.equal('myValue');
    expect(instance1Render).to.throw(TypeError, /Cannot read property 'myValue'/);

    expect(instance2ComponentDidMount).to.throw(TypeError, /Cannot read property 'myValue'/);
    expect(instance2ComponentWillUnmount).to.throw(TypeError, /Cannot read property 'myValue'/);
    expect(instance2CustomMethod1()).to.equal('myValue');
    expect(instance2CustomMethod2).to.throw(TypeError, /Cannot read property 'myValue'/);
    expect(instance2CustomMethod3).to.throw(TypeError, /Cannot read property 'myValue'/);
    expect(instance2Render).to.throw(TypeError, /Cannot read property 'myValue'/);

  });

  it('throws a TypeError if the component instance is not an object', () => {
    const MyComponent = makeMyComponent(function () {
      bindMethods('this');
    });

    function makeInstance () {
      return new MyComponent();
    }

    expect(makeInstance).to.throws(TypeError);
  });

  it('throws a TypeError if the methods argument is not of type array or string', () => {
    const MyComponent = makeMyComponent(function () {
      bindMethods(this, 5);
    });

    function makeInstance () {
      return new MyComponent();
    }

    expect(makeInstance).to.throws(TypeError);
  });

  it('throws a TypeError if a passed method is not a function on passed instance', () => {
    const MyComponent = makeMyComponent(function () {
      bindMethods(this, [
        'customMethod1',
        'thisMethodDoesNotExist'
      ]);
    });

    function makeInstance () {
      return new MyComponent();
    }

    expect(makeInstance).to.throws(TypeError);
  });

});
