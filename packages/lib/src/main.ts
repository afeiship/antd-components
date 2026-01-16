import { AcBreadcrumb } from './lib/breadcrumb';
import { AcCheckableDropdown } from './lib/checkable-dropdown';
import { AcCheckableTag, AcCheckableTagFc } from './lib/checkable-tag';
import { AcCheckableTagList, AcCheckableTagListFc } from './lib/checkable-tag-list';
import { AcCheckbox, AcCheckboxFc } from './lib/checkbox';
import { AcCheckboxGroup, AcCheckboxGroupFc } from './lib/checkbox-group';
import { AcCodeFlask, AcCodeFlaskFc } from './lib/codeflask';
import { AcConfirmButton } from './lib/confirm-button';
import { AcDatePicker, AcDatePickerFc } from './lib/date-picker';
import { AcEditableTagGroup, AcEditableTagGroupFc } from './lib/editable-tag-group';
import { AcInput, AcInputFc } from './lib/input';
import { AcInputCopyable, AcInputCopyableFc } from './lib/input-copyable';
import { AcInputHidden, AcInputHiddenFc } from './lib/input-hidden';
import { AcInputNumber, AcInputNumberFc } from './lib/input-number';
import { AcInputTags, AcInputTagsFc } from './lib/input-tags';
import { AcInputToken, AcInputTokenFc } from './lib/input-token';
import { AcPreSelect, AcPreSelectFc } from './lib/pre-select';
import { AcRadioGroup, AcRadioGroupFc } from './lib/radio-group';
import { AcRangePicker, AcRangePickerFc } from './lib/range-picker';
import { AcRate, AcRateFc } from './lib/rate';
import { AcSearch, AcSearchFc } from './lib/search';
import { AcSelect, AcSelectFc } from './lib/select';
import { AcSlider, AcSliderFc } from './lib/slider';
import { AcSliderRange, AcSliderRangeFc } from './lib/slider-range';
import { AcSwitch, AcSwitchFc } from './lib/switch';
import { AcTable } from './lib/table';
import { AcTextarea, AcTextareaFc } from './lib/textarea';
import { AcTimePicker, AcTimePickerFc } from './lib/time-picker';
import { AcTransfer, AcTransferFc } from './lib/transfer';
import { AcTree } from './lib/tree';
import { AcTreeSelect, AcTreeSelectFc } from './lib/tree-select';
import { AcUpload, AcUploadFc } from './lib/upload';
import { AcUploadDragger, AcUploadDraggerFc } from './lib/upload-dragger';
import { AcUploadPicture, AcUploadPictureFc } from './lib/upload-picture';
import { AcUploadPictureCard, AcUploadPictureCardFc } from './lib/upload-picture-card';
import { breadcrumbDefault } from './tpls/breadcrumb';
import { checkboxKv, kv, radioKv, selectKv, treeKv, treeSelectKv } from './tpls/kv';
import { checkboxRaw, radioRaw, raw, selectRaw } from './tpls/raw';
import { transferLabel } from './tpls/transfer';

import type { AcBreadcrumbProps } from './lib/breadcrumb';
import type { AcCheckableDropdownProps } from './lib/checkable-dropdown';
import type { AcCheckableTagProps } from './lib/checkable-tag';
import type { AcCheckableTagListProps } from './lib/checkable-tag-list';
import type { AcCheckboxProps } from './lib/checkbox';
import type { AcCheckboxGroupProps } from './lib/checkbox-group';
import type { AcConfirmButtonProps } from './lib/confirm-button';
import type { AcDatePickerProps } from './lib/date-picker';
import type { AcEditableTagGroupProps } from './lib/editable-tag-group';
import type { AcInputProps } from './lib/input';
import type { AcInputNumberProps } from './lib/input-number';
import type { AcInputTagsProps } from './lib/input-tags';
import type { AcInputTokenProps } from './lib/input-token';
import type { AcPreSelectProps } from './lib/pre-select';
import type { AcRadioGroupProps } from './lib/radio-group';
import type { AcRangePickerProps } from './lib/range-picker';
import type { AcRateProps } from './lib/rate';
import type { AcSearchProps } from './lib/search';
import type { AcSelectProps } from './lib/select';
import type { AcSliderProps } from './lib/slider';
import type { AcSliderRangeProps } from './lib/slider-range';
import type { AcSwitchProps } from './lib/switch';
import type { AcTableProps } from './lib/table';
import type { AcTextareaProps } from './lib/textarea';
import type { AcTimePickerProps } from './lib/time-picker';
import type { AcTransferProps } from './lib/transfer';
import type { AcTreeProps } from './lib/tree';
import type { AcTreeSelectProps } from './lib/tree-select';
import type { AcUploadProps } from './lib/upload';
import type { AcUploadDraggerProps } from './lib/upload-dragger';

