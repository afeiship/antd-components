import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import cx from 'classnames';
import React from 'react';
import type { StdCallback } from './types';

const CLASS_NAME = 'ac-textarea';
const TextArea = Input.TextArea;

export type AcTextareaProps = {
  className?: string;
  value?: boolean;
  onChange?: StdCallback;
} & TextAreaProps;

export class AcTextarea extends React.Component<AcTextareaProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {};

  render() {
    const { className, defaultValue, ...props } = this.props;
    return <TextArea className={cx(CLASS_NAME, className)} {...props} />;
  }
}

export const AcTextareaFc = (props: AcTextareaProps) => {
  return <AcTextarea {...props} />;
};
