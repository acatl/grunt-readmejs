# readmejs

> generate README.md from documented code

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install readmejs --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('readmejs');
```

## The "readmejs" task

### Overview
In your project's Gruntfile, add a section named `readmejs` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  readmejs: {
    options: {
      separator: '-----------------------',
    },
    index: {
      options: {
        showFilePath: false,
        header: 'HEADER.md',
        footer: 'LICENSE.md'
      },
      files: {
        'README.md': ['*.js']
      }
    },
    lib: {
      options: {
        showFilePath: true
      },
      files: {
        'README.md': ['lib/**/*.js']
      }
    }
  },
})
```

### Options

#### options.showFilePath
Type: `Boolean`
Default value: `false`

Set to `true` if you wish to output the path of the file.

#### options.separator
Type: `String`
Default value: `''`

A string value that is used to separate each file matched.

#### options.header
Type: `String`
Default value: `''`

Path to a header file to be concatenated at top of output.

#### options.footer
Type: `String`
Default value: `''`

Path to a footer file to be concatenated at bottom of output.


### Usage Examples

#### Default Options
In this example, no header or footer will be used, and the result will be the parsing from all the matched files.

```js
grunt.initConfig({
  readmejs: {
    options: {},
    files: {
      'lib/README.md': ['lib/*.js']
    },
  },
})
```

#### Custom Options

```js
grunt.initConfig({
  readmejs: {
    options: {
      separator: '---------------',
      showFilePath: true,
      header: 'HEADER.md',
      footer: 'LICENSE.md'
    },
    files: {
      'README.md': ['lib/**/*.js']
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Initial release)_

## License
Copyright (c) 2014 Acatl Pacheco. Licensed under the MIT license.
