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
    "“A falha é uma opção aqui. Se as coisas não estão falhando, você não está inovando o suficiente.” – Elon Musk",
    "“Nada é particularmente difícil se você o dividir em pequenas tarefas.” – Henry Ford",
    "“Eu não falhei. Apenas encontrei 10 mil maneiras que não funcionam.” – Thomas Edison",
    "“Cultura devora estratégia no café da manhã.” – Peter Drucker",
    "“O risco vem de não saber o que você está fazendo.” – Warren Buffett",
    "“Disciplina é fazer o que precisa ser feito, mesmo quando você não quer.” – Unknown",
    "“Comece pelo porquê.” – Simon Sinek",
    "“Feito é melhor que perfeito.” – Sheryl Sandberg",
    "“Seja teimoso na visão e flexível nos detalhes.” – Jeff Bezos",
    "“Não existe atalho para qualquer lugar que valha a pena ir.” – Beverly Sills",
    "“Aprender nunca esgota a mente.” – Leonardo da Vinci",
    "“O lucro é um efeito colateral de resolver problemas reais.” – Naval Ravikant",
    "“Coragem é saber dizer não.” – Unknown",
    "“A mudança é a única coisa certa na vida.” – Oprah Winfrey",
    "“Campeões não são definidos pelas vitórias, mas por como se recuperam das quedas.” – Serena Williams",
    "“A sorte favorece os preparados.” – Louis Pasteur",
    "“Não compete com os outros. Compete com quem você foi ontem.” – Unknown",
    "“Seus hábitos moldam seu futuro.” – Jack Canfield",
    "“As pessoas não compram o que você faz; compram o porquê você faz.” – Simon Sinek",
    "“Onde há foco, há progresso.” – Tony Robbins",
    "“Grandes coisas nunca vêm de zonas de conforto.” – Neil Strauss",
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

/* Home bilíngue: preserva navegação original por abas e as demais seções. */
document.addEventListener('DOMContentLoaded',()=>{
 const home=document.getElementById('inicio');
 if(!home)return;
 const buttons=[...home.querySelectorAll('[data-home-lang]')];
 const parts=[...home.querySelectorAll('[data-pt][data-en]')];
 function setHomeLanguage(lang){
   if(lang!=='pt'&&lang!=='en')lang='pt';
   parts.forEach(el=>{el.innerHTML=el.getAttribute('data-'+lang)});
   buttons.forEach(btn=>{const active=btn.dataset.homeLang===lang;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active))});
   const quote=home.querySelector('#frase-do-dia');
   if(quote){
     if(lang==='en'){if(!quote.dataset.portuguese)quote.dataset.portuguese=quote.textContent;quote.textContent='“Do what you can, with what you have, where you are.” — Theodore Roosevelt';}
     else if(quote.dataset.portuguese){quote.textContent=quote.dataset.portuguese;}
   }
   try{localStorage.setItem('portfolio-home-language',lang)}catch(e){}
 }
 let lang='pt';try{lang=localStorage.getItem('portfolio-home-language')||'pt'}catch(e){}
 setHomeLanguage(lang);
 buttons.forEach(btn=>btn.addEventListener('click',()=>setHomeLanguage(btn.dataset.homeLang)));
 home.querySelectorAll('[data-open-tab]').forEach(link=>link.addEventListener('click',event=>{
   const tab=document.querySelector('.tab-nav [data-tab="'+link.dataset.openTab+'"]');
   if(tab){event.preventDefault();tab.click()}
 }));
 const canvas=document.getElementById('homeDataWave');const ctx=canvas?.getContext('2d');if(!ctx)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let last=0;
 function draw(time){
   const box=canvas.getBoundingClientRect(),w=box.width,h=box.height;if(!w||!h)return;
   const d=Math.min(devicePixelRatio||1,2);if(canvas.width!==Math.round(w*d)||canvas.height!==Math.round(h*d)){canvas.width=Math.round(w*d);canvas.height=Math.round(h*d)}
   ctx.setTransform(d,0,0,d,0,0);ctx.clearRect(0,0,w,h);
   const shift=reduced?0:Math.sin(time*.00022)*.07;
   function y(x,k){const n=x/w;return h*(.29+.55*k+.13*Math.sin(n*12+shift+k*2)+.07*Math.cos(n*23-k*3))}
   const steps=Math.max(54,Math.ceil(w/13));
   for(let k=0;k<26;k++){const p=k/25;ctx.beginPath();for(let i=0;i<=steps;i++){const x=w*i/steps;if(i===0)ctx.moveTo(x,y(x,p));else ctx.lineTo(x,y(x,p))}ctx.strokeStyle='rgba(255,40,75,'+(.32*(1-p)+.035)+')';ctx.lineWidth=k===0?2:.55;ctx.stroke()}
   for(let i=0;i<=steps;i++){const x=w*i/steps;for(let k=0;k<26;k++){const p=k/25;ctx.fillStyle='rgba(255,54,83,'+(.6*(1-p)+.1)+')';ctx.beginPath();ctx.arc(x,y(x,p),p<.15?1.2:.7,0,Math.PI*2);ctx.fill()}}
   ctx.save();ctx.shadowColor='#ff274a';ctx.shadowBlur=16;ctx.strokeStyle='#ff3656';ctx.lineWidth=2.5;ctx.beginPath();for(let i=0;i<=steps;i++){const x=w*i/steps;if(i===0)ctx.moveTo(x,y(x,0));else ctx.lineTo(x,y(x,0))}ctx.stroke();ctx.restore();
 }
 function frame(t){if(t-last>45){draw(t);last=t}requestAnimationFrame(frame)}
 if(reduced)draw(0);else requestAnimationFrame(frame);
 addEventListener('resize',()=>draw(performance.now()));
});
