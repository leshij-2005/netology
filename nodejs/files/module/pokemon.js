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
    const maxLevel = Math.max(...this);

    return this.find(item => item.level == maxLevel);
  }
}

module.exports = {
  Pokemon,
  PokemonList
};