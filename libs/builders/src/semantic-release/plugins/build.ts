import SemanticReleaseError from '@semantic-release/error';
import { copySync, ensureDir, ensureDirSync, pathExistsSync } from 'fs-extra';
import { Context } from 'semantic-release';

import { PluginConfig } from './plugin-config';

let needsBuild = false;

async function verifyConditions(pluginConfig: PluginConfig, context: Context): Promise<void> {
  if (pathExistsSync(`${pluginConfig.outputPath}/package.json`)) {
    context.logger.log(`Project was already built`);
  } else {
    needsBuild = true;
    ensureDirSync(pluginConfig.outputPath);

    // Add fake package.json so that npm plugin doesn't fail
    copySync(pluginConfig.packageJson, `${pluginConfig.outputPath}/package.json`);
  }
}

async function prepare(pluginConfig: PluginConfig, context: Context): Promise<void> {
  if (!needsBuild) {
    return;
  }

  await ensureDir(pluginConfig.outputPath);
  context.logger.log(`Building project "${pluginConfig.project}"`);
  const buildResult = await pluginConfig.build();
  if (buildResult.success) {
    context.logger.log(`Project "${pluginConfig.project}" was built successfully`);
  } else {
    if (buildResult.error != null) {
      context.logger.log(buildResult.error);
    }
    throw new SemanticReleaseError(`Project "${pluginConfig.project}" build failed`, 'EBUILD');
  }
}

export = { verifyConditions, prepare };
