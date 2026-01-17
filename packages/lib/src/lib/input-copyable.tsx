import { Space, Typography } from 'antd';
import cx from 'classnames';
import { ValueType } from 'rc-input/lib/interface';
import React from 'react';
import { AcInput, AcInputProps } from './input';

const CLASS_NAME = 'ac-input-copyable';

interface AcInputCopyableState {
  value?: ValueType;
}

export class AcInputCopyable extends React.Component<AcInputProps, AcInputCopyableState> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }

  get copyView() {
    const { value } = this.state;
    return <Typography.Text copyable={{ text: String(value) }} />;
  }

  shouldComponentUpdate(props: Readonly<AcInputProps>): boolean {
    const { value } = props;
    if (value !== this.props.value) this.setState({ value });
    return true;
  }

  handleInputChange = (e) => {
    const { onChange } = this.props;
    const { value } = e.target;
    this.setState({ value });
    onChange?.(e);
  };

  render() {
    const { onChange, className, ...rest } = this.props;
    return (
      <Space.Compact className={cx(CLASS_NAME, className)}>
        <AcInput onChange={this.handleInputChange} {...rest} />
        <Space.Addon>{this.copyView}</Space.Addon>
      </Space.Compact>
    );
  }
}

export const AcInputCopyableFc = (props: AcInputProps) => {
  return <AcInputCopyable {...props} />;
};
