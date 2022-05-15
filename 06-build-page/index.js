const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

let ind = [];
fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
  if (err) throw err;
  ind.push(...data.split('\n'));
  for (let i = 0; i < ind.length; i++) {
    fs.readdir(path.join(__dirname, 'components'), (err, data) => {
      if (err) throw err;
      for (let j = 0; j < data.length; j++) {
        let sample = path.join(__dirname, 'components', data[j]);
        let sampleInd = path.parse(path.basename(sample)).name;
        if (ind[i].includes(sampleInd)) {
          fs.readFile(
            path.join(__dirname, 'components', path.basename(sample)),
            'utf-8',
            (err, data) => {
              if (err) throw err;
              ind[i] = data;
              fs.writeFile(
                path.join(__dirname, 'project-dist', 'index.html'),
                ind.join(''),
                (err) => {
                  if (err) throw err;
                }
              );
            }
          );
        }
      }
    });
  }
});

let arr = [];
let styleFile = path.join(__dirname, 'styles');
fs.readdir(styleFile, (_err, items) => {
  for (let i = 0; i < items.length; i++) {
    let file = path.join(__dirname, 'styles', items[i]);
    if (path.extname(file) === '.css') {
      fs.stat(file, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        if (stats.isFile()) {
          fs.readFile(
            path.join(__dirname, 'styles', items[i]),
            'utf-8',
            (err, data) => {
              if (err) throw err;
              arr.push(data.toString());
              fs.writeFile(
                path.join(__dirname, 'project-dist', 'style.css'),
                arr.join(''),
                (err) => {
                  if (err) throw err;
                }
              );
            }
          );
        }
      });
    }
  }
});

fs.mkdir(
  path.join(__dirname, 'project-dist', 'assets'),
  { recursive: true },
  (err) => {
    if (err) throw err;
    fs.readdir(path.join(__dirname, 'assets'), (_err, items) => {
      for (let i = 0; i < items.length; i++) {
        fs.mkdir(
          path.join(__dirname, 'project-dist', 'assets', items[i]),
          { recursive: true },
          (err) => {
            if (err) throw err;
          },
          fs.readdir(
            path.join(__dirname, 'project-dist', 'assets', items[i]),
            { recursive: true },
            (_err, copy) => {
              if (copy) {
                for (let j = 0; j < copy.length; j++) {
                  fs.unlink(
                    path.join(
                      __dirname,
                      'project-dist',
                      'assets',
                      items[i],
                      copy[j]
                    ),
                    (err) => {
                      if (err) throw err;
                    }
                  );
                }
              }
            }
          ),
          fs.readdir(path.join(__dirname, 'assets', items[i]), (_err, copy) => {
            for (let j = 0; j < copy.length; j++) {
              fs.copyFile(
                path.join(__dirname, 'assets', items[i], copy[j]),
                path.join(
                  __dirname,
                  'project-dist',
                  'assets',
                  items[i],
                  copy[j]
                ),
                (err) => {
                  if (err) throw err;
                }
              );
            }
          })
        );
      }
    });
  }
);
