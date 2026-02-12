import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Input, InputProps, Space } from 'antd';
import cx from 'classnames';
import { nanoid } from 'nanoid';
import React from 'react';
import type { StdCallback } from './types';

const CLASS_NAME = 'ac-input-token';

export type AcInputTokenProps = {
  className?: string;
  value?: string;
  onChange?: StdCallback;
  autoComplete?: boolean;
  labelCreate?: string;
  labelRemove?: string;
} & InputProps;

export class AcInputToken extends React.Component<AcInputTokenProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    autoComplete: false,
    labelCreate: '生成Token',
    labelRemove: '去掉Token',
  };

  private rootRef = React.createRef<any>();
  state = { value: this.props.value };

  shouldComponentUpdate(nextProps: Readonly<AcInputTokenProps>): boolean {
    const { value } = nextProps;
    if (value !== this.props.value) this.setState({ value });
    return true;
  }

  get complete() {
    return this.props.autoComplete ? 'on' : 'off';
  }

  get tokenView() {
    const { labelCreate, labelRemove } = this.props;
    return (
      <Space.Compact>
        <Button
          size="small"
          icon={<LockOutlined />}
          className={`${CLASS_NAME}__action`}
          onClick={this.handleTokenCreate}>
          {labelCreate}
        </Button>
        <Button
          size="small"
          icon={<UnlockOutlined />}
          className={`${CLASS_NAME}__action`}
          onClick={this.handleTokenRemove}>
          {labelRemove}
        </Button>
      </Space.Compact>
    );
  }

  handleTokenCreate = () => {
    this.doChange(nanoid());
  };

  handleTokenRemove = () => {
    this.doChange('');
  };

  handleChange = (inEvent) => {
    const { value } = inEvent.target;
    this.doChange(value);
    this.rootRef.current.input.focus();
  };

  doChange = (inValue) => {
    const { onChange } = this.props;
    const target = { value: inValue };
    this.setState(target);
    onChange?.({ target });
  };

  render() {
    const { className, value, autoComplete, onChange, labelCreate, labelRemove, ...props } =
      this.props;

    return (
      <Space.Compact className={cx(CLASS_NAME, className)}>
        <Input
          ref={this.rootRef}
          value={this.state.value}
          onChange={this.handleChange}
          className={cx(CLASS_NAME, className)}
          autoComplete={this.complete}
          {...props}
        />
        <Space.Addon>{this.tokenView}</Space.Addon>
      </Space.Compact>
    );
  }
}

export const AcInputTokenFc = (props: AcInputTokenProps) => {
  return <AcInputToken {...props} />;
};
