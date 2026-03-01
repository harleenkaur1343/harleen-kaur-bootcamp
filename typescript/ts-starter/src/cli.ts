export class TaskCLI {
  constructor(private manager: TaskManager);

  async run(args: string[]): Promise<void>;

  private setupCommands(): void;
  private interactive(): Promise<void>;
}