import '@jswork/next';
import './lib/alert';

// commands
import type { AcCardExtrasProps } from './lib/card-extras';
import { AcCardExtras } from './lib/card-extras';
import type { AcExtraSearchProps } from './lib/extra-search';
import { AcExtraSearch } from './lib/extra-search';
import type { FormActionsProps } from './lib/form-actions';
import { FormActions } from './lib/form-actions';
import { initWidgets } from './lib/init-widgets';
import type { AcTableLinksProps } from './lib/table-links';
import { AcTableLinks } from './lib/table-links';
import type { AcTableStatusSwitcherProps } from './lib/table-status-switcher';
import { AcTableStatusSwitcher } from './lib/table-status-switcher';
import type { AcTableToggleSwitcherProps } from './lib/table-toggle-switcher';
import { AcTableToggleSwitcher } from './lib/table-toggle-switcher';
import useTableCommand from './lib/use-table-command';

export * from './lib/button';

// export all templates
export {
  // --- components ---
  AcBreadcrumb,
  // ---- types ----
  AcBreadcrumbProps,
  AcCardExtras,
  AcCardExtrasProps,
  AcCheckableDropdown,
  AcCheckableDropdownProps,
  AcCheckableTag,
  // --- fc components ---
  AcCheckableTagFc,
  AcCheckableTagList,
  AcCheckableTagListFc,
  AcCheckableTagListProps,
  AcCheckableTagProps,
  AcCheckbox,
  AcCheckboxFc,
  AcCheckboxGroup,
  AcCheckboxGroupFc,
  AcCheckboxGroupProps,
  AcCheckboxProps,
  AcCodeFlask,
  AcCodeFlaskFc,
  AcConfirmButton,
  AcConfirmButtonProps,
  AcDatePicker,
  AcDatePickerFc,
  AcDatePickerProps,
  AcEditableTagGroup,
  AcEditableTagGroupFc,
  AcEditableTagGroupProps,
  AcExtraSearch,
  AcExtraSearchProps,
  AcInput,
  AcInputCopyable,
  AcInputCopyableFc,
  AcInputFc,
  AcInputHidden,
  AcInputHiddenFc,
  AcInputNumber,
  AcInputNumberFc,
  AcInputNumberProps,
  AcInputProps,
  AcInputTags,
  AcInputTagsFc,
  AcInputTagsProps,
  AcInputToken,
  AcInputTokenFc,
  AcInputTokenProps,
  AcPreSelect,
  AcPreSelectFc,
  AcPreSelectProps,
  AcRadioGroup,
  AcRadioGroupFc,
  AcRadioGroupProps,
  AcRangePicker,
  AcRangePickerFc,
  AcRangePickerProps,
  AcRate,
  AcRateFc,
  AcRateProps,
  AcSearch,
  AcSearchFc,
  AcSearchProps,
  AcSelect,
  AcSelectFc,
  AcSelectProps,
  AcSlider,
  AcSliderFc,
  AcSliderProps,
  AcSliderRange,
  AcSliderRangeFc,
  AcSliderRangeProps,
  AcSwitch,
  AcSwitchFc,
  AcSwitchProps,
  AcTable,
  AcTableLinks,
  AcTableLinksProps,
  AcTableProps,
  AcTableStatusSwitcher,
  AcTableStatusSwitcherProps,
  AcTableToggleSwitcher,
  AcTableToggleSwitcherProps,
  AcTextarea,
  AcTextareaFc,
  AcTextareaProps,
  AcTimePicker,
  AcTimePickerFc,
  AcTimePickerProps,
  AcTransfer,
  AcTransferFc,
  AcTransferProps,
  AcTree,
  AcTreeProps,
  AcTreeSelect,
  AcTreeSelectFc,
  AcTreeSelectProps,
  AcUpload,
  AcUploadDragger,
  AcUploadDraggerFc,
  AcUploadDraggerProps,
  AcUploadFc,
  AcUploadPicture,
  AcUploadPictureCard,
  AcUploadPictureCardFc,
  AcUploadPictureFc,
  AcUploadProps,
  // breadcrumb
  breadcrumbDefault,
  checkboxKv,
  checkboxRaw,
  FormActions,
  FormActionsProps,
  // ---- widgets ----
  initWidgets,
  // kv
  kv,
  radioKv,
  radioRaw,
  // raw
  raw,
  selectKv,
  selectRaw,
  // transfer
  transferLabel,
  treeKv,
  treeSelectKv,
  // ---- commands ----
  useTableCommand,
};
