document.addEventListener('DOMContentLoaded', function () {
    const map = window.map;
    const escolasLayer = camadas['Escolas'];
    const lotesLayer = camadas['Lotes'];
    let clickHandlerAdded = false;

    // Função para identificar uma feição no mapa
    function identificarFeicao(e) {
        const latitude = e.latlng.lat;
        const longitude = e.latlng.lng;

        //mostrar as coordenadas clicadas no console
        console.log('Coordenadas do clique:', { latitude, longitude });

        // Verifica se a camada de escolas está ativada
        if (escolasLayer && map.hasLayer(escolasLayer)) {
            identificarEscola(latitude, longitude);
        }
        // Verifica se a camada de lotes está ativada
        else if (lotesLayer && map.hasLayer(lotesLayer)) {
            identificarLote(latitude, longitude);
        }
    }

    // Adiciona ou remove o ouvinte de evento com base nas camadas habilitadas
    function updateClickHandler() {
        const hasLayers = map.hasLayer(escolasLayer) || map.hasLayer(lotesLayer);

        if (hasLayers && !clickHandlerAdded) {
            map.on('click', identificarFeicao);
            clickHandlerAdded = true;
        } else if (!hasLayers && clickHandlerAdded) {
            map.off('click', identificarFeicao);
            clickHandlerAdded = false;
        }
    }

    // Adiciona ouvinte de evento para atualizar o clique no mapa
    map.on('layeradd layerremove', updateClickHandler);

    // Remove o ouvinte de evento ao sair da página ou descarregar o mapa
    window.addEventListener('beforeunload', function () {
        if (clickHandlerAdded) {
            map.off('click', identificarFeicao);
        }
    });

    // Função para identificar escola no backend
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
            console.log('Resposta do backend (Escola):', data);

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
            console.error('Erro ao identificar escola:', error);
        });
    }

    // Função para identificar lote no backend
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
            console.log('Resposta do backend (Lote):', data);

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
            console.error('Erro ao identificar lote:', error);
        });
    }
});
