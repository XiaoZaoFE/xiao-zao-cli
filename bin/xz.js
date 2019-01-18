#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');

program
    .version(pkg.version)
    .command('init', 'init project')
    .command('list', 'list all templates')
    .command('start', 'run on develpoment mode')
    .command('build', 'build for production');

program.on('--help', function(){
    console.log('  Examples:');
    console.log('');
    console.log('    # Init project');
    console.log('    $ xiao-zao init');
    console.log('');
    console.log('    # Base on template init project');
    console.log('    $ xiao-zao init -t panorama');
    console.log('');
    console.log('    # See all templates');
    console.log('    $ xiao-zao list');
    console.log('');
    console.log('    # See specific subcommand help');
    console.log('    $ xiao-zao help init');
    console.log('');
    console.log('')
});

program.parse(process.argv);

// console.log('! program:', program)
// console.log('!================')

// if (!process.argv.slice(2).length) {
//   program.outputHelp()
// }
if (!program.runningCommand) {
    console.log('');
    console.log('  Unknow command: ' + program.args.join(' '));
    console.log('');
    console.log('  See help `xiao-zao help`');
    console.log('')
    // program.help()
}
