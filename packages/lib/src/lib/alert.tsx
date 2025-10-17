import React from 'react';
import { Input, InputProps, message, Modal } from 'antd';

declare global {
  interface NxStatic {
    err: (inMessage: string) => any;
    msg: (inMessage: string) => any;
    alert: (inMessage: string, inTitle?: String) => any;
    confirm: (inMessage: string, inTitle?: String) => any;
    prompt: (inMessage: string, inOptions?: InputProps) => any;
  }
}

export const msg = (inMessage: string) => {
  return message.success(inMessage);
};

export const err = (inMessage: string) => {
  return message.error(inMessage);
};


export const alert = (inMessage: string, inTitle?: String) => {
  return Modal.info({
    title: inTitle || 'Tips',
    content: inMessage,
  });
};

export const confirm = (inMessage: string, inTitle?: String) => {
  return new Promise((resolve) => {
    Modal.confirm({
      title: inTitle || 'Confirm',
      content: inMessage,
      onOk: () => resolve(true),
      onCancel: () => resolve(false),
    });
  });
};

export const prompt = (inMessage: string, inOptions?: InputProps) => {
  let value = '';
  return new Promise((resolve) => {
    Modal.confirm({
      title: inMessage || 'Prompt',
      content: (
        <Input
          type="text"
          placeholder={inMessage}
          defaultValue={value}
          onChange={(e) => (value = e.target.value)}
          {...inOptions}
        />
      ),
      onOk: () => resolve(value),
      onCancel: () => resolve(null),
    });
  });
};

nx.msg = msg;
nx.err = err;
nx.alert = alert;
nx.confirm = confirm;
nx.prompt = prompt;
