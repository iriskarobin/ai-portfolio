const projects=[
['candy-ledger','Candy Ledger','Геймификация профессионального обучения','Professional training gamification','Правила начисления токенов, прогресс аккредитации и магазин наград.','Token award rules, accreditation progress and a rewards shop.',['Gamification','Business rules','Prototype']],
['ai-business-request-processor','Business Request Processor','Первичная обработка бизнес-запросов','Business request intake','Классификация, уточнение требований и черновик задачи.','Classification, clarification and task drafting.',['LLM','FastAPI','Pydantic']],
['ai-knowledge-assistant','Knowledge Assistant','Ассистент корпоративных знаний','Enterprise knowledge assistant','Поиск ответов по документам с источниками.','Document-grounded answers with citations.',['RAG','Vector DB','Docker']],
['ai-ticket-classifier','Ticket Intelligence','Классификатор обращений','Ticket intelligence','Классификация и маршрутизация обращений.','Ticket classification and routing.',['LLM','REST API','JSON']],
['ai-document-processing','Document AI','Обработка документов','Intelligent document processing','Извлечение полей и валидация данных.','Field extraction and validation.',['Python','Validation','SQL']],
['llm-evaluation-monitoring','LLM Evaluation','Оценка качества LLM','LLM quality evaluation','Точность, стоимость, задержки и качество ответов.','Accuracy, cost, latency and response quality.',['Evaluation','Metrics','Python']]
];let lang=localStorage.getItem('portfolio-lang')==='en'?'en':'ru',selected=0;
const tr=(ru,en)=>lang==='ru'?ru:en;
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

const candySections = [
  [
    "История",
    "Background",
    "В программах профессионального обучения у медика, преподавателя и специалиста по безопасности разные требования к аккредитации. Один курс может быть полезен нескольким ролям, но давать им разный вклад в прогресс.",
    "Medical, teaching and safety professionals face different accreditation requirements. A single course can serve several roles while contributing differently to their progress."
  ],
  [
    "Бизнес-запрос",
    "Business request",
    "Дать администратору возможность создать один курс для нескольких ролей и задать правила начисления токенов. Участник должен видеть, сколько получит за курс, сколько осталось до цели и какая часть начисления доступна для обмена.",
    "Let administrators create one course for multiple roles and configure its token awards. Learners should see what a course earns, how much progress remains and what portion can be redeemed."
  ],
  [
    "Идея решения",
    "Solution",
    "Баллы за курс рассчитываются из базового значения и коэффициентов роли, грейда, формата и номера попытки. Начисление сначала закрывает остаток до порога аккредитации. Излишек поступает в магазин наград. На шкале каждое начисление представлено цветным камнем, ширина которого отражает его номинал.",
    "Each course award combines a base value with coefficients for role, grade, format and attempt number. The award first fills the remaining accreditation gap. Excess tokens move to the rewards shop. Each award appears as a coloured stone whose width reflects its value."
  ],
  [
    "Бизнес-кейс",
    "Business case",
    "Настраиваемые правила позволяют повторно использовать курс для нескольких ролей и меньше времени тратить на ручные корректировки. Прозрачный прогресс может помочь участникам вовремя завершать обучение. На пилоте сравнили бы время настройки курса, число ручных корректировок на 100 начислений и долю участников, выполнивших требования к сроку. Эффект предстоит проверить.",
    "Configurable rules let teams reuse a course across roles and spend less time on manual adjustments. Visible progress may help learners finish on time. A pilot would compare course setup time, manual corrections per 100 awards and on-time accreditation completion. These benefits remain hypotheses."
  ],
  [
    "User Story · Администратор курса",
    "User Story · Course administrator",
    "Как администратор обучения, я хочу создать курс, выбрать целевые роли и настроить базовое начисление и коэффициенты для роли, грейда, формата и попытки, чтобы управлять правилами одного курса для разных участников.",
    "As a training administrator, I want to create a course, select eligible roles and configure the base award and coefficients for role, grade, format and attempt, so I can manage one course’s rules for different learners."
  ]
];
const candyCriteria = [
  [
    "В черновике администратор задаёт базовое начисление, выбирает роли и настраивает коэффициенты для поддерживаемых условий.",
    "In a draft, the administrator sets the base award, selects eligible roles and configures coefficients for the supported conditions."
  ],
  [
    "Перед публикацией администратор выбирает комбинацию условий и видит результат после округления. При отсутствии значения для обязательного условия система указывает, что нужно заполнить.",
    "Before publishing, the administrator selects a combination of conditions and previews the rounded result. Missing required values are flagged."
  ],
  [
    "При одинаковых параметрах Middle, онлайн и первая попытка базовые 36 дают медику 40 токенов (×1,1), а преподавателю 36 (×1).",
    "For Middle, online and first attempt, a base of 36 yields 40 tokens for a medical professional (×1.1) and 36 for a teacher (×1)."
  ]
];

