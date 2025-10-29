import { AcTable } from './table';

type ExecuteFn = (command: string, data?: any) => void;
type ListenFn = (command: string, callback: any) => void;
type Payload = Record<string, any>;

const useCommand = (inName?: string) => {
  const name = inName || '@';
  const execute: ExecuteFn = (command, ...args) => AcTable.event?.emit(`${name}:${command}`, ...args);
  const listen: ListenFn = (cmd, callback) => AcTable.event?.on(`${name}:${cmd}`, callback);

  // the command repository:
  const load = () => execute('load');
  const refetch = () => execute('refetch');
  const reset = () => execute('reset');
  const add = () => execute('add');
  const edit = () => execute('edit');
  const destroy = () => execute('destroy');
  const draft = (payload: Payload) => execute('draft', payload);

  return {
    listen,
    execute,
    load,
    refetch,
    reset,
    add,
    edit,
    destroy,
    draft,
  };
};

export default useCommand;
