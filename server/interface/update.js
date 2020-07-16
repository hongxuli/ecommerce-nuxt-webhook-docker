import Router from "koa-router";
import fs from "fs";
import crypto from "crypto";
import { start } from "../index";

let router = new Router();
router.get("*", async (ctx, next) => {
  if (ctx.upgrading) {
    console.log(ctx.upgrading);

    var htmlFile = await new Promise(function(resolve, reject) {
      fs.readFile("./upgrading.html", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    // ctx.type = "html";
    ctx.body = htmlFile;
  } else {
    await next();
  }
});

router.post("/webhooks", function(ctx) {
  const SECRET_TOKEN = "b65c19b95906e027c5d8";
  const signature = `sha1=${crypto
    .createHmac("sha1", SECRET_TOKEN)
    .update(JSON.stringify(ctx.request.body))
    .digest("hex")}`;
  // 验证签名和 Webhooks 请求中的签名是否一致
  const isValid = signature === ctx.request.headers["x-hub-signature"];
  // 如果验证通过，返回成功状态并更新服务
  if (isValid) {
    ctx.body = {
      code: 200,
      msg: "Authorized"
    };
    upgrade();
  } else {
    // 鉴权失败，返回无权限提示
    ctx.body = {
      code: 403,
      msg: "Permission Denied"
    };
  }
});

router.post("/command", function(ctx) {
  // 如果必要的话可以进行更严格的鉴权，这里只是一个示范
  if (ctx.request.headers["access_token"] === "b65c19b95906e027c5d8") {
    // 执行命令，并返回命令的执行结果
    execCommand(ctx.request.body.command, ctx.request.body.reBuild, function(
      error,
      stdout,
      stderr
    ) {
      if (error) {
        ctx.body = {
          code: 500,
          err: error
        };
      } else {
        ctx.body = {
          code: 200,
          json: json({ stdout, stderr })
        };
      }
    });
    // 如果是纯粹的重新构建，没有需要执行的命令，直接结束请求，不需要等待命令的执行结果
    if (!ctx.request.body.command && ctx.reqeust.body.reBuild) {
      ctx.body = {
        code: 200,
        msg: "Authorized and rebuilding!"
      };
    }
  } else {
    ctx.body = {
      code: 403,
      msg: "Permission Denied"
    };
  }
});

/**
 * 从 git 服务器拉取最新代码，更新 npm 依赖，并重新构建项目
 */
function upgrade() {
  execCommand("git pull -f && npm install", true);
}

/**
 * 创建子进程，执行命令
 * @param {String} command 需要执行的命令
 * @param {Boolean} reBuild 是否重新构建应用
 * @param {Function} callback 执行命令后的回调
 */
function execCommand(command, reBuild, callback) {
  command && execSync(command, { stdio: [0, 1, 2] }, callback);
  // 根据配置文件，重新构建项目
  reBuild && start();
}

export default router;
