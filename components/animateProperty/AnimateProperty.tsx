import React from 'react';
import { Transition } from 'react-transition-group';
import { EndHandler, EnterHandler, ExitHandler } from 'react-transition-group/Transition';

export class AnimateHeight extends React.PureComponent<{
  in?: boolean;
  enterTime: number;
  exitTime: number;
}> {
  get enterDuration() {
    return `${this.props.enterTime}ms`;
  }

  get exitDuration() {
    return `${this.props.exitTime}ms`;
  }

  onExit: ExitHandler = el => {
    // console.log('onExit');
    // @ts-ignore
    el.style.willChange = 'height, opacity';
    el.style.height = el.scrollHeight + 'px';
    el.style.opacity = '1';
    this.reflow(el);
  };

  onExiting: ExitHandler = el => {
    // console.log('onExiting');
    el.style.height = '0';
    el.style.opacity = '0';
    el.style.minHeight = '0';
    el.style.transition = `height ${this.exitDuration}, opacity ${this.exitDuration}`;
  };

  onExited: ExitHandler = el => {
    // console.log('onExited');
    el.style.height = '';
    el.style.opacity = '';
    el.style.transition = '';
    el.style.minHeight = '';
  };

  onEnter: EnterHandler = el => {
    // console.log('onEnter');
    // @ts-ignore
    el.style.willChange = 'height, opacity';
    el.style.height = '0';
    el.style.opacity = '0';
    el.style.minHeight = '0';
    this.reflow(el);
  };

  onEntering: EnterHandler = el => {
    // console.log('onEntering');
    el.style.height = el.scrollHeight + 'px';
    el.style.opacity = '1';
    el.style.transition = `height ${this.enterDuration}, opacity ${this.enterDuration}`;
  };

  onEntered: EnterHandler = el => {
    // console.log('onEntered');
    el.style.height = '';
    el.style.opacity = '';
    el.style.transition = '';
    el.style.minHeight = '';
  };

  addEndListener: EndHandler = (el, done) => {
    // console.log('addEndListener');
    el.addEventListener('transitionend', done, { once: true, passive: true });
  };

  render() {
    const { in: isIn, enterTime, exitTime } = this.props;

    // @ts-ignore
    const isBrowser = !process || !!process.browser;

    return (
      <Transition
        in={isIn}
        timeout={{ enter: enterTime, exit: exitTime }}
        onExit={this.onExit}
        onExiting={this.onExiting}
        onExited={this.onExited}
        onEnter={this.onEnter}
        onEntering={this.onEntering}
        onEntered={this.onEntered}
        addEndListener={this.addEndListener}
        unmountOnExit={isBrowser}
      >
        {() => this.props.children}
      </Transition>
    );
  }
  private reflow(el: HTMLElement): void {
    // @ts-ignore
    const _ignore = el.scrollTop;
    return;
  }
}
