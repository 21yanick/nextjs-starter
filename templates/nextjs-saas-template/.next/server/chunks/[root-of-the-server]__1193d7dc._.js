module.exports = {

"[externals]/pino [external] (pino, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("pino", () => require("pino"));

module.exports = mod;
}}),
"[project]/templates/nextjs-saas-template/lib/logger.ts [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getLogger": (()=>getLogger),
    "logger": (()=>logger)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/pino [external] (pino, cjs)");
;
const isDevelopment = ("TURBOPACK compile-time value", "development") === 'development';
const logger = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$pino__$5b$external$5d$__$28$pino$2c$__cjs$29$__["default"])({
    level: process.env.LOG_LEVEL || 'info',
    ...("TURBOPACK compile-time truthy", 1) ? {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                ignore: 'pid,hostname',
                translateTime: 'HH:MM:ss'
            }
        }
    } : ("TURBOPACK unreachable", undefined)
});
const getLogger = (module)=>logger.child({
        module
    });
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__1193d7dc._.js.map