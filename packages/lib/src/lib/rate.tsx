import { Rate, RateProps } from 'antd';
import cx from 'classnames';
import React from 'react';
import type { StdCallback } from './types';

const CLASS_NAME = 'ac-rate';

export type AcRateProps = {
  className?: string;
  value?: number;
  onChange?: StdCallback;
} & RateProps;

export class AcRate extends React.Component<AcRateProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {};

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    onChange?.({ target: { value: inEvent } });
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    return <Rate className={cx(CLASS_NAME, className)} onChange={this.handleChange} {...props} />;
  }
}

export const AcRateFc = (props: AcRateProps) => {
  return <AcRate {...props} />;
};
