import { JsonObject } from '@angular-devkit/core';

export type SemanticReleaseCommitScope = 'project' | 'all';

export interface SemanticReleaseSchema extends JsonObject {
  dryRun: boolean;
  force: boolean;
  mode: 'independent' | 'sync';
}
