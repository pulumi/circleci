"use strict";
const pulumi = require("@pulumi/pulumi");
const config = new pulumi.Config();
console.log(`config message: ${config.get("message")}`);
