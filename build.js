const fs = require("fs");

const outputDir = `${__dirname}/site`;
fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir);

const pages = fs.readdirSync(__dirname + "/src/pages");

for (let page of pages) {
  let pageHTML = fs.readFileSync(`${__dirname}/src/pages/${page}`, "utf8");
  const templates = pageHTML.match(/\<template-[a-z]+ \/\>/g) ?? [];

  for (let template of templates) {
    let name = template.slice(10).slice(0, -3);

    pageHTML = pageHTML.replace(
      template,
      fs.readFileSync(`${__dirname}/src/templates/${name}.html`, "utf8")
    );
  }

  fs.writeFileSync(`${__dirname}/site/${page}`, pageHTML);
}

const staticFiles = fs.readdirSync(__dirname + "/src/static");

for (let file of staticFiles) {
  fs.copyFileSync(
    `${__dirname}/src/static/${file}`,
    `${__dirname}/site/${file}`
  );
}
