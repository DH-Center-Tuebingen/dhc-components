import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

const sourceComponentsDirectory = 'src/components';
const declarationComponentsDirectory = 'dist/components';

function createTypeEntries(directory) {
    for(const entry of readdirSync(directory, { withFileTypes: true })) {
        const sourcePath = join(directory, entry.name);

        if(entry.isDirectory()) {
            createTypeEntries(sourcePath);
            continue;
        }

        if(!entry.isFile() || !entry.name.endsWith('.vue')) {
            continue;
        }

        const sourceRelativePath = relative(sourceComponentsDirectory, sourcePath);
        const pathSegments = sourceRelativePath.split(/[/\\]/);
        const componentName = pathSegments.pop().replace(/\.vue$/, '');
        pathSegments.pop();
        const entryPath = join('dist', ...pathSegments, `${componentName}.d.ts`);
        const declarationPath = join(declarationComponentsDirectory, sourceRelativePath.replace(/\.vue$/, '.vue.d.ts'));
        const importPath = relative(dirname(entryPath), declarationPath).replace(/\\/g, '/').replace(/\.d\.ts$/, '');

        mkdirSync(dirname(entryPath), { recursive: true });
        writeFileSync(entryPath, `export { default } from './${importPath.replace(/^\.\//, '')}';\n`);
    }
}

if(existsSync(sourceComponentsDirectory)) {
    createTypeEntries(sourceComponentsDirectory);
}