import { Transfer, TransferProps } from 'antd';
import cx from 'classnames';
import React from 'react';
import { transferLabel } from '../tpls/transfer';
import type { StdCallback, TemplateCallback } from './types';

const CLASS_NAME = 'ac-transfer';

export type AcTransferProps = {
  className?: string;
  items?: any[];
  template: TemplateCallback;
  value?: any[];
  onChange?: StdCallback;
} & TransferProps<any>;

export class AcTransfer extends React.Component<AcTransferProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    items: [],
    template: transferLabel,
  };

  get templateCallback(): any {
    const { template } = this.props;
    return (item: any) => template({ item, index: -1 });
  }

  state = {
    value: this.props.value,
  };

  shouldComponentUpdate(nextProps: Readonly<AcTransferProps>): boolean {
    const { value } = nextProps;
    const isNewValue = this.props.value !== value;
    if (isNewValue && value !== this.state.value) {
      this.setState({ value });
    }
    return true;
  }

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    const target = { value: inEvent };
    this.setState(target, () => onChange?.({ target }));
  };

  render() {
    const { className, value, onChange, items, template, ...props } = this.props;

    const _value = this.state.value;

    return (
      <Transfer
        className={cx(CLASS_NAME, className)}
        dataSource={items}
        render={this.templateCallback}
        targetKeys={_value}
        rowKey={(item) => item.value}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}

export const AcTransferFc = (props: AcTransferProps) => {
  return <AcTransfer {...props} />;
};
