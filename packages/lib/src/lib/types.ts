/**
 * Common TypeScript types for antd-components
 * Shared types used across multiple components
 */

/**
 * Supported locale languages
 * @example
 * lang?: AppLocale;
 */
export type AppLocale = 'zh-CN' | 'en-US';

/**
 * Custom event target for input components
 * @description This is a custom type that wraps onChange values in a standard format.
 * Antd components don't always return standard React events, so we normalize
 * all onChange callbacks to use this consistent { target: { value } } structure.
 * @example
 * const handleChange = (event: StdEventTarget) => {
 *   console.log(event.target.value);
 * };
 * @template T The type of the value
 */
export type StdEventTarget<T = any> = { target: { value: T } };

/**
 * Standard callback function for value changes
 * @description Normalized onChange callback that accepts our custom event format.
 * @example
 * onChange?: (inEvent: StdEventTarget) => void;
 * @template T The type of the value
 */
export type StdCallback<T = any> = (inEvent: StdEventTarget<T>) => void;

/**
 * Template callback for rendering items
 * @example
 * renderItem?: (item: { item: any; index: number }) => React.ReactNode;
 */
export type TemplateCallback<T = any> = (
  item: { item: T; index: number },
  options?: any
) => React.ReactNode;

/**
 * Template callback with items array
 * @example
 * renderItem?: (item: { item: any; index: number; items: any[] }, cb: any) => React.ReactNode;
 */
export type TemplateCallbackWithItems<T = any> = (
  item: { item: T; index: number; items: T[] },
  cb: any
) => React.ReactNode;

/**
 * Template callback with options
 * @example
 * renderItem?: (item: { item: any; index: number }, options?: any) => React.ReactNode;
 */
export type TemplateCallbackWithOptions<T = any> = (
  item: { item: T; index: number },
  options?: any
) => React.ReactNode;

/**
 * Base form props interface
 */
export interface BaseFormProps {
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

/**
 * Form props with onChange handler
 */
export interface FormWithOnChangeProps<T = any> extends BaseFormProps {
  value?: T;
  onChange?: StdCallback;
}

/**
 * Form props with items array
 */
export interface FormWithItemsProps<T = any> extends FormWithOnChangeProps<T> {
  items?: T[];
}

/**
 * API fetcher parameters
 */
export interface FetcherParams {
  current: number;
  pageSize: number;
  params?: Record<string, any>;
}

/**
 * API fetcher response
 */
export type FetcherResponse<T = any> = Promise<{
  data: T[];
  total: number;
}>;

/**
 * Table action configuration
 */
export interface TableActionProps {
  name: string;
  module?: string;
  params?: Record<string, any>;
  paramsAdd?: Record<string, any>;
  paramsEdit?: Record<string, any>;
  paramsReset?: Record<string, any>;
  pathAdd?: string;
  pathEdit?: string;
}
