/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-25 18:48:19
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-25 21:51:46
 */
import React, { RefObject } from 'react';
import { Button, ButtonProps, Space, SpaceProps } from 'antd';

export type FormActionsProps = SpaceProps & {
  lang?: string;
  actions?: string[];
  okText?: string;
  cancelText?: string;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  okProps?: ButtonProps;
  cancelProps?: ButtonProps;
  buttonProps?: ButtonProps;
}

const defaultProps: FormActionsProps = {
  lang: 'zh-CN',
  actions: ['ok', 'cancel'],
};

const locales = {
  'zh-CN': {
    ok: '确认',
    cancel: '取消',
  },
  'en-US': {
    ok: 'OK',
    cancel: 'Cancel',
  },
};

export const FormActions = React.forwardRef((props: FormActionsProps, ref: RefObject<HTMLDivElement>) => {
  const {
    lang,
    actions,
    okText,
    cancelText,
    onOk,
    onCancel,
    okProps,
    cancelProps,
    buttonProps,
    ...rest
  } = { ...defaultProps, ...props };

  const t = (key: string) => locales[lang!][key];
  const items = {
    ok: <Button
      key="ok"
      htmlType="submit"
      type="primary"
      onClick={onOk}
      children={okText || t('ok')}
      {...buttonProps}
      {...okProps}
    />,
    cancel: <Button
      key="cancel"
      htmlType="reset"
      onClick={onCancel}
      children={cancelText || t('cancel')}
      {...buttonProps}
      {...cancelProps}
    />,
  };

  return (
    <Space {...rest} ref={ref}>
      {actions!.map(key => items[key])}
    </Space>
  );
});
