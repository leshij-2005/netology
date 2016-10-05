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
  constructor(...items){
    items = items.filter(item => item instanceof Pokemon);
    
    super(...items);
  }

  add(...args) {
    this.push(new Pokemon(...args));
  }

  show() {
    console.log(`Список покемонов (кол-во ${this.length}):`);
    
    this.forEach(item => item.show());
  }

  max() {
    return this.find(item => item.level == Math.max(...this));
  }
}

const lost = new PokemonList({}, {}, new Pokemon('Bater', 0));
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

found.push(...lost.splice(0, 1));

lost.show();
found.show();

console.log('--Топовые покемоны--');

lost.max().show();
found.max().show();