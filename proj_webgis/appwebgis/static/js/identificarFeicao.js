document.addEventListener('DOMContentLoaded', function () {
    const map = window.map;
    const escolasLayer = camadas['Escolas']

    map.on('click', function (e) {
        // Verifique se a camada de escolas está ativada
        if (escolasLayer && map.hasLayer(escolasLayer)) {
            const latitude = e.latlng.lat;
            const longitude = e.latlng.lng;

            // Exibe as coordenadas no console antes de enviar a solicitação
            console.log('Coordenadas do clique:', { latitude, longitude });

            fetch('/identificar_feicao/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude: latitude,
                    longitude: longitude,
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Resposta do backend:', data);

                if (data.feicoes && data.feicoes.length > 0) {
                    const feicao = data.feicoes[0];
                    const coordenadas = feicao.coordenadas.coordinates;

                    // Conteúdo do pop-up
                    const content = `
                        <b>${feicao.nome_escola}</b><br>
                        Código Escola: ${feicao.cod_entidade}<br>
                        Endereço: ${feicao.endereco}<br>
                        CEP: ${feicao.cep}<br>
                        RA: ${feicao.cod_ra}<br>
                        Telefone: ${feicao.telefone}<br>
                        E-mail: ${feicao.email}<br>
                        Código DRE: ${feicao.cod_dre}
                    `;

                    // Exiba as informações em um pop-up
                    L.popup()
                        .setLatLng([coordenadas[1], coordenadas[0]])  // Inverta as coordenadas para o Leaflet
                        .setContent(content)
                        .openOn(map);
                } else {
                    alert('Nenhuma feição encontrada.');
                }
            })
            .catch(error => {
                console.error('Erro ao identificar feição:', error);
            });
        }
    });
});