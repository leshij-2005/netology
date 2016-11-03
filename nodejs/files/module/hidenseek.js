const { PokemonList } = require('./pokemon');
const fs = require('fs');

const hidePokemon = (path, pokemon) => {
  const file = `${path}pokemon.txt`;
  const data = `${pokemon.name}|${pokemon.level}\r\n`;

  return new Promise((resolve, reject) => {
    fs.appendFile(file, data, err => {
      if (err) return reject(err);

      resolve({
        file,
        pokemon
      });
    });
  });
}

const createDir = dir => {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, err => {
      if(!err || (err && err.code == 'EEXIST'))
        resolve(dir);
      
      return reject(err);
    });
  });
}

const createDirs = (path, count) => {
  const dirs = [];

  return createDir(path)
    .then(dir => {
      for(let i = 1; i <= count; i++)
      {
        let name = i < 10 ? `0${i}` : i;
        let dirName = `${dir}${name}/`;

        dirs.push(createDir(dirName));
      }

      return Promise.all(dirs);
    });
};

const readFile = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding: 'utf-8'}, (err, text) => {
      if (err)
        return resolve(err.code == 'ENOENT' ? '' : err);

      resolve(text);
    });
  });
};

module.exports = {
  readFile,  
  hide: (path = './', items) => {
    items = new Array(...items);

    const DIR_COUNT = 10;
    const selectedItems = [];
    const dirNumbers = [];
    const maxCount = items.length > 3 ? 3 : items.length;

    const count = Math.floor(Math.random() * (maxCount - 1) + 1);

    for(let i = 1; i <= count; i++)
    {
      let idx = Math.floor(Math.random() * items.length);
      selectedItems.push(...items.splice(idx, 1));

      dirNumbers.push(Math.floor(Math.random() * (DIR_COUNT - 1)) + 1)
    }

    return createDirs(path, DIR_COUNT)
      .then(dirs => {
        const promises = [];

        dirNumbers.forEach((number, idx) => {
          promises.push(hidePokemon(dirs[number - 1], selectedItems[idx]));
        });

        return Promise.all(promises);
      });
  },
  seek: (path = './') => {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) return reject(err);
        resolve(files);
      });
    }).then(dirs => {
      const promises = [];

      dirs.forEach(dir => {
        promises.push(readFile(`${path}${dir}/pokemon.txt`));
      });

      return Promise.all(promises);
    }).then(result => {
      const list = new PokemonList();

      result.forEach(text => {
        if (text)
        {
          const lines = text.split(`\r\n`);

          lines.forEach(line => {
            if (line)
              list.add(...line.split('|'));
          });
        }
      });

      return list;
    })
  }
}