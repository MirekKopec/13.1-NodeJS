var OSinfo = require('./modules/OSinfo');
var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

emitter.on('beforeCommand', function(instruction) {
    console.log('You wrote: ' + instruction + ' trying to run command.')
});

emitter.on('afterCommand', function() {
console.log('Finished command');
});


process.stdin.setEncoding('utf-8');

process.stdout.write('Print: -o for OSInfo, -s for system language, -v for Node version or /exit\n');

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

            default: 
            process.stderr.write('Wrong instruction!\n');
        };

         // emitowanie zdarzenia afterCommand (bez parametru)
        emitter.emit('afterCommand');

    }
});