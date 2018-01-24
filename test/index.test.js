const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackAutoInjectPlugin = require('../index')
const path = require('path')
const fs = require('fs')

// prepare env
const OUTPUT = path.join(__dirname, './dist')
test('Test for test', done => {
    webpack({
        entry: path.join(__dirname, 'src', 'index.js'),
        output: {
            path: OUTPUT
        },
        plugins: [
            new HtmlWebpackPlugin(),
            new HtmlWebpackAutoInjectPlugin({
                script: [
                    {
                        path: require.resolve('amfe-flexible'),
                        compress: true,
                        position: 'body'
                    },
                    {
                        path: require.resolve('amfe-flexible'),
                        compress: true,
                        position: 'body'
                    }
                ]
            })
        ]
    }, err => {
        console.log(`err:${JSON.stringify(err)}`)
        const file = fs.readFileSync(path.join(OUTPUT, 'index.html')).toString()
        console.log(file)
        done()
    })
})