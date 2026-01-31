import { Checkbox, CheckboxProps } from 'antd';
import cx from 'classnames';
import React, { HTMLAttributes } from 'react';

const CLASS_NAME = 'ac-checkbox';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

export type AcCheckboxProps = {
  className?: string;
  value?: boolean;
  onChange?: StdCallback;
} & CheckboxProps &
  HTMLAttributes<any>;

export class AcCheckbox extends React.Component<AcCheckboxProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {};

  state = {
    value: this.props.value,
  };

  shouldComponentUpdate(nextProps: Readonly<AcCheckboxProps>): boolean {
    const { value } = nextProps;
    if (value !== this.state.value) {
      this.setState({ value });
    }
    return true;
  }

  handleChange = (inEvent) => {
    const { checked } = inEvent.target;
    const { onChange } = this.props;
    const target = { value: checked };

    this.setState(target, () => {
      onChange?.({ target });
    });
  };

  render() {
    const { className, onChange, value, defaultValue, ...props } = this.props;
    const _value = this.state.value;

    return (
      <Checkbox
        className={cx(CLASS_NAME, className)}
        checked={_value}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}

export const AcCheckboxFc = (props: AcCheckboxProps) => {
  return <AcCheckbox {...props} />;
};
