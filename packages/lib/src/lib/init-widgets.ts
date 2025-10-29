/**
 * @Author: aric 1290657123@qq.com
 * @Date: 2025-10-25 10:45:13
 * @LastEditors: aric 1290657123@qq.com
 * @LastEditTime: 2025-10-29 17:49:27
 */
import NiceForm, { ReactComponent } from '@ebay/nice-form-react';
import { AcCheckableTagFc } from './checkable-tag';
import { AcCheckableTagListFc } from './checkable-tag-list';
import { AcCheckboxFc } from './checkbox';
import { AcCheckboxGroupFc } from './checkbox-group';
import { AcCodeFlaskFc } from './codeflask';
import { AcDatePickerFc } from './date-picker';
import { AcEditableTagGroupFc } from './editable-tag-group';
import { AcInputFc } from './input';
import { AcInputHiddenFc } from './input-hidden';
import { AcInputNumberFc } from './input-number';
import { AcInputTagsFc } from './input-tags';
import { AcInputTokenFc } from './input-token';
import { AcPreSelectFc } from './pre-select';
import { AcRadioGroupFc } from './radio-group';
import { AcRangePickerFc } from './range-picker';
import { AcRateFc } from './rate';
import { AcSearchFc } from './search';
import { AcSelectFc } from './select';
import { AcSliderFc } from './slider';
import { AcSliderRangeFc } from './slider-range';
import { AcSwitchFc } from './switch';
import { AcTextareaFc } from './textarea';
import { AcTimePickerFc } from './time-picker';
import { AcTransferFc } from './transfer';
import { AcTreeSelectFc } from './tree-select';
import { AcUploadDraggerFc } from './upload-dragger';
import { AcUploadPictureFc } from './upload-picture';
import { AcUploadPictureCardFc } from './upload-picture-card';
import { AcUploadFc } from './upload';

export const widgets = {
  'ac:checkable-tag': AcCheckableTagFc,
  'ac:checkable-tag-list': AcCheckableTagListFc,
  'ac:checkbox': AcCheckboxFc,
  'ac:checkbox-group': AcCheckboxGroupFc,
  'ac:code-flask': AcCodeFlaskFc,
  'ac:date-picker': AcDatePickerFc,
  'ac:editable-tag-group': AcEditableTagGroupFc,
  'ac:input': AcInputFc,
  'ac:input-hidden': AcInputHiddenFc,
  'ac:input-number': AcInputNumberFc,
  'ac:input-tags': AcInputTagsFc,
  'ac:input-token': AcInputTokenFc,
  'ac:pre-select': AcPreSelectFc,
  'ac:radio-group': AcRadioGroupFc,
  'ac:range-picker': AcRangePickerFc,
  'ac:rate': AcRateFc,
  'ac:search': AcSearchFc,
  'ac:select': AcSelectFc,
  'ac:slider': AcSliderFc,
  'ac:slider-range': AcSliderRangeFc,
  'ac:switch': AcSwitchFc,
  'ac:textarea': AcTextareaFc,
  'ac:time-picker': AcTimePickerFc,
  'ac:transfer': AcTransferFc,
  'ac:tree-select': AcTreeSelectFc,
  'ac:upload-dragger': AcUploadDraggerFc,
  'ac:upload-picture': AcUploadPictureFc,
  'ac:upload-picture-card': AcUploadPictureCardFc,
  'ac:upload': AcUploadFc,
};

export const initWidgets = (names?: string[] | null, externalWidgets?: Record<string, ReactComponent>) => {
  const keys = names?.length ? names : Object.keys(widgets);
  keys.forEach((key) => {
    const widget = widgets[key];
    if (widget) {
      NiceForm.defineWidget(key, widget);
    } else {
      console.warn(`[defineWidgets] widget ${key} not found!`);
    }
  });

  if (externalWidgets) {
    Object.keys(externalWidgets).forEach((key) => {
      const widget = externalWidgets[key];
      NiceForm.defineWidget(key, widget);
    });
  }
};
