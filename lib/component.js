import { Events } from './events';
import { Render } from '../index';
import { Utils } from './utils';

class Component {
  constructor() {
    // init state
    this.state = {};

    if (!this.guid) {
      // guids on ast are generated by transform
      // build incase component is classed, and not used as JSX
      // we'll put a guid on it
      this.guid = Utils.guid();
    }

    // set props
    this.setProps = (props, cb) => {
      let newProps = merge(this.props, props);

      // set props of this component
      if (this.componentWillReceiveProps) {
        this.componentWillReceiveProps.call(this, newProps);
      }
      this.props = newProps;

      // fire callback for setProps if one was passed
      if (cb) {
        cb();
      }
    };

    // set state
    this.setState = (state, cb) => {
      this.state = merge(this.state, state);
      // send updated AST to raster
      this.render ? Render(this) : '';

      if (cb) {
        cb();
      }
    };
  }
}

// utility function to deep clone/merge
function merge(a, b) {
  const c = Object.assign({}, a, b);
  return c;
}

// export component
export { Component };
