import { UploadOutlined } from '@ant-design/icons';
import type { ButtonProps, UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import React from 'react';
import cx from 'classnames';
import type { StdCallback } from './types';

const CLASS_NAME = 'ac-upload';
type CustomRequest = (inEvent: any) => Promise<any>;

export type AcUploadProps = {
  className?: string;
  value?: number;
  onChange?: StdCallback;
  onRequest?: CustomRequest;
  btnProps?: ButtonProps;
} & UploadProps;

export class AcUpload extends React.Component<AcUploadProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onRequest: (inEvent) => Promise.resolve(inEvent),
  };

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    onChange?.({ target: { value: inEvent } });
  };

  handleCustomRequest = (inRequestOption) => {
    const { onRequest } = this.props;
    const { file } = inRequestOption;
    onRequest!(file)
      .then((res) => inRequestOption.onSuccess(res, file))
      .catch((err) => inRequestOption.onError(err, file));
  };

  render() {
    const { className, value, onChange, btnProps, ...props } = this.props;
    return (
      <Upload
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        customRequest={this.handleCustomRequest}
        {...props}>
        <Button icon={<UploadOutlined />} children="点击上传" {...btnProps} />
      </Upload>
    );
  }
}

export const AcUploadFc = (props: AcUploadProps) => {
  return <AcUpload {...props} />;
};
