import { ReactList } from '@jswork/react-list';
import { Button, Space } from 'antd';
import cx from 'classnames';
import React from 'react';
import { AcCheckableTag } from './checkable-tag';
import type { AppLocale, StdCallback } from './types';

const CLASS_NAME = 'ac-checkable-tag-list';
const locales = {
  'zh-CN': { selectAll: '全部' },
  'en-US': { selectAll: 'All' },
};

export type AcCheckableTagListProps = {
  /**
   * Main className.
   */
  className?: string;
  /**
   * The language key.
   */
  lang?: AppLocale;
  /**
   * The component data soruce.
   */
  items?: any[];
  /**
   * Runtime value.
   */
  value?: any[];
  /**
   * The event handler for `change`.
   */
  onChange?: StdCallback;
  /**
   * The disabled state.
   */
  disabled?: boolean;
};

export class AcCheckableTagList extends React.Component<AcCheckableTagListProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    lang: 'zh-CN',
    value: [],
  };

  state = {
    value: this.props.value,
  };

  t = (inKey: string) => {
    const { lang } = this.props;
    return locales[lang!][inKey] || inKey;
  };

  shouldComponentUpdate(nextProps: Readonly<AcCheckableTagListProps>): boolean {
    const { value } = nextProps;
    if (value !== this.props.value) this.setState({ value });
    return true;
  }

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    const target = { value: inEvent };
    this.setState(target, () => {
      onChange?.({ target });
    });
  };

  handleClearAll = () => {
    this.handleChange([]);
  };

  render() {
    const { className, items, disabled } = this.props;
    const label = this.t('selectAll');

    return (
      <Space direction="horizontal" className={cx(CLASS_NAME, className)}>
        <Button
          disabled={disabled}
          size="small"
          onClick={this.handleClearAll}
          className="ac-is-aside">
          {label}
        </Button>
        <ReactList
          data={items || []}
          keyExtractor={({ index }) => index}
          slots={{
            item: ({ item }) => {
              const _value = this.state.value as any[];
              const isChecked = _value?.includes(item.value);
              return (
                <AcCheckableTag
                  className="ac-is-item"
                  toggleable
                  closeable
                  propagation
                  disabled={disabled}
                  value={isChecked}
                  onChange={(inEvent) => {
                    const checked = inEvent.target.value;
                    const curSet = new Set([..._value]);
                    const method = checked ? 'add' : 'delete';
                    curSet[method](item.value);
                    // @ts-ignore
                    this.handleChange([...curSet]);
                  }}>
                  {item.label}
                </AcCheckableTag>
              );
            },
          }}
        />
      </Space>
    );
  }
}

export const AcCheckableTagListFc = (props: AcCheckableTagListProps) => {
  return <AcCheckableTagList {...props} />;
};
