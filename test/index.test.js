const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackAutoInjectPlugin = require('../index')
const path = require('path')
const fs = require('fs')
const cherrio = require('cheerio')

// prepare env
const OUTPUT = path.join(__dirname, './dist')
test('It will be compress', done => {
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
                        path: require.resolve('./src/inject.js'),
                        compress: true
                    }
                ]
            })
        ]
    }, err => {
        if (err) {
            throw new Error(err)
        }
        const file = fs.readFileSync(path.join(OUTPUT, 'index.html')).toString()
        const $ = cherrio.load(file)
        const result = $('script')
        expect(result.html()).toBe('console.log("it will be inject");var test=1;function test1(o){console.log(o)}')
        done()
    })
})

test('It will not be compress', done => {
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
                        path: require.resolve('./src/inject.js')
                    }
                ]
            })
        ]
    }, err => {
        if (err) {
            throw new Error(err)
        }
        const file = fs.readFileSync(path.join(OUTPUT, 'index.html')).toString()
        const $ = cherrio.load(file)
        const result = $('script')
        expect(result.html()).toBe('console.log(\'it will be inject\')\n' +
            'var test = 1\n' +
            '\n' +
            'function test1(abc) {\n' +
            '    console.log(abc)\n' +
            '}')
        done()
    })
})

test('It will inject to head', done => {
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
                        path: require.resolve('./src/inject.js'),
                        compress: true
                    }
                ]
            })
        ]
    }, err => {
        if (err) {
            throw new Error(err)
        }
        const file = fs.readFileSync(path.join(OUTPUT, 'index.html')).toString()
        const $ = cherrio.load(file)
        const result = $('script')
        expect(result.html()).toBe('console.log("it will be inject");var test=1;function test1(o){console.log(o)}')
        done()
    })
})


test('It will inject to body', done => {
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
                        path: require.resolve('./src/inject.js'),
                        compress: true,
                        position: 'body'
                    }
                ]
            })
        ]
    }, err => {
        if (err) {
            throw new Error(err)
        }
        const file = fs.readFileSync(path.join(OUTPUT, 'index.html')).toString()
        const $ = cherrio.load(file)
        const result = $('body script')
        expect(result.html()).toBe('console.log("it will be inject");var test=1;function test1(o){console.log(o)}')
        done()
    })
})
