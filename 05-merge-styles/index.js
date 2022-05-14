const fs = require('fs');
const path = require('path');
let arr = [];
let styleFile=path.join(__dirname, 'styles');
fs.readdir(styleFile, (_err, items) => {
  for(let i=0; i<items.length; i++){
    let file =  path.join(__dirname, 'styles', items[i]);
    if(path.extname(file) ==='.css'){
      fs.stat(file, (err,stats) => {
        if (err) {
          console.error(err);
          return;
        }
        if(stats.isFile()){
          fs.readFile(
            path.join(__dirname, 'styles', items[i]),
            'utf-8',
            (err, data) => {
              if (err) throw err;
              arr.push(data.toString());
              fs.writeFile(
                path.join(__dirname, 'project-dist', 'bundle.css'),
                arr.join(''),
                (err) => {
                  if (err) throw err;
                }
              );
            },
          );
        }
      });    
    }
  }
});


