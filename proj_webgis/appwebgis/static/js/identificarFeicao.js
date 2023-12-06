document.addEventListener('DOMContentLoaded', function () {
    const map = window.map;
    const escolasLayer = camadas['Escolas'];
    const lotesLayer = camadas['Lotes'];

    // Adiciona um ouvinte de evento ao botão "Identificar Feição"
    const btnIdentificarFeicao = document.getElementById('btnIdentificarFeicao');
    btnIdentificarFeicao.addEventListener('click', function () {
        alert('Clique no objeto desejado');

        // Adiciona um ouvinte de evento ao mapa para capturar cliques
        const clickHandler = function (e) {
            const latitude = e.latlng.lat;
            const longitude = e.latlng.lng;

            // Verifica se a camada de escolas está ativada
            if (escolasLayer && map.hasLayer(escolasLayer)) {
                identificarEscola(latitude, longitude);
            }
            // Verifica se a camada de lotes está ativada
            else if (lotesLayer && map.hasLayer(lotesLayer)) {
                identificarLote(latitude, longitude);
            }

            // Remove o ouvinte de evento após um clique
            map.off('click', clickHandler);
        };

        // Adiciona o ouvinte de evento ao mapa
        map.on('click', clickHandler);
    });

    function identificarEscola(latitude, longitude) {
        fetch('/identificar_escola/', {
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

                L.popup()
                    .setLatLng([coordenadas[1], coordenadas[0]])
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

    function identificarLote(latitude, longitude) {
        fetch('/identificar_lote/', {
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

            if (data.feicoes_lotes && data.feicoes_lotes.length > 0) {
                const feicao = data.feicoes_lotes[0];
                const coordenadas = feicao.coordenadas.coordinates;

                const content = `
                    <b>${feicao.ct_ciu}</b><br>
                    Código Escola: ${feicao.lt_enderec}<br>
                    Endereço: ${feicao.lt_cep}<br>
                    CEP: ${feicao.lt_ra}<br>
                    RA: ${feicao.ac_area_ct}
                `;

                L.popup()
                    .setLatLng([coordenadas[1], coordenadas[0]])
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