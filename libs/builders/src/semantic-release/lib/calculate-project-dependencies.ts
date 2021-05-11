import { BuilderContext } from '@angular-devkit/architect';
import { createProjectGraph, ProjectGraph, ProjectType } from '@nrwl/workspace/src/core/project-graph';
import { readJsonFile } from '@nrwl/workspace/src/utilities/fileutils';
import { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package';

interface ProjectWithDependentPackage {
  project: string;
  packageJsonPath: string;
  packageJson: JSONSchemaForNPMPackageJsonFiles;
  dependencies: ProjectWithDependentPackage[];
}

export interface ProjectDependency {
  project: string;
  packageJsonPath: string;
}

export function calculateProjectDependencies(context: BuilderContext): ProjectDependency[] {
  const projGraph: ProjectGraph = createProjectGraph();

  const target = context.target;
  const targetName = context.target?.target;

  if (target == null || targetName == null) {
    context.logger.info('Target is needed to find dependent projects.');
    return [];
  }

  const dependentPackages: ProjectWithDependentPackage[] = Object.values(projGraph.nodes)
    .filter(({ type, data }) => type === ProjectType.lib && data.targets && data.targets[targetName] && data.targets[targetName].executor)
    .map((node): ProjectWithDependentPackage => {
      const packageJsonPath = `${node.data.root}/package.json`;
      return {
        project: node.name,
        packageJsonPath,
        packageJson: readJsonFile<JSONSchemaForNPMPackageJsonFiles>(packageJsonPath),
        dependencies: [],
      };
    });

  dependentPackages.forEach((project) => {
    project.dependencies = dependentPackages.filter(
      ({ packageJson }) =>
        packageJson.dependencies?.[project.packageJson.name as string] || packageJson.peerDependencies?.[project.packageJson.name as string]
    );
  });

  const projectWithDependencies: ProjectWithDependentPackage = dependentPackages.filter(({ project }) => project === target.project)[0];

  const dependencies: ProjectDependency[] = projectWithDependencies.dependencies.map(
    ({ project, packageJsonPath }): ProjectDependency => ({ project, packageJsonPath })
  );

  return dependencies;
}
