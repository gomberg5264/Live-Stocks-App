module.exports = {
	webpack: (config, { dev }) => {
		config.module.rules.push({
			test: /\.scss/,
			use: [
				{
					loader: 'emit-file-loader',
					options: {
						name: 'dist/[path][name].[ext]'
					}
				},
				'babel-loader',
				'styled-jsx-css-loader',
				{
					loader: 'sass-loader',
					options: { sourceMap: dev }
				}
			]
		})
		return config
	}
}
