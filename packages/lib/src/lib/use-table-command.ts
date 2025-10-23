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

  return {
    listen,
    execute,
    refetch,
    reset,
  };
};

export default useCommand;
