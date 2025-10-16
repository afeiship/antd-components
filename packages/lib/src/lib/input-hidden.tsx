import React from 'react';
import { InputProps } from 'antd';

const CLASS_NAME = 'ac-input-hidden';

export class AcInputHidden extends React.Component {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {};

  render() {
    return <input type="hidden" {...this.props} />;
  }
}

export const AcInputHiddenFc = (props: InputProps) => {
  return <AcInputHidden {...props} />;
};

