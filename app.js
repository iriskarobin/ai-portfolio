const projects=[
["meeting-action-agent","Агент постановки задач","AI-агент постановки задач по встречам и письмам","AI agent for meeting and email action items","Поручение из письма или транскрипции становится задачей с исполнителем, постановщиком и контекстом.","Turn an instruction from email or a meeting transcript into a task with an assignee, a requester and context.",["AI Agent","Email","Meetings","Task Management"],"Action Item Agent"],
["leave-preparation-agent","Агент подготовки к отпуску","Агент подготовки к отпуску","Leave preparation agent","За неделю до отпуска проверяет документы и готовит уведомления для почты и чатов.","Checks documents and prepares email and chat notices one week before leave.",["AI Agent","Documents","Email","Chat"],"Leave Preparation Agent"],
["community-news-agent","Новостной агент","Новостной агент для сообществ","Community news agent","Следит за новостями сообществ, ранжирует публикации и присылает подборку в личный чат.","Monitors community news, ranks posts and delivers a selection in a direct chat.",["AI Agent","Ranking","Personalization","Chat"],"Community News Agent"],
['candy-ledger','Gems Ledger','Геймификация профессионального обучения','Professional training gamification','Правила начисления токенов, прогресс аккредитации и магазин наград.','Token award rules, accreditation progress and a rewards shop.',['Gamification','Business rules','Prototype']],
["crm-booking","CRM & Booking","CRM и система бронирования","CRM and booking integration","Как согласовать работу с обращениями и заявками в двух системах.","Aligning enquiry and booking workflows across two systems.",["CRM","Workflows","Integration"]],
["agent-insurance","Agent Insurance","Страхование для турагентов","Insurance workflow for travel agents","От запроса счёта до подтверждения оплаты и оформления полиса.","From invoice request to payment confirmation and policy issuance.",["B2B","Payments","Workflows"]],
["agent-currency-payments","Currency Payments","Валютные платежи в кабинете агента","Foreign-currency payments in the agent portal","Откуда брать валютную сумму и как показывать историю оплат.","Finding the source of original currency amounts and displaying payment history.",["Data Mapping","B2B","Payments"]],
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
    "«Ввести какую-нибудь геймификацию в курсы, чтобы повысить вовлеченность». На старте бизнес обозначил цель. Какую механику использовать и как связать её с обучением и аккредитацией, предстояло определить. Я предложила систему токенов, которая показывает участнику, за что он получил начисление, к какой роли оно относится и сколько осталось до аккредитации.",
    "“Introduce some kind of gamification into courses to increase engagement.” The business set the objective. The mechanics and their connection to training and accreditation were open design questions. I proposed a token system that shows learners what each award was for, which role it applies to and how much progress remains toward accreditation."
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
  return `<h2>Gems Ledger</h2>
    <p class="sub">${tr('Проект геймификации профессионального обучения и аккредитаций. Данные и коэффициенты условные.', 'Gamification for professional training and accreditation. Data and coefficients are illustrative.')}</p>
    <div class="candy-story">${sections}
      <h4>${tr('Критерии приёмки', 'Acceptance criteria')}</h4>
      <ul>${criteria}</ul>
      <div class="demo">
        <h3>${tr('Сценарий начисления', 'Token award scenario')}</h3>
        <p>${tr('Выбери «Медик», практический курс, Middle, первую попытку и онлайн-формат. Из 40 токенов 28 закроют цель 120, а 12 поступят в магазин. Настройка правил администратором описана выше как требование к продукту.', 'Choose medical professional, practical course, Middle, first attempt and online delivery. Of the 40 tokens, 28 close the gap to 120 and 12 go to the shop. The administrator’s rules editor is a product requirement described above.')}</p>
        <a class="cta" href="candy-ledger.html">${tr('Открыть демо ↗', 'Open demo ↗ (Russian)')}</a>
      </div>
    </div>`;
}

