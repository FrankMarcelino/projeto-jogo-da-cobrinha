
const canvas = document.querySelector('canvas')
const elementoJogo = canvas.getContext('2d')  //ctx = contexto, para facilitar a leitura troquei o ctx por elementoJogo

const tamanhoElementoJogo = 30



const posicaoInicialCobra = { x: 270, y: 240 }
const cobra = [posicaoInicialCobra]


const randomNumero = (max, min) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomPosicao = () => {
    const numero = randomNumero(0, canvas.width - tamanhoElementoJogo)
    return Math.round(numero / 30) * 30
}

const comida = {
    x: randomPosicao(),
    y: randomPosicao(),
    color: 'red'
}


let direcao, loopId

const desenharComida = () => {
    const { x, y, color } = comida
    elementoJogo.fillStyle = color
    elementoJogo.shadowColor = color
    elementoJogo.shadowBlur = 6

    elementoJogo.fillRect(x, y, tamanhoElementoJogo, tamanhoElementoJogo)
    elementoJogo.shadowBlur = 0

}

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

    const cabeca = cobra[cobra.length -1]

    if (direcao == 'direita') {
        cobra.push({ x: cabeca.x + tamanhoElementoJogo, y: cabeca.y })
    }

    if (direcao == 'esquerda') {
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

const comeuComida = () => {
    const cabeca = cobra[cobra.length -1]

    if ( cabeca.x == comida.x && cabeca.y == comida.y) {
        cobra.push(cabeca)

        comida.x = randomPosicao(),
        comida.y = randomPosicao(),
        comida.color = 'red'
    }
}



const gameLoop = () => {
    clearInterval(loopId)

    elementoJogo.clearRect(0, 0, 600, 600)
    desenharGrid()
    desenharComida()
    moveCobra()
    desenharCobra()
    comeuComida()
  

    loopId = setTimeout(() => {
        gameLoop() 
    }, 300)
}

gameLoop()

document.addEventListener('keydown', ({ key }) => {
    if (key == 'ArrowRight' && direcao != 'esquerda') {
        direcao = 'direita'
    }

    if (key == 'ArrowLeft' && direcao != 'direita' ) {
        direcao = 'esquerda'
    }

    if (key == 'ArrowDown' && direcao != 'cima' ) {
        direcao = 'baixo'
    }

    if (key == 'ArrowUp' && direcao != 'baixo') {
        direcao = 'cima'
    }
})
