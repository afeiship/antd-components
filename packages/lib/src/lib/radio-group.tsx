import ReactList from '@jswork/react-list';
import { Radio, RadioGroupProps } from 'antd';
import cx from 'classnames';
import React, { HTMLAttributes } from 'react';
import { radioKv } from '../tpls/kv';

const CLASS_NAME = 'ac-radio-group';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;
type TemplateCallback = (item: { item: any; index: number }, opts?: any) => React.ReactNode;

export type AcRadioGroupProps = {
  className?: string;
  value?: any;
  defaultValue?: any;
  items?: any[];
  onChange?: StdCallback;
  onSearch?: StdCallback;
  template?: TemplateCallback;
  templateOptions?: any;
  buttonStyle?: 'solid' | 'outline';
} & RadioGroupProps &
  HTMLAttributes<any>;

export class AcRadioGroup extends React.Component<AcRadioGroupProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    items: [],
    template: radioKv,
  };

  get templateCallback() {
    const { template, templateOptions } = this.props;
    return (item) => template!(item, templateOptions);
  }

  state = { value: this.props.value };

  static getDerivedStateFromProps(inProps: Readonly<AcRadioGroupProps>, inState: any) {
    const { value } = inProps;
    if (value !== inState.value) return { value };
    return null;
  }

  handleChange = (inEvent) => {
    const { onChange, onSearch } = this.props;
    const { value } = inEvent.target;
    const target = { value };
    this.setState(target);
    onChange?.({ target });
    onSearch?.({ target });
  };

  render() {
    const { className, items, template, templateOptions, onChange, onSearch, ...props } =
      this.props;

    return (
      <Radio.Group className={cx(CLASS_NAME, className)} onChange={this.handleChange} {...props}>
        <ReactList items={items || []} template={this.templateCallback} />
      </Radio.Group>
    );
  }
}

export const AcRadioGroupFc = (props: AcRadioGroupProps) => {
  return <AcRadioGroup {...props} />;
};
