document.addEventListener('DOMContentLoaded', () => {
    // Seletores aprimorados para usar os atributos de acessibilidade do HTML
    const tabs = document.querySelectorAll('.tab-nav a[role="tab"]');
    const contentSections = document.querySelectorAll('.content-section[role="tabpanel"]');
    const quoteElement = document.getElementById('frase-do-dia');

    // --- MELHORIA 1: FRASES DINÂMICAS ---
    const frases = [
        "“Se a oportunidade não bater à sua porta, crie outra porta.” – Milton Berle",
        "“O sucesso é a soma de pequenos esforços repetidos dia após dia.” – Robert Collier",
        "“A única maneira de fazer um ótimo trabalho é amar o que você faz.” – Steve Jobs",
        "“A persistência é o caminho do êxito.” – Charles Chaplin",
        "“Os dados são o novo petróleo.” – Clive Humby",
        "“Faça o que pode, com o que tem, onde estiver.” – Theodore Roosevelt"
    ];

    if (quoteElement) {
        const randomIndex = Math.floor(Math.random() * frases.length);
        quoteElement.textContent = frases[randomIndex];
    }

    // --- FUNÇÃO PRINCIPAL PARA NAVEGAÇÃO POR ABAS (COM ACESSIBILIDADE) ---
    function showSection(sectionId) {
        // Esconde todas as seções e atualiza seus atributos ARIA
        contentSections.forEach(section => {
            section.classList.remove('active-content');
            section.setAttribute('aria-hidden', 'true');
        });

        // Reseta todas as abas e atualiza seus atributos ARIA
        tabs.forEach(tab => {
            tab.classList.remove('active-tab');
            tab.setAttribute('aria-selected', 'false');
        });
        
        // Encontra e mostra a seção e a aba ativas
        const targetSection = document.querySelector(sectionId);
        const activeTab = document.querySelector(`[data-tab="${sectionId.substring(1)}"]`);

        if (targetSection) {
            targetSection.classList.add('active-content');
            targetSection.setAttribute('aria-hidden', 'false');
        }
        if (activeTab) {
            activeTab.classList.add('active-tab');
            activeTab.setAttribute('aria-selected', 'true');
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = event.target.getAttribute('data-tab');
            showSection(`#${sectionId}`);

            // --- MELHORIA 2: SCROLL SUAVE PARA O TOPO ---
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // --- MELHORIA 3: ITENS EXPANSÍVEIS (COM ACESSIBILIDADE) ---
    document.querySelectorAll('.expand-btn').forEach(button => {
        const details = button.closest('.expandable-item').querySelector('.details');
        const isVisible = details.classList.contains('visible');
        
        // Define o estado ARIA inicial no carregamento da página
        button.setAttribute('aria-expanded', isVisible.toString());
        details.setAttribute('aria-hidden', (!isVisible).toString());

        button.addEventListener('click', () => {
            const currentlyVisible = details.classList.contains('visible');
            
            // Alterna a classe visual
            details.classList.toggle('visible');
            
            // Alterna os atributos ARIA
            button.setAttribute('aria-expanded', !currentlyVisible);
            details.setAttribute('aria-hidden', currentlyVisible);

            // Alterna o texto do botão
            button.textContent = !currentlyVisible ? '- Fechar' : '+ Saiba mais';
        });
    });

    // Mostra a seção inicial e define o estado ARIA correto no carregamento
    showSection('#inicio');
});
