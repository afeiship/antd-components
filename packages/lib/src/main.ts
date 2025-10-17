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
import { AcTable, AcTableMain } from './lib/table';
import { AcTextarea, AcTextareaFc } from './lib/textarea';
import { AcTimePicker, AcTimePickerFc } from './lib/time-picker';
import { AcTransfer, AcTransferFc } from './lib/transfer';
import { AcTree } from './lib/tree';
import { AcTreeSelect, AcTreeSelectFc } from './lib/tree-select';
import { AcUploadDragger, AcUploadDraggerFc } from './lib/upload-dragger';
import { AcUploadPicture, AcUploadPictureFc } from './lib/upload-picture';
import { AcUploadPictureCard, AcUploadPictureCardFc } from './lib/upload-picture-card';
import { AcUpload, AcUploadFc } from './lib/upload';

import '@jswork/next';
import './lib/alert';

// commands
import useTableCommand from './lib/use-table-command';

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
  AcTableMain,
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
};
