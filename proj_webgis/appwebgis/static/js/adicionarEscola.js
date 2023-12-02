// Código que adiciona um ouvinte de evento ao botão "Adicionar Escola"
document.addEventListener('DOMContentLoaded', function () {
    // Obtém referências aos elementos do DOM
    const btnAddEscola = document.getElementById('btnAddEscola');
    const map = window.map; // Certifique-se de que a variável do mapa está acessível globalmente

    // Adiciona um ouvinte de evento ao botão "Adicionar Escola"
    btnAddEscola.addEventListener('click', function () {
        // Exibe um alerta com a mensagem
        const confirmacao = confirm('Clique no mapa para adicionar a nova escola');

        if (confirmacao) {
            // Adiciona um ouvinte de evento ao mapa para capturar cliques
            const clickHandler = function (event) {
                // Remove o ouvinte de evento após um clique
                map.off('click', clickHandler);

                // Obtém as coordenadas do clique
                const lat = event.latlng.lat;
                const lng = event.latlng.lng;

                // Abre um formulário para preencher as demais informações
                const nomeEscola = prompt('Digite o nome da escola:');

                // Envia as coordenadas, nome e outras informações para o servidor
                fetch('/adicionar_escola', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept':'application/json'
                    },
                    body: JSON.stringify({
                        nome: nomeEscola,
                        latitude: lat,
                        longitude: lng,
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    // Exibe um alerta com a resposta do servidor
                    console.log('Data recebida:', data);
                    alert(data.message);
                })
                .catch(error => {
                    console.error('Erro ao adicionar escola:', error);
                });
            };

            // Adiciona o ouvinte de evento ao mapa
            map.on('click', clickHandler);
        }
    });
});

