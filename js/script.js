document.addEventListener('DOMContentLoaded', () => {
    // Seletores aprimorados para usar os atributos de acessibilidade do HTML
    const tabs = document.querySelectorAll('.tab-nav a[role="tab"]');
    const contentSections = document.querySelectorAll('.content-section[role="tabpanel"]');
    const quoteElement = document.getElementById('frase-do-dia');

    // --- MELHORIA 1: FRASES DINÂMICAS ---
    const frases = [
    "“Se a oportunidade não bater à sua porta, construa outra porta.” – Milton Berle",
    "“O sucesso é a soma de pequenos esforços repetidos dia após dia.” – Robert Collier",
    "“A única maneira de fazer um ótimo trabalho é amar o que você faz.” – Steve Jobs",
    "“A persistência é o caminho do êxito.” – Charles Chaplin",
    "“Os dados são o novo petróleo.” – Clive Humby",
    "“Faça o que pode, com o que tem, onde estiver.” – Theodore Roosevelt",
    "“A inovação distingue um líder de um seguidor.” – Steve Jobs",
    "“Se eu tivesse oito horas para cortar uma árvore, usaria seis afiando o machado.” – Abraham Lincoln",
    "“Se você não pode medir, não pode gerenciar.” – Peter Drucker",
    "“A melhor forma de prever o futuro é criá-lo.” – Peter Drucker",
    "“A marca é o que as pessoas dizem sobre você quando você não está por perto.” – Jeff Bezos",
    "“Foque no que não muda.” – Jeff Bezos",
    "“A falha é uma opção aqui. Se as coisas não estão falhando, você não está inovando o suficiente.” – Elon Musk",
    "“Nada é particularmente difícil se você o dividir em pequenas tarefas.” – Henry Ford",
    "“Eu não falhei. Apenas encontrei 10 mil maneiras que não funcionam.” – Thomas Edison",
    "“Cultura devora estratégia no café da manhã.” – Peter Drucker",
    "“O risco vem de não saber o que você está fazendo.” – Warren Buffett",
    "“Disciplina é fazer o que precisa ser feito, mesmo quando você não quer.” – Unknown",
    "“Comece pelo porquê.” – Simon Sinek",
    "“Velocidade é a forma de cortesia no mundo digital.” – Satya Nadella",
    "“Feito é melhor que perfeito.” – Sheryl Sandberg",
    "“Seja teimoso na visão e flexível nos detalhes.” – Jeff Bezos",
    "“Não existe atalho para qualquer lugar que valha a pena ir.” – Beverly Sills",
    "“Aprender nunca esgota a mente.” – Leonardo da Vinci",
    "“O lucro é um efeito colateral de resolver problemas reais.” – Naval Ravikant",
    "“Seja faminto, seja tolo.” – Steve Jobs",
    "“O dinheiro é consequência de um trabalho bem feito.” – Bernard Arnault",
    "“Coragem é saber dizer não.” – Unknown",
    "“A mudança é a única coisa certa na vida.” – Oprah Winfrey",
    "“Transforme suas feridas em sabedoria.” – Oprah Winfrey",
    "“Campeões não são definidos pelas vitórias, mas por como se recuperam das quedas.” – Serena Williams",
    "“A sorte favorece os preparados.” – Louis Pasteur",
    "“Não compete com os outros. Compete com quem você foi ontem.” – Unknown",
    "“Seus hábitos moldam seu futuro.” – Jack Canfield",
    "“As pessoas não compram o que você faz; compram o porquê você faz.” – Simon Sinek",
    "“Onde há foco, há progresso.” – Tony Robbins",
    "“Grandes coisas nunca vêm de zonas de conforto.” – Neil Strauss",
    "“A simplicidade é a sofisticação máxima.” – Leonardo da Vinci",
    "“Visão sem execução é alucinação.” – Thomas Edison",
    "“Trabalhe duro em silêncio; deixe o sucesso fazer o barulho.” – Frank Ocean",
    "“Não é sobre ideias. É sobre fazer as ideias acontecerem.” – Scott Belsky",
    "“Comece pequeno, pense grande.” – Ray Kroc",
    "“Seja rápido para ouvir e lento para falar.” – Provérbio",
    "“Sem dados, você é apenas mais uma pessoa com opinião.” – W. Edwards Deming",
    "“Excelência é um hábito, não um ato.” – Will Durant"
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
