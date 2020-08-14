const path = require("path");
const fs = require("fs-extra");
const config = require("./config.json");
const configFolder = __dirname;

// 根路径
const rootFolder = path.resolve(configFolder, "../");

config.computed = {};

config.es6modules.map(function(module) {
  const settings = config[module];

  // 获取src目录
  const mainDirectory = path.resolve(rootFolder, settings.build.mainFolder);
  // ts配置文件
  const tsConfigPath = path.join(mainDirectory, "tsconfig.json");

  settings.computed = {
    tsConfigPath,
  }

  // Prevent es6 bundled lib crash.
  if (fs.existsSync(tsConfigPath)) {
    const tsConfig = require(tsConfigPath);
    const srcDirectory = path.resolve(mainDirectory, tsConfig.compilerOptions.rootDir);

    const shaderGlob = srcDirectory.replace(/\\/g, "/") + "/**/*.fx";
    const shaderTSGlob = [
      srcDirectory.replace(/\\/g, "/") + "/**/*.fragment.ts",
      srcDirectory.replace(/\\/g, "/") + "/**/*.vertex.ts",
      srcDirectory.replace(/\\/g, "/") + "/**/ShadersInclude/*.ts",
    ];
    const tsGlob = srcDirectory.replace(/\\/g, "/") + "/**/*.ts*";

    // for (let library of settings.libraries) {
    //   if(library.entry){
    //     const entryPath = path.join(srcDirectory, library.entry);
    //
    //     library.computed = {
    //       entryPath
    //     };
    //   }
    // }

    settings.computed.srcDirectory = srcDirectory;
    settings.computed.shaderGlob = shaderGlob;
    settings.computed.shaderTSGlob = shaderTSGlob;
    settings.computed.tsGlob = tsGlob;
  }

});

module.exports = config;