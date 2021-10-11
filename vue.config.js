const path = require('path')
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
// const config = require('./src/config')
// const debug = process.env.NODE_ENV !== 'production'
let proxy = {}
const Timestamp = new Date().getTime();
// proxy['/qjrapi'] = {
// 	// 配置跨域
// 	// target: 'http://boss.nat300.top',
// 	target:'192.168.2.158:8085/qjrapi',
// 	// target:"http://boss.nat300.top/qjrapi",
// 	// target:'https://www.jieren365.cn',
// 	changOrigin: true, //允许跨域
// 	pathRewrite: {
// 		'^/qjrapi': ''
// 	}
// }

function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
		publicPath: './', // 公共,基本路径

		// 输出文件目录，不同的环境打不同包名
		outputDir: 'dist',
		assetsDir: 'static',
		lintOnSave: false,
		filenameHashing: false,
		runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
		productionSourceMap: false,
		// transpileDependencies: ['webpack-dev-server/client'],
		chainWebpack: config => {
			config.entry('main').add('babel-polyfill')
			config.entry.app = ['babel-polyfill', './src/main.js'];
		},
		 configureWebpack:{//配置骨架屏
            output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
              filename: `[name].${Timestamp}.js`,
              chunkFilename: `[name].${Timestamp}.js`
            },
			plugins : [
			        new SkeletonWebpackPlugin({
			          webpackConfig: {
			            entry: {
						
			              app: path.join(__dirname, "./src/skeleton.js")
			            }
			          },
			          minimize: true,
			          quiet: true,
					  router: {
					    // mode: 'hash',
					    routes: [
						  { path:'/',skeletonId:'skeleton1'},
					      // { path:'/index',skeletonId:'skeleton1'}
                          
						  // { path:'/home',skeletonId:'skeleton1'}
					    ]
					  }
			        })
			      ]
		   
		  },
		  // css相关配置
		  css: {
		    // 是否使用css分离插件 ExtractTextPlugin
		    extract: true,
		    // 开启 CSS source maps?
		    sourceMap: false,
		    // 启用 CSS modules for all css / pre-processor files.
		    modules: false
		  },
		


	devServer: {
		host: "0.0.0.0",
		port: 8090,
		// host: "localhost",   // 0.0.0.0
		open: true, // 配置自动启动浏览器
		// https: true,
		hotOnly: false,
		overlay: {
			warnings: true,
			errors: true
		},
		//  配置代理,解决跨域的问题, 只有一个代理

		disableHostCheck: true,
		proxy: {
			'/qjrapi': {
				// target:'http://192.168.2.158:8085/qjrapi',
				target:'https://47.97.157.184/qjrapi',
				// target: 'http://boss.nat300.top/qjrapi', //API服务器的地址
				// target:"https://www.jieren365.cn/qjrapi",
				// ws: true,  //代理websockets
                // target: 'https://www.jieren365.cn/qjrapi',
				changeOrigin: true, // 虚拟的站点需要更管origin
				pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
					'^/qjrapi': ''
				}
			}
		},

	}
}


// module.exports = {
//   // eslint-loader 是否在保存的时候检查
//   lintOnSave: process.env.NODE_ENV !== 'production',
//   // 生产环境是否生成 sourceMap 文件
//   productionSourceMap: false,
//   // webpack配置
//   chainWebpack: cfg => {
//     // cfg.resolve.alias.set('styles', resolve('src/assets/styles'))
//   },
//   configureWebpack: cfg => {},
//   // 避免默认配置把 node_modules 中的文件排除在 Babel 转译范围以外的问题
//   transpileDependencies: ['resize-detector'],
//   publicPath: config.publicPath,
//   devServer: {
//     // webpack-dev-server 相关配置
//     proxy: proxy,
//     disableHostCheck: true,
//     overlay: {
//       warnings: true,
//       errors: true
//     },
//     port: 9090
//   }
// }
