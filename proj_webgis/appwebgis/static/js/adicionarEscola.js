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

                // Exibe um novo alerta com as coordenadas
                alert(`Coordenadas do local clicado: Latitude ${lat}, Longitude ${lng}`);
            };

            // Adiciona o ouvinte de evento ao mapa
            map.on('click', clickHandler);
        }
    });
});