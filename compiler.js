const sass = require('sass');
const fs = require('fs');

function main() {
    let sassFiles = [];
    let status;

    if (process.argv.length <= 2) {
        console.log('Example: node compiler.js <path_to_sass_dir> <path_to_css_dir>');
        return;
    }

    if (!isset(process.argv[2]) || !isset(process.argv[3])) {
        console.log('Example: node compiler.js <path_to_sass_dir> <path_to_css_dir>');
        return;
    }
    
    if (!fs.existsSync(process.argv[2]) || !fs.existsSync(process.argv[3])) {
        console.log('Error: directory (directories) not exists');
        return;
    }

    fs.readdirSync(process.argv[3]).forEach(function(file) {
        if (file.endsWith('.sass'))
            sassFiles.push(file);
    });

    if (sassFiles.length > 0)
        status = compile(process.argv[2], process.argv[3], sassFiles);

    if (status)
        console.log('Compilation successful!');
}

const isset = (arg) =>
    arg != null && arg != 'undefined' && arg.trim() != '';

function compile(cssDir, sassDir, sassFiles) {
    let code;

    try {
        sassFiles.forEach(function(file) {
            code = sass.renderSync({file: `${sassDir}/${file}`});
            
            fs.writeFile(`${cssDir}/${file.replace('.sass', '.css')}`, code.css.toString(), function(err) {
                if (err) {
                    console.log(`Error console log: ${err.message}`);
                    return false;
                }
            });
        });
    }
    catch (err) {
        console.log(`Error try/catch: ${err.message}`);
        return false;
    }

    return true;
}

main();