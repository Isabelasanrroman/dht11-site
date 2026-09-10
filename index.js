const id = 'esp32_isabela_2026'

const web = new Paho.MQTT.Client(
    'broker.hivemq.com',
    8884,
    id
)


const temp = document.getElementById('temp')

const umid = document.getElementById('umid')


// ==========================================================
// VERIFICA A TEMPERATURA
// ==========================================================

function verificarTemperatura(temperatura) {

    if (temperatura >= 29 && temperatura <= 30) {

        document.body.classList.add('alerta-temperatura')

    } else {

        document.body.classList.remove('alerta-temperatura')

    }
}


// ==========================================================
// QUANDO RECEBER UMA MENSAGEM
// ==========================================================

web.onMessageArrived = function(msg) {

    const conteudo = msg.payloadString

    const dados = JSON.parse(conteudo)


    const temperatura = Number(dados.temperatura)

    const umidade = Number(dados.umidade)


    temp.textContent = temperatura + ' °C'

    umid.textContent = umidade + ' %'


    verificarTemperatura(temperatura)
}


// ==========================================================
// CONEXÃO MQTT
// ==========================================================

web.connect({

    timeout: 2000,

    useSSL: true,

    onSuccess: function() {

        console.log('Conectado ao MQTT')

        web.subscribe(
            'senai/510/isabela/temp'
        )
    },

    onFailure: function() {

        console.log('Falha ao conectar ao MQTT')

    }
})