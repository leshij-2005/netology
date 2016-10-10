const { hide, seek, readFile } = require('./module/hidenseek');
const { Pokemon, PokemonList } = require('./module/pokemon');

const PATH = './field/';

const [ command, path = PATH, data ] = process.argv.slice(2, 3);

const help = () => {
  console.log('Используйте команды:');
  console.log('hide ./path ./data.json');
  console.log('seek ./path');
}

if (!command)
{
  help();
}
else
{
  if (command == 'hide')
  {
    if (data)
    {
      readFile(data)
        .then(result => {
          const pokemons = new PokemonList();

          if (result)
          {
            try {
              const items = JSON.parse(result);
              items.forEach(item => pokemons.add(...item))
            }
            catch (err) {
              console.log(err);
            }
          }

          hide(path, pokemons)
            .then(result => {
              console.log('--Спрятаны--');
              console.log(result);

              seek(path)
                .then(list => {        
                  console.log('--Найдены--');
                  list.show();
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));          
        });
    }
  }

  if (command == 'seek')
  {
    seek(path)
      .then(list => {        
        console.log('--Найдены--');
        list.show();
      })
      .catch(err => console.log(err));
  }

  if (!/hide|seek/.test(command))
    help();
}
