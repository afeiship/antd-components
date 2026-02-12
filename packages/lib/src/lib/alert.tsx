import React from 'react';
import { Input, InputProps, message, Modal } from 'antd';

declare global {
  interface NxStatic {
    err: (msg: string) => any;
    msg: (msg: string) => any;
    info: (msg: string) => any;
    alert: (msg: string, title?: String) => any;
    confirm: (msg: string, title?: String) => any;
    prompt: (msg: string, options?: InputProps) => any;
  }
}

export const msg = (msg: string) => {
  return message.success(msg);
};

export const info = (msg: string) => {
  return message.info(msg);
};

export const err = (msg: string) => {
  return message.error(msg);
};

export const alert = (msg: string, title?: String) => {
  return Modal.info({
    title: title || 'Tips',
    content: msg,
  });
};

export const confirm = (msg: string, title?: String) => {
  return new Promise((resolve) => {
    Modal.confirm({
      title: title || 'Confirm',
      content: msg,
      onOk: () => resolve(true),
      onCancel: () => resolve(false),
    });
  });
};

export const prompt = (msg: string, options?: InputProps) => {
  let value = '';
  return new Promise((resolve) => {
    Modal.confirm({
      title: msg || 'Prompt',
      content: (
        <Input
          type="text"
          placeholder={msg}
          defaultValue={value}
          onChange={(e) => (value = e.target.value)}
          {...options}
        />
      ),
      onOk: () => resolve(value),
      onCancel: () => resolve(null),
    });
  });
};

nx.msg = msg;
nx.info = info;
nx.err = err;
nx.alert = alert;
nx.confirm = confirm;
nx.prompt = prompt;
