import ReactList from '@jswork/react-list';
import { Checkbox } from 'antd';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import cx from 'classnames';
import React from 'react';
import { checkboxKv } from '../tpls/kv';
import type { StdCallback, StdEventTarget, TemplateCallback } from './types';

const CLASS_NAME = 'ac-checkbox-group';

export type AcCheckboxGroupProps = {
  className?: string;
  value?: any[];
  items?: any[];
  onChange?: StdCallback;
  onSearch?: StdCallback;
  template?: TemplateCallback;
} & CheckboxGroupProps;

export class AcCheckboxGroup extends React.Component<AcCheckboxGroupProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    items: [],
    value: [],
    template: checkboxKv,
  };

  state = {
    value: this.props.value,
  };

  shouldComponentUpdate(nextProps: Readonly<AcCheckboxGroupProps>): boolean {
    const { value } = nextProps;
    const isNewValue = nextProps.value !== this.props.value;
    if (isNewValue && this.state.value !== value) {
      this.setState({ value });
    }
    return true;
  }

  handleChange = (inEvent) => {
    const { onChange, onSearch } = this.props;
    const target = { value: inEvent };
    const stdEvent = { target };
    this.setState(target, () => {
      onChange?.(stdEvent);
      onSearch?.(stdEvent);
    });
  };

  render() {
    const { className, items, template, onChange, onSearch, children, value, ...props } =
      this.props;
    const { value: stateValue } = this.state;

    return (
      <Checkbox.Group
        className={cx(CLASS_NAME, className)}
        value={stateValue}
        onChange={this.handleChange}
        {...props}>
        <ReactList items={items || []} template={template} />
      </Checkbox.Group>
    );
  }
}

export const AcCheckboxGroupFc = (props: AcCheckboxGroupProps) => {
  return <AcCheckboxGroup {...props} />;
};
