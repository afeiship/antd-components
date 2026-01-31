import { Slider } from 'antd';
import { SliderRangeProps } from 'antd/es/slider';
import cx from 'classnames';
import React from 'react';

const CLASS_NAME = 'ac-slider-range';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

export type AcSliderRangeProps = {
  className?: string;
  range?: true;
  onChange?: StdCallback;
} & Omit<SliderRangeProps, 'range'>;

export class AcSliderRange extends React.Component<AcSliderRangeProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {};

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    onChange?.({ target: { value: inEvent } });
  };

  render() {
    const { className, range, onChange, ...props } = this.props;
    return (
      <Slider
        range={true}
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}

export const AcSliderRangeFc = (props: AcSliderRangeProps) => {
  return <AcSliderRange {...props} />;
};
