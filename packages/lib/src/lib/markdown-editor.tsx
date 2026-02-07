import MarkdownEditor from '@uiw/react-markdown-editor';
import cx from 'classnames';
import React from 'react';

const CLASS_NAME = 'ac-markdown-editor';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

export type AcMarkdownEditorProps = {
  className?: string;
  value?: string;
  onChange?: StdCallback;
} & React.ComponentProps<typeof MarkdownEditor>;

export class AcMarkdownEditor extends React.Component<AcMarkdownEditorProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {};

  handleChange = (inValue: string) => {
    const { onChange } = this.props;
    onChange?.({ target: { value: inValue } });
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    // 确保 value 不是 null 或 undefined
    const safeValue = value ?? '';

    return (
      <MarkdownEditor
        data-component={CLASS_NAME}
        className={cx(CLASS_NAME, className)}
        value={safeValue}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}

export const AcMarkdownEditorFc = (props: AcMarkdownEditorProps) => {
  return <AcMarkdownEditor {...props} />;
};
