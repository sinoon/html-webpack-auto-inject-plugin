const fs = require('fs')
const path = require('path')
const UglifyJS = require('uglify-js')
const debug = require('debug')('auto-inject')

const positionMap = {
    'true': 'body',
    'body': 'body',
    'head': 'head'
}

function AutoInject (options) {
    this.options = options
    let {script} = options
    debug(options)
    // relative or absolute
    // default head
    script = script.map(script => {
        // change format
        return getDefaultConfig(script)
    })
    debug(script)

    options.script = script.map(item => {
        // read file
        const filePath = (() => {
            const filePath = item.path

            if (filePath[0] === '/') {
                return filePath
            } else {
                return path.resolve(__dirname, item.path)
            }
        })()
        debug(filePath)
        const file = fs.readFileSync(filePath).toString()
        debug(file)
        // 1. read file
        const {compress} = item
        let code
        // 2. compress or not
        if (compress) {
            code = UglifyJS.minify(file).code
        } else {
            code = file
        }
        item.code = `<script>${code}</script>`
        return item
    })
    debug(options)
}

// noinspection JSUnusedGlobalSymbols
AutoInject.prototype.apply = function (compiler) {
    const {options} = this
    const {script} = options
    compiler.plugin('compilation', (compilation) => {
        compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
            script.map(script => {
                htmlPluginData.html = this.replace(htmlPluginData.html, script.code, script.position)
            })
            callback(null, htmlPluginData)
        })
    })
}

AutoInject.prototype.replace = function (html, content, position = 'head') {
    position = positionMap[position]
    return html.replace(`</${position}>`, `${content}</${position}>`)
}

function getDefaultConfig (path) {
    if (typeof path === 'string') {
        return {
            path,
            ...defaultConfig
        }
    } else {
        return {
            ...defaultConfig,
            ...path
        }
    }
}

const defaultConfig = {
    position: 'head',
    compress: false
}

module.exports = AutoInject
