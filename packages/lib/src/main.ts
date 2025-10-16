import { breadcrumbDefault } from './tpls/breadcrumb';
import { kv, checkboxKv, radioKv, treeKv, selectKv, treeSelectKv } from './tpls/kv';
import { raw, checkboxRaw, radioRaw, selectRaw } from './tpls/raw';
import { transferLabel } from './tpls/transfer';
import { AcBreadcrumb } from './lib/breadcrumb';
import { AcCheckableDropdown } from './lib/checkable-dropdown';
import { AcCheckableTag } from './lib/checkable-tag';
import { AcCheckableTagList } from './lib/checkable-tag-list';
import { AcCheckbox } from './lib/checkbox';
import { AcCheckboxGroup } from './lib/checkbox-group';
import { AcCodeFlask } from './lib/codeflask';
import { AcConfirmButton } from './lib/confirm-button';
import { AcDatePicker } from './lib/date-picker';
import { AcEditableTagGroup } from './lib/editable-tag-group';
import { AcInput } from './lib/input';
import { AcInputHidden } from './lib/input-hidden';
import { AcInputNumber } from './lib/input-number';
import { AcInputTags } from './lib/input-tags';
import { AcInputToken } from './lib/input-token';
import { AcPreSelect } from './lib/pre-select';
import { AcRadioGroup } from './lib/radio-group';
import { AcRangePicker } from './lib/range-picker';
import { AcRate } from './lib/rate';
import { AcSearch } from './lib/search';
import { AcSelect } from './lib/select';
import { AcSlider } from './lib/slider';
import { AcSliderRange } from './lib/slider-range';
import { AcSwitch } from './lib/switch';
import { AcTable } from './lib/table';
import { AcTextarea } from './lib/textarea';
import { AcTimePicker } from './lib/time-picker';
import { AcTransfer } from './lib/transfer';
import { AcTree } from './lib/tree';
import { AcTreeSelect } from './lib/tree-select';
import { AcUploadDragger } from './lib/upload-dragger';
import { AcUploadPicture } from './lib/upload-picture';
import { AcUploadPictureCard } from './lib/upload-picture-card';
import { AcUpload } from './lib/upload';

import './lib/alert';

// commands
import useTableCommand from './lib/use-table-command';


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
  AcTextarea,
  AcTimePicker,
  AcTransfer,
  AcTree,
  AcTreeSelect,
  AcUploadDragger,
  AcUploadPicture,
  AcUploadPictureCard,
  AcUpload,

  // ---- commands ----
  useTableCommand,
};
