# Auto Inject extension for the HTML Webpack Plugin
html-webpack-auto-inject-plugin，auto inject js file to html

## Why you need
Sometimes,I just need require/import a js source inject to html file.ie:`flexible.js`,`some log js`,but I have to modify html template file or require/import file that I won't actually exec by code manually.

## Feature
Now Support:

- Auto inject js file
- Compress js file

Will Support

- Auto inject css file
- What you want by create issue to me

## How to use
This plugin require `html-webpack-plugin`,because listen the event by emit `html-webpack-plugin`:`html-webpack-plugin-before-html-processing`.

## Installation
You must be running webpack on node 4 or higher

Install the plugin with npm:

```bash
$ npm install --save-dev html-webpack-auto-inject-plugin
```

## Basic Usage
Require the plugin in your webpack config:

```javascript
const HtmlWebpackAutoInjectPlugin = require('html-webpack-auto-inject-plugin');
```

For now,just support javascript file import,will support css file import in 1.0 version.

All javascript file import config are set in `script`

Add the plugin to your webpack config as follows:

### options

#### script [Array]
Accept `string` for file path and `Object` for custom config.Above are explain of options:

| Key | Type | Default | Accept | Require | Mean |
| --- | --- | --- | --- | --- | --- |
| path | String | undefined | Any String | True | The path of your want auto inject to html |
| position | String | 'head' | ‘head’,’body' | False | The position your want to placed code. `head` for inject to head.`body` for inject to end of body. |
| compress | Boolean | false | true,false | False | Compress or not.`uglify-js`. |

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackAutoInjectPlugin({
    script: [
        // relative path
        './path/to/js',
        // recommend in this way by use node auto resolve the path of you need inject
        require.resolve('amfe-flexible'),

        // absolute path
        '/User/sinoon/code/path/to/js',

        // custom config
        {
            path: './path/to/js',
            compress: true,
            position: 'body'
        }
    ]
  })
]
```

## TODO
- [ ] Support Css.
- [ ] Support Ignore.Match by regexp.
