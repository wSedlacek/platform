declare module '@semantic-release/git' {
  async function verifyConditions(
    pluginConfig: import('semantic-release').Options,
    context: import('semantic-release').Context
  ): Promise<void>;

  async function prepare(pluginConfig: import('semantic-release').Options, context: import('semantic-release').Context): Promise<void>;

  export { verifyConditions, prepare };
}
