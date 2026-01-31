import { Slider, SliderSingleProps } from 'antd';
import cx from 'classnames';
import React from 'react';

const CLASS_NAME = 'ac-slider';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

export type AcSliderProps = {
  className?: string;
  onChange?: StdCallback;
} & SliderSingleProps;

export class AcSlider extends React.Component<AcSliderProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {};

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    onChange?.({ target: { value: inEvent } });
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    return <Slider className={cx(CLASS_NAME, className)} onChange={this.handleChange} {...props} />;
  }
}

export const AcSliderFc = (props: AcSliderProps) => {
  return <AcSlider {...props} />;
};
