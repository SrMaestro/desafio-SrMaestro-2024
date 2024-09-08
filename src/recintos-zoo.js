class RecintosZoo {

  especies = [
    { especie: "LEAO", tamanho: 3, biomas: ["savana"], carnivoro: true },
    { especie: "LEOPARDO", tamanho: 2, biomas: ["savana"], carnivoro: true },
    { especie: "CROCODILO", tamanho: 3, biomas: ["rio"], carnivoro: true },
    { especie: "MACACO", tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
    { especie: "GAZELA", tamanho: 2, biomas: ["savana"], carnivoro: false },
    { especie: "HIPOPOTAMO", tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
  ];

  recintos = [{
    numero: 1,
    bioma: "savana",
    tamanhoTotal: 10,
    animaisExistentes: ['macaco', 'macaco', 'macaco'],
    espacoUsado: 3
  },
  {
    numero: 2,
    bioma: "floresta",
    tamanhoTotal: 5,
    animaisExistentes: [""],
    espacoUsado: 0
  },
  {
    numero: 3,
    bioma: "savana e rio",
    tamanhoTotal: 7,
    animaisExistentes: ["gazela"],
    espacoUsado: 2
  },
  {
    numero: 4,
    bioma: "rio",
    tamanhoTotal: 8,
    animaisExistentes: [""],
    espacoUsado: 0
  },
  {
    numero: 5,
    bioma: "savana",
    tamanhoTotal: 9,
    animaisExistentes: ["leao"],
    espacoUsado: 3
  }]

  analisaRecintos(animal, quantidade) {
    const especie = this.especies.find(e => e.especie === animal.toUpperCase());
    if (!especie) {
      return { erro: "Animal inválido" };
    }

    if (quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    let recintosViaveis = [];

    for (const recinto of this.recintos) {
      const espacoDisponivel = recinto.tamanhoTotal - recinto.espacoUsado;
      const espacoNecessario = especie.tamanho * quantidade + (recinto.animaisExistentes.length > 0 ? 1 : 0); // Regra do espaço extra para espécies diferentes

      // Verifica se o bioma é compatível e se há espaço suficiente
      if (
        especie.biomas.some(b => recinto.bioma.includes(b)) &&
        espacoDisponivel >= espacoNecessario &&
        this.verificaRegrasAdicionais(recinto, especie, quantidade)
      ) {
        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario} total: ${recinto.tamanhoTotal})`
        );

        // Atualiza o recinto com os novos animais
        recinto.animaisExistentes.push(...Array(quantidade).fill(animal));
        recinto.espacoUsado += espacoNecessario;
      }
    }

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    // Ordena por número do recinto
    recintosViaveis.sort((a, b) => a.numero - b.numero);

    // Retorna os recintos viáveis como solicitado
    return {
      recintosViaveis: recintosViaveis
    };
  }

  verificaRegrasAdicionais(recinto, especie, quantidade) {
    // Regra 2: Carnívoros só podem ficar com a própria espécie
    if (especie.carnivoro && recinto.animaisExistentes.some(a => a && this.especies.find(e => e.especie.toUpperCase() !== especie.especie))) {
      return false;
    }

    // Regra 3: Animais já presentes no recinto devem continuar confortáveis
    if (recinto.animaisExistentes.some(a => a && !this.verificaCompatibilidade(this.especies.find(e => e.especie.toUpperCase() === a.toUpperCase()), especie))) {
      return false;
    }

    // Regra 4: Hipopótamo só pode ficar em biomas com rio e savana
    if (especie.especie === 'HIPOPOTAMO' && !recinto.bioma.includes('rio')) {
      return false;
    }

    // Regra 5: Macaco não pode ser colocado com outros animais
    if (especie.especie === 'MACACO' && recinto.animaisExistentes.some(a => a && a !== 'MACACO')) {
      return false;
    }

    // Regra 7: Não é possível dividir animais em diferentes recintos
    if (recinto.animaisExistentes.length > 0 && quantidade > recinto.tamanhoTotal - recinto.espacoUsado) {
      return false;
    }

    return true;
  }

  verificaCompatibilidade(especie1, especie2) {
    // Carnívoros não podem ser colocados com herbívoros
    if (especie1.carnivoro && !especie2.carnivoro) return false;
    if (!especie1.carnivoro && especie2.carnivoro) return false;

    return true;
  }
}

export { RecintosZoo as RecintosZoo };

const zoo = new RecintosZoo();
console.log(zoo.analisaRecintos('macaco', 2)); // Exemplo de entrada válida
console.log(zoo.analisaRecintos('unicornio', 1)); // Exemplo de entrada inválida
