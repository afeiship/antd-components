import { AcTable } from './table';

const useCommand = (inName?: string) => {
  const name = inName || '@';
  const execute = (command: string, ...args: any[]) =>
    AcTable.event?.emit(`${name}:${command}`, ...args);

  const listen = (cmd: string, callback: any) => AcTable.event?.on(`${name}:${cmd}`, callback);

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
