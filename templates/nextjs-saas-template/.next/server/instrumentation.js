const CHUNK_PUBLIC_PATH = "server/instrumentation.js";
const runtime = require("./chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/templates_nextjs-saas-template_lib_logger_ts_b0223d11._.js");
runtime.loadChunk("server/chunks/templates_nextjs-saas-template_instrumentation_ts_12bd1c50._.js");
runtime.getOrInstantiateRuntimeModule("[project]/templates/nextjs-saas-template/instrumentation.ts [instrumentation] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/templates/nextjs-saas-template/instrumentation.ts [instrumentation] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
