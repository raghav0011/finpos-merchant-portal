import { WNepaliCalender, WMaskedDynamicSearch, WDatePicker, WTimePicker } from '../Widgets';
import DynamicMinioUploaderV2 from '../Widgets/DynamicMinioUploaderV2';

let WidgetKeyValueMapping = {
  email: {
    widget: 'input',
  },
  textbox: {
    widget: 'input',
  },
  textarea: {
    widget: 'textarea',
  },
  input: {
    widget: 'input',
  },
  url: {
    widget: 'input',
  },
  number: {
    widget: 'number',
  },
  'date-picker': {
    widget: WDatePicker,
  },
  'radio-group': {
    widget: 'radio-group',
  },
  select: {
    widget: 'select',
  },
  switch: {
    widget: 'switch',
  },
  checkbox: {
    widget: 'checkbox',
  },
  // upload: {
  //   widget: WUpload,
  // },
  upload: {
    widget: DynamicMinioUploaderV2,
  },
  'dynamic-minio-upload': {
    widget: DynamicMinioUploaderV2,
  },
  'time-picker': {
    widget: WTimePicker,
  },
  'nepali-date-picker': {
    widget: WNepaliCalender,
  },
  'masked-dynamic-search': {
    widget: WMaskedDynamicSearch,
  },
};

export default WidgetKeyValueMapping;
