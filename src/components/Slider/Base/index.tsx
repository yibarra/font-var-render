import React from 'react';

// Slider HOC
export default function SliderBase(Component: any) {
  // base
  const base: any = class extends React.Component {
    // constructor
    constructor (props: any) {
      super(props);

      this.state = {
        direction: 'none',
        current: 0,
        last: undefined,
      };

      this.onPrevNext = this.onPrevNext.bind(this);
      this.setCurrent = this.setCurrent.bind(this);
    }

    // component did mount
    componentDidMount() {
      const { items }: any = this.props;

      this.setState({
        items,
      });
    }

    // set current
    setCurrent (index: number) {
      if (isNaN(index) === true) return false;

      const { current }: any = this.state;

      this.setState({
        last: current,
        direction: (index > current) ? 'prev' : 'next',
        current: index,
      });
    }

    // on prev next
    onPrevNext (dir: string) {
      let index;
      const { current }: any = this.state;
      const { items }: any = this.props;

      if (dir === 'prev') {
        index = (current - 1) < 0 ? items.length - 1 : current - 1;
      } else {
        index = (current + 1) >= items.length ? 0 : current + 1;
      }
      
      this.setState({
        last: current,
        current: index,
        direction: dir,
      });
    }

    // render
    render () {
      return (
        <Component
          {...this.state}
          {...this.props}
          onPrevNext={this.onPrevNext}
          setCurrent={this.setCurrent}
        />
      );
    }
  };

  base.displayName = `SliderBase(${Component.displayName || Component.name})`;

  return base;
};
