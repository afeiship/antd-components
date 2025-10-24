import { breadcrumbDefault } from './tpls/breadcrumb';
import { kv, checkboxKv, radioKv, treeKv, selectKv, treeSelectKv } from './tpls/kv';
import { raw, checkboxRaw, radioRaw, selectRaw } from './tpls/raw';
import { transferLabel } from './tpls/transfer';
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
import { AcUploadDragger, AcUploadDraggerFc } from './lib/upload-dragger';
import { AcUploadPicture, AcUploadPictureFc } from './lib/upload-picture';
import { AcUploadPictureCard, AcUploadPictureCardFc } from './lib/upload-picture-card';
import { AcUpload, AcUploadFc } from './lib/upload';

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
import type { AcTextareaProps } from './lib/textarea';
import type { AcTimePickerProps } from './lib/time-picker';
import type { AcTransferProps } from './lib/transfer';
import type { AcTreeProps } from './lib/tree';
import type { AcTreeSelectProps } from './lib/tree-select';
import type { AcUploadDraggerProps } from './lib/upload-dragger';
import type { AcUploadProps } from './lib/upload';
import type { AcTableProps } from './lib/table';

import '@jswork/next';
import './lib/alert';

// commands
import useTableCommand from './lib/use-table-command';
import { AcTableLinks } from './lib/table-links';
import type { AcTableLinksProps } from './lib/table-links';

export * from './lib/button';

// export all templates
export {
  // breadcrumb
  breadcrumbDefault,
  // kv
  kv,
  checkboxKv,
  radioKv,
  treeKv,
  selectKv,
  treeSelectKv,
  // raw
  raw,
  checkboxRaw,
  radioRaw,
  selectRaw,
  // transfer
  transferLabel,

  // --- components ---
  AcBreadcrumb,
  AcCheckableDropdown,
  AcCheckableTag,
  AcCheckableTagList,
  AcCheckbox,
  AcCheckboxGroup,
  AcCodeFlask,
  AcConfirmButton,
  AcDatePicker,
  AcEditableTagGroup,
  AcInput,
  AcInputHidden,
  AcInputNumber,
  AcInputTags,
  AcInputToken,
  AcPreSelect,
  AcRadioGroup,
  AcRangePicker,
  AcRate,
  AcSearch,
  AcSelect,
  AcSlider,
  AcSliderRange,
  AcSwitch,
  AcTable,
  AcTableLinks,
  AcTextarea,
  AcTimePicker,
  AcTransfer,
  AcTree,
  AcTreeSelect,
  AcUploadDragger,
  AcUploadPicture,
  AcUploadPictureCard,
  AcUpload,

  // --- fc components ---
  AcCheckableTagFc,
  AcCheckableTagListFc,
  AcCheckboxFc,
  AcCheckboxGroupFc,
  AcCodeFlaskFc,
  AcDatePickerFc,
  AcEditableTagGroupFc,
  AcInputFc,
  AcInputHiddenFc,
  AcInputNumberFc,
  AcInputTagsFc,
  AcInputTokenFc,
  AcPreSelectFc,
  AcRadioGroupFc,
  AcRangePickerFc,
  AcRateFc,
  AcSearchFc,
  AcSelectFc,
  AcSliderFc,
  AcSliderRangeFc,
  AcSwitchFc,
  AcTextareaFc,
  AcTimePickerFc,
  AcTransferFc,
  AcTreeSelectFc,
  AcUploadDraggerFc,
  AcUploadPictureFc,
  AcUploadPictureCardFc,
  AcUploadFc,

  // ---- commands ----
  useTableCommand,

  // ---- types ----
  AcBreadcrumbProps,
  AcCheckableDropdownProps,
  AcCheckableTagProps,
  AcCheckableTagListProps,
  AcCheckboxProps,
  AcCheckboxGroupProps,
  AcConfirmButtonProps,
  AcDatePickerProps,
  AcEditableTagGroupProps,
  AcInputProps,
  AcInputNumberProps,
  AcInputTagsProps,
  AcInputTokenProps,
  AcPreSelectProps,
  AcRadioGroupProps,
  AcRangePickerProps,
  AcRateProps,
  AcSearchProps,
  AcSelectProps,
  AcSliderProps,
  AcSliderRangeProps,
  AcSwitchProps,
  AcTableProps,
  AcTableLinksProps,
  AcTextareaProps,
  AcTimePickerProps,
  AcTransferProps,
  AcTreeProps,
  AcTreeSelectProps,
  AcUploadDraggerProps,
  AcUploadProps,
};
