# Auto Inject extension for the HTML Webpack Plugin
html-webpack-auto-inject-plugin，auto inject js file to html

## Why you need this
Sometimes,I just need require/import a js source inject to html file.ie:`flexible.js`,`some log`,but I have to modify html template file or require/import file that I won't actually exec by code manually.

## Feature
Now Support:
- auto inject js file
- compress js file

Will Support
- auto inject css file
- do you want by create issue to me

## How to use
This plugin require `html-webpack-plugin`,because listen the event by emit `html-webpack-plugin`:`html-webpack-plugin-before-html-processing`.

## Installation
You must be running webpack on node 4 or higher

Install the plugin with npm:
```bash
$ npm install --save-dev html-webpack-inline-source-plugin
```

## Basic Usage
Require the plugin in your webpack config:

```javascript
const HtmlWebpackAutoInjectPlugin = require('html-webpack-auto-inject-plugin');
```

Add the plugin to your webpack config as follows:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackAutoInjectPlugin({
    script: [
        // relative path
        './path/to/js',
        // absolute path
        '/User/sinoon/code/path/to/js',
        {
            path: './path/to/js',
            compress: true
        }
    ]
  })
]
```