function renderCandy() {
  const sections = candySections.map(([titleRu, titleEn, textRu, textEn]) =>
    `<section><h3>${tr(titleRu, titleEn)}</h3><p>${tr(textRu, textEn)}</p></section>`
  ).join('');
  const criteria = candyCriteria.map(([ru, en]) => `<li>${tr(ru, en)}</li>`).join('');
  return `<h2>Candy Ledger</h2>
    <p class="sub">${tr('Авторский прототип геймификации профессионального обучения и аккредитаций. Данные и коэффициенты условные.', 'An original prototype for gamifying professional training and accreditation. Data and coefficients are illustrative.')}</p>
    <div class="candy-story">${sections}
      <h4>${tr('Критерии приёмки', 'Acceptance criteria')}</h4>
      <ul>${criteria}</ul>
      <div class="demo">
        <h3>${tr('Сценарий в прототипе', 'Prototype scenario')}</h3>
        <p>${tr('Выбери «Медик», практический курс, Middle, первую попытку и онлайн-формат. Из 40 токенов 28 закроют цель 120, а 12 поступят в магазин. Настройка правил администратором описана выше как требование к продукту.', 'Choose medical professional, practical course, Middle, first attempt and online delivery. Of the 40 tokens, 28 close the gap to 120 and 12 go to the shop. The administrator’s rules editor is a product requirement described above.')}</p>
        <a class="cta" href="candy-ledger.html">${tr('Открыть демо ↗', 'Open demo ↗ (Russian)')}</a>
      </div>
    </div>`;
}

function render(){document.documentElement.lang=lang;document.getElementById('lang').textContent=lang==='ru'?'EN':'RU';document.querySelectorAll('[data-ru]').forEach(e=>e.innerHTML=e.dataset[lang]);document.getElementById('cards').innerHTML=projects.map((p,i)=>`<button class="card ${i===selected?'active':''}" data-index="${i}"><small>${i===0?tr('ПРОТОТИП','PROTOTYPE'):tr('КОНЦЕПЦИЯ','CONCEPT')}</small><h3>${p[1]}</h3><p>${tr(p[4],p[5])}</p><div class="tags">${p[6].map(x=>`<span>${x}</span>`).join('')}</div></button>`).join('');document.querySelectorAll('.card').forEach(b=>b.onclick=()=>{selected=Number(b.dataset.index);render();document.getElementById('detail').scrollIntoView({behavior:'smooth'});});const p=projects[selected];if(p[0]==='candy-ledger'){document.getElementById('case').innerHTML=renderCandy();return;}document.getElementById('case').innerHTML=`<small class="eyebrow">0${selected+1} / ${tr('В РАЗРАБОТКЕ','IN DEVELOPMENT')}</small><h2>${tr(p[2],p[3])}</h2><p>${tr(p[4],p[5])}</p><div class="casegrid"><div><h3>${tr('Планируемые материалы','Planned deliverables')}</h3><ul><li>${tr('Бизнес-требования и User Stories','Business requirements and user stories')}</li><li>${tr('Архитектура и потоки данных','Architecture and data flows')}</li><li>OpenAPI / REST</li><li>${tr('Тесты и метрики качества','Tests and quality metrics')}</li></ul><p class="note">${tr('Планируемый репозиторий','Planned repository')}: <code>${p[0]}</code></p></div><div class="demo"><strong>${tr('Демонстрация','Demo')}</strong>${p[0]==='ai-business-request-processor'?`<p class="note">${tr('Локальная иллюстрация на правилах. LLM не вызывается.','Local rule-based illustration. No LLM is called.')}</p><textarea id="request" placeholder="${tr('Агенты не видят оплаченные суммы в валюте. Нужно исправить.','Agents cannot see foreign-currency payments. Please fix.')}"></textarea><button id="analyze">${tr('Разобрать запрос','Analyze request')}</button><pre id="result" aria-live="polite"></pre>`:`<p class="note">${tr('Работающее AI-демо будет добавлено после реализации backend.','Live AI demo will be added after backend implementation.')}</p>`}</div></div>`;if(p[0]==='ai-business-request-processor')document.getElementById('analyze').onclick=analyze;}
function analyze(){const input=document.getElementById('request').value.trim();const currency=/валют|курс|currency|exchange/i.test(input);const bug=/ошиб|сломал|bug|broken/i.test(input);const result={mode:'rule_based_demo',classification:bug?tr('Ошибка','Bug'):tr('Запрос на изменение','Change request'),input,clarification_questions:currency?[tr('В какой валюте хранится сумма?','What currency is the source of truth?'),tr('Нужна ли история частичных оплат?','Should partial payments be shown?'),tr('Как учитывать возвраты?','How should refunds be handled?')]:[tr('Какой ожидается результат?','What is the expected outcome?'),tr('Какие пользователи затронуты?','Which users are affected?'),tr('Каковы критерии приёмки?','What are the acceptance criteria?')],human_review_required:true};document.getElementById('result').textContent=JSON.stringify(result,null,2);}
document.getElementById('lang').onclick=()=>{lang=lang==='ru'?'en':'ru';localStorage.setItem('portfolio-lang',lang);render();};render();
