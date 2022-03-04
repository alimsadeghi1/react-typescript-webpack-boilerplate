// * Import Webpack stuff
import { Configuration, ProvidePlugin } from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';

// * Import Tools
import { resolve } from 'path';

const commonConfig: Configuration = {
    module: {
        rules: [
            {
                test: /\.m?(js|ts|jsx|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-typescript'],
                        plugins: [
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                }
            },
            {
                test: /\.(js|ts|jsx|tsx)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: ['source-map-loader']
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg|webp|mp4|jfif)$/,
                use: 'file-loader?name=assets/media/[name].[ext]'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: 'file-loader?name=assets/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ProvidePlugin({
            process: 'process/browser'
        }),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: 'src/assets/media/images/icons',
        //             to: 'images/pwa-icons'
        //         }
        //     ]
        // })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            // * Main root
            '@components': resolve(__dirname, '../../src/components'),
            '@assets': resolve(__dirname, '../../src/assets'),
            '@configs': resolve(__dirname, '../../configs'),
            '@public': resolve(__dirname, '../../public'),
            '@utils': resolve(__dirname, '../../src/utils'),
            '@redux': resolve(__dirname, '../../src/store/redux')
        }
    },
};

export default commonConfig;
