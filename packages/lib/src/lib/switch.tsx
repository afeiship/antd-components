import { Switch, SwitchProps } from 'antd';
import cx from 'classnames';
import React from 'react';
import type { StdCallback, StdEventTarget } from './types';

const CLASS_NAME = 'ac-switch';

export type AcSwitchProps = {
  className?: string;
  value?: boolean;
  onChange?: StdCallback;
} & SwitchProps;

export class AcSwitch extends React.Component<AcSwitchProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {};

  state = {
    value: Boolean(this.props.value),
  };

  shouldComponentUpdate(nextProps: Readonly<AcSwitchProps>): boolean {
    const { value } = nextProps;
    if (value !== this.props.value) this.setState({ value });
    return true;
  }

  handleChange = (value) => {
    const { onChange } = this.props;
    const target = { value };
    this.setState(target, () => onChange?.({ target }));
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    const _value = this.state.value;

    return (
      <Switch
        checked={_value}
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}

export const AcSwitchFc = React.forwardRef<AcSwitch, AcSwitchProps>((props, ref) => {
  return <AcSwitch {...props} ref={ref} />;
});
