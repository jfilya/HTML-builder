const fs = require('fs');
const path = require('path');

let secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, (_err, items) => {
  for (let i=0; i<items.length; i++) {
    let file =  path.join(__dirname, 'secret-folder', items[i]);
    fs.stat(file, (err,stats) => {
      if (err) {
        console.error(err);
        return;
      }
      if(stats.isFile()){
        console.log(path.parse(path.basename(items[i])).name,'-',path.extname(items[i]).substring(1),'-',stats.size/1024+'kb');
      }

    });  
  }
});
