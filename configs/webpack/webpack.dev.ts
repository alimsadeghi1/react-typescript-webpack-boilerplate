// * Import Webpack stuff
import 'webpack-dev-server';
import { merge } from 'webpack-merge';
import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, DefinePlugin } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';


// * Import Tools
import dotenv from 'dotenv';
import { resolve, join } from 'path';

// * Import Depended config files
import commonConfig from './webpack.common';


// ? ENV Config 
dotenv.config({ path: resolve('env/.env.development') });

const devConfig: Configuration = {
    mode: 'development',
    devServer: {
        port: 3000,
        historyApiFallback: true,
        client: {
            logging: 'none'
        },
        open: true
    },
    output: {
        path: join(__dirname, 'dist'),
        filename: '[name].js',
    },
    devtool: 'source-map',
    plugins: [
        new ESLintPlugin({
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        }),
        new DefinePlugin({
            'process.env': JSON.stringify(process.env)
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            overlay: true,
            hot: true
        }),
        new CleanWebpackPlugin()
    ]
};

export default merge<Configuration>(commonConfig, devConfig);
