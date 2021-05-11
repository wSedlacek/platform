import * as fs from 'fs-extra';
import * as prettier from 'prettier';

export async function writeFormatted(filepath: string, content: string | Buffer): Promise<void> {
  const config: prettier.Options | null = await prettier.resolveConfig(filepath, { editorconfig: true });
  const formatted: string = prettier.format(content.toString(), { ...config, filepath });
  await fs.writeFile(filepath, formatted);
}
