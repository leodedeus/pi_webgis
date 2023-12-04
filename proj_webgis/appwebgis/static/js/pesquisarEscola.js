// pesquisarEscola.js
document.addEventListener('DOMContentLoaded', function () {
    const btnPesquisarEscola = document.getElementById('btnPesquisarEscola');
    const map = window.map; // Certifique-se de que a variável do mapa está acessível globalmente

    btnPesquisarEscola.addEventListener('click', function () {
        // Abre um formulário para preencher as demais informações
        const nomeEscola = prompt('Digite o nome da escola:');

        if (nomeEscola.trim() !== '') {
            console.log(`Enviando solicitação para pesquisar escola: ${nomeEscola}`);
            // Fazer solicitação ao servidor para pesquisar a escola
            fetch(`/pesquisar_escola?nome=${nomeEscola}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Resposta do servidor:', data);
                    if (data.encontrada) {
                        // A escola foi encontrada, ajuste o zoom e mostre um pop-up
                        const escola = data.escola;
                        const coordenadas = escola.coordenadas; // Suponha que as coordenadas estejam em um formato adequado

                        if (coordenadas) {
                            console.log('Coordenadas da escola:', coordenadas);

                            //as coordenadas estão retornando o valor de longitude primeiro, e depoi o valor de latitude
                            //aqui estamos invertendo a ordem, para que latitude seja o primeiro valor
                            //pois este é o padrão do leaflet
                            map.setView([coordenadas.coordinates[1], coordenadas.coordinates[0]], 15);


                            const marker = L.marker([coordenadas.coordinates[1], coordenadas.coordinates[0]])
                                .addTo(map)
                                .bindPopup(`<b>${escola.nome}</b><br>${escola.endereco}`)
                                .openPopup();

                            console.log('Marcador criado:', marker);

                            // Adiciona um ouvinte de evento para o fechamento do pop-up
                            marker.on('popupclose', function () {
                                map.removeLayer(marker); // Remove o marcador do mapa ao fechar o pop-up
                            });

                        } else {
                            console.error('Coordenadas inválidas:', coordenadas);
                            alert('Coordenadas inválidas. A escola não pode ser exibida no mapa.');
                        }
                    } else {
                        alert('Escola não encontrada.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao pesquisar escola:', error);
                });
        } else {
            alert('Por favor, digite o nome da escola.');
        }
    });
});