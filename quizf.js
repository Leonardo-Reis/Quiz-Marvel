function Pergunta (pergunta, op1, op2, op3, resp) {
    this.alternativas = [op1, op2, op3, resp].sort()
    this.resposta   = resp
    this.pergunta   = pergunta
    this.respondida = false
    this.escolhida  = ''
}

const pergunta_num_vingadores1 = new Pergunta('Quantos vingadores apareceram no primeiro Avengers?', '4', '5', '7', '6')
const pergunta_vilao1          = new Pergunta('Qual é o nome do vilão do primeiro Avengers?', 'Thanos', 'Zemo', 'Ultron', 'Loki')
const pergunta_vilao2          = new Pergunta('Qual é o nome do vilão do segundo Avengers?', 'Thanos', 'Zemo', 'Loki', 'Ultron')
const pergunta_strongest       = new Pergunta('Quem é o vingador mais forte de acordo com Tony Stark?', 'Thor', 'Capitão América', 'Homem de Ferro', 'Hulk')

const quiz = {
    perguntas: [pergunta_num_vingadores1, pergunta_vilao1, pergunta_vilao2, pergunta_strongest],

    opcoes_html: document.querySelectorAll('li'),
    resultado: document.querySelector('.resultado'),
    botao_proximo: document.querySelector('.botao-proximo'),
    botao_anterior: document.querySelector('.botao-anterior'),

    contador_id: 0,
    contador_rodadas: 0,

    init: function (contador_id=0) {
        this.imprimir_pergunta(contador_id)
        this.imprimir_alternativas(contador_id) 

        if (this.contador_rodadas === 0) {
            this.adicionar_listeners_setas()
        }

        this.contador_rodadas++
    },

    adicionar_listeners_setas: function () {
        this.botao_proximo.addEventListener('click', () => {
            if (this.contador_id < this.perguntas.length - 1){
                this.contador_id++
            }

            this.init(this.contador_id)
        })

        this.botao_anterior.addEventListener('click', () => {
            if (this.contador_id > 0) {
                this.contador_id--
            }

            this.init(this.contador_id)
        })

    },

    imprimir_alternativas: function (id=0) {
        this.opcoes_html.forEach((opcao, id_alternativa=0) => {
            let pergunta_atual = this.perguntas[id]

            opcao.textContent = pergunta_atual.alternativas[id_alternativa]

            opcao.addEventListener('click', () => {
                pergunta_atual.respondida = true

                pergunta_atual.escolhida = opcao

                this.resultado.style.display = 'block'
                if (pergunta_atual.escolhida.textContent == pergunta_atual.resposta) {
                    this.resultado.textContent = 'Resposta certa!'
                    this.resultado.style.color = 'green'
                } else {
                    this.resultado.textContent = 'Resposta errada...'
                    this.resultado.style.color = 'red'
                }
            })
        })
    },

    imprimir_pergunta: function (id=0) {
        frase_pergunta_html = document.querySelector('.frase-pergunta')
        
        frase_pergunta_html.textContent = this.perguntas[id].pergunta
    },
}