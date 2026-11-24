const projects=[
["meeting-action-agent","Агент постановки задач","AI-агент постановки задач по встречам и письмам","AI agent for meeting and email action items","Поручение из письма или транскрипции становится задачей с исполнителем, постановщиком и контекстом.","Turn an instruction from email or a meeting transcript into a task with an assignee, a requester and context.",["AI Agent","Email","Meetings","Task Management"],"Action Item Agent"],
["leave-preparation-agent","Агент подготовки к отпуску","Агент подготовки к отпуску","Leave preparation agent","За неделю до отпуска проверяет документы и готовит уведомления для почты и чатов.","Checks documents and prepares email and chat notices one week before leave.",["AI Agent","Documents","Email","Chat"],"Leave Preparation Agent"],
["community-news-agent","Новостной агент","Новостной агент для сообществ","Community news agent","Следит за новостями сообществ, ранжирует публикации и присылает подборку в личный чат.","Monitors community news, ranks posts and delivers a selection in a direct chat.",["AI Agent","Ranking","Personalization","Chat"],"Community News Agent"],
["intent-recognizer","Распознавание намерений","Распознавание намерений и сценарии диалога","Intent recognition and dialogue design","От формулировки пользователя к подходящей ветке вопросов и ответов.","Routing a user's request to the appropriate question-and-answer branch.",["Intent Recognition","Dialogue Design"],"Intent Recognizer"],
['candy-ledger','Gems Ledger','Геймификация профессионального обучения','Professional training gamification','Правила начисления токенов, прогресс аккредитации и магазин наград.','Token award rules, accreditation progress and a rewards shop.',['Gamification','Business rules','Prototype']],
["crm-booking","CRM & Booking","CRM и система бронирования","CRM and booking integration","Как согласовать работу с обращениями и заявками в двух системах.","Aligning enquiry and booking workflows across two systems.",["CRM","Workflows","Integration"]],
["agent-insurance","Agent Insurance","Страхование для турагентов","Insurance workflow for travel agents","От запроса счёта до подтверждения оплаты и оформления полиса.","From invoice request to payment confirmation and policy issuance.",["B2B","Payments","Workflows"]],
["agent-currency-payments","Currency Payments","Валютные платежи в кабинете агента","Foreign-currency payments in the agent portal","Откуда брать валютную сумму и как показывать историю оплат.","Finding the source of original currency amounts and displaying payment history.",["Data Mapping","B2B","Payments"]],
['ai-business-request-processor','Business Request Processor','Первичная обработка бизнес-запросов на базе LLM','LLM-powered business request intake','Классификация, уточнение требований и черновик задачи.','Classification, clarification and task drafting.',['LLM','FastAPI','Pydantic']],
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
"intent-recognizer": [
  [
    "Задача",
    "Problem",
    "Пользователи формулируют одну и ту же просьбу по-разному. Системе нужно определить, чего хочет человек, и выбрать подходящий сценарий диалога.",
    "Users phrase the same request in different ways. The system needs to identify what the user wants and choose the appropriate dialogue path."
  ],
  [
    "Масштаб",
    "Scope",
    "В проекте было множество интентов и более 5 000 пользовательских фраз.",
    "The project covered numerous intents and more than 5,000 user utterances."
  ],
  [
    "Моя работа",
    "My contribution",
    "Я проработала распознавание пользовательских намерений и дерево диалога. Для каждого намерения описала ветки «вопрос — ответ» и переходы между ними.",
    "I designed the intent recognition flow and dialogue tree. For each intent, I mapped question-and-answer branches and the transitions between them."
  ],
  [
    "Сценарий перехода между навыками",
    "Handoff between assistant skills",
    "Для запросов об отпуске было несколько вариантов продолжения диалога. Один из них мог вызвать другой навык виртуального ассистента — «Мой HR-профиль». В нём сотрудник мог посмотреть, на каком этапе заявление, кто уже согласовал его и чьё решение ещё ожидается. Связаться с согласующим можно было прямо из навыка.",
    "Leave requests could follow several dialogue paths. One of them could invoke another virtual assistant skill, My HR Profile. The employee could see the request’s progress, who had approved it and whose decision was still pending, and contact an approver directly from the skill."
  ]
],
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



function renderIntentFlow() {
  const actions = [
    ['Проверить статус', 'Check status', 'Узнать, на каком этапе заявление', 'See the current stage of the request'],
    ['Посмотреть согласование', 'Review approvals', 'Увидеть, кто согласовал и чей ответ ожидается', 'See approvals and pending decisions'],
    ['Связаться с согласующим', 'Contact an approver', 'Написать напрямую из навыка', 'Contact them directly from the skill']
  ];
  return `<figure class="intent-flow">
    <figcaption><h3>${tr('Ветка об отпуске · один из вариантов', 'Leave dialogue · one possible path')}</h3></figcaption>
    <div class="intent-flow-root">
      <strong>${tr('«Что с моим заявлением на отпуск?»', '“What’s the status of my leave request?”')}</strong>
      <span aria-hidden="true">↓</span>
      <span>${tr('Распознан интент об отпуске', 'Leave intent recognized')}</span>
      <span aria-hidden="true">↓</span>
      <strong>${tr('Один из переходов · вызвать навык «Мой HR-профиль»', 'One possible transition · invoke the My HR Profile skill')}</strong>
    </div>
    <ul class="intent-branches">${actions.map(([titleRu, titleEn, textRu, textEn]) => `
      <li>
        <strong>${tr(titleRu, titleEn)}</strong>
        <span>${tr(textRu, textEn)}</span>
      </li>`).join('')}</ul>
  </figure>`;
}

function renderWorkCase(project, sections) {
  const body = sections.map(([ruTitle, enTitle, ruText, enText]) =>
    `<section><h3>${tr(ruTitle, enTitle)}</h3><p>${tr(ruText, enText)}</p></section>`
  ).join('');
  return `<h2>${tr(project[2], project[3])}</h2><p class="sub">${tr(project[4], project[5])}</p><div class="candy-story">${body}</div>${project[0] === 'intent-recognizer' ? renderIntentFlow() : ''}`;
}

const analysisProjects = new Set(['candy-ledger', 'crm-booking', 'agent-insurance', 'agent-currency-payments']);
const projectGroups = {
  ai: projects.filter(project => !analysisProjects.has(project[0])),
  analysis: projects.filter(project => analysisProjects.has(project[0]))
};

function groupFromAddress() {
  return location.hash === '#analysis-projects' ? 'analysis' : 'ai';
}

let projectGroup = groupFromAddress();

const projectWorkflows = {
  "meeting-action-agent": {
    "steps": [
      [
        "Получить письмо или транскрипцию",
        "Read an email or transcript"
      ],
      [
        "Выделить поручение и контекст",
        "Extract the instruction and context"
      ],
      [
        "Определить исполнителя и постановщика",
        "Identify assignee and requester"
      ]
    ],
    "decision": [
      "Поручение и участники определены?",
      "Are the instruction and participants identified?"
    ],
    "branches": [
      [
        "Да → Создать задачу с контекстом",
        "Yes → Create a task with context"
      ],
      [
        "Нет → Оставить на проверку",
        "No → Leave for review"
      ]
    ]
  },
  "leave-preparation-agent": {
    "steps": [
      [
        "За семь дней до отпуска запустить подготовку",
        "Start seven days before leave"
      ],
      [
        "Проверить документы",
        "Review documents"
      ]
    ],
    "decision": [
      "Документы в порядке?",
      "Are the documents ready?"
    ],
    "branches": [
      [
        "Да → Подготовить уведомления для почты и чатов",
        "Yes → Draft email and chat notices"
      ],
      [
        "Нет → Показать, что нужно проверить",
        "No → Flag what needs attention"
      ]
    ]
  },
  "community-news-agent": {
    "steps": [
      [
        "Собрать публикации сообществ",
        "Collect community posts"
      ],
      [
        "Оценить персональную релевантность",
        "Score personal relevance"
      ],
      [
        "Учесть востребованность и ранжировать",
        "Factor in demand and rank stories"
      ],
      [
        "Отправить подборку в личный чат",
        "Send the top stories in a direct chat"
      ]
    ]
  },
  "intent-recognizer": {
    "steps": [
      [
        "Получить фразу пользователя",
        "Receive the user’s phrase"
      ],
      [
        "Распознать интент об отпуске",
        "Recognize the leave intent"
      ]
    ],
    "decision": [
      "Выбрать продолжение диалога",
      "Choose the next dialogue path"
    ],
    "branches": [
      [
        "Один из переходов → Вызвать HR-навык: статус, согласования, связь с согласующим",
        "One possible transition → Invoke the HR skill: status, approvals and contact"
      ],
      [
        "Другие варианты → Продолжить по соответствующей ветке диалога",
        "Other paths → Continue along the applicable dialogue branch"
      ]
    ]
  },
  "candy-ledger": {
    "steps": [
      [
        "Выбрать курс, роль и условия прохождения",
        "Select course, role and completion conditions"
      ],
      [
        "Рассчитать начисление токенов",
        "Calculate the token award"
      ]
    ],
    "decision": [
      "Начисление превышает остаток до порога?",
      "Does the award exceed the remaining accreditation gap?"
    ],
    "branches": [
      [
        "Да → Закрыть остаток, излишек отправить в магазин",
        "Yes → Fill the gap and move excess tokens to the shop"
      ],
      [
        "Нет → Засчитать начисление в прогресс по роли",
        "No → Apply the award to progress for that role"
      ]
    ]
  },
  "crm-booking": {
    "steps": [
      [
        "Менеджер получает обращение в CRM",
        "A manager receives an enquiry in the CRM"
      ],
      [
        "Проверить, связано ли обращение с заявкой",
        "Check whether the enquiry relates to an existing booking"
      ]
    ],
    "decision": [
      "Какой сценарий нужен?",
      "Which workflow applies?"
    ],
    "branches": [
      [
        "Вопрос по заявке → Передать в сопровождение",
        "Booking enquiry → Route to support"
      ],
      [
        "Новое обращение → Обработать в воронке лидов",
        "New enquiry → Process in the lead pipeline"
      ]
    ]
  },
  "agent-insurance": {
    "steps": [
      [
        "Агент запрашивает счёт",
        "The agent requests an invoice"
      ],
      [
        "Менеджер выставляет счёт",
        "The manager issues the invoice"
      ],
      [
        "Бухгалтерия сверяет оплату",
        "Accounting reconciles payment"
      ]
    ],
    "decision": [
      "Оплата подтверждена и условия счёта действуют?",
      "Is payment confirmed and are invoice terms still valid?"
    ],
    "branches": [
      [
        "Да → Оформить полис",
        "Yes → Issue the policy"
      ],
      [
        "Нет → Дождаться подтверждения или проверить условия счёта",
        "No → Wait for confirmation or review the invoice terms"
      ]
    ]
  },
  "agent-currency-payments": {
    "steps": [
      [
        "Получить платежи по заявке",
        "Retrieve payments for a booking"
      ],
      [
        "Проверить исходную сумму и валюту каждого платежа",
        "Check the original amount and currency for each payment"
      ]
    ],
    "decision": [
      "Исходные данные доступны?",
      "Are the original payment details available?"
    ],
    "branches": [
      [
        "Да → Показать платежи и итог по каждой валюте",
        "Yes → Display payments and totals by currency"
      ],
      [
        "Нет → Показать доступные данные и обозначить пропуск",
        "No → Show available data and flag the gap"
      ]
    ]
  },
  "ai-business-request-processor": {
  "steps": [
    [
      "Получить письмо, тикет, чат или расшифровку",
      "Receive an email, ticket, chat or transcript"
    ],
    [
      "Очистить текст, замаскировать персональные данные, проверить дубли",
      "Clean and mask the text, check duplicates"
    ],
    [
      "Разделить темы и классифицировать запросы",
      "Split topics and classify requests"
    ],
    [
      "Извлечь требования, ограничения и цитаты",
      "Extract requirements, constraints and source quotes"
    ],
    [
      "Найти пробелы и подготовить вопросы",
      "Identify gaps and prepare questions"
    ],
    [
      "Собрать черновики задач",
      "Assemble draft tickets"
    ],
    [
      "Поставить черновики в очередь аналитика",
      "Queue drafts for analyst review"
    ]
  ],
  "decision": [
    "Решение аналитика",
    "Analyst decision"
  ],
  "branches": [
    [
      "Принять → Экспортировать задачу",
      "Approve → Export the ticket"
    ],
    [
      "Отредактировать → Сохранить правки и вернуться к проверке",
      "Edit → Save changes and return to review"
    ],
    [
      "Отклонить → Зафиксировать причину",
      "Reject → Record the reason"
    ]
  ]
},
  "ai-knowledge-assistant": {
    "steps": [
      [
        "Получить вопрос",
        "Receive a question"
      ],
      [
        "Найти подходящие фрагменты документов",
        "Retrieve relevant document passages"
      ]
    ],
    "decision": [
      "Достаточно источников для ответа?",
      "Is there enough evidence to answer?"
    ],
    "branches": [
      [
        "Да → Сформировать ответ со ссылками",
        "Yes → Answer with citations"
      ],
      [
        "Нет → Сообщить, каких сведений не хватает",
        "No → Report the evidence gap"
      ]
    ]
  },
  "ai-ticket-classifier": {
    "steps": [
      [
        "Получить обращение",
        "Receive a ticket"
      ],
      [
        "Определить тему и маршрут",
        "Identify the category and routing destination"
      ]
    ],
    "decision": [
      "Маршрут однозначен?",
      "Is the routing destination clear?"
    ],
    "branches": [
      [
        "Да → Направить в нужную очередь",
        "Yes → Route to the appropriate queue"
      ],
      [
        "Нет → Передать на ручную классификацию",
        "No → Send for manual classification"
      ]
    ]
  },
  "ai-document-processing": {
    "steps": [
      [
        "Получить документ",
        "Receive a document"
      ],
      [
        "Извлечь поля",
        "Extract fields"
      ],
      [
        "Проверить форматы и обязательные значения",
        "Validate formats and required fields"
      ]
    ],
    "decision": [
      "Проверка пройдена?",
      "Did validation pass?"
    ],
    "branches": [
      [
        "Да → Передать структурированные данные",
        "Yes → Output structured data"
      ],
      [
        "Нет → Отметить поля для проверки",
        "No → Flag fields for review"
      ]
    ]
  },
  "llm-evaluation-monitoring": {
    "steps": [
      [
        "Запустить набор тестовых запросов",
        "Run an evaluation dataset"
      ],
      [
        "Измерить качество, задержку и стоимость",
        "Measure quality, latency and cost"
      ]
    ],
    "decision": [
      "Показатели в заданных пределах?",
      "Are metrics within thresholds?"
    ],
    "branches": [
      [
        "Да → Зафиксировать результаты сравнения",
        "Yes → Record comparison results"
      ],
      [
        "Нет → Разобрать отклонения по тестовым примерам",
        "No → Investigate deviations in test examples"
      ]
    ]
  }
};

function renderProjectWorkflow(id) {
  const workflow = projectWorkflows[id];
  const label = ([ru, en]) => tr(ru, en);
  const { steps, decision, branches } = workflow;
  const yaml = [
    'workflow: ' + id,
    'language: ' + lang,
    'steps:',
    ...steps.map(step => '  - ' + JSON.stringify(label(step))),
    ...(decision ? [
      'decision: ' + JSON.stringify(label(decision)),
      'branches:',
      ...branches.map(branch => '  - ' + JSON.stringify(label(branch)))
    ] : [])
  ].join('\n') + '\n';
  const download = `<a class="workflow-download" download="${id}-${lang}.yml" href="data:application/yaml;charset=utf-8,${encodeURIComponent(yaml)}">${tr('Скачать YAML', 'Download YAML')}</a>`;
  if (id === 'intent-recognizer') return download;

  return `<figure class="intent-flow project-workflow">
    <figcaption><h3>${tr('Схема процесса', 'Process flow')}</h3></figcaption>
    <ol class="workflow-steps">${steps.map(step => `<li>${escapeHTML(label(step))}</li>`).join('')}</ol>
    ${decision ? `<div class="intent-flow-root"><strong>${escapeHTML(label(decision))}</strong></div>
      <ul class="intent-branches">${branches.map(branch => `<li>${escapeHTML(label(branch))}</li>`).join('')}</ul>` : ''}
    ${download}
  </figure>`;
}


function renderIntake(project) {
  const decisions = [
  [
    "Подготовка",
    "Preprocessing",
    "Очистка цитат, маскирование персональных данных (regex + NER), поиск дублей по эмбеддингам.",
    "Remove quoted replies, mask personal data (regex + NER) and find duplicates using embeddings."
  ],
  [
    "Классификация",
    "Classification",
    "Few-shot для bug, enhancement, new_feature и consultation. Оценка ниже 0,7 ведёт к ручному разбору.",
    "Few-shot classification into bug, enhancement, new_feature and consultation. Scores below 0.7 go to manual review."
  ],
  [
    "Требования",
    "Requirements",
    "Атомарные требования с ID, категорией, цитатой-источником и оценкой уверенности.",
    "Atomic requirements with an ID, category, source quote and confidence score."
  ],
  [
    "Пробелы и вопросы",
    "Gaps and questions",
    "Чек-лист по типу запроса и семантическая проверка. Вопросы связаны с gap_id и отсортированы по критичности.",
    "Type-specific checklists and semantic checks. Questions link to a gap ID and are ranked by priority."
  ],
  [
    "Черновик и ревью",
    "Draft and review",
    "Контекст, требования, критерии приёмки, DoD, риски и предварительный размер. Аналитик принимает, правит или отклоняет черновик. Экспорт — после подтверждения.",
    "Context, requirements, acceptance criteria, DoD, risks and rough sizing. The analyst approves, edits or rejects the draft. Export follows approval."
  ]
];
  return `<h2>${tr(project[2],project[3])}</h2>
  <p class="sub">${tr('Роль · продуктовый дизайн и архитектура LLM-пайплайна', 'Role · product design and LLM pipeline architecture')}</p>
  <h3>${tr('Проблема и решение','Problem and solution')}</h3>
  <p>${tr('Запросы приходят из почты, чатов и тикетов. Аналитик вручную выделяет требования, ищет дубли и уточняет недостающие сведения. Сервис собирает из входящего текста черновик задачи и передаёт его аналитику на проверку.', 'Requests arrive by email, chat and tickets. Analysts manually extract requirements, find duplicates and clarify missing information. The service drafts a ticket from the incoming text and sends it to an analyst for review.')}</p>
  <h3>${tr('Ключевые решения','Key design decisions')}</h3>
  <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;text-align:left">
    <thead><tr><th scope="col" style="padding:8px;border-bottom:1px solid var(--line)">${tr('Этап','Stage')}</th><th scope="col" style="padding:8px;border-bottom:1px solid var(--line)">${tr('Что происходит','What happens')}</th></tr></thead>
    <tbody>${decisions.map(([ru,en,textRu,textEn]) => `<tr><th scope="row" style="padding:8px;border-bottom:1px solid var(--line);vertical-align:top">${tr(ru,en)}</th><td style="padding:8px;border-bottom:1px solid var(--line)">${tr(textRu,textEn)}</td></tr>`).join('')}</tbody></table></div>
  <p>${tr('Стек · LangGraph, Pydantic / JSON Schema, PostgreSQL + pgvector. У каждого этапа с LLM свой промпт и схема ответа. Их можно тестировать и версионировать независимо. Быстрая модель классифицирует запросы, более сильная собирает черновик.', 'Stack · LangGraph, Pydantic / JSON Schema, PostgreSQL + pgvector. Each LLM stage has its own prompt and response schema. Stages can be tested and versioned independently. A fast model classifies requests and a stronger one drafts tickets.')}</p>
  <h3>${tr('Пример','Example')}</h3>
  <blockquote>${tr('«Сделайте выгрузку истории заказов в файл. И у коллеги вчера выскочила ошибка 500. Срочно к концу месяца».', '“Please add a file export for order history. A colleague also got an HTTP 500 yesterday. We need this by month-end.”')}</blockquote>
  <p>${tr('На ревью идут два черновика. Для экспорта (new_feature) нужно уточнить формат и поля, для ошибки (bug) — заказ и шаги воспроизведения. Срок отмечен в обоих черновиках как вопрос на уточнение: из письма неясно, относится ли он к обеим задачам.', 'Two drafts go to review. The export (new_feature) needs the file format and fields clarified. The error (bug) needs the order and reproduction steps. Both drafts flag the deadline for clarification because the email is ambiguous about whether it applies to both tasks.')}</p>
  <h3>${tr('Ожидаемый эффект и контроль','Expected impact and controls')}</h3>
  <p>${tr('Цель — сократить время до готового тикета и число итераций уточнения. Качество оценивается по точности классификации, полноте извлечения, доле полезных вопросов и доле правок. Цитаты помогают проверять требования, RAG добавляет доменный контекст, а чувствительные данные можно обрабатывать локально. Правки аналитика помогают улучшать промпты и примеры.', 'The goal is to reduce time to a ready ticket and clarification rounds. Quality is assessed through classification accuracy, extraction recall, useful-question rate and edit rate. Source quotes support verification, retrieval adds domain context and sensitive data can be handled locally. Analyst edits inform prompt and example improvements.')}</p>`;
}

function render(){document.documentElement.lang=lang;document.getElementById('lang').textContent=lang==='ru'?'EN':'RU';document.querySelectorAll('[data-ru]').forEach(e=>e.innerHTML=e.dataset[lang]);document.querySelectorAll('[data-project-group]').forEach(link => {
  if (link.dataset.projectGroup === projectGroup) link.setAttribute('aria-current', 'true');
  else link.removeAttribute('aria-current');
});document.getElementById('cards').innerHTML=projectGroups[projectGroup].map((p,i)=>`<button class="card ${i===selected?'active':''}" data-index="${i}"><h3>${tr(p[1],p[7]??p[1])}</h3><p>${tr(p[4],p[5])}</p><div class="tags">${p[6].map(x=>`<span>${x}</span>`).join('')}</div></button>`).join('');document.querySelectorAll('.card').forEach(b=>b.onclick=()=>{selected=Number(b.dataset.index);render();document.getElementById('detail').scrollIntoView({behavior:'smooth'});});const p=projectGroups[projectGroup][selected];const content = p[0] === 'candy-ledger' ? renderCandy()
  : p[0] === 'ai-business-request-processor' ? renderIntake(p)
  : workCases[p[0]] ? renderWorkCase(p, workCases[p[0]])
  : `<h2>${tr(p[2],p[3])}</h2><p>${tr(p[4],p[5])}</p>`;
document.getElementById('case').innerHTML = content + renderProjectWorkflow(p[0]);
}
document.getElementById('lang').onclick=()=>{lang=lang==='ru'?'en':'ru';localStorage.setItem('portfolio-lang',lang);render();};
window.addEventListener('hashchange', () => {
  if (!['', '#projects', '#ai-projects', '#analysis-projects'].includes(location.hash)) return;
  const nextGroup = groupFromAddress();
  if (nextGroup === projectGroup) return;
  projectGroup = nextGroup;
  selected = 0;
  render();
});
render();
