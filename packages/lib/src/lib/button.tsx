/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-18 07:09:31
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-23 14:30:58
 */
import React, { FC } from 'react';
import { Button, ButtonProps } from 'antd';
import {
  BackwardOutlined,
  CheckOutlined,
  CloseOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  ImportOutlined,
  PlusOutlined,
  RedoOutlined,
  ReloadOutlined,
  SaveOutlined,
  SyncOutlined,
} from '@ant-design/icons';

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
    sync: '同步',
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
    sync: 'Sync',
  },
};

const t = (locale: string, key: string) => {
  return locals[locale][key] || key;
};

type AcButtonProps = ButtonProps & {
  lang?: 'zh-CN' | 'en-US';
}

export const BtnCreate: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<PlusOutlined />} {...props}>
    {t(lang, 'create')}
  </Button>;
};

export const BtnEdit: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<EditOutlined />} {...props}>
    {t(lang, 'edit')}
  </Button>;
};

export const BtnDelete: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<CloseOutlined />} {...props}>
    {t(lang, 'del')}
  </Button>;
};

export const BtnView: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<EyeOutlined />} {...props}>
    {t(lang, 'view')}
  </Button>;
};

export const BtnSave: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<SaveOutlined />} {...props}>
    {t(lang, 'save')}
  </Button>;
};

export const BtnExport: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<DownloadOutlined />} {...props}>
    {t(lang, 'export')}
  </Button>;
};

export const BtnImport: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<ImportOutlined />} {...props}>
    {t(lang, 'imp')}
  </Button>;
};

export const BtnRefresh: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<ReloadOutlined />} {...props}>
    {t(lang, 'refresh')}
  </Button>;
};

export const BtnBack: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<BackwardOutlined />} {...props}>
    {t(lang, 'back')}
  </Button>;
};

export const BtnSubmit: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<CheckOutlined />} {...props}>
    {t(lang, 'submit')}
  </Button>;
};

export const BtnCancel: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<RedoOutlined />} {...props}>
    {t(lang, 'cancel')}
  </Button>;
};

export const BtnSync: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<SyncOutlined />} {...props}>
    {t(lang, 'sync')}
  </Button>;
};
