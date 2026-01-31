/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-18 07:09:31
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-25 07:32:18
 */
import {
  ArrowLeftOutlined,
  BulbOutlined,
  CheckOutlined,
  CloseOutlined,
  CopyOutlined,
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
import { Button, ButtonProps } from 'antd';
import React, { FC } from 'react';

// 类型定义
export type Locale = 'zh-CN' | 'en-US';
type ActionType =
  | 'create'
  | 'edit'
  | 'del'
  | 'view'
  | 'preview'
  | 'save'
  | 'export'
  | 'imp'
  | 'refresh'
  | 'back'
  | 'submit'
  | 'cancel'
  | 'sync'
  | 'copy';

// 文案
const locals: Record<Locale, Record<ActionType, string>> = {
  'zh-CN': {
    create: '添加',
    edit: '编辑',
    del: '删除',
    view: '查看',
    preview: '预览',
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
    preview: 'Preview',
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

// 图标映射
const iconMap: Record<ActionType, React.ReactNode> = {
  create: <PlusOutlined />,
  edit: <EditOutlined />,
  del: <CloseOutlined />,
  view: <EyeOutlined />,
  preview: <BulbOutlined />,
  save: <SaveOutlined />,
  export: <DownloadOutlined />,
  imp: <ImportOutlined />,
  refresh: <ReloadOutlined />,
  back: <ArrowLeftOutlined />,
  submit: <CheckOutlined />,
  cancel: <RedoOutlined />,
  sync: <SyncOutlined />,
  copy: <CopyOutlined />,
};

// 国际化工具函数
const t = (locale: Locale, key: ActionType): string => {
  return locals[locale]?.[key] ?? key;
};

// 通用按钮组件
interface ActionButtonProps extends ButtonProps {
  action: ActionType;
  lang?: Locale;
}

const ActionButton: FC<ActionButtonProps> = ({
  action,
  lang = 'zh-CN',
  size = 'small',
  children,
  ...props
}) => {
  const text = children ?? t(lang, action);
  const icon = iconMap[action];
  return (
    <Button size={size} icon={icon} {...props}>
      {text}
    </Button>
  );
};

// 导出具体命名的按钮（保持 API 兼容）
export const BtnCreate = (props: ButtonProps & { lang?: Locale }) => (
  <ActionButton action="create" {...props} />
);
export const BtnEdit = (props: ButtonProps & { lang?: Locale }) => (
  <ActionButton action="edit" {...props} />
);
export const BtnDelete = (props: ButtonProps & { lang?: Locale }) => (
  <ActionButton action="del" {...props} />
);
export const BtnView = (props: ButtonProps & { lang?: Locale }) => (
  <ActionButton action="view" {...props} />
);
export const BtnPreview = (props: ButtonProps & { lang?: Locale }) => (
  <ActionButton action="preview" {...props} />
);
export const BtnSave = (props: ButtonProps & { lang?: Locale }) => (
  <ActionButton action="save" {...props} />
);
export const BtnExport = (props: ButtonProps & { lang?: Locale }) => (
  <ActionButton action="export" {...props} />
);
export const BtnImport = (props: ButtonProps & { lang?: Locale }) => (
  <ActionButton action="imp" {...props} />
);
export const BtnRefresh = (props: ButtonProps & { lang?: Locale }) => (
  <ActionButton action="refresh" {...props} />
);
export const BtnBack = (props: ButtonProps & { lang?: Locale }) => (
  <ActionButton action="back" {...props} />
);
export const BtnSubmit = (props: ButtonProps & { lang?: Locale }) => (
  <ActionButton action="submit" {...props} />
);
export const BtnCancel = (props: ButtonProps & { lang?: Locale }) => (
  <ActionButton action="cancel" {...props} />
);
export const BtnSync = (props: ButtonProps & { lang?: Locale }) => (
  <ActionButton action="sync" {...props} />
);
export const BtnCopy = (props: ButtonProps & { lang?: Locale }) => (
  <ActionButton action="copy" {...props} />
);