const workCases = {
  "leave-preparation-agent": [
  [
    "Задача",
    "Problem",
    "Подготовка к отпуску включает проверку документов и уведомление людей, которые могут обратиться к сотруднику в его отсутствие.",
    "Preparing for leave includes checking documents and informing people who may contact the employee during their absence."
  ],
  [
    "Как работает агент",
    "How the agent works",
    "За семь дней до начала отпуска агент запускает подготовку. Он проверяет документы, связанные с отпуском, и готовит официальные сообщения об отсутствии для почты и рабочих чатов.",
    "Seven days before leave begins, the agent starts preparation. It reviews leave-related documents and drafts formal out-of-office notices for email and work chats."
  ],
  [
    "Что получает сотрудник",
    "Employee output",
    "Результат проверки документов и готовые тексты уведомлений для двух каналов.",
    "The result of the document check and ready-to-use notices for both channels."
  ]
],
  "community-news-agent": [
  [
    "Задача",
    "Problem",
    "Когда новости публикуются в нескольких сообществах, сотруднику приходится просматривать разные ленты, чтобы найти то, что важно именно ему.",
    "When news is spread across communities, employees have to scan multiple feeds to find what matters to them."
  ],
  [
    "Как работает агент",
    "How the agent works",
    "Агент отслеживает публикации сообществ и ранжирует их по двум критериям: насколько новость интересна конкретному сотруднику и насколько она востребована. Так общая популярность учитывается вместе с персональной релевантностью.",
    "The agent monitors community posts and ranks them using two criteria: relevance to the individual employee and how much interest the news attracts. It considers overall demand alongside personal relevance."
  ],
  [
    "Что получает сотрудник",
    "Employee output",
    "Подборку новостей с наивысшим рейтингом в личном чате.",
    "A selection of the highest-ranked stories in a direct chat."
  ]
],
  "meeting-action-agent": [
  [
    "Задача",
    "Problem",
    "Поручения звучат на встречах и встречаются в переписке. После обсуждения их приходится переносить во внутренний таск-менеджер, восстанавливая, кто дал поручение, кому и о чём шла речь.",
    "Action items come up in meetings and email. Manually transferring them to an internal task manager means reconstructing who made the request, who should act on it and what it refers to."
  ],
  [
    "Мой вклад",
    "My contribution",
    "Я спроектировала AI-агента, который анализирует письма и транскрипции встреч, выделяет поручения, определяет исполнителя и постановщика и передаёт задачу во внутренний таск-менеджер. Постановщиком становится человек, который дал поручение. В описание задачи попадает контекст из обсуждения.",
    "I designed an AI agent that analyses emails and meeting transcripts, extracts action items, identifies assignees and requesters, and creates tasks in an internal task manager. The person who gave the instruction is recorded as the requester, and relevant discussion context is added to the description."
  ],
  [
    "Пример сценария",
    "Example scenario",
    "На встрече руководитель говорит: «Ваня, ты просмотри адреса в списке, который мы только что обсуждали». В таск-менеджере у Вани появляется задача «Проверить адреса в списке». Руководитель указан постановщиком, а в описании отражено, о каком списке шла речь по контексту встречи.",
    "In a meeting, a manager says, “Ivan, please review the addresses in the list we just discussed.” Ivan receives a task titled “Review addresses in the list.” The manager is recorded as the requester, and the description identifies the list from the surrounding discussion."
  ],
  [
    "Как проверить результат",
    "Acceptance example",
    "Для примера проверяем, что задача попала Ване, постановщиком указан говоривший, а описание помогает понять, какой список нужно проверить. Отдельный сценарий для проверки — на встрече упомянули человека и тему, но поручения ему не дали.",
    "Check that Ivan received the task, the speaker is recorded as the requester and the description identifies the list to review. A separate test scenario covers a conversation that mentions a person and a topic without assigning that person a task."
  ]
],
  "crm-booking": [
    [
      "Задача",
      "Problem",
      "Менеджеры работают с обращениями в CRM, а статусы заявок ведутся в системе бронирования. Когда данные расходятся или при передаче меняется ответственный, менеджеру приходится вручную восстанавливать контекст.",
      "Managers handle enquiries in the CRM and track booking statuses in a separate system. Status mismatches and handoffs make them reconstruct the context manually."
    ],
    [
      "Моя работа",
      "My contribution",
      "Проработала переходы лидов, обязательные поля при закрытии, причины отказа и правила передачи вопросов по существующим заявкам в сопровождение. Для возвратов и аннуляций описала условия создания задач.",
      "I defined lead transitions, required closing fields, rejection reasons and handoff rules for enquiries on existing bookings. I also specified when cancellations and refunds should trigger follow-up tasks."
    ],
    [
      "Как оценить эффект",
      "Measuring impact",
      "Для сравнения до и после выделила долю расхождений статусов, ручные передачи чатов, смены ответственных и сделки без активности.",
      "I selected status mismatches, manual chat transfers, ownership changes and inactive deals as before-and-after measures."
    ]
  ],
  "agent-insurance": [
    [
      "Задача",
      "Problem",
      "Агент запрашивает счёт в личном кабинете, менеджер выставляет его в системе бронирования, а бухгалтерия подтверждает поступление денег. Между оплатой и подтверждением менеджер ещё не знает, можно ли оформлять полис.",
      "The agent requests an invoice, the manager issues it in the booking system and accounting confirms receipt. Until confirmation, the manager cannot tell whether to issue the policy."
    ],
    [
      "Моя работа",
      "My contribution",
      "Описала цепочку между личным кабинетом, бронированием и учётной системой. Выделила события, которые нужно различать: выставление счёта, поступление денег, подтверждение оплаты и выпуск полиса.",
      "I mapped the workflow across the agent portal, booking and accounting systems, identifying separate events for invoicing, receipt of funds, payment confirmation and policy issuance."
    ],
    [
      "Граничный сценарий",
      "Edge case",
      "Агент оплачивает счёт с опозданием, а к моменту сверки курс меняется. Здесь нужно согласовать, когда счёт теряет силу, кто принимает решение о перевыставлении и что видит агент до оформления полиса.",
      "The agent pays late and the exchange rate changes before reconciliation. The process needs rules for invoice expiry, responsibility for reissuing it and what the agent sees while issuance is pending."
    ]
  ],
  "agent-currency-payments": [
    [
      "Задача",
      "Problem",
      "Агент видит в личном кабинете рублёвые суммы по оплатам, но не может узнать, сколько уже оплатил в исходной валюте.",
      "The agent sees payments in rubles in the portal but cannot tell how much was paid in the original currency."
    ],
    [
      "Что нужно определить",
      "Analysis",
      "Где доступны исходная сумма и валюта каждого платежа, как платёж связан с заявкой и можно ли восстановить информацию по старым платежам. От этого зависит, какие данные кабинет может показать.",
      "The analysis identifies where each payment’s original amount and currency are available, how payments link to bookings and whether older records can be recovered. This determines what the portal can display."
    ],
    [
      "Граничный сценарий",
      "Edge case",
      "Если заявка оплачена несколькими платежами, каждый нужно рассматривать отдельно. Валютные суммы можно суммировать внутри одной валюты. Для старого платежа без исходной суммы нужно явно указать, какие данные доступны.",
      "For a booking paid in instalments, each payment is considered separately. Totals can be grouped by currency. When an older payment lacks its original amount, the interface should state which data are available."
    ]
  ]
};

