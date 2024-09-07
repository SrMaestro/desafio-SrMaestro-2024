class RecintosZoo {

  especies = [
    { especie: "LEAO", tamanho: 3, biomas: ["savana"] },
    { especie: "LEOPARDO", tamanho: 2, biomas: ["savana"] },
    { especie: "CROCODILO", tamanho: 3, biomas: ["rio"] },
    { especie: "MACACO", tamanho: 1, biomas: ["savana", "floresta"] },
    { especie: "GAZELA", tamanho: 2, biomas: ["savana"] },
    { especie: "HIPOPOTAMO", tamanho: 4, biomas: ["savana", "rio"] }
  ];

  recintos = [{
    numero: 1,
    bioma: "savana",
    tamanhoTotal: 10,
    animaisExistentes: ['macaco', 'macaco', 'macaco']
  },
  {
    numero: 2,
    bioma: "floresta",
    tamanhoTotal: 5,
    animaisExistentes: [""]
  },
  {
    numero: 3,
    bioma: "savana e rio",
    tamanhoTotal: 7,
    animaisExistentes: ["gazela"]
  },
  {
    numero: 4,
    bioma: "rio",
    tamanhoTotal: 8,
    animaisExistentes: [""]
  },
  {
    numero: 5,
    bioma: "savana",
    tamanhoTotal: 9,
    animaisExistentes: ["leao"]
  }]

  constructor(recintos) {
    this.recintos = this.recintos;
  }


  analisaRecintos(animal, quantidade) {

    // Verifica se o animal existe
    const especie = this.especies.find(e => e.especie === animal.toUpperCase());
    if (!especie) {
        return console.error(`Animal ${animal} não encontrado.`);
    }

    let recintosViaveis = [];

    for (const recinto of this.recintos) {
        // Verifica se o bioma é compatível e se há espaço suficiente
        if (especie.biomas.some(b => recinto.bioma.includes(b)) &&
            recinto.tamanhoTotal - recinto.animaisExistentes.length >= quantidade) {
            recintosViaveis.push(recinto);
            recinto.animaisExistentes.push(...Array(quantidade).fill(animal));
        }
    }
      


    return console.log(recintosViaveis)
    

    
  }
}

export { RecintosZoo as RecintosZoo };

const zoo = new RecintosZoo()
zoo.analisaRecintos('leao', 1)