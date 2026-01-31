import React from 'react';
import { Input } from 'antd';
import cx from 'classnames';
import { SearchProps } from 'antd/es/input';

const CLASS_NAME = 'ac-search';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

export type AcSearchProps = {
  value?: string;
  onChange?: StdCallback;
  onSearch?: StdCallback;
  autoComplete?: boolean;
} & SearchProps;

export class AcSearch extends React.Component<AcSearchProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    autoComplete: false,
    placeholder: '输入关键字搜索',
  };

  get complete() {
    return this.props.autoComplete ? 'on' : 'off';
  }

  handleSearch = (inEvent) => {
    const { onSearch } = this.props;
    onSearch?.({ target: { value: inEvent } });
  };

  render() {
    const { className, value, autoComplete, onSearch, ...props } = this.props;
    return (
      <Input.Search
        className={cx(CLASS_NAME, className)}
        autoComplete={this.complete}
        onSearch={this.handleSearch}
        {...props}
      />
    );
  }
}

export const AcSearchFc = (props: AcSearchProps) => {
  return <AcSearch {...props} />;
};


