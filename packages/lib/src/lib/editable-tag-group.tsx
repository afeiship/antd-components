import '@jswork/next-unique';
import { Button, Tag } from 'antd';
import cx from 'classnames';
import React, { useEffect, useRef, useCallback } from 'react';
import AutosizeInput from 'react-input-autosize';
import { DynamicList, useCommand } from '@jswork/react-dynamic-list';

const CLASS_NAME = 'ac-editable-tag-group';

export type AcEditableTagGroupProps = {
  name: string;
  className?: string;
  value?: string[];
  onChange?: (e: { target: { value: string[] } }) => void;
  readOnly?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  triggers?: string[];
};

const ITEM_SLOT = `${CLASS_NAME}__input`;

const isEqual = (a: string[], b: string[]) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

const EMPTY_DEFAULT = () => '';

export const AcEditableTagGroup: React.FC<AcEditableTagGroupProps> = ({
  name,
  className,
  value = [],
  onChange,
  readOnly = false,
  disabled = false,
  min = 0,
  max = 10,
  triggers = [' ', 'Tab'],
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const isComposing = useRef(false);
  // null = not yet synced, ensures first effect always runs
  const syncedRef = useRef<string[] | null>(null);

  const { state, actions } = useCommand<string>(name, {
    defaults: EMPTY_DEFAULT,
    min,
    max,
  });

  // keep ref in sync so handleBlur doesn't depend on state.list
  const listRef = useRef(state.list);
  listRef.current = state.list;

  // external value -> store (skip if already synced to same value)
  useEffect(() => {
    if (syncedRef.current === null || !isEqual(value, syncedRef.current)) {
      syncedRef.current = value.slice();
      actions.reset(value.slice());
    }
  }, [value]);

  // store change -> external onChange
  useEffect(() => {
    if (!state.change) return;
    const list = state.list.map((s) => s.trim());
    syncedRef.current = list;
    onChange?.({ target: { value: list } });
  }, [state.change]);

  const getLatestInput = useCallback((): HTMLInputElement | null => {
    if (!rootRef.current) return null;
    const els = rootRef.current.querySelectorAll(`.${ITEM_SLOT} input`);
    return els[els.length - 1] as HTMLInputElement;
  }, []);

  const focusLast = useCallback(
    (delay = 100) => {
      setTimeout(() => getLatestInput()?.focus(), delay);
    },
    [getLatestInput]
  );

  const handleAdd = useCallback(() => {
    actions.add();
    focusLast();
  }, [actions, focusLast]);

  const handleRemove = useCallback(
    (index: number) => {
      actions.remove(index);
    },
    [actions]
  );

  const handleInputChange = useCallback(
    (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      actions.update(index, () => e.target.value);
    },
    [actions]
  );

  const handleCompositionStart = useCallback(() => {
    isComposing.current = true;
  }, []);

  const handleCompositionEnd = useCallback(() => {
    isComposing.current = false;
  }, []);

  const handleBlur = useCallback(() => {
    if (isComposing.current) return;
    const list = nx.unique(listRef.current || []);
    const latestInput = getLatestInput();
    setTimeout(() => {
      const filtered = document.activeElement !== latestInput ? list.filter(Boolean) : list;
      actions.reset(filtered);
    }, 10);
  }, [actions, getLatestInput]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.nativeEvent as any).isComposing || e.keyCode === 229) return;
      if (triggers.includes(e.key)) {
        e.preventDefault();
        actions.add();
        setTimeout(() => focusLast(), 100);
      }
    },
    [triggers, actions, focusLast]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <Tag key={index}>
        <AutosizeInput
          type="text"
          value={item}
          disabled={readOnly}
          readOnly={readOnly}
          className={ITEM_SLOT}
          onChange={(e) => handleInputChange(index, e)}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        {!readOnly && <i className={`${CLASS_NAME}__close`} onClick={() => handleRemove(index)} />}
      </Tag>
    ),
    [readOnly, handleInputChange, handleBlur, handleKeyDown, handleRemove]
  );

  return (
    <div ref={rootRef} className={cx(CLASS_NAME, className)}>
      <DynamicList<string>
        name={name}
        defaults={EMPTY_DEFAULT}
        min={min}
        max={max}
        slots={{ item: renderItem }}
      />
      {!readOnly && (
        <Button
          size="small"
          type="dashed"
          disabled={!state.canAdd || disabled}
          onClick={handleAdd}
          className={`${CLASS_NAME}__create`}>
          <i className={`${CLASS_NAME}__plus`} />
          新增
        </Button>
      )}
    </div>
  );
};

export default AcEditableTagGroup;
