document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-nav a');
    const contentSections = document.querySelectorAll('.content-section');

    function showSection(sectionId) {
        // Esconde todas as seções
        contentSections.forEach(section => {
            section.classList.remove('active-content');
        });

        // Mostra a seção desejada
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            targetSection.classList.add('active-content');
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            event.preventDefault();

            // Remove a classe ativa de todas as abas
            tabs.forEach(t => t.classList.remove('active-tab'));

            // Adiciona a classe ativa na aba clicada
            event.target.classList.add('active-tab');

            // Pega o ID da seção a ser mostrada
            const sectionId = event.target.getAttribute('data-tab');
            showSection(`#${sectionId}`);
        });
    });

    // Mostra a seção inicial ao carregar a página
    showSection('#inicio');
});
