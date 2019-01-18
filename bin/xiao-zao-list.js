#!/usr/bin/env node

const request = require("request");
const ora = require("ora");

const spinner = ora("Loading template list").start();
request(
  {
    url: "https://api.github.com/users/XiaoZaoFE/repos",
    headers: {
      "User-Agent": "xiao-zao-cli"
    }
  },
  function(err, res, body) {
    spinner.stop();
    if (err) return console.error(err);

    const requestBody = JSON.parse(body);
    if (Array.isArray(requestBody)) {
      console.log("  All templates:");
      console.log();
      requestBody.forEach(repo => {
        if (repo.name.indexOf("template") !== -1) {
          console.log("      - " + repo.name + "  " + repo.description);
        }
      });
      console.log();
      console.log("  You can base on template init project:");
      console.log();
      console.log("      elf init -t " + requestBody[0].name);
      console.log();
    } else {
      console.error(requestBody.message);
    }
  }
);
