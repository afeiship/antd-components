import ReactList from '@jswork/react-list';
import { Select, SelectProps } from 'antd';
import cx from 'classnames';
import React from 'react';
import { kv as KvTmpl, selectKv } from '../tpls/kv';

const CLASS_NAME = 'ac-select';
const DEFAULT_KV = {
  label: 'label',
  value: 'value',
};

type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;
type TemplateCallback = (item: { item: any; index: number }) => React.ReactNode;

export type AcSelectProps = {
  className?: string;
  items?: any[];
  kv?: Record<string, string>;
  onChange?: StdCallback;
  onSearch?: StdCallback;
  template?: TemplateCallback;
} & Omit<SelectProps, 'options'>;

export class AcSelect extends React.Component<AcSelectProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    placeholder: '请选择',
    items: [],
    kv: DEFAULT_KV,
    template: selectKv,
  };

  state = {
    value: this.props.value,
  };

  shouldComponentUpdate(nextProps: Readonly<AcSelectProps>): boolean {
    const { value } = nextProps;
    const isNewValue = this.props.value !== value;
    if (isNewValue && value !== this.state.value) {
      this.setState({ value });
    }
    return true;
  }

  handleChange = (inValue) => {
    const { onChange, onSearch } = this.props;
    const target = { value: inValue };
    const stdEvent: StdEventTarget = { target: { value: inValue } };
    this.setState(target, () => {
      onChange?.(stdEvent);
      onSearch?.(stdEvent);
    });
  };

  template = (args) => {
    const { template, kv } = this.props;
    if (kv === DEFAULT_KV) return template!(args);
    return KvTmpl(args, {
      component: Select.Option,
      ...kv,
    });
  };

  render() {
    const { className, onChange, onSearch, value, template, ...props } = this.props;
    const { value: _value } = this.state;
    const asProps = {
      onChange: this.handleChange,
      value: _value,
    } as any;

    return (
      <ReactList
        allowEmpty
        as={Select}
        className={cx(CLASS_NAME, className)}
        template={this.template}
        {...asProps}
        {...props}
      />
    );
  }
}

export const AcSelectFc = (props: AcSelectProps) => {
  return <AcSelect {...props} />;
};
