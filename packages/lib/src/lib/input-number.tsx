import { InputNumber, InputNumberProps } from 'antd';
import cx from 'classnames';
import React from 'react';
import type { StdCallback, StdEventTarget } from './types';

const CLASS_NAME = 'ac-input-number';

export type AcInputNumberProps = {
  className?: string;
  value?: number;
  onChange?: StdCallback;
} & InputNumberProps;

export class AcInputNumber extends React.Component<AcInputNumberProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {};

  state = {
    value: this.props.value,
  };

  shouldComponentUpdate(inProps: Readonly<AcInputNumberProps>): boolean {
    const { value } = inProps;
    if (value !== this.props.value) this.setState({ value });
    return true;
  }

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    const target = { value: inEvent };
    this.setState(target);
    onChange?.({ target });
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    const { value: stateValue } = this.state;
    return (
      <InputNumber
        className={cx(CLASS_NAME, className)}
        value={stateValue}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}

export const AcInputNumberFc = (props: AcInputNumberProps) => {
  return <AcInputNumber {...props} />;
};
