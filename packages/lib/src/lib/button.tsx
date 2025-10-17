/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-18 07:09:31
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-18 07:29:35
 */
import React, { FC } from 'react';
import { Button, ButtonProps } from 'antd';

const locals = {
  'zh-CN': {
    create: '添加',
    edit: '编辑',
    del: '删除',
    view: '查看',
    save: '保存',
    export: '导出',
    imp: '导入',
    refresh: '刷新',
    back: '返回',
    submit: '提交',
    cancel: '取消',
  },
  'en-US': {
    create: 'Create',
    edit: 'Edit',
    del: 'Delete',
    view: 'View',
    save: 'Save',
    export: 'Export',
    imp: 'Import',
    refresh: 'Refresh',
    back: 'Back',
    submit: 'Submit',
    cancel: 'Cancel',
  },
};

const t = (locale: string, key: string) => {
  return locals[locale][key] || key;
};

type AcButtonProps = ButtonProps & {
  lang: 'zh-CN' | 'en-US';
}

export const BtnCreate: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" {...props}>
    ➕
    <span>{t(lang, 'create')}</span>
  </Button>;
};

export const BtnEdit: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" {...props}>
    ✏️
    <span>{t(lang, 'edit')}</span>
  </Button>;
};

export const BtnDelete: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" {...props}>
    🗑️
    <span>{t(lang, 'del')}</span>
  </Button>;
};

export const BtnView: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" {...props}>
    👁️
    <span>{t(lang, 'view')}</span>
  </Button>;
};

export const BtnSave: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" {...props}>
    💾
    <span>{t(lang, 'save')}</span>
  </Button>;
};

export const BtnExport: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" {...props}>
    📤
    <span>{t(lang, 'export')}</span>
  </Button>;
};

export const BtnImport: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" {...props}>
    📥
    <span>{t(lang, 'imp')}</span>
  </Button>;
};

export const BtnRefresh: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" {...props}>
    ⚡️
    <span>{t(lang, 'refresh')}</span>
  </Button>;
};

export const BtnBack: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" {...props}>
    🔙
    <span>{t(lang, 'back')}</span>
  </Button>;
};

export const BtnSubmit: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" {...props}>
    📨
    <span>{t(lang, 'submit')}</span>
  </Button>;
};

export const BtnCancel: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" {...props}>
    ❌
    <span>{t(lang, 'cancel')}</span>
  </Button>;
};
