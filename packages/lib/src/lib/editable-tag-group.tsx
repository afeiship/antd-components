import '@jswork/next-dom-event';
import '@jswork/next-unique';
import { Button, Tag } from 'antd';
import cx from 'classnames';
import deepEqual from 'fast-deep-equal';
import React, { createRef } from 'react';
import AutosizeInput from 'react-input-autosize';
import {
  ReactInteractiveList,
  ReactInteractiveListProps,
  useCommand,
} from '@jswork/react-interactive-list';
import { INDEX } from '@jswork/react-list';

const CLASS_NAME = 'ac-editable-tag-group';

export type AcEditableTagGroupProps = ReactInteractiveListProps & {
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * If set readOnly.
   */
  readOnly?: boolean;
  /**
   * If set disabled.
   */
  disabled?: boolean;
  /**
   * Trigger key, default is `Space`.
   */
  triggers?: string[];
};

export class AcEditableTagGroup extends React.Component<AcEditableTagGroupProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    value: [],
    min: 0,
    max: 10,
    triggers: [' ', 'Tab'],
  };

  private inputRef = createRef<HTMLInputElement>();
  private btnRef = createRef<HTMLButtonElement>();
  private rootForwardedRef = createRef<HTMLDivElement>();
  private rootRef = createRef<any>();
  private listCtx;

  constructor(props: AcEditableTagGroupProps) {
    super(props);
    this.listCtx = useCommand(props.name);
  }

  get latestInput(): HTMLInputElement {
    const root = this.rootForwardedRef.current!;
    const selector = `.${CLASS_NAME}__input input`;
    const els: NodeListOf<HTMLInputElement> = root.querySelectorAll(selector);
    return els[els.length - 1];
  }

  state = {
    value: this.props.value,
  };

  handleTagRemove = (inIndex) => {
    // const { value } = this.state;
    // const newValue = value!.filter((_, idx) => idx !== inIndex);
    // this.handleChange(newValue);
    this.listCtx.remove(inIndex);
  };

  template = ({ item, index }) => {
    const { readOnly } = this.props;
    return (
      <Tag key={index}>
        <AutosizeInput
          ref={this.inputRef}
          type="text"
          size="small"
          value={item}
          disabled={readOnly}
          readOnly={readOnly}
          className={`${CLASS_NAME}__input`}
          onChange={this.handleInputChange.bind(this, index)}
          onBlur={this.handleInputBlur}
          onKeyDown={this.handleInputKeyDown}
        />
        {!readOnly && (
          <i
            className={`${CLASS_NAME}__close`}
            onClick={this.handleTagRemove.bind(this, index)}></i>
        )}
      </Tag>
    );
  };

  templateCreate = () => {
    const { readOnly } = this.props;
    if (readOnly) return null;
    return (
      <Button
        ref={this.btnRef}
        size="small"
        type="dashed"
        onClick={this.actionCreate}
        className={`${CLASS_NAME}__create`}>
        <i className={`${CLASS_NAME}__plus`}></i>
        新增
      </Button>
    );
  };

  /**
   * Default item's value.
   */
  templateDefault = () => {
    return '';
  };

  /**
   * Add new default item.
   */
  actionCreate = () => {
    const { value } = this.state;
    this.listCtx.add();
    this.handleChange(value);
    this.actionFocusLast();
  };

  /**
   * Focus latest input element if exists.
   * @param inDelay
   */
  actionFocusLast = (inDelay?: number) => {
    const delay = inDelay || 100;
    setTimeout(() => {
      this.latestInput?.focus();
    }, delay);
  };

  handleInputChange = (inIndex, inEvent) => {
    const { value } = this.state;
    const newValue = [...value!];
    newValue[inIndex] = inEvent.target.value;
    this.setState({ value: newValue });
  };

  handleInputBlur = () => {
    let { value } = this.state;
    const len = value?.length;
    setTimeout(() => {
      value = nx.unique(value || []);
      if (document.activeElement !== this.latestInput) {
        value = value?.filter(Boolean);
      }
      this.handleChange(value);
      if (value?.length !== len) {
        this.actionFocusLast(100);
      }
    }, 10);
  };

  handleInputKeyDown = (inEvent) => {
    const { triggers } = this.props;
    if (inEvent.nativeEvent.isComposing || inEvent.keyCode === 229) return;
    if (triggers?.includes(inEvent.key)) {
      inEvent.preventDefault();
      this.actionCreate();
    }
  };

  handleInterChange = (inEvent) => {
    // const { value } = inEvent.target;
    this.handleChange(inEvent);
  };

  handleChange = (inValue, inCallback?) => {
    const { onChange } = this.props;
    const value = inValue.map((item) => item.trim());
    const target = { value };
    this.setState(target, () => {
      onChange?.({ target });
      inCallback?.(value);
    });
  };

  shouldComponentUpdate(nextProps: Readonly<AcEditableTagGroupProps>): boolean {
    const { value } = nextProps;
    if (!deepEqual(value, this.props.value)) {
      this.setState({ value: value!.slice() });
    }
    return true;
  }

  render() {
    const {
      className,
      value,
      onChange,
      min,
      max,
      triggers,
      keyExtractor,
      slots,
      defaults,
      ...props
    } = this.props;
    const { value: stateValue } = this.state;

    return (
      <div ref={this.rootForwardedRef}>
        <ReactInteractiveList
          className={cx(CLASS_NAME, className)}
          ref={this.rootRef}
          min={min}
          max={max}
          value={stateValue}
          keyExtractor={INDEX}
          slots={{ item: this.template, empty: slots?.empty }}
          defaults={this.templateDefault}
          onChange={this.handleInterChange}
          {...props}
        />
        {this.templateCreate()}
      </div>
    );
  }
}

export const AcEditableTagGroupFc = (props: AcEditableTagGroupProps) => {
  return <AcEditableTagGroup {...props} />;
};
