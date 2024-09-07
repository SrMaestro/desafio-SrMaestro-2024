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
        animaisExistentes: ['macaco','macaco','macaco']
    },
    {
        numero:2,                                                                                                                          
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

    constructor(recintos){
        this.recintos = this.recintos;
    }


    analisaRecintos(animal, quantidade) {

    
    let recintosViaveis = [];

    

                // Filtra recintos viáveis com base no bioma e no espaço
                for (const element of this.recintos) {
                    const recinto = element;
                    const espacoOcupado = recinto.animaisExistentes.length;
                    const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;
        
                    // Verifica se o bioma é adequado e se há espaço suficiente
                    if ( animal == "macaco" || recinto.bioma.includes("savana") || recinto.bioma.includes("floresta")) {

                        if (espacoDisponivel >= quantidade) {
                             // Adiciona o macaco ao recinto (assumindo que animaisExistentes é um array)
                            for(let i = 0 ;  i < quantidade; i++){
                                    recinto.animaisExistentes.push("macaco");
                                }
                                recinto.animaisExistentes.push('macaco');
                                recintosViaveis.push(recinto);
                            }
                    }
                }

        //==============================================================//

        
        //         // Retorna os recintos viáveis
        //         if (recintosViaveis.length > 0) {
        //             console.log(`Recintos viáveis para ${quantidade} ${animal}(s):`, recintosViaveis);
        //         } else {
        //             console.log(`Nenhum recinto viável encontrado para ${quantidade} ${animal}(s).`);
        //         }
            }
    
    
}

export { RecintosZoo as RecintosZoo };

const zoo = new RecintosZoo()
zoo.analisaRecintos( 'macaco' , 2)









