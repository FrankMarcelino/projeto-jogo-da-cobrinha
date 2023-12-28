
const canvas = document.querySelector('canvas')
const elementoJogo = canvas.getContext('2d')  //ctx = contexto, para facilitar a leitura troquei o ctx por elementoJogo

const tamanhoElementoJogo = 30


const cobra = [{ x: 270, y: 240 }]

let direcao, loopId

const desenharCobra = () => {
    elementoJogo.fillStyle = '#ddd'
    cobra.forEach((posicao, cabeca) => {
        if (cabeca == cobra.length - 1) {
            elementoJogo.fillStyle = 'white'
        }

        elementoJogo.fillRect(posicao.x, posicao.y, tamanhoElementoJogo, tamanhoElementoJogo)
    })
}

const moveCobra = () => {
    if (!direcao) return

    const cabeca = cobra.at(-1)



    if (direcao == 'direita') {
        cobra.push({ x: cabeca.x + tamanhoElementoJogo, y: cabeca.y })
    }

    if (direcao == 'esqueda') {
        cobra.push({ x: cabeca.x - tamanhoElementoJogo, y: cabeca.y })
    }

    if (direcao == 'baixo') {
        cobra.push({ x: cabeca.x, y: cabeca.y + tamanhoElementoJogo })
    }


    if (direcao == 'cima') {
        cobra.push({ x: cabeca.x, y: cabeca.y - tamanhoElementoJogo })
    }

    cobra.shift()
}

const desenharGrid = () => {
    elementoJogo.lineWidth = 1
    elementoJogo.strokeStyle = '#191919'

    for (let i = 30; i < canvas.width; i += 30) {
        elementoJogo.beginPath()
        elementoJogo.lineTo(i, 0)
        elementoJogo.lineTo(i, 600)

        elementoJogo.stroke()

        elementoJogo.beginPath()
        elementoJogo.lineTo(0, i)
        elementoJogo.lineTo(600, i)

        elementoJogo.stroke()
    }
}

desenharGrid()

const gameLoop = () => {
    clearInterval(loopId)

    elementoJogo.clearRect(0, 0, 600, 600)
    moveCobra()
    desenharCobra()

    loopId = setInterval(() => {
        gameLoop()
    }, 300)
}

//gameLoop()

document.addEventListener('keydown', ({ key }) => {
    if (key == 'ArrowRight' && direcao !== 'esquerda') {
        direcao = 'direita'
    }

    if (key == 'ArrowLeft' && direcao !== 'direita') {
        direcao = 'esquerda'
    }

    if (key == 'ArrowDown' && direcao !== 'cima') {
        direcao = 'baixo'
    }

    if (key == 'ArrowUp' && direcao !== 'baixo') {
        direcao = 'cima'
    }
})
