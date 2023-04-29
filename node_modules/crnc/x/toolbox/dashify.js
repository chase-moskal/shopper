/**
 * Convert a camel-case name into a dashed name
 * - for example
 *       dashify("BigManStyle")
 *       //> "big-man-style"
 */
export function dashify(camel) {
    return camel.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}
//# sourceMappingURL=dashify.js.map