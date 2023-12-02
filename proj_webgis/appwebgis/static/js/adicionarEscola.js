// school-interaction-script.js
document.addEventListener('DOMContentLoaded', function () {
    // Obtém referências aos elementos do DOM
    const btnAddEscola = document.getElementById('btnAddEscola');
    const msgAddNovaEscola = document.getElementById('msgAddNovaEscola');
    // ... (outros elementos)

    // Adiciona um ouvinte de evento ao botão "Adicionar Escola"
    btnAddEscola.addEventListener('click', function () {
        // Exibe a mensagem
        msgAddNovaEscola .classList.remove('hidden');
        
        // Restante do seu código...
    });

    // ... (restante do seu código)
});