function renderWorkCase(project, sections) {
  const body = sections.map(([ruTitle, enTitle, ruText, enText]) =>
    `<section><h3>${tr(ruTitle, enTitle)}</h3><p>${tr(ruText, enText)}</p></section>`
  ).join('');
  return `<h2>${tr(project[2], project[3])}</h2><p class="sub">${tr(project[4], project[5])}</p><div class="candy-story">${body}</div>`;
}

function render(){document.documentElement.lang=lang;document.getElementById('lang').textContent=lang==='ru'?'EN':'RU';document.querySelectorAll('[data-ru]').forEach(e=>e.innerHTML=e.dataset[lang]);document.getElementById('cards').innerHTML=projects.map((p,i)=>`<button class="card ${i===selected?'active':''}" data-index="${i}"><h3>${tr(p[1],p[7]??p[1])}</h3><p>${tr(p[4],p[5])}</p><div class="tags">${p[6].map(x=>`<span>${x}</span>`).join('')}</div></button>`).join('');document.querySelectorAll('.card').forEach(b=>b.onclick=()=>{selected=Number(b.dataset.index);render();document.getElementById('detail').scrollIntoView({behavior:'smooth'});});const p=projects[selected];if(p[0]==='candy-ledger'){document.getElementById('case').innerHTML=renderCandy();return;}if(workCases[p[0]]){document.getElementById('case').innerHTML=renderWorkCase(p,workCases[p[0]]);return;}document.getElementById('case').innerHTML=`<h2>${tr(p[2],p[3])}</h2><p>${tr(p[4],p[5])}</p>${p[0]==='ai-business-request-processor'?`<div class="demo"><p>${tr('Пример первичного разбора запроса','Example of business request intake')}</p><textarea id="request" placeholder="${tr('Агенты не видят оплаченные суммы в валюте. Нужно исправить.','Agents cannot see foreign-currency payments. Please fix.')}"></textarea><button id="analyze">${tr('Разобрать запрос','Analyze request')}</button><pre id="result" aria-live="polite"></pre></div>`:''}`;if(p[0]==='ai-business-request-processor')document.getElementById('analyze').onclick=analyze;}
function analyze(){const input=document.getElementById('request').value.trim();const currency=/валют|курс|currency|exchange/i.test(input);const bug=/ошиб|сломал|bug|broken/i.test(input);const result={mode:'rule_based_demo',classification:bug?tr('Ошибка','Bug'):tr('Запрос на изменение','Change request'),input,clarification_questions:currency?[tr('В какой валюте хранится сумма?','What currency is the source of truth?'),tr('Нужна ли история частичных оплат?','Should partial payments be shown?'),tr('Как учитывать возвраты?','How should refunds be handled?')]:[tr('Какой ожидается результат?','What is the expected outcome?'),tr('Какие пользователи затронуты?','Which users are affected?'),tr('Каковы критерии приёмки?','What are the acceptance criteria?')],human_review_required:true};document.getElementById('result').textContent=JSON.stringify(result,null,2);}
document.getElementById('lang').onclick=()=>{lang=lang==='ru'?'en':'ru';localStorage.setItem('portfolio-lang',lang);render();};render();
