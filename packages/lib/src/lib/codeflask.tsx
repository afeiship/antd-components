import React from 'react';
import ReactCodeFlask from '@jswork/react-codeflask';

const CLASS_NAME = 'ac-codeflask';

export class AcCodeFlask extends React.Component {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
  };

  render() {
    return <ReactCodeFlask {...this.props} />;
  }
}

export const AcCodeFlaskFc = (props) => {
  return <AcCodeFlask {...props} />;
};

