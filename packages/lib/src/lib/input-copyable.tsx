import { LinkOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import cx from 'classnames';
import React from 'react';
import { AcInput, AcInputProps } from './input';

const CLASS_NAME = 'ac-input-copyable';

export type AcInputCopyableValueType = 'text' | 'link';

export interface AcInputCopyableProps extends AcInputProps {
  valueType?: AcInputCopyableValueType;
}

interface AcInputCopyableState {
  value?: string;
}

export class AcInputCopyable extends React.Component<AcInputCopyableProps, AcInputCopyableState> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    valueType: 'text',
  };

  constructor(props: AcInputCopyableProps) {
    super(props);
    this.state = {
      value: String(props.value || ''),
    };
  }

  get copyView() {
    const { value } = this.state;
    return <Typography.Text copyable={{ text: String(value) }} />;
  }

  get linkView() {
    const { value } = this.state;
    if (!value) return null;
    return (
      <LinkOutlined
        onClick={() => window.open(String(value), '_blank')}
        style={{ cursor: 'pointer', fontSize: 14 }}
      />
    );
  }

  shouldComponentUpdate(props: Readonly<AcInputProps>): boolean {
    const { value } = props;
    if (value !== this.props.value) this.setState({ value: String(value ?? '') });
    return true;
  }

  handleInputChange = (e) => {
    const { onChange } = this.props;
    const { value } = e.target;
    this.setState({ value });
    onChange?.(e);
  };

  render() {
    const { onChange, className, valueType = 'text', ...rest } = this.props;

    return (
      <Space.Compact className={cx(CLASS_NAME, className)}>
        <AcInput onChange={this.handleInputChange} {...rest} />
        <Space.Addon>{this.copyView}</Space.Addon>
        {valueType === 'link' && <Space.Addon>{this.linkView}</Space.Addon>}
      </Space.Compact>
    );
  }
}

export const AcInputCopyableFc = (props: AcInputCopyableProps) => {
  return <AcInputCopyable {...props} />;
};
