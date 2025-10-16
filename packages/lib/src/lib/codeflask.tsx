import React from 'react';
import noop from '@jswork/noop';
import ReactCodeflask from '@jswork/react-codeflask';

const CLASS_NAME = 'ac-codeflask';

export interface AcCodeFlaskProps {
  onChange?: (code: string) => void;
  value?: string;
  height?: number;
  [key: string]: any; // 兜底
}

export const AcCodeFlask: React.FC<AcCodeFlaskProps> = ({ onChange = noop, ...props }) => {
  return <ReactCodeflask onChange={onChange} {...props} />;
};

AcCodeFlask.displayName = CLASS_NAME;
// 如果需要 formSchema，可以挂载到函数组件上
(AcCodeFlask as any).formSchema = CLASS_NAME;

export default AcCodeFlask;
