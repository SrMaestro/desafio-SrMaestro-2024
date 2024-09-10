// RecintosZoo.js
import especies from './especies.js';
import recintos from './recintos.js';

class RecintosZoo {
    constructor() {
        // Use as espécies e recintos importados
        this.especies = especies;
        this.recintos = recintos;
    }

    analisaRecintos(animal, quantidade) {

        const especie = this.encontraEspecie(animal);
        const erro = this.verificaEntradaInvalida(especie, quantidade);
        if (erro) return erro;

        let recintosViaveis = [];

        for (const recinto of this.recintos) {
            const espacoDisponivel = recinto.tamanhoTotal - recinto.espacoUsado;
            const espacoNecessario = especie.tamanho * quantidade + (recinto.animaisExistentes.length > 0 ? 1 : 0);
            if (
                especie.biomas.some(b => recinto.bioma.includes(b)) &&
                espacoDisponivel >= espacoNecessario &&
                this.verificaRegrasAdicionais(recinto, especie, quantidade)
            ) {
                recintosViaveis.push(
                    `Recinto ${recinto.numero} (espaço livre: ${(espacoDisponivel - espacoNecessario) + 1 } total: ${recinto.tamanhoTotal})`
                );

                recinto.animaisExistentes.push(...Array(quantidade).fill(animal));
                recinto.espacoUsado += espacoNecessario;
            }
            
            
        }
            //Sintoam do erro
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        recintosViaveis.sort((a, b) => a.numero - b.numero);

        return {
            recintosViaveis: recintosViaveis
        };
    }

    encontraEspecie(animal) {
        return this.especies.find(e => e.especie === animal.toUpperCase());
    }

    verificaEntradaInvalida(especie, quantidade) {
        if (!especie) {
            return { erro: "Animal inválido" };
        }
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }
        return null; // Sem erro
    }



    verificaRegrasAdicionais(recinto, especie, quantidade) {
        return (
            this.verificaCarnivoroEspecieIgual(recinto, especie) &&
            this.verificaAnimaisCompativeis(recinto, especie) &&
            this.verificaBiomaHipopotamo(recinto, especie) &&
            this.verificaMacacosExclusivos(recinto, especie) &&
            this.verificaEspacoSuficiente(recinto, quantidade)
        );
    }

    verificaCarnivoroEspecieIgual(recinto, especie) {
        // Verifica se a espécie é carnívora e se está dividindo recinto com outra espécie
        return !(especie.carnivoro && recinto.animaisExistentes.some(a => a && this.especies.find(e => e.especie.toUpperCase() !== especie.especie)));
    }

    verificaAnimaisCompativeis(recinto, especie) {
        // Verifica se os animais existentes no recinto são compatíveis com a nova espécie
        return !recinto.animaisExistentes.some(a => a && !this.verificaCompatibilidade(this.especies.find(e => e.especie.toUpperCase() === a.toUpperCase()), especie));
    }

    verificaBiomaHipopotamo(recinto, especie) {
        // Verifica se o hipopótamo está num bioma apropriado
        return !(especie.especie === 'HIPOPOTAMO' && !recinto.bioma.includes('rio'));
    }

    verificaMacacosExclusivos(recinto, especie) {
        // Verifica se os macacos estão num recinto exclusivo
        return !(especie.especie === 'MACACO' && recinto.animaisExistentes.some(a => a && a !== 'MACACO'));
    }


    
    verificaEspacoSuficiente(recinto, quantidade) {
        // Verifica se há espaço suficiente no recinto para os animais
        return !(recinto.animaisExistentes.length > 0 && quantidade > recinto.tamanhoTotal - recinto.espacoUsado);
    }

    
    

    verificaCompatibilidade(especie1, especie2) {
        if (especie1.carnivoro && !especie2.carnivoro) return false;
        if (!especie1.carnivoro && especie2.carnivoro) return false;

        return true;
    }



}
export { RecintosZoo as RecintosZoo };

// Exemplo de uso
const zoo = new RecintosZoo();
console.log(zoo.analisaRecintos('macaco', 2));
console.log(zoo.analisaRecintos('leao', 1));
console.log(recintos);
