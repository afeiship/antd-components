import { AcTable } from './table';

type ExecuteFn = (command: string, data?: any) => void;
type ListenFn = (command: string, callback: any) => void;
type Payload = Record<string, any>;

const useCommand = (inName?: string) => {
  const name = inName || '@';
  const execute: ExecuteFn = (command, ...args) => AcTable.event?.emit(`${name}:${command}`, ...args);
  const listen: ListenFn = (cmd, callback) => AcTable.event?.on(`${name}:${cmd}`, callback);

  // the command repository:
  const refetch = () => execute('refetch');
  const reset = () => execute('reset');
  const add = () => execute('add');
  const edit = () => execute('edit');
  const destroy = () => execute('destroy');
  const optimistic = (payload: Payload) => execute('optimistic', payload);

  return {
    listen,
    execute,
    refetch,
    reset,
    add,
    edit,
    destroy,
    optimistic,
  };
};

export default useCommand;
