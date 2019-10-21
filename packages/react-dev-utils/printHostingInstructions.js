/**
 * Copyright (c) 2015-present Verum Technologies
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const chalk = require('chalk');
const url = require('url');
const globalModules = require('global-modules');
const fs = require('fs');

function printHostingInstructionsSpa(
  appPackage,
  publicUrl,
  publicPath,
  buildFolder,
  useYarn
) {
  if (publicUrl && publicUrl.includes('.github.io/')) {
    // "homepage": "http://user.github.io/project"
    const publicPathname = url.parse(publicPath).pathname;
    const hasDeployScript = typeof appPackage.scripts.deploy !== 'undefined';
    printBaseMessage(buildFolder, publicPathname);

    printDeployInstructions(publicUrl, hasDeployScript, useYarn);
  } else if (publicPath !== '/') {
    // "homepage": "http://mywebsite.com/project"
    printBaseMessage(buildFolder, publicPath);
  } else {
    // "homepage": "http://mywebsite.com"
    //   or no homepage
    printBaseMessage(buildFolder, publicUrl);

    printStaticServerInstructions(buildFolder, useYarn);
  }
  console.log();
  console.log('Find out more about deployment here:');
  console.log();
  console.log(`  ${chalk.yellow('https://react-starter.dev/docs/deployment')}`);
  console.log();
}

function printBaseMessage(buildFolder, hostingLocation) {
  console.log(
    `The project was built assuming it is hosted at ${chalk.green(
      hostingLocation || 'the server root'
    )}.`
  );
  console.log(
    `You can control this with the ${chalk.green(
      'homepage'
    )} field in your ${chalk.cyan('package.json')}.`
  );

  if (!hostingLocation) {
    console.log('For example, add this to build it for GitHub Pages:');
    console.log();

    console.log(
      `  ${chalk.green('"homepage"')} ${chalk.cyan(':')} ${chalk.green(
        '"http://myname.github.io/myapp"'
      )}${chalk.cyan(',')}`
    );
  }
  console.log();
  console.log(`The ${chalk.cyan(buildFolder)} folder is ready to be deployed.`);
}

function printDeployInstructions(publicUrl, hasDeployScript, useYarn) {
  console.log(`To publish it at ${chalk.green(publicUrl)} , run:`);
  console.log();

  // If script deploy has been added to package.json, skip the instructions
  if (!hasDeployScript) {
    if (useYarn) {
      console.log(`  ${chalk.cyan('yarn')} add --dev gh-pages`);
    } else {
      console.log(`  ${chalk.cyan('npm')} install --save-dev gh-pages`);
    }
    console.log();

    console.log(
      `Add the following script in your ${chalk.cyan('package.json')}.`
    );
    console.log();

    console.log(`    ${chalk.dim('// ...')}`);
    console.log(`    ${chalk.yellow('"scripts"')}: {`);
    console.log(`      ${chalk.dim('// ...')}`);
    console.log(
      `      ${chalk.yellow('"predeploy"')}: ${chalk.yellow(
        `"${useYarn ? 'yarn' : 'npm run'} build",`
      )}`
    );
    console.log(
      `      ${chalk.yellow('"deploy"')}: ${chalk.yellow(
        '"gh-pages -d build"'
      )}`
    );
    console.log('    }');
    console.log();

    console.log('Then run:');
    console.log();
  }
  console.log(`  ${chalk.cyan(useYarn ? 'yarn' : 'npm')} run deploy`);
}

function printStaticServerInstructions(buildFolder, useYarn) {
  console.log('You may serve it with a static server:');
  console.log();

  if (!fs.existsSync(`${globalModules}/serve`)) {
    if (useYarn) {
      console.log(`  ${chalk.cyan('yarn')} global add serve`);
    } else {
      console.log(`  ${chalk.cyan('npm')} install -g serve`);
    }
  }
  console.log(`  ${chalk.cyan('serve')} -s ${buildFolder}`);
}

function printHostingInstructionsIso(assetsPath, buildFolder) {
  console.log(
    `The project was built assuming all static assets are served from the path '${chalk.green(
      assetsPath
    )}'.`
  );
  console.log();
  if (assetsPath.startsWith('/')) {
    console.log(
      'All of your static assets will be served from the rendering server.'
    );
    console.log('We recommend serving static assets from a CDN in production.');
    console.log(
      `You can control this with the ${chalk.cyan(
        'ASSETS_PATH'
      )} environment variable.`
    );
    console.log();
  }
  console.log(`The ${chalk.cyan(buildFolder)} folder is ready to be deployed.`);
  console.log();
  console.log('You may run the app with node:');
  console.log();
  console.log(` ${chalk.cyan('node')} ${buildFolder}`);
  console.log();
}

module.exports = { printHostingInstructionsSpa, printHostingInstructionsIso };
