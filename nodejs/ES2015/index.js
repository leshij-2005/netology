class Pokemon {
  constructor(name = 'Неизвестный', level = 0){
    this.name = name;
    this.level = level;
  }

  show(){
    console.log(`${this.name}, уровень ${this.level}`);
  }

  valueOf(){
    return this.level;
  }
}

class PokemonList extends Array {
  add(...args) {
    this.push(new Pokemon(...args));
  }

  show() {
    console.log(`Список покемонов (кол-во ${this.length}):`);
    
    this.forEach(item => item.show());
  }

  max() {
    const items = Object.create(this);

    items.sort((a, b) => a < b);

    return items[0];
  }
}

const lost = new PokemonList();
const found = new PokemonList();

console.log('--Добавление покемонов в список--');

lost.add('Cuvi', 6);
lost.add('Bulba', 8);
lost.add('Pirot', 2);
lost.add('Pikachu', 10);

found.add('Phili', 5);
found.add('Charmo', 3);

lost.show();
found.show();

console.log('--Перенос покемона--');

found.push.apply(found, lost.splice(0, 1));

lost.show();
found.show();

console.log('--Топовые покемоны--');

lost.max().show();
found.max().show();