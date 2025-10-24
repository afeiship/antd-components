/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-18 07:09:31
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-25 07:32:18
 */
import React, { FC } from 'react';
import { Button, ButtonProps } from 'antd';
import {
  ArrowLeftOutlined,
  CheckOutlined,
  CloseOutlined, CopyOutlined,
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
    copy: '复制',
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
    copy: 'Copy',
  },
};

const t = (locale: string, key: string) => {
  return locals[locale][key] || key;
};

type AcButtonProps = ButtonProps & {
  lang?: string;
}

export const BtnCreate: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<PlusOutlined />} children={t(lang, 'create')} {...props} />;
};

export const BtnEdit: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<EditOutlined />} children={t(lang, 'edit')} {...props} />;
};

export const BtnDelete: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<CloseOutlined />} children={t(lang, 'del')} {...props} />;
};

export const BtnView: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<EyeOutlined />} children={t(lang, 'view')} {...props} />;
};

export const BtnSave: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<SaveOutlined />} children={t(lang, 'save')} {...props} />;
};

export const BtnExport: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<DownloadOutlined />} children={t(lang, 'export')} {...props} />;
};

export const BtnImport: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<ImportOutlined />} children={t(lang, 'imp')} {...props} />;
};

export const BtnRefresh: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<ReloadOutlined />} children={t(lang, 'refresh')} {...props} />;
};

export const BtnBack: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<ArrowLeftOutlined />} children={t(lang, 'back')} {...props} />;
};

export const BtnSubmit: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<CheckOutlined />} children={t(lang, 'submit')} {...props} />;
};

export const BtnCancel: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<RedoOutlined />} children={t(lang, 'cancel')} {...props} />;
};

export const BtnSync: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<SyncOutlined />} children={t(lang, 'sync')} {...props} />;
};

export const BtnCopy: FC<AcButtonProps> = ({ lang = 'zh-CN', ...props }) => {
  return <Button size="small" icon={<CopyOutlined />} children={t(lang, 'copy')} {...props} />;
};
