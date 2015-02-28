module.exports = {
    parser: {
        isRoute: function(node) {
            function recursiveSearch(node) {
                return (node && node.callee) &&
                    (
                    (node.callee.type === 'MemberExpression' &&
                    node.callee.object.name === '$stateProvider' &&
                    node.callee.property.name === 'state' &&
                    node.arguments.length === 2 &&
                    node.arguments[1].type === 'ObjectExpression')
                    ||
                    recursiveSearch(node.callee.object)
                    )
            }

            return recursiveSearch(node);
        },
        extractRoute: function(node) {
            return node.arguments[1].properties
                .filter(function(property) {
                    return property.key.name === 'url';
                })
                .map(function(property) {
                    return property.value.value
                })
                .pop();

        }
    }
};
