module.exports = {

"[project]/templates/nextjs-saas-template/instrumentation.ts [instrumentation] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "register": (()=>register)
});
async function register() {
    if ("TURBOPACK compile-time truthy", 1) {
        const { logger } = await __turbopack_context__.r("[project]/templates/nextjs-saas-template/lib/logger.ts [instrumentation] (ecmascript, async loader)")(__turbopack_context__.i);
        // Log unhandled errors
        process.on('unhandledRejection', (reason, promise)=>{
            logger.error({
                err: reason
            }, 'Unhandled Promise Rejection');
        });
        process.on('uncaughtException', (error)=>{
            logger.fatal({
                err: error
            }, 'Uncaught Exception');
            process.exit(1);
        });
    }
}
}}),

};

//# sourceMappingURL=templates_nextjs-saas-template_instrumentation_ts_12bd1c50._.js.map