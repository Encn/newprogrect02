var path = require("path");
var  webpack = require('webpack');

module.exports = {

	  entry: {
	  		reg:'./src/reg.js',
	  		entry:'./src/entry.js'

	  },
	  output: {
	    path: './build',//__dirname,
	    //path: path.resolve(__dirname, "build"),
	    filename: '[name].js'
	  },
	  module: {
	  	//加载器配置
	    loaders: [  
	      {test: /\.css$/, loader: 'style!css'},
	      {test: /\.less$/, loader: 'style!css!less'},
	     //{test: /\.js$/, loaders: 'babel-loader', exclude: /node_modules/ },
	      {test: /\.vue$/,loader: 'vue'},
	      {test: /\.json$/,loader: 'json'},
	      //{test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
	      {test: /\.js$/,exclude: /node_modules/,loader: 'babel' }// 'babel-loader' is also a legal name to reference
		   
	      
	    ]
	  },
	  plugins: [
		   /*new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }*/
	  ]
	  /*resolve: {        
	    extensions: ['', '.js', '.json', '.less','.css']//用于指明程序自动补全识别哪些后缀
	  }*/
 
}