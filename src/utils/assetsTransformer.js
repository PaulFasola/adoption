// From: https://github.com/facebook/jest/issues/2663#issuecomment-317109798

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
	process(src, filename, config, options) {
		return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
	},
};