
export type Language = 'en' | 'ua' | 'de';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      benefits: 'Benefits',
      expertise: 'Expertise',
      target: 'Target',
      partnership: 'Partnership',
      process: 'Process',
      portfolio: 'Portfolio',
      faq: 'FAQ',
      contacts: 'Contacts',
      vibeCheck: 'Vibe Check',
      getVibeCheck: 'Get a vibe check'
    },
    hero: {
      badge: "Great ideas don't wait. Neither do we.",
      title1: 'Vibe Coding +',
      title2: 'Senior Oversight',
      description: 'We’ve replaced slow, traditional development with an AI-driven approach. Get complex solutions without compromising on security. Your budget works for results, not for long hours of waiting.',
      cta: 'Get a project vibe check',
      supportNodes: {
        analysts: 'Analysts',
        designers: 'Designers',
        qa: 'QA Experts',
        devs: 'Senior Devs',
        devops: 'Senior DevOps'
      }
    },
    benefits: {
      label: 'Benefits',
      title: 'Why settle for last decade’s speed in the era of AI?',
      items: [
        { title: 'Rapid hypothesis testing', desc: '(MVP in 1-2 weeks)' },
        { title: 'Smart cost optimization', desc: '(Save up to 70%)' },
        { title: 'Senior oversight', desc: 'for architectural integrity' }
      ]
    },
    expertise: {
      label: 'Expertise',
      title: 'Would you trust your business to AI without an architect’s oversight?',
      items: [
        { title: 'Architectural Oversight', desc: 'Senior expertise transforms AI speed into a cohesive system. Your project gains a scalable foundation built to the highest engineering standards.' },
        { title: 'Security First', desc: 'Our experts integrate multi-layered data protection into every line of code. We ensure security and full compliance with industry standards through professional oversight.' },
        { title: 'Review', desc: 'Every code block undergoes a rigorous review for cleanliness and maintainability. This ensures the seamless evolution and long-term stability of your product.' },
        { title: 'Support', desc: 'We leverage years of experience to solve complex technical challenges. Our team ensures project stability in situations that demand deep engineering expertise.' },
        { title: 'Business Alignment', desc: 'Senior experts translate your business priorities into precise technical solutions. Every development stage aligns the product with your strategic goals.' }
      ]
    },
    target: {
      label: 'Target',
      title: 'Does this sound like you?',
      items: [
        { title: 'AI-native startups (Pre-seed & Seed)', desc: 'The fastest way to capture the market and stay ahead of the curve.' },
        { title: 'Non-technical founders', desc: 'Your dedicated Senior partner to handle technical complexity and architecture from day one.' },
        { title: 'Teams prepping for investment', desc: 'Transform your vision into a functional, high-quality product ready for investor demos.' },
        { title: 'Businesses with overloaded backlogs', desc: 'Quickly ship long-standing tasks that your internal team hasn\'t reached yet.' }
      ]
    },
    partnership: {
      label: 'Partnership',
      title1: 'You can go it ',
      titleAlone: 'alone',
      title2: ', but ',
      titleTogether: 'moving together',
      title3: ' is always more secure.',
      description: 'Vibe Coding provides the speed; the Wami team provides the foundation. By choosing us, you partner with a company that has **12 years of market expertise**. Our analysts, designers, and QA experts are always by your side, ready to refine your vision and ensure your product’s success.',
      stats: [
        { label: 'Market Presence', value: '12', unit: 'Y', desc: 'Years of Engineering Excellence' },
        { label: 'Team Seniority', value: '99', unit: '%', desc: 'Senior-level Talent Density' }
      ]
    },
    process: {
      label: 'Process',
      title: 'The logic behind our speed',
      items: [
        { title: 'Discovery', desc: 'You define the vision and context in natural language. We dive deep into your business goals to capture the essence of the product.' },
        { title: 'Vibe Check & Estimation', desc: 'We validate the project’s feasibility for the Vibe Coding approach, provide a timeline, and fix the budget.' },
        { title: 'Strategy', desc: 'Senior engineers design the architecture and select the best-in-class AI tools to ensure speed without compromising integrity.' },
        { title: 'Fast Iterations', desc: 'A high-speed "prompt — build — review" loop. You see progress in real-time and refine requirements on the fly.' },
        { title: 'QA & Security Check', desc: 'Rigorous testing and code auditing by human experts. We ensure every feature is robust, secure, and ready for scale.' },
        { title: 'Deployment', desc: 'Rapid production launch. Your product is live and ready to meet your first users.' }
      ]
    },
    portfolio: {
      label: 'Portfolio',
      title: 'They’ve already shipped. Your turn',
      comingSoon: 'Portfolio content coming soon...',
      viewCase: 'View Case',
      back: 'Back',
      backToCases: 'Back to cases',
      nextProject: 'Next project',
      goToNextCase: 'Go to next case',
      vacations: {
        title: 'Wami vacations — HR experience layer',
        desc: 'Beyond simple tracking, we’ve built an engagement layer that turns vacation management into a team-building tool. It’s a space designed to boost motivation, foster belonging, and make corporate culture tangible in every click.'
      },
      balancePulse: {
        title: 'The balance pulse',
        desc: 'A personal financial coaching experience that goes beyond traditional budgeting tools, focusing on the psychology of spending. The system helps users distinguish essential needs from impulsive desires, enabling more conscious and sustainable financial decisions.',
        category: 'FinTech',
        goalTitle: 'Goal of the project',
        servicesTitle: 'Services',
        servicesItems: [
          { q: 'Business alignment', a: 'The “Dopamine vs Important” concept was turned into clear product logic that supports user behavior and business goals.' },
          { q: 'Architectural oversight', a: 'The system was designed for AI analytics, personalization, and future scalability.' },
          { q: 'AI-assisted development', a: 'Rapid build of core features: expense tracking, insights, and forecasting.' },
          { q: 'Security first', a: 'Sensitive user data is protected at every stage.' },
          { q: 'Code review & stability', a: 'Clean, maintainable code ensures product stability throughout development.' }
        ],
        goalDesc: 'To create a personal financial coaching experience that helps users distinguish essential needs from impulsive desires, enabling more conscious and sustainable financial decisions.',
        conceptTitle: 'Core concept',
        conceptDesc: 'Instead of dozens of complex categories, the app divides spending into two types:',
        essentialTitle: 'Essential',
        essentialDesc: 'Rent, health, groceries, education — the things that build your foundation.',
        dopamineTitle: 'Dopamine',
        dopamineDesc: 'Coffee, impulse shopping, taxis, entertainment — things that bring quick joy but can drain your budget.',
        featuresTitle: 'Key features',
        featuresDesc: 'Tools that help you understand your spending through psychology: track satisfaction from each purchase, uncover behavioral patterns, and get personalized AI insights to improve financial habits.',
        motivationTitle: 'Motivation toggle',
        motivationDesc: 'Each time you log an expense, you select its type and rate your happiness level (1–5). This allows the AI to calculate your “cost per unit of joy.”',
        dopamineDeepDiveTitle: 'Dopamine deep dive',
        dopamineDeepDiveDesc: 'Advanced analytics that uncover patterns. The AI will point out if you tend to spend more on “dopamine” during stressful days (for example, on Tuesdays).',
        aiTutorTitle: 'AI tutor',
        aiTutorDesc: 'An interactive section where you receive short, personalized cards on financial literacy, tailored to your actual spending habits.',
        forecastingTitle: 'Smart forecasting',
        forecastingDesc: 'You can ask the chat about a major purchase, and it will predict how it will impact your budget next month, taking into account your fixed expenses.',
        overallTitle: 'Overall',
        overallDesc: 'This app helps you stop feeling guilty about spending and instead gives you tools for mindful money management.',
        teamVoiceTitle: 'Teamvoice',
        teamVoiceItems: [
          {
            name: 'Alisa',
            role: 'Product Owner',
            quote: 'This project showed how a clear idea can quickly evolve into a real product with the right approach. The “Dopamine vs Important” concept developed rapidly, and vibe coding allowed us to test and refine features almost in real time. It felt less like a traditional process and more like continuous product thinking and iteration.'
          },
          {
            name: 'Diana',
            role: 'UX/UI Designer',
            quote: 'This product was all about simplifying complexity. We focused on making financial tracking intuitive and emotionally engaging, not overwhelming. With vibe coding, design decisions could be instantly tested in the interface, making the process faster and more collaborative.'
          },
          {
            name: 'Alex',
            role: 'Senior Developer',
            quote: 'The development speed was impressive, but maintaining code quality was key. With AI generating parts of the implementation, my role was to review, structure, and ensure long-term scalability. In the end, we achieved both — fast delivery and solid engineering standards.'
          }
        ]
      },
      lumina: { title: 'Lumina Health AI', category: 'Medical Diagnostics Platform' },
      wamioff: { title: 'WAMIOFF Platform', category: 'Internal Corporate Ecosystem' },
      citySurvivalKit: {
        title: 'City survival kit',
        desc: 'Not just a city guide, but a full-fledged “operating system” for life in a new place. The product helps people adapt quickly — from basic needs to understanding local rules and the environment.',
        category: 'Relocation AI',
        servicesTitle: 'Services',
        servicesItems: [
          { q: 'Business logic', a: 'The concept of rapid adaptation and a local guide was turned into clear product logic that supports user behavior and business goals.' },
          { q: 'Architectural design', a: 'The system is designed for AI personalization, analytics, and future scalability.' },
          { q: 'AI product support', a: 'Rapid implementation of core features: service map, bureaucracy guides, cost forecasting, and AI assistant.' },
          { q: 'User security', a: 'Personal data and user history are protected at every stage.' },
          { q: 'Code quality & stability', a: 'Regular code reviews and testing ensure product reliability and stability.' }
        ],
        teamVoiceTitle: 'Teamvoice',
        teamVoiceItems: [
          {
            name: 'Valery',
            role: 'Product Owner',
            quote: 'This project showed how the idea of an "operating system for a new city" can quickly turn into a real product. Thanks to vibe coding, we could test and refine features in near real-time, making the process flexible and user-oriented.'
          },
          {
            name: 'Diana',
            role: 'UX/UI Designer',
            quote: 'The goal was to make adaptation as simple and clear as possible. We created an interface that helps find services, navigate bureaucracy, and get local tips without overwhelming the user. Thanks to vibe coding, the design could be immediately checked for viability in a real product.'
          },
          {
            name: 'Oleg',
            role: 'Senior Developer',
            quote: 'Rapid implementation of key features was important, but even more important was system reliability and scalability. I was responsible for architecture, code review, and integration of AI features. As a result, we got a product that is both fast to launch and maintain in the long term.'
          }
        ]
      }
    },
    mockups: {
      lumina: {
        name: 'LuminaAI',
        dashboard: 'Dashboard',
        insights: 'Insights',
        reports: 'Reports',
        signUp: 'Sign Up',
        title: 'Diagnostics Revolutionized with Lumina',
        desc: 'Analyze complex medical data in seconds with our state-of-the-art neural engine.',
        getStarted: 'Get Started',
        learnMore: 'Learn More',
        accuracy: 'Accuracy',
        topRated: 'Top Rated AI',
        dataPoints: 'Data Points',
        hospitals: 'Hospitals',
        diagnostics: 'Diagnostics'
      },
      wamioff: {
        name: 'WAMIOFF',
        title: 'Internal Ecosystem Efficiency Builder',
        desc: 'The all-in-one platform for modern HR and office management.'
      }
    },
    faq: {
      label: 'FAQ',
      title: 'Questions & Answers',
      items: [
        { q: "Does such high development speed compromise code quality?", a: "Quite the opposite. AI handles the boilerplate and routine coding, allowing our Senior Engineer to focus entirely on architecture, logic, and security. You get a product built to high standards, just 5x faster." },
        { q: "Will I be able to scale the project as my business grows?", a: "Yes. That’s the main reason we don’t work without Senior oversight. We produce clean, standardized code and a scalable architecture. Your MVP won't become \"tech debt\"—it will be a solid foundation for future growth." },
        { q: "How secure is AI-driven development for my product?", a: "We follow a \"Security First\" principle. Every line of code generated by AI undergoes a rigorous review by a Senior expert. We vet the system for vulnerabilities and ensure your data is fully protected." },
        { q: "What types of projects benefit the most from Vibe Coding?", a: "It’s the perfect choice for MVPs, SaaS platforms, internal business tools, and rapid hypothesis testing. If you need to hit the market \"yesterday\" or present a live product to investors, this is for you." },
        { q: "Who owns the intellectual property and the final code?", a: "You do. We operate on a transparent model: you get full access to the repository and all intellectual property rights to the product. We are your partner in building it, but you always own the result." }
      ]
    },
    contact: {
      label: 'Contacts',
      title: 'Ready to grow? We’ll handle the tech',
      cta: 'Get a project vibe check'
    },
    modal: {
      title: 'Get a project vibe check',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      message: 'Message',
      messagePlaceholder: 'Tell us about your project',
      send: 'Send Request',
      successTitle: 'Thank you!',
      successDesc: 'Your request has been sent to our team. We\'ll get back to you shortly.',
      back: 'Back to site'
    },
    emailModal: {
      title: 'Send us an email',
      desc: 'Choose your preferred way to contact us',
      openIn: 'Open in',
      copy: 'Copy Email Address',
      copied: 'Copied!'
    },
    footer: {
      copyright: '©2026 Wamisoftware. All rights reserved. Wamisoftware is the LTD company registered in the UK.'
    }
  },
  ua: {
    nav: {
      home: 'Головна',
      benefits: 'Переваги',
      expertise: 'Експертиза',
      target: 'Цільова аудиторія',
      partnership: 'Партнерство',
      process: 'Процес',
      portfolio: 'Портфоліо',
      faq: 'FAQ',
      contacts: 'Контакти',
      vibeCheck: 'Vibe Check',
      getVibeCheck: 'Отримати vibe check'
    },
    hero: {
      badge: "Чудові ідеї не чекають. Ми також.",
      title1: 'Vibe Coding +',
      title2: 'Сеньйор-нагляд',
      description: 'Ми замінили повільну традиційну розробку підходом на основі ШІ. Отримуйте складні рішення без компромісів у безпеці. Ваш бюджет працює на результат, а не на довгі години очікування.',
      cta: 'Отримати vibe check проекту',
      supportNodes: {
        analysts: 'Аналітики',
        designers: 'Дизайнери',
        qa: 'Експерти з якості',
        devs: 'Сеньйор-розробники',
        devops: 'Сеньйор DevOps'
      }
    },
    benefits: {
      label: 'Переваги',
      title: 'Навіщо погоджуватися на швидкість минулого десятиліття в епоху ШІ?',
      items: [
        { title: 'Швидке тестування гіпотез', desc: '(MVP за 1-2 тижні)' },
        { title: 'Розумна оптимізація витрат', desc: '(Економія до 70%)' },
        { title: 'Сеньйор-нагляд', desc: 'для архітектурної цілісності' }
      ]
    },
    expertise: {
      label: 'Експертиза',
      title: 'Чи довірили б ви свій бізнес ШІ без нагляду архітектора?',
      items: [
        { title: 'Архітектурний нагляд', desc: 'Експертиза сеньйор-рівня перетворює швидкість ШІ на цілісну систему. Ваш проект отримує масштабовану основу, побудовану за найвищими інженерними стандартами.' },
        { title: 'Безпека понад усе', desc: 'Наші експерти інтегрують багаторівневий захист даних у кожен рядок коду. Ми забезпечуємо безпеку та повну відповідність галузевим стандартам через професійний нагляд.' },
        { title: 'Рев\'ю коду', desc: 'Кожен блок коду проходить ретельну перевірку на чистоту та підтримуваність. Це гарантує плавний розвиток та довгострокову стабільність вашого продукту.' },
        { title: 'Підтримка', desc: 'Ми використовуємо багаторічний досвід для вирішення складних технічних викликів. Наша команда забезпечує стабільність проектів у ситуаціях, що вимагають глибокої інженерної експертизи.' },
        { title: 'Відповідність бізнесу', desc: 'Сеньйор-експерти перетворюють ваші бізнес-пріоритети на точні технічні рішення. Кожен етап розробки узгоджує продукт з вашими стратегічними цілями.' }
      ]
    },
    target: {
      label: 'Цільова аудиторія',
      title: 'Це звучить як ви?',
      items: [
        { title: 'AI-native стартапи (Pre-seed & Seed)', desc: 'Найшвидший спосіб захопити ринок і залишатися попереду.' },
        { title: 'Нетехнічні засновники', desc: 'Ваш відданий сеньйор-партнер для вирішення технічної складності та архітектури з першого дня.' },
        { title: 'Команди, що готуються до інвестицій', desc: 'Перетворіть своє бачення на функціональний, високоякісний продукт, готовий до демо для інвесторів.' },
        { title: 'Бізнеси з перевантаженими беклогами', desc: 'Швидко реалізуйте давні завдання, до яких ваша внутрішня команда ще не дійшла.' }
      ]
    },
    partnership: {
      label: 'Партнерство',
      title1: 'Ви можете йти ',
      titleAlone: 'самі',
      title2: ', але ',
      titleTogether: 'рухатися разом',
      title3: ' завжди безпечніше.',
      description: 'Vibe Coding забезпечує швидкість; команда Wami забезпечує фундамент. Обираючи нас, ви стаєте партнером компанії з **12-річним досвідом на ринку**. Наші аналітики, дизайнери та QA-експерти завжди поруч, готові вдосконалити ваше бачення та забезпечити успіх вашого продукту.',
      stats: [
        { label: 'Присутність на ринку', value: '12', unit: 'Р', desc: 'Років інженерної досконалості' },
        { label: 'Сеньйорність команди', value: '99', unit: '%', desc: 'Щільність талантів сеньйор-рівня' }
      ]
    },
    process: {
      label: 'Процес',
      title: 'Логіка нашої швидкості',
      items: [
        { title: 'Discovery', desc: 'Ви визначаєте бачення та контекст природною мовою. Ми глибоко занурюємося у ваші бізнес-цілі, щоб вловити суть продукту.' },
        { title: 'Vibe Check та оцінка', desc: 'Ми перевіряємо технічну можливість проекту для підходу Vibe Coding, надаємо графік та фіксуємо бюджет.' },
        { title: 'Стратегія', desc: 'Сеньйор-інженери розробляють архітектуру та обирають найкращі інструменти ШІ, щоб забезпечити швидкість без компромісів у цілісності.' },
        { title: 'Швидкі ітерації', desc: 'Високошвидкісний цикл «prompt — build — review». Ви бачите прогрес у реальному часі та уточнюєте вимоги на льоту.' },
        { title: 'Контроль якості та безпека', desc: 'Ретельне тестування та аудит коду людськими експертами. Ми гарантуємо, що кожна функція надійна, безпечна та готова до масштабування.' },
        { title: 'Деплоймент', desc: 'Швидкий запуск у продаж. Ваш продукт готовий до зустрічі з першими користувачами.' }
      ]
    },
    portfolio: {
      label: 'Портфоліо',
      title: 'Вони вже запустилися. Ваша черга',
      comingSoon: 'Контент портфоліо незабаром...',
      viewCase: 'Дивитися кейс',
      back: 'Назад',
      backToCases: 'Назад до кейсів',
      nextProject: 'Наступний проект',
      goToNextCase: 'Перейти до наступного кейсу',
      vacations: {
        title: 'Wami відпустки — HR experience layer',
        desc: 'Крім простого відстеження, ми створили рівень залучення, який перетворює управління відпустками на інструмент тімбілдінгу. Це простір, розроблений для підвищення мотивації, формування почуття причетності та втілення корпоративної культури в кожному кліку.'
      },
      balancePulse: {
        title: 'The balance pulse',
        desc: 'Персональний досвід фінансового коучингу, який виходить за рамки традиційних інструментів бюджетування, зосереджуючись на психології витрат. Система допомагає користувачам відрізняти основні потреби від імпульсивних бажань, що дозволяє приймати більш свідомі та сталі фінансові рішення.',
        category: 'FinTech',
        goalTitle: 'Мета проекту',
        servicesTitle: 'Послуги',
        servicesItems: [
          { q: 'Business alignment', a: 'Концепція «Дофамін проти Важливого» була перетворена на чітку логіку продукту, яка підтримує поведінку користувачів та бізнес-цілі.' },
          { q: 'Architectural oversight', a: 'Система була розроблена для ШІ-аналітики, персоналізації та майбутньої масштабованості.' },
          { q: 'AI-assisted development', a: 'Швидка розробка основних функцій: відстеження витрат, інсайти та прогнозування.' },
          { q: 'Security first', a: 'Конфіденційні дані користувачів захищені на кожному етапі.' },
          { q: 'Code review & stability', a: 'Чистий код, що легко підтримується, забезпечує стабільність продукту протягом усієї розробки.' }
        ],
        goalDesc: 'Створити персональний досвід фінансового коучингу, який допомагає користувачам відрізняти основні потреби від імпульсивних бажань, що дозволяє приймати більш свідомі та сталі фінансові рішення.',
        conceptTitle: 'Основна концепція',
        conceptDesc: 'Замість десятків складних категорій додаток ділить витрати на два типи:',
        essentialTitle: 'Основне',
        essentialDesc: 'Оренда, здоров\'я, продукти, освіта — речі, які будують ваш фундамент.',
        dopamineTitle: 'Дофамін',
        dopamineDesc: 'Кава, імпульсивні покупки, таксі, розваги — речі, які приносять швидку радість, але можуть виснажити ваш бюджет.',
        featuresTitle: 'Ключові особливості',
        featuresDesc: 'Інструменти, що допомагають зрозуміти ваші витрати через психологію: відстежуйте задоволення від кожної покупки, виявляйте поведінкові патерни та отримуйте персоналізовані поради від ШІ для покращення фінансових звичок.',
        motivationTitle: 'Motivation toggle',
        motivationDesc: 'Кожного разу, коли ви реєструєте витрату, ви обираєте її тип і оцінюєте рівень щастя (1–5). Це дозволяє ШІ розрахувати вашу «вартість одиниці радості».',
        dopamineDeepDiveTitle: 'Dopamine deep dive',
        dopamineDeepDiveDesc: 'Розширена аналітика, що виявляє закономірності. ШІ підкаже, якщо ви схильні витрачати більше на «дофамін» у стресові дні (наприклад, по вівторках).',
        aiTutorTitle: 'AI tutor',
        aiTutorDesc: 'Інтерактивний розділ, де ви отримуєте короткі персоналізовані картки з фінансової грамотності, адаптовані до ваших реальних витрат.',
        forecastingTitle: 'Smart forecasting',
        forecastingDesc: 'Ви можете запитати чат про велику покупку, і він спрогнозує, як це вплине на ваш бюджет наступного місяця, враховуючи ваші постійні витрати.',
        overallTitle: 'Загалом',
        overallDesc: 'Цей додаток допомагає перестати відчувати провину за витрати і натомість дає інструменти для усвідомленого управління грошима.',
        teamVoiceTitle: 'Голос команди',
        teamVoiceItems: [
          {
            name: 'Аліса',
            role: 'Product Owner',
            quote: 'Цей проект показав, як чітка ідея може швидко перетворитися на реальний продукт за правильного підходу. Концепція «Дофамін проти Важливого» розвивалася стрімко, а vibe coding дозволив нам тестувати та вдосконалювати функції майже в реальному часі. Це було менше схоже на традиційний процес і більше на безперервне продуктове мислення та ітерації.'
          },
          {
            name: 'Діана',
            role: 'UX/UI Designer',
            quote: 'Цей продукт був присвячений спрощенню складності. Ми зосередилися на тому, щоб зробити фінансове відстеження інтуїтивно зрозумілим та емоційно привабливим, а не обтяжливим. Завдяки vibe coding дизайнерські рішення можна було миттєво протестувати в інтерфейсі, що зробило процес швидшим та більш спільним.'
          },
          {
            name: 'Алекс',
            role: 'Senior Developer',
            quote: 'Швидкість розробки була вражаючою, але ключовим було збереження якості коду. Оскільки ШІ генерував частини реалізації, моєю роллю було переглядати, структурувати та забезпечувати довгострокову масштабованість. Зрештою, ми досягли обох цілей — швидкої доставки та надійних інженерних стандартів.'
          }
        ]
      },
      lumina: { title: 'Lumina Health AI', category: 'Медична діагностична платформа' },
      wamioff: { title: 'WAMIOFF Platform', category: 'Внутрішня корпоративна екосистема' },
      citySurvivalKit: {
        title: 'City survival kit',
        desc: 'Не просто путівник містом, а повноцінна «операційна система» для життя на новому місці. Продукт допомагає людям швидко адаптуватися — від базових потреб до розуміння місцевих правил та середовища.',
        category: 'Relocation AI',
        servicesTitle: 'Послуги',
        servicesItems: [
          { q: 'Business logic', a: 'Концепція швидкої адаптації та локального гіда була перетворена на чітку логіку продукту, яка підтримує поведінку користувачів та бізнес-цілі.' },
          { q: 'Architectural design', a: 'Система розроблена для ШІ-персоналізації, аналітики та майбутньої масштабованості.' },
          { q: 'AI product support', a: 'Швидке впровадження основних функцій: карта сервісів, бюрократичні гайди, прогнозування витрат та ШІ-асистент.' },
          { q: 'User security', a: 'Особисті дані та історія користувачів захищені на кожному етапі.' },
          { q: 'Code quality & stability', a: 'Регулярні рев\'ю коду та тестування забезпечують надійність та стабільність продукту.' }
        ],
        teamVoiceTitle: 'Teamvoice',
        teamVoiceItems: [
          {
            name: 'Valery',
            role: 'Product Owner',
            quote: 'Цей проєкт показав, як ідея “операційної системи для нового міста” може швидко перетворитися на реальний продукт. Завдяки vibe coding ми могли тестувати та уточнювати функції в режимі майже реального часу, роблячи процес гнучким і орієнтованим на користувача.'
          },
          {
            name: 'Diana',
            role: 'UX/UI Designer',
            quote: 'Мета була зробити адаптацію максимально простою та зрозумілою. Ми створювали інтерфейс, який допомагає знаходити сервіси, проходити бюрократію та отримувати локальні поради без перевантаження користувача. Завдяки vibe coding дизайн відразу можна було перевірити на життєздатність у реальному продукті.'
          },
          {
            name: 'Oleg',
            role: 'Senior Developer',
            quote: 'Швидка реалізація ключових функцій була важлива, але ще важливішою — надійність системи та масштабованість. Я відповідав за архітектуру, код-рев’ю та інтеграцію AI-функцій. В результаті ми отримали продукт, який одночасно швидко запускати і підтримувати в довгостроковій перспективі.'
          }
        ]
      }
    },
    mockups: {
      lumina: {
        name: 'LuminaAI',
        dashboard: 'Дашборд',
        insights: 'Інсайти',
        reports: 'Звіти',
        signUp: 'Реєстрація',
        title: 'Діагностика, революціонізована з Lumina',
        desc: 'Аналізуйте складні медичні дані за лічені секунди за допомогою нашого сучасного нейронного двигуна.',
        getStarted: 'Почати',
        learnMore: 'Дізнатися більше',
        accuracy: 'Точність',
        topRated: 'Найкращий ШІ',
        dataPoints: 'Точки даних',
        hospitals: 'Лікарні',
        diagnostics: 'Діагностика'
      },
      wamioff: {
        name: 'WAMIOFF',
        title: 'Побудова ефективності внутрішньої екосистеми',
        desc: 'Універсальна платформа для сучасного HR та управління офісом.'
      }
    },
    faq: {
      label: 'FAQ',
      title: 'Питання та відповіді',
      items: [
        { q: "Чи не шкодить така висока швидкість розробки якості коду?", a: "Навпаки. ШІ бере на себе шаблонний код і рутину, дозволяючи нашому сеньйор-інженеру повністю зосередитися на архітектурі, логіці та безпеці. Ви отримуєте продукт, побудований за високими стандартами, просто в 5 разів швидше." },
        { q: "Чи зможу я масштабувати проект у міру зростання бізнесу?", a: "Так. Це головна причина, чому ми не працюємо без нагляду сеньйора. Ми створюємо чистий, стандартизований код і масштабовану архітектуру. Ваш MVP не стане «технічним боргом» — він буде міцним фундаментом для майбутнього зростання." },
        { q: "Наскільки безпечна розробка за допомогою ШІ для мого продукту?", a: "Ми дотримуємося принципу «Безпека понад усе». Кожен рядок коду, згенерований ШІ, проходить сувору перевірку сеньйор-експертом. Ми перевіряємо систему на вразливості та гарантуємо повний захист ваших даних." },
        { q: "Яким типам проектів найбільше підходить Vibe Coding?", a: "Це ідеальний вибір для MVP, SaaS-платформ, внутрішніх бізнес-інструментів та швидкого тестування гіпотез. Якщо вам потрібно вийти на ринок «на вчора» або представити живий продукт інвесторам — це для вас." },
        { q: "Кому належить інтелектуальна власність та фінальний код?", a: "Вам. Ми працюємо за прозорою моделлю: ви отримуєте повний доступ до репозиторію та всі права інтелектуальної власності на продукт. Ми — ваш партнер у його створенні, але ви завжди володієте результатом." }
      ]
    },
    contact: {
      label: 'Контакти',
      title: 'Готові до зростання? Ми подбаємо про технології',
      cta: 'Отримати vibe check проекту'
    },
    modal: {
      title: 'Отримати vibe check проекту',
      name: 'Ім\'я',
      namePlaceholder: 'Ваше ім\'я',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      message: 'Повідомлення',
      messagePlaceholder: 'Розкажіть нам про ваш проект',
      send: 'Надіслати запит',
      successTitle: 'Дякуємо!',
      successDesc: 'Ваш запит надіслано нашій команді. Ми зв\'яжемося з вами найближчим часом.',
      back: 'Назад на сайт'
    },
    emailModal: {
      title: 'Надішліть нам листа',
      desc: 'Оберіть зручний спосіб зв\'язку',
      openIn: 'Відкрити в',
      copy: 'Копіювати адресу',
      copied: 'Скопійовано!'
    },
    footer: {
      copyright: '©2026 Wamisoftware. Всі права захищені. Wamisoftware — компанія LTD, зареєстрована у Великобританії.'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      benefits: 'Vorteile',
      expertise: 'Expertise',
      target: 'Zielgruppe',
      partnership: 'Partnerschaft',
      process: 'Prozess',
      portfolio: 'Portfolio',
      faq: 'FAQ',
      contacts: 'Kontakte',
      vibeCheck: 'Vibe Check',
      getVibeCheck: 'Vibe Check anfordern'
    },
    hero: {
      badge: "Großartige Ideen warten nicht. Wir auch nicht.",
      title1: 'Vibe Coding +',
      title2: 'Senior-Aufsicht',
      description: 'Wir haben die langsame, traditionelle Entwicklung durch einen KI-gesteuerten Ansatz ersetzt. Erhalten Sie komplexe Lösungen ohne Kompromisse bei der Sicherheit. Ihr Budget arbeitet für Ergebnisse, nicht für lange Wartezeiten.',
      cta: 'Projekt Vibe Check anfordern',
      supportNodes: {
        analysts: 'Analysten',
        designers: 'Designer',
        qa: 'Experten für Qualitätssicherung',
        devs: 'Senior-Entwickler',
        devops: 'Senior DevOps'
      }
    },
    benefits: {
      label: 'Vorteile',
      title: 'Warum sich mit der Geschwindigkeit des letzten Jahrzehnts zufrieden geben?',
      items: [
        { title: 'Schnelles Testen von Hypothesen', desc: '(MVP in 1-2 Wochen)' },
        { title: 'Intelligente Kostenoptimierung', desc: '(Bis zu 70% sparen)' },
        { title: 'Senior-Aufsicht', desc: 'für architektonische Integrität' }
      ]
    },
    expertise: {
      label: 'Expertise',
      title: 'Würden Sie Ihr Unternehmen einer KI ohne die Aufsicht eines Architekten anvertrauen?',
      items: [
        { title: 'Architektonische Aufsicht', desc: 'Senior-Expertise verwandelt KI-Geschwindigkeit in ein kohärentes System. Ihr Projekt erhält ein skalierbares Fundament nach höchsten Engineering-Standards.' },
        { title: 'Sicherheit zuerst', desc: 'Unsere Experten integrieren mehrschichtigen Datenschutz in jede Codezeile. Wir gewährleisten Sicherheit und volle Compliance mit Industriestandards durch professionelle Aufsicht.' },
        { title: 'Review', desc: 'Jeder Codeblock wird einer strengen Prüfung auf Sauberkeit und Wartbarkeit unterzogen. Dies sichert die nahtlose Weiterentwicklung und langfristige Stabilität Ihres Produkts.' },
        { title: 'Support', desc: 'Wir nutzen jahrelange Erfahrung, um komplexe technische Herausforderungen zu lösen. Unser Team sichert die Projektstabilität in Situationen, die tiefes Engineering-Know-how erfordern.' },
        { title: 'Business Alignment', desc: 'Senior-Experten übersetzen Ihre Geschäftsprioritäten in präzise technische Lösungen. Jede Entwicklungsphase richtet das Produkt an Ihren strategischen Zielen aus.' }
      ]
    },
    target: {
      label: 'Zielgruppe',
      title: 'Klingt das nach Ihnen?',
      items: [
        { title: 'KI-native Startups (Pre-Seed & Seed)', desc: 'Der schnellste Weg, den Markt zu erobern und der Konkurrenz voraus zu sein.' },
        { title: 'Nicht-technische Gründer', desc: 'Ihr engagierter Senior-Partner für technische Komplexität und Architektur vom ersten Tag an.' },
        { title: 'Teams vor der Investition', desc: 'Verwandeln Sie Ihre Vision in ein funktionales, hochwertiges Produkt, bereit für Investoren-Demos.' },
        { title: 'Unternehmen mit überlasteten Backlogs', desc: 'Erledigen Sie schnell langjährige Aufgaben, zu denen Ihr internes Team noch nicht gekommen ist.' }
      ]
    },
    partnership: {
      label: 'Partnerschaft',
      title1: 'Sie können es ',
      titleAlone: 'alleine',
      title2: ' versuchen, aber ',
      titleTogether: 'gemeinsam voranzukommen',
      title3: ' ist immer sicherer.',
      description: 'Vibe Coding liefert die Geschwindigkeit; das Wami-Team liefert das Fundament. Mit uns entscheiden Sie sich für einen Partner mit **12 Jahren Markterfahrung**. Unsere Analysten, Designer und QA-Experten stehen Ihnen jederzeit zur Seite, um Ihre Vision zu verfeinern und den Erfolg Ihres Produkts sicherzustellen.',
      stats: [
        { label: 'Marktpräsenz', value: '12', unit: 'J', desc: 'Jahre technischer Exzellenz' },
        { label: 'Seniorität des Teams', value: '99', unit: '%', desc: 'Dichte an Senior-Talenten' }
      ]
    },
    process: {
      label: 'Prozess',
      title: 'Die Logik hinter unserer Geschwindigkeit',
      items: [
        { title: 'Discovery', desc: 'Sie definieren Vision und Kontext in natürlicher Sprache. Wir tauchen tief in Ihre Geschäftsziele ein, um die Essenz des Produkts zu erfassen.' },
        { title: 'Vibe Check & Schätzung', desc: 'Wir validieren die Machbarkeit des Projekts für den Vibe-Coding-Ansatz, erstellen einen Zeitplan und fixieren das Budget.' },
        { title: 'Strategie', desc: 'Senior-Ingenieure entwerfen die Architektur und wählen die besten KI-Tools aus, um Geschwindigkeit ohne Kompromisse bei der Integrität zu gewährleisten.' },
        { title: 'Schnelle Iterationen', desc: 'Ein Hochgeschwindigkeits-Loop aus „Prompt — Build — Review“. Sie sehen den Fortschritt in Echtzeit und verfeinern die Anforderungen im laufenden Betrieb.' },
        { title: 'QS & Sicherheitscheck', desc: 'Strenge Tests und Code-Audits durch menschliche Experten. Wir stellen sicher, dass jede Funktion robust, sicher und bereit für die Skalierung ist.' },
        { title: 'Deployment', desc: 'Schneller Produktionsstart. Ihr Produkt ist live und bereit für Ihre ersten Nutzer.' }
      ]
    },
    portfolio: {
      label: 'Portfolio',
      title: 'Sie haben bereits gelauncht. Sie sind dran',
      comingSoon: 'Portfolio-Inhalte folgen in Kürze...',
      viewCase: 'Fall ansehen',
      back: 'Zurück',
      backToCases: 'Zurück zu den Fällen',
      nextProject: 'Nächstes projekt',
      goToNextCase: 'Zum nächsten Projekt',
      vacations: {
        title: 'Wami urlaub — HR experience layer',
        desc: 'Über das einfache Tracking hinaus haben wir eine Engagement-Ebene geschaffen, die das Urlaubsmanagement in ein Teambuilding-Tool verwandelt. Es ist ein Raum, der darauf ausgelegt ist, die Motivation zu steigern, die Zugehörigkeit zu fördern und die Unternehmenskultur bei jedem Klick erlebbar zu machen.'
      },
      balancePulse: {
        title: 'The balance pulse',
        desc: 'Ein persönliches Finanz-Coaching-Erlebnis, das über traditionelle Budgetierungstools hinausgeht und sich auf die Psychologie des Ausgebens konzentriert. Das System hilft den Nutzern, wesentliche Bedürfnisse von impulsiven Wünschen zu unterscheiden, was bewusstere und nachhaltigere Finanzentscheidungen ermöglicht.',
        category: 'FinTech',
        goalTitle: 'Projektziel',
        servicesTitle: 'Dienstleistungen',
        servicesItems: [
          { q: 'Business alignment', a: 'Das Konzept „Dopamin vs. Wichtig“ wurde in eine klare Produktlogik umgewandelt, die das Nutzerverhalten und die Geschäftsziele unterstützt.' },
          { q: 'Architectural oversight', a: 'Das System wurde für KI-Analysen, Personalisierung und zukünftige Skalierbarkeit konzipiert.' },
          { q: 'AI-gestützte Entwicklung', a: 'Schneller Aufbau von Kernfunktionen: Ausgabenverfolgung, Einblicke und Prognosen.' },
          { q: 'Sicherheit an erster Stelle', a: 'Sensible Benutzerdaten sind in jeder Phase geschützt.' },
          { q: 'Code-Review & Stabilität', a: 'Sauberer, wartbarer Code gewährleistet die Produktstabilität während der gesamten Entwicklung.' }
        ],
        goalDesc: 'Ein persönliches Finanz-Coaching-Erlebnis zu schaffen, das den Nutzern hilft, wesentliche Bedürfnisse von impulsiven Wünschen zu unterscheiden, um bewusstere und nachhaltigere Finanzentscheidungen zu ermöglichen.',
        conceptTitle: 'Kernkonzept',
        conceptDesc: 'Anstatt Dutzender komplexer Kategorien unterteilt die App die Ausgaben in zwei Arten:',
        essentialTitle: 'Essentiell',
        essentialDesc: 'Miete, Gesundheit, Lebensmittel, Bildung – die Dinge, die Ihr Fundament bilden.',
        dopamineTitle: 'Dopamin',
        dopamineDesc: 'Kaffee, Impulskäufe, Taxis, Unterhaltung – Dinge, die schnelle Freude bringen, aber Ihr Budget belasten können.',
        featuresTitle: 'Hauptmerkmale',
        featuresDesc: 'Tools, die Ihnen helfen, Ihre Ausgaben durch Psychologie zu verstehen: Verfolgen Sie die Zufriedenheit bei jedem Kauf, decken Sie Verhaltensmuster auf und erhalten Sie personalisierte KI-Einblicke, um Ihre Finanzgewohnheiten zu verbessern.',
        motivationTitle: 'Motivation toggle',
        motivationDesc: 'Jedes Mal, wenn Sie eine Ausgabe protokollieren, wählen Sie deren Typ aus und bewerten Ihr Glücksniveau (1–5). Dies ermöglicht es der KI, Ihre „Kosten pro Einheit Freude“ zu berechnen.',
        dopamineDeepDiveTitle: 'Dopamine deep dive',
        dopamineDeepDiveDesc: 'Erweiterte Analysen, die Muster aufdecken. Die KI weist Sie darauf hin, wenn Sie an stressigen Tagen (zum Beispiel dienstags) dazu neigen, mehr für „Dopamin“ auszugeben.',
        aiTutorTitle: 'AI tutor',
        aiTutorDesc: 'Ein interaktiver Bereich, in dem Sie kurze, personalisierte Karten zur Finanzkompetenz erhalten, die auf Ihre tatsächlichen Ausgabegewohnheiten zugeschnitten sind.',
        forecastingTitle: 'Smart forecasting',
        forecastingDesc: 'Sie können den Chat nach einem größeren Kauf fragen, und er wird vorhersagen, wie sich dieser im nächsten Monat auf Ihr Budget auswirken wird, unter Berücksichtigung Ihrer Fixkosten.',
        overallTitle: 'Insgesamt',
        overallDesc: 'Diese App hilft Ihnen, sich nicht mehr schuldig wegen Ihrer Ausgaben zu fühlen, und gibt Ihnen stattdessen Tools für ein achtsames Geldmanagement.',
        teamVoiceTitle: 'Stimme des Teams',
        teamVoiceItems: [
          {
            name: 'Alisa',
            role: 'Product Owner',
            quote: 'Dieses Projekt hat gezeigt, wie sich eine klare Idee mit dem richtigen Ansatz schnell zu einem echten Produkt entwickeln kann. Das Konzept „Dopamin vs. Wichtig“ entwickelte sich rasant, und Vibe Coding ermöglichte es uns, Funktionen fast in Echtzeit zu testen und zu verfeinern. Es fühlte sich weniger wie ein traditioneller Prozess an, sondern mehr wie kontinuierliches Produktdenken und Iteration.'
          },
          {
            name: 'Diana',
            role: 'UX/UI Designer',
            quote: 'Bei diesem Produkt ging es vor allem darum, Komplexität zu vereinfachen. Wir haben uns darauf konzentriert, die Finanzverfolgung intuitiv und emotional ansprechend zu gestalten, nicht überwältigend. Mit Vibe Coding konnten Designentscheidungen sofort im Interface getestet werden, was den Prozess schneller und kollaborativer machte.'
          },
          {
            name: 'Alex',
            role: 'Senior Developer',
            quote: 'Die Entwicklungsgeschwindigkeit war beeindruckend, aber die Aufrechterhaltung der Codequalität war entscheidend. Da die KI Teile der Implementierung generierte, bestand meine Aufgabe darin, diese zu überprüfen, zu strukturieren und die langfristige Skalierbarkeit sicherzustellen. Am Ende haben wir beides erreicht – eine schnelle Lieferung und solide Engineering-Standards.'
          }
        ]
      },
      lumina: { title: 'Lumina Health AI', category: 'Medizinische Diagnoseplattform' },
      wamioff: { title: 'WAMIOFF Platform', category: 'Internes Unternehmens-Ökosystem' },
      citySurvivalKit: {
        title: 'City survival kit',
        desc: 'Nicht nur ein Stadtführer, sondern ein vollwertiges „Betriebssystem“ für das Leben an einem neuen Ort. Das Produkt hilft Menschen, sich schnell anzupassen – von Grundbedürfnissen bis hin zum Verständnis lokaler Regeln und der Umgebung.',
        category: 'Produktdesign',
        servicesTitle: 'Dienstleistungen',
        servicesItems: [
          { q: 'Business logic', a: 'Das Konzept der schnellen Anpassung und eines lokalen Guides wurde in eine klare Produktlogik umgewandelt, die das Nutzerverhalten und die Geschäftsziele unterstützt.' },
          { q: 'Architectural design', a: 'Das System ist für KI-Personalisierung, Analysen und zukünftige Skalierbarkeit konzipiert.' },
          { q: 'AI product support', a: 'Schnelle Implementierung von Kernfunktionen: Service-Map, Bürokratie-Leitfäden, Kostenprognosen und KI-Assistent.' },
          { q: 'User security', a: 'Persönliche Daten und der Nutzerverlauf sind in jeder Phase geschützt.' },
          { q: 'Code quality & stability', a: 'Regelmäßige Code-Reviews und Tests gewährleisten Produktzuverlässigkeit und -stabilität.' }
        ],
        teamVoiceTitle: 'Teamvoice',
        teamVoiceItems: [
          {
            name: 'Valery',
            role: 'Product Owner',
            quote: 'Dieses Projekt hat gezeigt, wie die Idee eines „Betriebssystems für eine neue Stadt“ schnell zu einem realen Produkt werden kann. Dank Vibe-Coding konnten wir Funktionen fast in Echtzeit testen und verfeinern, was den Prozess flexibel und benutzerorientiert gestaltete.'
          },
          {
            name: 'Diana',
            role: 'UX/UI Designer',
            quote: 'Das Ziel war es, die Anpassung so einfach und klar wie möglich zu gestalten. Wir haben eine Benutzeroberfläche geschaffen, die hilft, Dienste zu finden, Bürokratie zu bewältigen und lokale Tipps zu erhalten, ohne den Benutzer zu überfordern. Dank Vibe-Coding konnte das Design sofort auf seine Lebensfähigkeit in einem realen Produkt überprüft werden.'
          },
          {
            name: 'Oleg',
            role: 'Senior Developer',
            quote: 'Die schnelle Implementierung der wichtigsten Funktionen war wichtig, aber noch wichtiger war die Zuverlässigkeit und Skalierbarkeit des Systems. Ich war für die Architektur, das Code-Review und die Integration von KI-Funktionen verantwortlich. Das Ergebnis ist ein Produkt, das sowohl schnell zu starten als auch langfristig wartbar ist.'
          }
        ]
      }
    },
    mockups: {
      lumina: {
        name: 'LuminaAI',
        dashboard: 'Dashboard',
        insights: 'Insights',
        reports: 'Berichte',
        signUp: 'Registrieren',
        title: 'Diagnose revolutioniert mit Lumina',
        desc: 'Analysieren Sie komplexe medizinische Daten in Sekunden mit unserer hochmodernen Neural Engine.',
        getStarted: 'Jetzt starten',
        learnMore: 'Mehr erfahren',
        accuracy: 'Genauigkeit',
        topRated: 'Top-KI',
        dataPoints: 'Datenpunkte',
        hospitals: 'Krankenhäuser',
        diagnostics: 'Diagnose'
      },
      wamioff: {
        name: 'WAMIOFF',
        title: 'Effizienz-Builder für interne Ökosysteme',
        desc: 'Die All-in-One-Plattform für modernes HR- und Office-Management.'
      }
    },
    faq: {
      label: 'FAQ',
      title: 'Fragen & Antworten',
      items: [
        { q: "Beeinträchtigt die hohe Entwicklungsgeschwindigkeit die Codequalität?", a: "Ganz im Gegenteil. Die KI übernimmt Boilerplate und Routineaufgaben, sodass sich unser Senior-Ingenieur voll auf Architektur, Logik und Sicherheit konzentrieren kann. Sie erhalten ein Produkt nach hohen Standards, nur 5x schneller." },
        { q: "Kann ich das Projekt skalieren, wenn mein Unternehmen wächst?", a: "Ja. Das ist der Hauptgrund, warum wir nicht ohne Senior-Aufsicht arbeiten. Wir erstellen sauberen, standardisierten Code und eine skalierbare Architektur. Ihr MVP wird nicht zu „technischen Schulden“ – es wird ein solides Fundament für zukünftiges Wachstum." },
        { q: "Wie sicher ist KI-gesteuerte Entwicklung für mein Produkt?", a: "Wir folgen dem Prinzip „Security First“. Jede von der KI generierte Codezeile wird von einem Senior-Experten streng geprüft. Wir untersuchen das System auf Schwachstellen und stellen sicher, dass Ihre Daten vollständig geschützt sind." },
        { q: "Welche Arten von Projekten profitieren am meisten von Vibe Coding?", a: "Es ist die perfekte Wahl für MVPs, SaaS-Plattformen, interne Business-Tools und schnelles Testen von Hypothesen. Wenn Sie „gestern“ auf den Markt kommen müssen oder Investoren ein Live-Produkt präsentieren wollen, ist dies das Richtige für Sie." },
        { q: "Wem gehört das geistige Eigentum und der fertige Code?", a: "Ihnen. Wir arbeiten nach einem transparenten Modell: Sie erhalten vollen Zugriff auf das Repository und alle geistigen Eigentumsrechte am Produkt. Wir sind Ihr Partner beim Aufbau, aber das Ergebnis gehört immer Ihnen." }
      ]
    },
    contact: {
      label: 'Kontakte',
      title: 'Bereit zu wachsen? Wir übernehmen die Technik',
      cta: 'Projekt Vibe Check anfordern'
    },
    modal: {
      title: 'Projekt Vibe Check anfordern',
      name: 'Name',
      namePlaceholder: 'Ihr Name',
      email: 'E-Mail',
      emailPlaceholder: 'ihre@email.com',
      message: 'Nachricht',
      messagePlaceholder: 'Erzählen Sie uns von Ihrem Projekt',
      send: 'Anfrage senden',
      successTitle: 'Vielen Dank!',
      successDesc: 'Ihre Anfrage wurde an unser Team gesendet. Wir melden uns in Kürze bei Ihnen.',
      back: 'Zurück zur Seite'
    },
    emailModal: {
      title: 'Senden Sie uns eine E-Mail',
      desc: 'Wählen Sie Ihren bevorzugten Kontaktweg',
      openIn: 'Öffnen in',
      copy: 'E-Mail-Adresse kopieren',
      copied: 'Kopiert!'
    },
    footer: {
      copyright: '©2026 Wamisoftware. Alle Rechte vorbehalten. Wamisoftware ist eine im Vereinigten Königreich registrierte LTD-Gesellschaft.'
    }
  }
};
