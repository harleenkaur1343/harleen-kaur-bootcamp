export interface TaskPlugin {
  name: string;
  version: string;
  commands?: PluginCommand[];
  hooks?: PluginHooks;
}

export interface PluginCommand {
  name: string;
  description: string;
  handler: CommandHandler;
}