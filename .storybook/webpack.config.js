module.exports = ({ config }) => {
	config.module.rules.push({
		test: /(\/|\.)(stories|story)\.[tj]sx?$/,
		use: '@storybook/source-loader',
	});
	return config;
}