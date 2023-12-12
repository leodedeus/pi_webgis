document.addEventListener('DOMContentLoaded', function () {
    const map = window.map;
    const btnIdentificarFeicao = document.getElementById('btnIdentificarFeicao');
    let clickHabilitado = false;

    // Função para identificar a feição no mapa
    function identificarFeicaoNoMapa(e) {
        if (clickHabilitado) {
            const latitude = e.latlng.lat;
            const longitude = e.latlng.lng;
            console.error('Coordenadas do clique:', latitude, longitude);

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
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.encontrada) {
                    const feicao = data.escola;

                    // Use os dados da escola para criar o conteúdo do popup
                    const content = `
                        <b>${feicao.nome}</b><br>
                        Código Escola: ${feicao.cod_entidade}<br>
                        Endereço: ${feicao.endereco}<br>
                        CEP: ${feicao.cep}<br>
                        RA: ${feicao.cod_ra}<br>
                        Telefone: ${feicao.telefone}<br>
                        E-mail: ${feicao.email}
                    `;

                    // Crie o popup e mostre no mapa
                    L.popup()
                        .setLatLng([feicao.coordenadas.coordinates[1], feicao.coordenadas.coordinates[0]])
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
    }

    btnIdentificarFeicao.addEventListener('click', function () {
        clickHabilitado = !clickHabilitado;
        btnIdentificarFeicao.classList.toggle('ativo', clickHabilitado);

        if (clickHabilitado) {
            map.on('click', identificarFeicaoNoMapa);
        } else {
            map.off('click', identificarFeicaoNoMapa);
        }
    });
});
