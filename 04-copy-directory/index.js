const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {//создаем папку
  if (err) throw err;
  fs.readdir(path.join(__dirname, 'files-copy'), (_err, copy) => {// читаем содержимое новой созданной папки
    for(let j=0; j<copy.length; j++){
      fs.unlink(path.join(__dirname, 'files-copy', copy[j]), err => {//удаляем ее содержимое
        if(err) throw err;
      });
    }
  });
  fs.readdir(path.join(__dirname, 'files'), (_err, items) => {// читаем содержимое старой папки
    for (let i=0; i<items.length; i++) {
      fs.copyFile(path.join(__dirname, 'files', items[i]), path.join(__dirname, 'files-copy', items[i]), err => {//копируем содержимое старой папки в новую
        if(err) throw err;
      });
    }
  });
});



