import { Typography } from 'antd';
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
    const { onChange, ...rest } = this.props;
    return <AcInput onChange={this.handleInputChange} {...rest} addonAfter={this.copyView} />;
  }
}

export const AcInputCopyableFc = (props: AcInputProps) => {
  return <AcInputCopyable {...props} />;
};
