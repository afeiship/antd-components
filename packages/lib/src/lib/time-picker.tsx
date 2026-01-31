import { TimePicker, TimePickerProps } from 'antd';
import cx from 'classnames';
import dayjs from 'dayjs';
import React from 'react';

const CLASS_NAME = 'ac-time-picker';
const STD_FORMAT = 'HH:mm:ss';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

export type AcTimePickerProps = {
  className?: string;
  value?: string | dayjs.Dayjs;
  defaultValue?: string | dayjs.Dayjs;
  onChange?: StdCallback;
} & Omit<TimePickerProps, 'value' | 'defaultValue' | 'onChange' | 'ref'>;

export class AcTimePicker extends React.Component<AcTimePickerProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    format: STD_FORMAT,
  };

  handleChange = (inEvent) => {
    const value = this.stringify(inEvent);
    const { onChange } = this.props;
    onChange?.({ target: { value } });
  };

  parse = (inValue) => {
    const { format } = this.props;
    return dayjs(inValue, format as string);
  };

  stringify = (inValue) => {
    if (!inValue) return null;
    const { format } = this.props;
    return inValue.format(format as string);
  };

  normalize = (inValues) => {
    Object.keys(inValues).forEach((key) => {
      const value = inValues[key];
      if (value) inValues[key] = this.parse(value);
      else delete inValues[key];
    });
    return inValues;
  };

  render() {
    const { className, value, defaultValue, onChange, ...props } = this.props;
    const values = this.normalize({ value, defaultValue });

    return (
      <TimePicker
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        {...values}
        {...props}
      />
    );
  }
}

export const AcTimePickerFc = (props: AcTimePickerProps) => {
  return <AcTimePicker {...props} />;
};
