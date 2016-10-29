import { expect } from 'chai';
import filterEvents from './filterEvents';

describe('filterEvents', () => {
  let props = {};

  beforeEach(() => {
    props = {
      className: 'my-component',
      disabled: true,
      onBlur: 'onBlur-event',
      onClick: 'onClick-event',
      onKeyPress: 'onKeyPress-event',
      onMouseUp: 'onMouseUp-event'
    };
  });

  it('returns an object containing all given synthetic events from props', () => {
    const expected = {
      onBlur: 'onBlur-event',
      onClick: 'onClick-event',
      onKeyPress: 'onKeyPress-event',
      onMouseUp: 'onMouseUp-event'
    };

    expect(filterEvents(props)).to.eql(expected);
  });

  it('does not return the events defined in the ignore argument array', () => {
    const expected = {
      'onBlur': 'onBlur-event',
      'onMouseUp': 'onMouseUp-event'
    };

    const ignore = ['onClick', 'onKeyPress'];

    expect(filterEvents(props, ignore)).to.eql(expected);
  });

  it('does not return the event defined in the ingnore argument string', () => {
    const expected = {
      'onBlur': 'onBlur-event',
      'onClick': 'onClick-event',
      'onMouseUp': 'onMouseUp-event'
    };

    const ignore = 'onKeyPress';

    expect(filterEvents(props, ignore)).to.eql(expected);
  });

  it('throws a TypeError if the props argument is not of type object', () => {
    const props = undefined;
    expect(filterEvents.bind(null, props)).to.throw(TypeError);
  });

  it('throws a TypeError if the ignore argument is not of type array or string', () => {
    const ignore = true;
    expect(filterEvents.bind(null, props, ignore)).to.throw(TypeError);
  });

});
