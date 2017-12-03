var OSinfo = require('./modules/OSinfo');
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var StatMode = require('stat-mode');
var colors = require('colors');

var emitter = new EventEmitter();

emitter.on('beforeCommand', function(instruction) {
    console.log('You wrote: ' + instruction + ' trying to run command.')
});

emitter.on('afterCommand', function() {
console.log('Finished command');
});

//file stats:
/*
fs.stat('./cat.jpg', function(err, stats) {
     var statMode = new StatMode(stats);
    console.log(statMode.toString());
});
*/

//file operations:
/*
var fs = require('fs');

fs.readFile('./tekst.txt', 'utf-8', function(err, data) {
    console.log(data);
});

fs.writeFile('./tekst.txt', 'Tekst, który zapiszemy w pliku tekst.txt', function(err) {
    if (err) throw err; // jeśli pojawi się błąd, wyrzuć wyjątek
    console.log('Zapisano!');
});
*/


process.stdin.setEncoding('utf-8');

process.stdout.write('Print: -o for OSInfo, -s for system language, -v for Node version\n');
process.stdout.write('File options, print: -l list current dir to file, -f for fileStats, -rw for read-write-read to file  or /exit\n');

process.stdin.on('readable', function() {
    
    // metoda .read() ma za zadanie odczytać co użytkownik podał na wejściu
    var input = process.stdin.read();

    if (input !== null) {
        
        // odpalanie zdarzenia beforeCommand (z parametrem)
        var instruction = input.toString().trim();

         emitter.emit('beforeCommand', instruction);
        
        switch (instruction) {
        
        	case '/exit':
        	process.stdout.write('Quitting app!\n');
            process.exit();
            break;

            case '-o':
            OSinfo.print();
            break;

            case '-v':
            console.log(process.versions);
            break;

            case '-s':
            console.log(process.env);
            break;

            case '-f':
            //file stats:
            
            fs.stat('./cat.jpg', function(err, stats) {
                 var statMode = new StatMode(stats);
                console.log(statMode.toString());
            });
            break;
            
            case '-rw':
            //"read-write-read after" for file:
            fs.readFile('./tekst.txt', 'utf-8', function(err, data) {
                console.log('Dane przed zapisem!'.blue);
                console.log(data);

                fs.appendFile('./tekst.txt', 'A tak wyglądają po zapisie!'.blue, function(err) {
                
                    if (err) throw err;
                    console.log('Zapisano!'.blue);
                
                    fs.readFile('./tekst.txt', 'utf-8', function(err, data) {
                        console.log('Dane po zapisie'.blue)
                        console.log(data);
                    });
                });
            });
            break;

            case '-l':
            fs.readdir('./', function(err, files) {
                if (err) throw err;

                fs.writeFile('./dirList.txt', files, function(err) {
                    if (err) throw err; 
                    console.log('Wrote to dirList.txt!'.green);
                });
            });

            break;


            default: 
            process.stderr.write('Wrong instruction!\n');
        };

         // emitowanie zdarzenia afterCommand (bez parametru)
        emitter.emit('afterCommand');

    }
});