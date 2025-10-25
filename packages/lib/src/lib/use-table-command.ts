import { AcTable } from './table';

type ExecuteFn = (command: string, ...args: any[]) => void;
type ListenFn = (command: string, callback: any) => void;

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
  const optimisticUpdate = (inData: Record<string, any>) => execute('optimisticUpdate', inData);

  return {
    listen,
    execute,
    refetch,
    reset,
    add,
    edit,
    destroy,
    optimisticUpdate,
  };
};

export default useCommand;
