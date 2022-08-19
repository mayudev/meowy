/**
 * Command invocation provided by the user
 */
export class CommandArguments {
  name: string;
  args: string[];

  constructor(content: string) {
    const args = content.split(' ');
    this.name = args[0].slice(1);
    this.args = args.slice(1);
  }

  /**
   * Joins the arguments into a string
   */
  join() {
    return this.args.join(' ');
  }
}
