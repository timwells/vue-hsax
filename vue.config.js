module.exports = {
	runtimeCompiler: true,
	productionSourceMap: false,

	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].title = 'HSA-X'
				return args
			})
	}
}
