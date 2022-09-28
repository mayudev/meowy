import Command from '../../bot/types/Command';

export default interface Category {
  name: string;
  commands: Omit<Command, 'run'>[];
}
