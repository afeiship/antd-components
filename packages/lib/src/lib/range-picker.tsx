import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import cx from 'classnames';
import moment from 'dayjs';
import React from 'react';
import type { StdCallback, StdEventTarget } from './types';

const CLASS_NAME = 'ac-range-picker';
const STD_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const { RangePicker } = DatePicker;

export type AcRangePickerProps = {
  className?: string;
  value?: any;
  defaultValue?: any;
  onChange?: StdCallback;
} & RangePickerProps;

export class AcRangePicker extends React.Component<AcRangePickerProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    format: STD_FORMAT,
  };

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    onChange?.({ target: { value: this.stringify(inEvent) } });
  };

  parse = (inValue) => {
    const { format } = this.props;
    return inValue.map((item) => moment(item, format as string));
  };

  stringify = (inValue) => {
    if (!inValue) return [];
    const { format } = this.props;
    return inValue.map((item) => item.format(format as string));
  };

  render() {
    const { className, defaultValue, value, onChange, ...props } = this.props;
    if (defaultValue) props['defaultValue'] = this.parse(defaultValue);
    if (value) props['value'] = this.parse(value);

    return (
      <RangePicker className={cx(CLASS_NAME, className)} onChange={this.handleChange} {...props} />
    );
  }
}

export const AcRangePickerFc = (props: AcRangePickerProps) => {
  return <AcRangePicker {...props} />;
};
