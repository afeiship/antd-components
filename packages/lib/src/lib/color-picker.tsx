import { ColorPicker, ColorPickerProps } from 'antd';
import cx from 'classnames';
import React from 'react';
import type { StdCallback } from './types';

const CLASS_NAME = 'ac-color-picker';

export type AcColorPickerProps = {
  className?: string;
  value?: string;
  onChange?: StdCallback<string>;
} & Omit<ColorPickerProps, 'value' | 'onChange'>;

export class AcColorPicker extends React.Component<AcColorPickerProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {};

  state = { value: this.props.value };

  shouldComponentUpdate(inProps: Readonly<AcColorPickerProps>): boolean {
    const { value } = inProps;
    if (value !== this.props.value) this.setState({ value });
    return true;
  }

  handleChange = (inColor) => {
    const { onChange } = this.props;
    const value = inColor ? inColor.toHexString() : '';
    const target = { value };
    this.setState({ value });
    onChange!({ target });
  };

  handleClear = () => {
    const { onChange } = this.props;
    const target = { value: '' };
    this.setState({ value: '' });
    onChange?.({ target });
  };

  render() {
    const { className, value, onChange, onClear, ...props } = this.props;
    const { value: stateValue } = this.state;

    return (
      <ColorPicker
        className={cx(CLASS_NAME, className)}
        value={stateValue || undefined}
        onChange={this.handleChange}
        onClear={this.handleClear}
        {...props}
      />
    );
  }
}

export const AcColorPickerFc = (props: AcColorPickerProps) => {
  return <AcColorPicker {...props} />;
};
