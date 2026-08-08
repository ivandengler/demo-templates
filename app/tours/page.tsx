'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  MapPin, Clock, Users, Star, Calendar, ChevronRight,
  X, ChevronLeft, ChevronDown, Phone, Mail, Share2,
  Mountain, Compass, Camera, Leaf, Globe, Check
} from 'lucide-react'

// ─── i18n ────────────────────────────────────────────────────────────────────

const i18n = {
  en: {
    nav: { destinations: 'Destinations', about: 'About Us', reviews: 'Reviews', contact: 'Contact', cta: 'Book Now' },
    hero: { badge: 'Small-group tours · Chiang Mai, Thailand', title1: 'Discover Chiang Mai', title2: 'like a local', sub: 'Expert guides. Tiny groups. Experiences you will never forget.', btn1: 'Explore tours', btn2: 'How it works' },
    stats: [{ n: '+800', label: 'Happy travellers' }, { n: '8', label: 'Curated tours' }, { n: '10 yrs', label: 'Of experience' }, { n: '4.9 ★', label: 'Average rating' }],
    tours: { title: 'Our tours', sub: 'Scheduled departures year-round. Max 12 people per group.', difficulty: 'Difficulty', includes: 'Included', pickDate: 'Choose your date', spots: 'spots', fewSpots: 'Only {n} left!', from: 'from', perPerson: 'per person', nextDates: 'Next departures:', details: 'See details', easy: 'Easy', moderate: 'Moderate', chooseTour: 'Choose a tour...', notSure: "I'm not sure yet" },
    modal: { people: 'Number of people', total: 'Total', reserve: 'Book this tour', selectFirst: 'Select a date to continue', back: 'Back' },
    form: { name: 'Full name', whatsapp: 'WhatsApp / Phone', email: 'Email', dest: 'Which tour interests you?', msg: 'Message (optional)', msgPlaceholder: 'Any questions or special needs?', submit: 'Send enquiry', payNow: 'Pay now', namePh: 'Your name', emailPh: 'you@email.com', phonePh: '81 000 0000' },
    payment: { title: 'Complete your payment', total: 'Total to pay', cardNumber: 'Card number', expiry: 'Expiry', secure: 'Secure payment · SSL encrypted', pay: 'Pay', persons: (n: number) => `${n} person${n > 1 ? 's' : ''}` },
    done: { title: 'Booking sent!', tour: 'Tour:', date: 'Date:', body: 'We will contact you via WhatsApp within 2 hours to confirm your spot.', close: 'Close' },
    why: { title: 'Why travel with us', sub: "We're not a mass-market agency. We're a team of passionate guides who craft every itinerary as if we were going ourselves.", items: [{ title: 'Small groups always', desc: 'Max 12 people. More attention, less noise, better experience.' }, { title: 'Certified local guides', desc: 'All our guides are licensed and have years in the field.' }, { title: 'Unmissable moments', desc: 'We arrive early, stay later. The best shots are from our tours.' }, { title: 'Transparent pricing', desc: 'The price includes everything we say. No hidden fees, ever.' }] },
    testimonials: { title: 'What our travellers say' },
    contact: { title: 'Ready to go?', sub: "Fill in the form and we'll reply within 24 hours with everything you need.", noPayment: 'No payment required now. We confirm your spot via WhatsApp.' },
    footer: 'Responsible tourism in Thailand · License No. 0000',
  },
  es: {
    nav: { destinations: 'Destinos', about: 'Nosotros', reviews: 'Opiniones', contact: 'Contacto', cta: 'Reservar' },
    hero: { badge: 'Tours en grupos pequeños · Chiang Mai, Tailandia', title1: 'Descubrí Chiang Mai', title2: 'como un local', sub: 'Guías expertos. Grupos reducidos. Experiencias que no vas a olvidar.', btn1: 'Ver tours', btn2: 'Cómo funciona' },
    stats: [{ n: '+800', label: 'Viajeros felices' }, { n: '8', label: 'Tours únicos' }, { n: '10 años', label: 'De experiencia' }, { n: '4.9 ★', label: 'Calificación promedio' }],
    tours: { title: 'Nuestros tours', sub: 'Salidas programadas todo el año. Máximo 12 personas por grupo.', difficulty: 'Dificultad', includes: 'Incluye', pickDate: 'Elegí tu fecha', spots: 'lugares', fewSpots: '¡Solo {n} lugares!', from: 'desde', perPerson: 'por persona', nextDates: 'Próximas salidas:', details: 'Ver detalles', easy: 'Fácil', moderate: 'Moderado', chooseTour: 'Elegir tour...', notSure: 'No sé todavía' },
    modal: { people: 'Cantidad de personas', total: 'Total', reserve: 'Reservar este tour', selectFirst: 'Elegí una fecha para continuar', back: 'Volver' },
    form: { name: 'Nombre y apellido', whatsapp: 'WhatsApp / Teléfono', email: 'Email', dest: '¿Qué tour te interesa?', msg: 'Mensaje (opcional)', msgPlaceholder: '¿Alguna pregunta o necesidad especial?', submit: 'Enviar consulta', payNow: 'Pagar ahora', namePh: 'Tu nombre', emailPh: 'tu@email.com', phonePh: '81 000 0000' },
    payment: { title: 'Completá tu pago', total: 'Total a pagar', cardNumber: 'Número de tarjeta', expiry: 'Vencimiento', secure: 'Pago seguro · Cifrado SSL', pay: 'Pagar', persons: (n: number) => `${n} persona${n > 1 ? 's' : ''}` },
    done: { title: '¡Reserva enviada!', tour: 'Tour:', date: 'Fecha:', body: 'Te contactamos por WhatsApp en menos de 2 horas para confirmar tu lugar.', close: 'Cerrar' },
    why: { title: 'Por qué viajar con nosotros', sub: 'No somos una agencia masiva. Somos un equipo apasionado que arma cada viaje con el mismo cuidado con el que lo haríamos para nosotros.', items: [{ title: 'Grupos pequeños siempre', desc: 'Máximo 12 personas. Más atención, menos ruido, mejor experiencia.' }, { title: 'Guías locales certificados', desc: 'Todos nuestros guías tienen licencia y años de experiencia en el terreno.' }, { title: 'Momentos únicos', desc: 'Llegamos temprano, nos quedamos más. Las mejores fotos son de nuestros tours.' }, { title: 'Precios transparentes', desc: 'El precio incluye todo lo que decimos. Sin costos ocultos.' }] },
    testimonials: { title: 'Lo que dicen nuestros viajeros' },
    contact: { title: '¿Listo para partir?', sub: 'Completá el formulario y te respondemos en menos de 24 horas con toda la información.', noPayment: 'No se realiza ningún pago ahora. Confirmamos tu lugar por WhatsApp.' },
    footer: 'Turismo responsable en Tailandia · Legajo Nº 0000',
  },
  de: {
    nav: { destinations: 'Reiseziele', about: 'Über uns', reviews: 'Bewertungen', contact: 'Kontakt', cta: 'Jetzt buchen' },
    hero: { badge: 'Kleine Gruppen · Chiang Mai, Thailand', title1: 'Entdecke Chiang Mai', title2: 'wie ein Einheimischer', sub: 'Erfahrene Guides. Kleine Gruppen. Erlebnisse, die du nie vergessen wirst.', btn1: 'Touren entdecken', btn2: 'Wie es funktioniert' },
    stats: [{ n: '+800', label: 'Zufriedene Reisende' }, { n: '8', label: 'Kuratierte Touren' }, { n: '10 J.', label: 'Erfahrung' }, { n: '4.9 ★', label: 'Durchschnittsbewertung' }],
    tours: { title: 'Unsere Touren', sub: 'Ganzjährige Abfahrten. Max. 12 Personen pro Gruppe.', difficulty: 'Schwierigkeit', includes: 'Inklusive', pickDate: 'Datum wählen', spots: 'Plätze', fewSpots: 'Nur noch {n}!', from: 'ab', perPerson: 'pro Person', nextDates: 'Nächste Abfahrten:', details: 'Details', easy: 'Einfach', moderate: 'Mittel', chooseTour: 'Tour wählen...', notSure: 'Ich bin noch unsicher' },
    modal: { people: 'Personenanzahl', total: 'Gesamt', reserve: 'Tour buchen', selectFirst: 'Datum wählen um fortzufahren', back: 'Zurück' },
    form: { name: 'Vollständiger Name', whatsapp: 'WhatsApp / Telefon', email: 'E-Mail', dest: 'Welche Tour interessiert Sie?', msg: 'Nachricht (optional)', msgPlaceholder: 'Fragen oder besondere Wünsche?', submit: 'Anfrage senden', payNow: 'Jetzt bezahlen', namePh: 'Ihr Name', emailPh: 'sie@email.de', phonePh: '81 000 0000' },
    payment: { title: 'Zahlung abschließen', total: 'Zu zahlender Betrag', cardNumber: 'Kartennummer', expiry: 'Ablaufdatum', secure: 'Sichere Zahlung · SSL-verschlüsselt', pay: 'Bezahlen', persons: (n: number) => `${n} Person${n > 1 ? 'en' : ''}` },
    done: { title: 'Buchung gesendet!', tour: 'Tour:', date: 'Datum:', body: 'Wir melden uns innerhalb von 2 Stunden via WhatsApp, um Ihren Platz zu bestätigen.', close: 'Schließen' },
    why: { title: 'Warum mit uns reisen', sub: 'Wir sind keine Massentourismusagentur. Wir sind ein leidenschaftliches Team, das jede Reiseroute so sorgfältig plant, als würden wir selbst mitfahren.', items: [{ title: 'Immer kleine Gruppen', desc: 'Max. 12 Personen. Mehr Aufmerksamkeit, weniger Lärm, besseres Erlebnis.' }, { title: 'Zertifizierte lokale Guides', desc: 'Alle unsere Guides sind lizenziert und haben jahrelange Felderfahrung.' }, { title: 'Unvergessliche Momente', desc: 'Wir kommen früh, bleiben länger. Die besten Fotos entstehen bei unseren Touren.' }, { title: 'Transparente Preise', desc: 'Der Preis beinhaltet alles, was wir versprechen. Keine versteckten Kosten.' }] },
    testimonials: { title: 'Was unsere Reisenden sagen' },
    contact: { title: 'Bereit loszulegen?', sub: 'Füllen Sie das Formular aus und wir antworten innerhalb von 24 Stunden.', noPayment: 'Keine Zahlung jetzt erforderlich. Wir bestätigen Ihren Platz per WhatsApp.' },
    footer: 'Verantwortungsvoller Tourismus in Thailand · Lizenz Nr. 0000',
  },
  pt: {
    nav: { destinations: 'Destinos', about: 'Sobre nós', reviews: 'Avaliações', contact: 'Contato', cta: 'Reservar' },
    hero: { badge: 'Tours em pequenos grupos · Chiang Mai, Tailândia', title1: 'Descubra Chiang Mai', title2: 'como um local', sub: 'Guias especializados. Grupos pequenos. Experiências que você nunca vai esquecer.', btn1: 'Explorar tours', btn2: 'Como funciona' },
    stats: [{ n: '+800', label: 'Viajantes felizes' }, { n: '8', label: 'Tours selecionados' }, { n: '10 anos', label: 'De experiência' }, { n: '4.9 ★', label: 'Avaliação média' }],
    tours: { title: 'Nossos tours', sub: 'Partidas programadas o ano todo. Máx. 12 pessoas por grupo.', difficulty: 'Dificuldade', includes: 'Incluído', pickDate: 'Escolha sua data', spots: 'vagas', fewSpots: 'Só {n} restantes!', from: 'a partir de', perPerson: 'por pessoa', nextDates: 'Próximas partidas:', details: 'Ver detalhes', easy: 'Fácil', moderate: 'Moderado', chooseTour: 'Escolha um tour...', notSure: 'Ainda não sei' },
    modal: { people: 'Número de pessoas', total: 'Total', reserve: 'Reservar este tour', selectFirst: 'Selecione uma data para continuar', back: 'Voltar' },
    form: { name: 'Nome completo', whatsapp: 'WhatsApp / Telefone', email: 'E-mail', dest: 'Qual tour te interessa?', msg: 'Mensagem (opcional)', msgPlaceholder: 'Alguma dúvida ou necessidade especial?', submit: 'Enviar consulta', payNow: 'Pagar agora', namePh: 'Seu nome', emailPh: 'voce@email.com', phonePh: '81 000 0000' },
    payment: { title: 'Conclua seu pagamento', total: 'Total a pagar', cardNumber: 'Número do cartão', expiry: 'Validade', secure: 'Pagamento seguro · Criptografia SSL', pay: 'Pagar', persons: (n: number) => `${n} pessoa${n > 1 ? 's' : ''}` },
    done: { title: 'Reserva enviada!', tour: 'Tour:', date: 'Data:', body: 'Entraremos em contato pelo WhatsApp em até 2 horas para confirmar seu lugar.', close: 'Fechar' },
    why: { title: 'Por que viajar conosco', sub: 'Não somos uma agência de massa. Somos uma equipe apaixonada que elabora cada roteiro como se fôssemos nós mesmos viajar.', items: [{ title: 'Grupos pequenos sempre', desc: 'Máx. 12 pessoas. Mais atenção, menos barulho, melhor experiência.' }, { title: 'Guias locais certificados', desc: 'Todos os nossos guias são licenciados e têm anos de experiência.' }, { title: 'Momentos inesquecíveis', desc: 'Chegamos cedo, ficamos mais. As melhores fotos são dos nossos tours.' }, { title: 'Preços transparentes', desc: 'O preço inclui tudo que prometemos. Sem taxas ocultas.' }] },
    testimonials: { title: 'O que nossos viajantes dizem' },
    contact: { title: 'Pronto para partir?', sub: 'Preencha o formulário e respondemos em até 24 horas com tudo que você precisa.', noPayment: 'Nenhum pagamento necessário agora. Confirmamos seu lugar pelo WhatsApp.' },
    footer: 'Turismo responsável na Tailândia · Licença Nº 0000',
  },
  it: {
    nav: { destinations: 'Destinazioni', about: 'Chi siamo', reviews: 'Recensioni', contact: 'Contatti', cta: 'Prenota ora' },
    hero: { badge: 'Tour in piccoli gruppi · Chiang Mai, Thailandia', title1: 'Scopri Chiang Mai', title2: 'come un locale', sub: 'Guide esperte. Gruppi piccoli. Esperienze che non dimenticherai mai.', btn1: 'Esplora i tour', btn2: 'Come funziona' },
    stats: [{ n: '+800', label: 'Viaggiatori soddisfatti' }, { n: '8', label: 'Tour selezionati' }, { n: '10 anni', label: 'Di esperienza' }, { n: '4.9 ★', label: 'Valutazione media' }],
    tours: { title: 'I nostri tour', sub: "Partenze programmate tutto l'anno. Max 12 persone per gruppo.", difficulty: 'Difficoltà', includes: 'Incluso', pickDate: 'Scegli la tua data', spots: 'posti', fewSpots: 'Solo {n} rimasti!', from: 'da', perPerson: 'a persona', nextDates: 'Prossime partenze:', details: 'Vedi dettagli', easy: 'Facile', moderate: 'Moderato', chooseTour: 'Scegli un tour...', notSure: 'Non sono ancora sicuro' },
    modal: { people: 'Numero di persone', total: 'Totale', reserve: 'Prenota questo tour', selectFirst: 'Seleziona una data per continuare', back: 'Indietro' },
    form: { name: 'Nome completo', whatsapp: 'WhatsApp / Telefono', email: 'Email', dest: 'Quale tour ti interessa?', msg: 'Messaggio (opzionale)', msgPlaceholder: 'Domande o esigenze speciali?', submit: 'Invia richiesta', payNow: 'Paga ora', namePh: 'Il tuo nome', emailPh: 'tu@email.it', phonePh: '81 000 0000' },
    payment: { title: 'Completa il pagamento', total: 'Totale da pagare', cardNumber: 'Numero di carta', expiry: 'Scadenza', secure: 'Pagamento sicuro · Crittografia SSL', pay: 'Paga', persons: (n: number) => `${n} persona${n > 1 ? 'e' : ''}` },
    done: { title: 'Prenotazione inviata!', tour: 'Tour:', date: 'Data:', body: 'Ti contatteremo via WhatsApp entro 2 ore per confermare il tuo posto.', close: 'Chiudi' },
    why: { title: 'Perché viaggiare con noi', sub: "Non siamo un'agenzia di massa. Siamo un team appassionato che crea ogni itinerario come se lo facessimo per noi stessi.", items: [{ title: 'Sempre gruppi piccoli', desc: 'Max 12 persone. Più attenzione, meno caos, esperienza migliore.' }, { title: 'Guide locali certificate', desc: 'Tutte le nostre guide sono autorizzate e hanno anni di esperienza sul campo.' }, { title: 'Momenti imperdibili', desc: 'Arriviamo presto, restiamo di più. Le foto migliori vengono dai nostri tour.' }, { title: 'Prezzi trasparenti', desc: 'Il prezzo include tutto ciò che diciamo. Nessun costo nascosto.' }] },
    testimonials: { title: 'Cosa dicono i nostri viaggiatori' },
    contact: { title: 'Pronto a partire?', sub: 'Compila il modulo e ti risponderemo entro 24 ore con tutto ciò di cui hai bisogno.', noPayment: 'Nessun pagamento richiesto ora. Confermiamo il tuo posto via WhatsApp.' },
    footer: 'Turismo responsabile in Thailandia · Licenza N. 0000',
  },
  ru: {
    nav: { destinations: 'Направления', about: 'О нас', reviews: 'Отзывы', contact: 'Контакты', cta: 'Забронировать' },
    hero: { badge: 'Туры в малых группах · Чиангмай, Таиланд', title1: 'Откройте Чиангмай', title2: 'как местный', sub: 'Опытные гиды. Маленькие группы. Впечатления, которые вы не забудете никогда.', btn1: 'Смотреть туры', btn2: 'Как это работает' },
    stats: [{ n: '+800', label: 'Довольных путешественников' }, { n: '8', label: 'Уникальных туров' }, { n: '10 лет', label: 'Опыта' }, { n: '4.9 ★', label: 'Средняя оценка' }],
    tours: { title: 'Наши туры', sub: 'Плановые отправления круглый год. Макс. 12 человек в группе.', difficulty: 'Сложность', includes: 'Включено', pickDate: 'Выберите дату', spots: 'мест', fewSpots: 'Осталось только {n}!', from: 'от', perPerson: 'с человека', nextDates: 'Ближайшие даты:', details: 'Подробнее', easy: 'Лёгкий', moderate: 'Средний', chooseTour: 'Выберите тур...', notSure: 'Ещё не знаю' },
    modal: { people: 'Количество человек', total: 'Итого', reserve: 'Забронировать тур', selectFirst: 'Выберите дату для продолжения', back: 'Назад' },
    form: { name: 'Полное имя', whatsapp: 'WhatsApp / Телефон', email: 'Эл. почта', dest: 'Какой тур вас интересует?', msg: 'Сообщение (необязательно)', msgPlaceholder: 'Вопросы или особые пожелания?', submit: 'Отправить запрос', payNow: 'Оплатить', namePh: 'Ваше имя', emailPh: 'vy@email.com', phonePh: '81 000 0000' },
    payment: { title: 'Завершите оплату', total: 'Сумма к оплате', cardNumber: 'Номер карты', expiry: 'Срок действия', secure: 'Безопасная оплата · SSL-шифрование', pay: 'Оплатить', persons: (n: number) => `${n} чел.` },
    done: { title: 'Reserva enviada!', tour: 'Тур:', date: 'Дата:', body: 'Мы свяжемся с вами через WhatsApp в течение 2 часов для подтверждения места.', close: 'Закрыть' },
    why: { title: 'Почему выбирают нас', sub: 'Мы не массовое агентство. Мы команда увлечённых гидов, которые создают каждый маршрут так, будто едут сами.', items: [{ title: 'Только малые группы', desc: 'Макс. 12 человек. Больше внимания, меньше суеты, лучше впечатления.' }, { title: 'Сертифицированные местные гиды', desc: 'Все наши гиды лицензированы и имеют многолетний опыт работы.' }, { title: 'Незабываемые моменты', desc: 'Мы приезжаем раньше, уходим позже. Лучшие фото — с наших туров.' }, { title: 'Прозрачные цены', desc: 'Цена включает всё, что мы обещаем. Никаких скрытых платежей.' }] },
    testimonials: { title: 'Что говорят наши путешественники' },
    contact: { title: 'Готовы отправиться?', sub: 'Заполните форму и мы ответим в течение 24 часов со всей необходимой информацией.', noPayment: 'Оплата сейчас не требуется. Мы подтверждаем место через WhatsApp.' },
    footer: 'Ответственный туризм в Таиланде · Лицензия № 0000',
  },
  zh: {
    nav: { destinations: '目的地', about: '关于我们', reviews: '评价', contact: '联系我们', cta: '立即预订' },
    hero: { badge: '小团游 · 泰国清迈', title1: '探索清迈', title2: '像当地人一样', sub: '专业向导。小团游。永生难忘的体验。', btn1: '探索行程', btn2: '如何运作' },
    stats: [{ n: '+800', label: '满意旅客' }, { n: '8', label: '精选行程' }, { n: '10年', label: '丰富经验' }, { n: '4.9 ★', label: '平均评分' }],
    tours: { title: '我们的行程', sub: '全年定期出发。每组最多12人。', difficulty: '难度', includes: '包含', pickDate: '选择日期', spots: '名额', fewSpots: '仅剩{n}个名额！', from: '起价', perPerson: '每人', nextDates: '近期出发:', details: '查看详情', easy: '轻松', moderate: '中等', chooseTour: '选择行程...', notSure: '还不确定' },
    modal: { people: '人数', total: '总计', reserve: '预订此行程', selectFirst: '请先选择日期', back: '返回' },
    form: { name: '姓名', whatsapp: 'WhatsApp / 电话', email: '电子邮件', dest: '您对哪个行程感兴趣?', msg: '留言（可选）', msgPlaceholder: '有任何问题或特殊需求?', submit: '发送咨询', payNow: '立即付款', namePh: '您的姓名', emailPh: 'ni@email.com', phonePh: '81 000 0000' },
    payment: { title: '完成付款', total: '应付总额', cardNumber: '卡号', expiry: '有效期', secure: '安全支付 · SSL加密', pay: '立即支付', persons: (n: number) => `${n}人` },
    done: { title: '预订已发送！', tour: '行程：', date: '日期：', body: '我们将在2小时内通过WhatsApp与您联系以确认名额。', close: '关闭' },
    why: { title: '为什么选择我们', sub: '我们不是大众旅行社。我们是一支充满热情的导游团队，每条路线都像是为自己设计的。', items: [{ title: '始终小团游', desc: '最多12人。更多关注，更少噪音，更好的体验。' }, { title: '持证本地导游', desc: '我们所有导游都持有执照并拥有多年实地经验。' }, { title: '难忘的瞬间', desc: '我们早到晚走。最好的照片来自我们的行程。' }, { title: '透明定价', desc: '价格包含我们承诺的一切。从不收取隐藏费用。' }] },
    testimonials: { title: '旅客的评价' },
    contact: { title: '准备出发了吗?', sub: '填写表格，我们将在24小时内回复您所需的一切信息。', noPayment: '现在无需付款。我们通过WhatsApp确认您的名额。' },
    footer: '泰国负责任旅游 · 许可证编号 0000',
  },
  ja: {
    nav: { destinations: '目的地', about: '私たちについて', reviews: 'レビュー', contact: 'お問い合わせ', cta: '予約する' },
    hero: { badge: '少人数ツアー · タイ・チェンマイ', title1: 'チェンマイを発見しよう', title2: '地元の人のように', sub: '経験豊富なガイド。少人数グループ。一生忘れられない体験。', btn1: 'ツアーを探す', btn2: '仕組みを知る' },
    stats: [{ n: '+800', label: '満足したお客様' }, { n: '8', label: '厳選ツアー' }, { n: '10年', label: '豊富な経験' }, { n: '4.9 ★', label: '平均評価' }],
    tours: { title: '私たちのツアー', sub: '年間を通じて定期出発。1グループ最大12名。', difficulty: '難易度', includes: '含まれるもの', pickDate: '日付を選択', spots: '空き', fewSpots: '残り{n}席！', from: '料金', perPerson: '1名', nextDates: '次回出発:', details: '詳細を見る', easy: '簡単', moderate: '普通', chooseTour: 'ツアーを選択...', notSure: 'まだ決まっていません' },
    modal: { people: '人数', total: '合計', reserve: 'このツアーを予約', selectFirst: '続けるには日付を選択してください', back: '戻る' },
    form: { name: '氏名', whatsapp: 'WhatsApp / 電話番号', email: 'メールアドレス', dest: 'どのツアーに興味がありますか?', msg: 'メッセージ（任意）', msgPlaceholder: 'ご質問や特別なご要望はありますか?', submit: 'お問い合わせを送る', payNow: '今すぐ支払う', namePh: 'お名前', emailPh: 'anata@email.com', phonePh: '81 000 0000' },
    payment: { title: 'お支払いを完了する', total: 'お支払い合計', cardNumber: 'カード番号', expiry: '有効期限', secure: '安全な支払い · SSL暗号化', pay: '支払う', persons: (n: number) => `${n}名` },
    done: { title: '予約を送信しました！', tour: 'ツアー：', date: '日付：', body: '2時間以内にWhatsAppでご連絡し、お席を確認いたします。', close: '閉じる' },
    why: { title: '私たちと旅する理由', sub: '私たちは大手旅行会社ではありません。情熱的なガイドのチームが、まるで自分たちが旅するかのように一つひとつの旅程を作り上げています。', items: [{ title: '常に少人数グループ', desc: '最大12名。より多くの配慮、より少ない混雑、より良い体験。' }, { title: '認定地元ガイド', desc: '全てのガイドはライセンスを持ち、現場での豊富な経験があります。' }, { title: '忘れられない瞬間', desc: '早く到着し、長く滞在。最高の写真は私たちのツアーから生まれます。' }, { title: '透明な料金', desc: '料金には私たちが約束するすべてが含まれています。隠れた費用は一切ありません。' }] },
    testimonials: { title: '旅行者の声' },
    contact: { title: '出発の準備はできましたか?', sub: 'フォームに記入していただければ、24時間以内に必要な情報をお送りします。', noPayment: '今すぐお支払いは不要です。WhatsAppでお席を確認いたします。' },
    footer: 'タイでの責任ある旅行 · 許可番号 0000',
  },
  ko: {
    nav: { destinations: '여행지', about: '소개', reviews: '후기', contact: '문의', cta: '예약하기' },
    hero: { badge: '소규모 투어 · 태국 치앙마이', title1: '치앙마이를 발견하세요', title2: '현지인처럼', sub: '전문 가이드. 소규모 그룹. 절대 잊을 수 없는 경험.', btn1: '투어 둘러보기', btn2: '이용 방법' },
    stats: [{ n: '+800', label: '만족한 여행자' }, { n: '8', label: '엄선된 투어' }, { n: '10년', label: '풍부한 경험' }, { n: '4.9 ★', label: '평균 평점' }],
    tours: { title: '투어 소개', sub: '연중 정기 출발. 그룹당 최대 12명.', difficulty: '난이도', includes: '포함 사항', pickDate: '날짜 선택', spots: '자리', fewSpots: '{n}자리 남음!', from: '시작가', perPerson: '1인', nextDates: '다음 출발:', details: '자세히 보기', easy: '쉬움', moderate: '보통', chooseTour: '투어 선택...', notSure: '아직 모르겠어요' },
    modal: { people: '인원 수', total: '합계', reserve: '이 투어 예약하기', selectFirst: '계속하려면 날짜를 선택하세요', back: '뒤로' },
    form: { name: '이름', whatsapp: 'WhatsApp / 전화번호', email: '이메일', dest: '어떤 투어에 관심이 있으신가요?', msg: '메시지 (선택)', msgPlaceholder: '질문이나 특별한 요청이 있으신가요?', submit: '문의 보내기', payNow: '지금 결제', namePh: '성함', emailPh: 'you@email.com', phonePh: '81 000 0000' },
    payment: { title: '결제를 완료하세요', total: '결제 금액', cardNumber: '카드 번호', expiry: '유효기간', secure: '안전한 결제 · SSL 암호화', pay: '결제하기', persons: (n: number) => `${n}명` },
    done: { title: '예약 신청 완료!', tour: '투어:', date: '날짜:', body: '2시간 이내에 WhatsApp으로 연락하여 자리를 확인해 드리겠습니다.', close: '닫기' },
    why: { title: '왜 우리와 함께 여행하나요', sub: '우리는 대형 여행사가 아닙니다. 마치 직접 여행하는 것처럼 모든 여정을 정성껏 만드는 열정적인 가이드 팀입니다.', items: [{ title: '항상 소규모 그룹', desc: '최대 12명. 더 많은 관심, 더 적은 소음, 더 나은 경험.' }, { title: '공인 현지 가이드', desc: '모든 가이드는 자격증을 보유하고 현장 경험이 풍부합니다.' }, { title: '놓칠 수 없는 순간', desc: '일찍 도착하고 오래 머뭅니다. 최고의 사진은 우리 투어에서 나옵니다.' }, { title: '투명한 가격', desc: '가격에는 약속한 모든 것이 포함됩니다. 숨겨진 비용은 없습니다.' }] },
    testimonials: { title: '여행자들의 후기' },
    contact: { title: '출발 준비가 되셨나요?', sub: '양식을 작성해 주시면 24시간 이내에 필요한 모든 정보를 알려드리겠습니다.', noPayment: '지금 결제할 필요 없습니다. WhatsApp으로 자리를 확인해 드립니다.' },
    footer: '태국의 책임 있는 관광 · 허가 번호 0000',
  },
  th: {
    nav: { destinations: 'จุดหมาย', about: 'เกี่ยวกับเรา', reviews: 'รีวิว', contact: 'ติดต่อ', cta: 'จองเลย' },
    hero: { badge: 'ทัวร์กลุ่มเล็ก · เชียงใหม่ ประเทศไทย', title1: 'ค้นพบเชียงใหม่', title2: 'แบบคนท้องถิ่น', sub: 'ไกด์ผู้เชี่ยวชาญ กลุ่มเล็ก ประสบการณ์ที่คุณจะไม่มีวันลืม', btn1: 'สำรวจทัวร์', btn2: 'วิธีการทำงาน' },
    stats: [{ n: '+800', label: 'นักท่องเที่ยวที่พึงพอใจ' }, { n: '8', label: 'ทัวร์คัดสรร' }, { n: '10 ปี', label: 'ประสบการณ์' }, { n: '4.9 ★', label: 'คะแนนเฉลี่ย' }],
    tours: { title: 'ทัวร์ของเรา', sub: 'ออกเดินทางตลอดปี สูงสุด 12 คนต่อกลุ่ม', difficulty: 'ความยาก', includes: 'รวมอยู่แล้ว', pickDate: 'เลือกวันที่', spots: 'ที่นั่ง', fewSpots: 'เหลือเพียง {n} ที่!', from: 'เริ่มต้น', perPerson: 'ต่อคน', nextDates: 'วันออกเดินทางถัดไป:', details: 'ดูรายละเอียด', easy: 'ง่าย', moderate: 'ปานกลาง', chooseTour: 'เลือกทัวร์...', notSure: 'ยังไม่แน่ใจ' },
    modal: { people: 'จำนวนคน', total: 'รวมทั้งหมด', reserve: 'จองทัวร์นี้', selectFirst: 'กรุณาเลือกวันที่ก่อนดำเนินการต่อ', back: 'กลับ' },
    form: { name: 'ชื่อ-นามสกุล', whatsapp: 'WhatsApp / โทรศัพท์', email: 'อีเมล', dest: 'คุณสนใจทัวร์ไหน?', msg: 'ข้อความ (ไม่บังคับ)', msgPlaceholder: 'มีคำถามหรือความต้องการพิเศษ?', submit: 'ส่งคำถาม', payNow: 'ชำระเงินตอนนี้', namePh: 'ชื่อของคุณ', emailPh: 'khun@email.com', phonePh: '81 000 0000' },
    payment: { title: 'ชำระเงิน', total: 'ยอดชำระ', cardNumber: 'หมายเลขบัตร', expiry: 'วันหมดอายุ', secure: 'การชำระเงินที่ปลอดภัย · เข้ารหัส SSL', pay: 'ชำระเงิน', persons: (n: number) => `${n} คน` },
    done: { title: 'ส่งการจองแล้ว!', tour: 'ทัวร์:', date: 'วันที่:', body: 'เราจะติดต่อคุณผ่าน WhatsApp ภายใน 2 ชั่วโมงเพื่อยืนยันที่นั่ง', close: 'ปิด' },
    why: { title: 'ทำไมต้องเดินทางกับเรา', sub: 'เราไม่ใช่บริษัทนำเที่ยวแบบมวลชน เราคือทีมไกด์ที่มีความหลงใหล ที่ออกแบบทุกเส้นทางราวกับว่าเราเองกำลังเดินทาง', items: [{ title: 'กลุ่มเล็กเสมอ', desc: 'สูงสุด 12 คน ใส่ใจมากขึ้น เสียงรบกวนน้อยลง ประสบการณ์ดีขึ้น' }, { title: 'ไกด์ท้องถิ่นที่มีใบรับรอง', desc: 'ไกด์ทุกคนมีใบอนุญาตและมีประสบการณ์ภาคสนามหลายปี' }, { title: 'ช่วงเวลาที่ไม่ควรพลาด', desc: 'เราไปถึงก่อนและอยู่นานขึ้น ภาพถ่ายที่ดีที่สุดมาจากทัวร์ของเรา' }, { title: 'ราคาโปร่งใส', desc: 'ราคารวมทุกอย่างที่เราบอก ไม่มีค่าใช้จ่ายซ่อนเร้น' }] },
    testimonials: { title: 'สิ่งที่นักท่องเที่ยวของเราพูด' },
    contact: { title: 'พร้อมออกเดินทางแล้วหรือยัง?', sub: 'กรอกแบบฟอร์มแล้วเราจะตอบกลับภายใน 24 ชั่วโมงพร้อมข้อมูลทั้งหมดที่คุณต้องการ', noPayment: 'ไม่ต้องชำระเงินตอนนี้ เราจะยืนยันที่นั่งผ่าน WhatsApp' },
    footer: 'การท่องเที่ยวอย่างรับผิดชอบในประเทศไทย · ใบอนุญาตเลขที่ 0000',
  },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const tours = [
  {
    id: 1,
    name: { en: 'Special Temple Night Visit: Doi Suthep + Pha Lad', es: 'Visita Nocturna: Doi Suthep + Pha Lad', de: 'Tempelbesuch bei Nacht: Doi Suthep + Pha Lad', pt: 'Visita Noturna: Doi Suthep + Pha Lad', it: 'Visita Notturna: Doi Suthep + Pha Lad', ru: 'Ночное посещение храмов: Дой Сутхеп + Пха Лад', zh: '夜间参观寺庙：素贴山+帕拉寺', ja: '夜のお寺巡り：ドイステープ＋パーラッド', ko: '야간 사원 방문: 도이수텝 + 파랏', th: 'เยี่ยมชมวัดยามค่ำคืน: ดอยสุเทพ + พระลาน' },
    location: 'Doi Suthep Mountain',
    duration: { en: 'Evening (4 hrs)', es: 'Tarde (4 hrs)', de: 'Abend (4 Std.)', pt: 'Tarde (4 hrs)', it: 'Sera (4 ore)', ru: 'Вечер (4 часа)', zh: '傍晚（4小时）', ja: '夕方（4時間）', ko: '저녁 (4시간)', th: 'ช่วงเย็น (4 ชม.)' },
    groupSize: 'Max 12',
    difficulty: 'easy',
    rating: 4.9,
    reviews: 187,
    price: 690,
    currency: 'THB',
    badge: { en: 'Magical nights', es: 'Noches mágicas', de: 'Magische Nächte', pt: 'Noites mágicas', it: 'Notti magiche', ru: 'Волшебные ночи', zh: '神奇夜晚', ja: '幻想的な夜', ko: '마법 같은 밤', th: 'คืนมหัศจรรย์' },
    badgeColor: 'bg-indigo-600',
    description: {
      en: 'Experience Chiang Mai\'s most iconic temple in the serene magic of night. Visit Pha Lad, a hidden jungle monastery, then ascend to the glittering Doi Suthep as the city lights shimmer below.',
      es: 'Viví el templo más icónico de Chiang Mai bajo la magia de la noche. Primero Pha Lad, un monasterio escondido en la selva, luego el deslumbrante Doi Suthep con la ciudad iluminada abajo.',
    },
    highlights: {
      en: ['Pha Lad jungle monastery at dusk', 'Doi Suthep temple lit at night', 'Panoramic city views after dark', 'Sunset & golden hour photography'],
      es: ['Monasterio de selva Pha Lad al atardecer', 'Doi Suthep iluminado de noche', 'Vistas panorámicas de la ciudad', 'Fotografía al atardecer'],
    },
    images: [
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534008757030-27299c4371b6?w=800&q=85&auto=format&fit=crop',
    ],
    dates: [
      { date: '2026-08-09', spots: 8 },
      { date: '2026-08-13', spots: 12 },
      { date: '2026-08-16', spots: 5 },
      { date: '2026-08-20', spots: 10 },
      { date: '2026-08-23', spots: 3 },
    ],
    accent: 'from-indigo-900/70 to-indigo-600/30',
    icon: <Compass size={18} />,
  },
  {
    id: 2,
    name: { en: 'Half Day Doi Suthep Temple & Hmong Hill Tribe Village', es: 'Medio día: Doi Suthep y Aldea Hmong', de: 'Halbtag: Doi Suthep & Hmong-Bergdorf', pt: 'Meio dia: Doi Suthep e Vila Hmong', it: 'Mezza giornata: Doi Suthep e Villaggio Hmong', ru: 'Полдня: Дой Сутхеп и деревня Хмонг', zh: '半日游：素贴山寺庙与苗族山区村寨', ja: '半日：ドイステープ寺院とフモン族の村', ko: '반나절: 도이수텝 사원과 흐몽 산족 마을', th: 'ครึ่งวัน: วัดดอยสุเทพและหมู่บ้านม้ง' },
    location: 'Doi Suthep Mountain',
    duration: { en: 'Half day', es: 'Medio día', de: 'Halber Tag', pt: 'Meio dia', it: 'Mezza giornata', ru: 'Полдня', zh: '半天', ja: '半日', ko: '반나절', th: 'ครึ่งวัน' },
    groupSize: 'Max 12',
    difficulty: 'easy',
    rating: 4.8,
    reviews: 312,
    price: 950,
    currency: 'THB',
    badge: { en: 'Most popular', es: 'El más elegido', de: 'Beliebteste', pt: 'Mais popular', it: 'Più popolare', ru: 'Самый популярный', zh: '最受欢迎', ja: '最人気', ko: '가장 인기', th: 'ยอดนิยม' },
    badgeColor: 'bg-amber-500',
    description: {
      en: 'A perfect half-day from Chiang Mai: climb the iconic 309-step Naga staircase to Doi Suthep temple, then visit a genuine Hmong hill tribe village or the royal Phuping Palace gardens.',
      es: 'Una mañana perfecta desde Chiang Mai: subí la icónica escalera Naga de 309 escalones hasta Doi Suthep y luego visitá una aldea auténtica de la tribu Hmong o los jardines del Palacio Real Phuping.',
    },
    highlights: {
      en: ['Doi Suthep — Chiang Mai\'s sacred mountain temple', '309-step Naga serpent staircase', 'Hmong village or Phuping Palace', 'Hotel pickup & drop-off included'],
      es: ['Doi Suthep — el templo sagrado de la montaña', 'Escalera Naga de 309 escalones', 'Aldea Hmong o Palacio Phuping', 'Traslado desde y hacia el hotel incluido'],
    },
    images: [
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85&auto=format&fit=crop',
    ],
    dates: [
      { date: '2026-08-09', spots: 10 },
      { date: '2026-08-11', spots: 6 },
      { date: '2026-08-14', spots: 12 },
      { date: '2026-08-16', spots: 4 },
      { date: '2026-08-18', spots: 9 },
    ],
    accent: 'from-amber-700/70 to-amber-500/30',
    icon: <Compass size={18} />,
  },
  {
    id: 3,
    name: { en: 'Chiang Rai: White, Blue & Red Temples', es: 'Chiang Rai: Templos Blanco, Azul y Rojo', de: 'Chiang Rai: Weißer, Blauer & Roter Tempel', pt: 'Chiang Rai: Templos Branco, Azul e Vermelho', it: 'Chiang Rai: Tempio Bianco, Blu e Rosso', ru: 'Чиангрaй: Белый, Синий и Красный храмы', zh: '清莱三庙：白庙、蓝庙、红庙', ja: 'チェンライ3寺院：白・青・赤の寺院', ko: '치앙라이 3대 사원: 흰색·파란색·빨간색 사원', th: 'เชียงราย: วัดขาว วัดน้ำเงิน วัดแดง' },
    location: 'Chiang Rai Province',
    duration: { en: 'Full day', es: 'Día completo', de: 'Ganztag', pt: 'Dia inteiro', it: 'Giornata intera', ru: 'Весь день', zh: '全天', ja: '終日', ko: '하루 종일', th: 'เต็มวัน' },
    groupSize: 'Max 12',
    difficulty: 'easy',
    rating: 4.9,
    reviews: 241,
    price: 1250,
    currency: 'THB',
    badge: { en: 'Iconic', es: 'Icónico', de: 'Ikonisch', pt: 'Icônico', it: 'Iconico', ru: 'Культовое', zh: '标志性', ja: '象徴的', ko: '상징적', th: 'สัญลักษณ์' },
    badgeColor: 'bg-rose-500',
    description: {
      en: 'A full day road trip to Chiang Rai\'s three most spectacular temples: the surreal all-white Wat Rong Khun, the azure-blue Wat Rong Suea Ten, and the vivid red Wat Huay Pla Kang.',
      es: 'Un día de viaje por los tres templos más espectaculares de Chiang Rai: el surrealista Wat Rong Khun todo blanco, el azul Wat Rong Suea Ten, y el llamativo rojo Wat Huay Pla Kang.',
    },
    highlights: {
      en: ['Wat Rong Khun (White Temple)', 'Wat Rong Suea Ten (Blue Temple)', 'Wat Huay Pla Kang (Red Temple)', 'Round-trip transport from Chiang Mai'],
      es: ['Wat Rong Khun (Templo Blanco)', 'Wat Rong Suea Ten (Templo Azul)', 'Wat Huay Pla Kang (Templo Rojo)', 'Transporte de ida y vuelta desde Chiang Mai'],
    },
    images: [
      '/white-temple.jpg',
      'https://images.unsplash.com/photo-1534008757030-27299c4371b6?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=85&auto=format&fit=crop',
    ],
    dates: [
      { date: '2026-08-10', spots: 4 },
      { date: '2026-08-17', spots: 11 },
      { date: '2026-08-24', spots: 7 },
      { date: '2026-08-31', spots: 2 },
      { date: '2026-09-07', spots: 12 },
    ],
    accent: 'from-rose-900/60 to-rose-600/30',
    icon: <Camera size={18} />,
  },
  {
    id: 5,
    name: { en: 'Doi Inthanon: Pha Dok Siew Nature Trail Trekking', es: 'Doi Inthanon: Trekking Sendero Pha Dok Siew', de: 'Doi Inthanon: Pha-Dok-Siew-Naturpfad', pt: 'Doi Inthanon: Trilha Natural Pha Dok Siew', it: 'Doi Inthanon: Trekking Sentiero Pha Dok Siew', ru: 'Дой Интханон: Треккинг по тропе Пха Дох Сиу', zh: '因他侬山：帕多克秀自然步道徒步', ja: 'ドイインタノン：パードクシュー自然歩道トレッキング', ko: '도이 인타논: 파독시우 자연 트레일 트레킹', th: 'ดอยอินทนนท์: เดินป่าเส้นทางธรรมชาติผาดอกสิว' },
    location: 'Doi Inthanon National Park',
    duration: { en: 'Full day', es: 'Día completo', de: 'Ganztag', pt: 'Dia inteiro', it: 'Giornata intera', ru: 'Весь день', zh: '全天', ja: '終日', ko: '하루 종일', th: 'เต็มวัน' },
    groupSize: 'Max 10',
    difficulty: 'moderate',
    rating: 4.9,
    reviews: 89,
    price: 1300,
    currency: 'THB',
    badge: { en: 'Hidden gem', es: 'Joya escondida', de: 'Geheimtipp', pt: 'Joia escondida', it: 'Gemma nascosta', ru: 'Скрытая жемчужина', zh: '隐藏宝藏', ja: '穴場スポット', ko: '숨겨진 보석', th: 'อัญมณีซ่อนเร้น' },
    badgeColor: 'bg-teal-600',
    description: {
      en: 'Trek the stunning Pha Dok Siew nature trail inside Doi Inthanon National Park — mossy jungle paths, orchid-covered trees, a magical waterfall and misty highland views at every turn.',
      es: 'Trek por el sendero Pha Dok Siew dentro del Parque Nacional Doi Inthanon — caminos de selva musgosa, árboles cubiertos de orquídeas, una cascada mágica y vistas brumosas de las tierras altas.',
    },
    highlights: {
      en: ['Pha Dok Siew waterfall trail', 'Cloud forest with orchids & ferns', 'Birdwatching (400+ species)', 'National Park entry included'],
      es: ['Sendero de la cascada Pha Dok Siew', 'Bosque de nubes con orquídeas y helechos', 'Avistamiento de aves (400+ especies)', 'Entrada al Parque Nacional incluida'],
    },
    images: [
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=85&auto=format&fit=crop',
    ],
    dates: [
      { date: '2026-08-11', spots: 7 },
      { date: '2026-08-18', spots: 2 },
      { date: '2026-08-25', spots: 10 },
      { date: '2026-09-01', spots: 5 },
      { date: '2026-09-08', spots: 8 },
    ],
    accent: 'from-teal-900/70 to-teal-700/30',
    icon: <Leaf size={18} />,
  },
  {
    id: 6,
    name: { en: 'Doi Inthanon: Kew Mae Pan Nature Trail', es: 'Doi Inthanon: Sendero Kew Mae Pan', de: 'Doi Inthanon: Kew-Mae-Pan-Naturpfad', pt: 'Doi Inthanon: Trilha Natural Kew Mae Pan', it: 'Doi Inthanon: Sentiero Naturale Kew Mae Pan', ru: 'Дой Интханон: Природная тропа Кео Мэ Пан', zh: '因他侬山：克乌梅潘自然步道', ja: 'ドイインタノン：ケーウ・メー・パン自然歩道', ko: '도이 인타논: 케우 매 판 자연 트레일', th: 'ดอยอินทนนท์: เส้นทางธรรมชาติกิ่วแม่ปาน' },
    location: 'Doi Inthanon National Park',
    duration: { en: 'Full day', es: 'Día completo', de: 'Ganztag', pt: 'Dia inteiro', it: 'Giornata intera', ru: 'Весь день', zh: '全天', ja: '終日', ko: '하루 종일', th: 'เต็มวัน' },
    groupSize: 'Max 10',
    difficulty: 'moderate',
    rating: 5.0,
    reviews: 74,
    price: 1300,
    currency: 'THB',
    badge: { en: "Thailand's roof", es: 'El techo de Tailandia', de: 'Dach Thailands', pt: 'O teto da Tailândia', it: 'Il tetto della Thailandia', ru: 'Крыша Таиланда', zh: '泰国屋脊', ja: 'タイの屋根', ko: '태국의 지붕', th: 'หลังคาแห่งประเทศไทย' },
    badgeColor: 'bg-emerald-600',
    description: {
      en: 'Walk the high-altitude Kew Mae Pan loop trail at 2,175m — sweeping panoramas of Thailand\'s highest peaks, dwarf rhododendrons, and the two majestic Royal Chedis rising above the clouds.',
      es: 'Caminá el sendero circular Kew Mae Pan a 2.175m de altitud — panoramas impresionantes de los picos más altos de Tailandia, rododendros enanos y los dos majestuosos chedis reales sobre las nubes.',
    },
    highlights: {
      en: ['Kew Mae Pan loop at 2,175m altitude', 'Two stunning Royal Chedis', 'Dwarf rhododendrons in bloom', 'Highest trekking trail in Thailand'],
      es: ['Circuito Kew Mae Pan a 2.175m de altura', 'Dos magníficos Chedis Reales', 'Rododendros enanos en flor', 'Sendero de trekking más alto de Tailandia'],
    },
    images: [
      'https://www.thainationalparks.com/img/poi/2019/12/10/394801/two-chedis-w-900.jpg',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=85&auto=format&fit=crop',
    ],
    dates: [
      { date: '2026-08-12', spots: 8 },
      { date: '2026-08-19', spots: 1 },
      { date: '2026-08-26', spots: 10 },
      { date: '2026-09-02', spots: 6 },
      { date: '2026-09-09', spots: 10 },
    ],
    accent: 'from-emerald-900/70 to-emerald-700/30',
    icon: <Mountain size={18} />,
  },
  {
    id: 7,
    name: { en: 'Half Day Elephant Care & Bamboo Rafting', es: 'Medio día: Cuidado de Elefantes y Rafting en Bambú', de: 'Halbtag: Elefantenpflege & Bambusflößen', pt: 'Meio dia: Cuidado com Elefantes e Rafting em Bambu', it: 'Mezza giornata: Cura degli Elefanti e Rafting in Bambù', ru: 'Полдня: Уход за слонами и сплав на бамбусовом плоту', zh: '半日游：照料大象与竹筏漂流', ja: '半日：エレファントケア＆竹ラフティング', ko: '반나절: 코끼리 케어 & 대나무 래프팅', th: 'ครึ่งวัน: ดูแลช้างและล่องแพไม้ไผ่' },
    location: 'Mae Taeng Valley',
    duration: { en: 'Half day', es: 'Medio día', de: 'Halber Tag', pt: 'Meio dia', it: 'Mezza giornata', ru: 'Полдня', zh: '半天', ja: '半日', ko: '반나절', th: 'ครึ่งวัน' },
    groupSize: 'Max 10',
    difficulty: 'easy',
    rating: 4.9,
    reviews: 198,
    price: 1600,
    currency: 'THB',
    badge: { en: 'Best combo', es: 'Mejor combinación', de: 'Bestes Kombiangebot', pt: 'Melhor combinação', it: 'Combinazione perfetta', ru: 'Лучший комбо', zh: '最佳组合', ja: 'ベストコンボ', ko: '최고의 조합', th: 'คู่ที่ดีที่สุด' },
    badgeColor: 'bg-cyan-600',
    description: {
      en: 'The ultimate half-day combo: spend the morning bonding with rescued elephants — feeding, mud bathing and walking beside them — then cool off with a peaceful bamboo raft float down the Mae Taeng river.',
      es: 'El combo perfecto: pasá la mañana con elefantes rescatados — alimentándolos, bañándolos en barro y caminando a su lado — y luego refrescate flotando en balsa de bambú por el río Mae Taeng.',
    },
    highlights: {
      en: ['Feed & walk with rescued elephants', 'Mud bath & river splash together', 'Bamboo raft float on Mae Taeng river', 'No riding — ethical elephant experience'],
      es: ['Alimentar y caminar con elefantes rescatados', 'Baño de barro y chapuzón en el río', 'Rafting en balsa de bambú por el río Mae Taeng', 'Sin monta — experiencia ética con elefantes'],
    },
    images: [
      '/elephant-sanctuary.jpg',
      'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=85&auto=format&fit=crop',
    ],
    dates: [
      { date: '2026-08-09', spots: 5 },
      { date: '2026-08-13', spots: 8 },
      { date: '2026-08-16', spots: 2 },
      { date: '2026-08-20', spots: 10 },
      { date: '2026-08-23', spots: 7 },
    ],
    accent: 'from-cyan-900/70 to-cyan-600/30',
    icon: <Leaf size={18} />,
  },
  {
    id: 8,
    name: { en: 'Full Day Doi Saket Hiking', es: 'Trekking de Día Completo en Doi Saket', de: 'Ganztages-Wanderung auf dem Doi Saket', pt: 'Caminhada de Dia Inteiro no Doi Saket', it: 'Escursione di un Giorno Intero al Doi Saket', ru: 'Однодневный поход на Дой Сакет', zh: '多伊萨格特全天徒步', ja: 'ドイ・サケット終日ハイキング', ko: '도이 사켓 하루 종일 하이킹', th: 'เดินป่าเต็มวันดอยสะเก็ด' },
    location: 'Doi Saket District',
    duration: { en: 'Full day', es: 'Día completo', de: 'Ganztag', pt: 'Dia inteiro', it: 'Giornata intera', ru: 'Весь день', zh: '全天', ja: '終日', ko: '하루 종일', th: 'เต็มวัน' },
    groupSize: 'Max 10',
    difficulty: 'moderate',
    rating: 4.8,
    reviews: 63,
    price: 1700,
    currency: 'THB',
    badge: { en: 'Off the beaten path', es: 'Fuera de lo común', de: 'Abseits der Touristenpfade', pt: 'Fora do circuito', it: 'Fuori dai sentieri battuti', ru: 'Вдали от туристов', zh: '非寻常路线', ja: '穴場コース', ko: '특별한 경로', th: 'เส้นทางพิเศษ' },
    badgeColor: 'bg-lime-600',
    description: {
      en: 'Escape the crowds on this full-day hike through Doi Saket\'s lush jungle trails, local hill tribe settlements and forested ridgelines with sweeping views over the Chiang Mai valley.',
      es: 'Escapá de las multitudes en este trekking de día completo por los senderos de selva de Doi Saket, comunidades locales y crestas boscosas con vistas panorámicas sobre el valle de Chiang Mai.',
    },
    highlights: {
      en: ['Dense jungle trails with local wildlife', 'Hill tribe village visits', 'Panoramic valley viewpoints', 'Packed Thai lunch & refreshments'],
      es: ['Senderos de selva con fauna local', 'Visitas a aldeas de tribus montañesas', 'Miradores panorámicos del valle', 'Almuerzo tailandés y refrescos incluidos'],
    },
    images: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=85&auto=format&fit=crop',
    ],
    dates: [
      { date: '2026-08-10', spots: 6 },
      { date: '2026-08-17', spots: 9 },
      { date: '2026-08-24', spots: 4 },
      { date: '2026-08-31', spots: 10 },
      { date: '2026-09-07', spots: 7 },
    ],
    accent: 'from-lime-900/70 to-lime-700/30',
    icon: <Mountain size={18} />,
  },
  {
    id: 9,
    name: { en: 'Doi Inthanon National Park + Elephant Sanctuary', es: 'Doi Inthanon + Santuario de Elefantes', de: 'Doi-Inthanon-Nationalpark + Elefantenschutzgebiet', pt: 'Doi Inthanon + Santuário de Elefantes', it: 'Doi Inthanon + Santuario degli Elefanti', ru: 'Дой Интханон + Слоновый заповедник', zh: '因他侬国家公园+大象保护区', ja: 'ドイインタノン国立公園＋エレファントサンクチュアリ', ko: '도이 인타논 국립공원 + 코끼리 보호구역', th: 'อุทยานแห่งชาติดอยอินทนนท์ + เขตรักษาพันธุ์ช้าง' },
    location: 'Doi Inthanon / Mae Taeng',
    duration: { en: 'Full day', es: 'Día completo', de: 'Ganztag', pt: 'Dia inteiro', it: 'Giornata intera', ru: 'Весь день', zh: '全天', ja: '終日', ko: '하루 종일', th: 'เต็มวัน' },
    groupSize: 'Max 8',
    difficulty: 'easy',
    rating: 5.0,
    reviews: 127,
    price: 1900,
    currency: 'THB',
    badge: { en: 'Signature tour', es: 'Tour estrella', de: 'Signature-Tour', pt: 'Tour especial', it: 'Tour esclusivo', ru: 'Фирменный тур', zh: '招牌行程', ja: 'シグネチャーツアー', ko: '시그니처 투어', th: 'ทัวร์ยอดนิยม' },
    badgeColor: 'bg-amber-500',
    description: {
      en: 'The ultimate Chiang Mai day: explore Thailand\'s highest national park in the morning — waterfalls, royal chedis, cloud forests — then spend the afternoon with rescued elephants at an ethical Living Green sanctuary.',
      es: 'El día definitivo en Chiang Mai: explorá por la mañana el parque nacional más alto de Tailandia — cascadas, chedis reales, bosques de niebla — y por la tarde viví la experiencia con elefantes en un santuario ético.',
    },
    highlights: {
      en: ['Doi Inthanon Royal Chedis & waterfalls', 'Summit at 2,565m — highest in Thailand', 'Afternoon at Living Green Elephant Sanctuary', 'Feed, bathe & walk with rescued elephants'],
      es: ['Chedis Reales y cascadas de Doi Inthanon', 'Cumbre a 2.565m — la más alta de Tailandia', 'Tarde en el Santuario de Elefantes Living Green', 'Alimentar, bañar y caminar con elefantes rescatados'],
    },
    images: [
      '/elephant-sanctuary.jpg',
      'https://www.thainationalparks.com/img/poi/2019/12/10/394801/two-chedis-w-900.jpg',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=85&auto=format&fit=crop',
    ],
    dates: [
      { date: '2026-08-09', spots: 4 },
      { date: '2026-08-16', spots: 6 },
      { date: '2026-08-23', spots: 2 },
      { date: '2026-08-30', spots: 8 },
      { date: '2026-09-06', spots: 7 },
    ],
    accent: 'from-amber-700/70 to-amber-500/30',
    icon: <Leaf size={18} />,
  },
  {
    id: 10,
    name: { en: 'Lanna Lantern Festival 2026', es: 'Festival de Linternas Lanna 2026', de: 'Lanna-Laternen-Festival 2026', pt: 'Festival de Lanternas Lanna 2026', it: 'Festival delle Lanterne Lanna 2026', ru: 'Фестиваль фонарей Ланна 2026', zh: '兰纳灯笼节2026', ja: 'ランナー・ランタンフェスティバル2026', ko: '란나 등불 축제 2026', th: 'เทศกาลโคมลอยล้านนา 2026' },
    location: 'Chiang Mai Old City',
    duration: { en: 'Evening', es: 'Noche', de: 'Abend', pt: 'À noite', it: 'Sera', ru: 'Вечер', zh: '夜间', ja: '夜', ko: '저녁', th: 'ช่วงเย็น' },
    groupSize: 'Max 12',
    difficulty: 'easy',
    rating: 5.0,
    reviews: 44,
    price: 2500,
    currency: 'THB',
    badge: { en: 'Once a year', es: 'Una vez al año', de: 'Einmal im Jahr', pt: 'Uma vez por ano', it: 'Una volta all\'anno', ru: 'Раз в год', zh: '一年一次', ja: '年に一度', ko: '일 년에 한 번', th: 'ปีละครั้ง' },
    badgeColor: 'bg-yellow-500',
    description: {
      en: 'Witness one of the world\'s most breathtaking spectacles — thousands of glowing khom loi lanterns rising into the Chiang Mai night sky during the magical Yi Peng festival, guided by a local expert.',
      es: 'Viví uno de los espectáculos más impresionantes del mundo — miles de linternas khom loi iluminando el cielo nocturno de Chiang Mai durante el mágico festival Yi Peng, con un guía local.',
    },
    highlights: {
      en: ['Mass lantern release ceremony', 'Riverside & Old City viewpoints', 'Traditional Lanna cultural show', 'Expert guide & transport included'],
      es: ['Ceremonia masiva de lanzamiento de linternas', 'Puntos panorámicos en el río y ciudad antigua', 'Espectáculo cultural tradicional Lanna', 'Guía experto y transporte incluidos'],
    },
    images: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=85&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=85&auto=format&fit=crop',
    ],
    dates: [
      { date: '2026-11-01', spots: 10 },
      { date: '2026-11-02', spots: 6 },
      { date: '2026-11-03', spots: 2 },
    ],
    accent: 'from-yellow-700/70 to-yellow-500/30',
    icon: <Star size={18} />,
  },
]

const testimonials = {
  en: [
    { name: 'Sarah K.', city: 'London, UK', text: 'The elephant sanctuary was life-changing. The guides were incredibly knowledgeable and the whole experience felt genuine and ethical. Highly recommend!' },
    { name: 'Marco L.', city: 'Buenos Aires', text: 'Chiang Rai day trip was absolutely stunning. The White Temple blew my mind. Small group made it feel very personal and relaxed.' },
    { name: 'Yuki T.', city: 'Tokyo, Japan', text: 'The cooking class was the highlight of my whole Thailand trip. Chef Noi was so fun and patient. I have already cooked pad thai twice at home!' },
  ],
  es: [
    { name: 'Sarah K.', city: 'Londres, Reino Unido', text: 'El santuario de elefantes fue transformador. Los guías sabían todo y la experiencia se sintió genuina y ética. ¡Muy recomendable!' },
    { name: 'Marco L.', city: 'Buenos Aires', text: 'La excursión a Chiang Rai fue increíble. El Templo Blanco me voló la cabeza. El grupo pequeño lo hizo muy personal y tranquilo.' },
    { name: 'Yuki T.', city: 'Tokio, Japón', text: 'La clase de cocina fue lo mejor de mi viaje a Tailandia. La chef Noi fue muy divertida y paciente. ¡Ya cociné pad thai dos veces en casa!' },
  ],
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

type Lang = 'en' | 'es' | 'de' | 'pt' | 'it' | 'ru' | 'zh' | 'ja' | 'ko' | 'th'

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English',    flag: '🇬🇧' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch',    flag: '🇩🇪' },
  { code: 'pt', label: 'Português',  flag: '🇧🇷' },
  { code: 'it', label: 'Italiano',   flag: '🇮🇹' },
  { code: 'ru', label: 'Русский',    flag: '🇷🇺' },
  { code: 'zh', label: '中文',        flag: '🇨🇳' },
  { code: 'ja', label: '日本語',      flag: '🇯🇵' },
  { code: 'ko', label: '한국어',      flag: '🇰🇷' },
  { code: 'th', label: 'ภาษาไทย',    flag: '🇹🇭' },
]

const DATE_LOCALES: Record<Lang, string> = {
  en: 'en-GB', es: 'es-AR', de: 'de-DE', pt: 'pt-BR', it: 'it-IT',
  ru: 'ru-RU', zh: 'zh-CN', ja: 'ja-JP', ko: 'ko-KR', th: 'th-TH',
}

function getL(obj: Partial<Record<Lang, string>>, lang: Lang): string {
  return obj[lang] ?? obj.en ?? ''
}
function getLArr(obj: Partial<Record<Lang, string[]>>, lang: Lang): string[] {
  return obj[lang] ?? obj.en ?? []
}

const PHONE_CODES = [
  { code: '+66', flag: '🇹🇭', label: 'TH' },
  { code: '+1',  flag: '🇺🇸', label: 'US/CA' },
  { code: '+44', flag: '🇬🇧', label: 'UK' },
  { code: '+61', flag: '🇦🇺', label: 'AU' },
  { code: '+33', flag: '🇫🇷', label: 'FR' },
  { code: '+49', flag: '🇩🇪', label: 'DE' },
  { code: '+34', flag: '🇪🇸', label: 'ES' },
  { code: '+39', flag: '🇮🇹', label: 'IT' },
  { code: '+55', flag: '🇧🇷', label: 'BR' },
  { code: '+7',  flag: '🇷🇺', label: 'RU' },
  { code: '+86', flag: '🇨🇳', label: 'CN' },
  { code: '+81', flag: '🇯🇵', label: 'JP' },
  { code: '+82', flag: '🇰🇷', label: 'KR' },
  { code: '+852', flag: '🇭🇰', label: 'HK' },
  { code: '+65', flag: '🇸🇬', label: 'SG' },
  { code: '+60', flag: '🇲🇾', label: 'MY' },
  { code: '+62', flag: '🇮🇩', label: 'ID' },
  { code: '+91', flag: '🇮🇳', label: 'IN' },
  { code: '+971', flag: '🇦🇪', label: 'AE' },
  { code: '+972', flag: '🇮🇱', label: 'IL' },
  { code: '+31', flag: '🇳🇱', label: 'NL' },
  { code: '+41', flag: '🇨🇭', label: 'CH' },
  { code: '+46', flag: '🇸🇪', label: 'SE' },
  { code: '+47', flag: '🇳🇴', label: 'NO' },
  { code: '+48', flag: '🇵🇱', label: 'PL' },
]

function formatDate(dateStr: string, lang: Lang) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString(DATE_LOCALES[lang], { weekday: 'short', day: 'numeric', month: 'long' })
}

function formatPrice(p: number, currency: string) {
  return `${currency} ${p.toLocaleString()}`
}

// ─── Animated stat counter ────────────────────────────────────────────────────

function StatCounter({ n, label }: { n: string; label: string }) {
  const [displayed, setDisplayed] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)

  const match = n.match(/^([^0-9]*)(\d+\.?\d*)(.*)$/)
  const prefix = match?.[1] ?? ''
  const target = parseFloat(match?.[2] ?? '0')
  const suffix = match?.[3] ?? ''
  const isDecimal = n.includes('.')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true
        const duration = 1400
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          const val = target * eased
          setDisplayed(isDecimal ? val.toFixed(1) : Math.floor(val).toString())
          if (p < 1) requestAnimationFrame(tick)
          else setDisplayed(isDecimal ? target.toFixed(1) : target.toString())
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, isDecimal])

  return (
    <div ref={ref}>
      <div className="text-3xl font-black">{prefix}{displayed}{suffix}</div>
      <div className="text-sm font-medium mt-1 opacity-80">{label}</div>
    </div>
  )
}

// ─── Why Section with parallax gallery ───────────────────────────────────────

function WhySection({ t }: { t: typeof i18n['en'] }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const leftY  = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const rightY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const leftImgs = [
    '/elephant-sanctuary.jpg',
    'https://images.unsplash.com/photo-1528181304800-259b08848526?w=500&q=85&auto=format&fit=crop',
  ]
  const rightImgs = [
    'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=500&q=85&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=85&auto=format&fit=crop',
    '/white-temple.jpg',
  ]

  return (
    <section id="about" ref={ref} className="py-24 overflow-hidden" style={{ background: '#FFF8EF' }}>
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#1A1208' }}>{t.why.title}</h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: '#7A4E2A' }}>{t.why.sub}</p>
          <div className="space-y-5">
            {t.why.items.map(item => (
              <div key={item.title} className="flex gap-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(34,197,94,0.12)' }}>
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4,10 8,14 16,6"/></svg>
                </div>
                <div>
                  <div className="font-bold mb-0.5" style={{ color: '#1A1208' }}>{item.title}</div>
                  <div className="text-sm" style={{ color: '#7A4E2A' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4" style={{ maxHeight: 560, overflow: 'hidden' }}>
          <motion.div className="flex flex-col gap-4" style={{ y: leftY }}>
            {leftImgs.map((src, i) => (
              <img key={i} src={src} alt="" className="rounded-2xl w-full object-cover" style={{ height: 180 }} />
            ))}
          </motion.div>
          <motion.div className="flex flex-col gap-4 mt-10" style={{ y: rightY }}>
            {rightImgs.map((src, i) => (
              <img key={i} src={src} alt="" className="rounded-2xl w-full object-cover" style={{ height: 180 }} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ToursPage() {
  const [lang, setLang] = useState<Lang>('en')
  const [langOpen, setLangOpen] = useState(false)
  const [selectedTour, setSelectedTour] = useState<typeof tours[0] | null>(null)
  const [activeImg, setActiveImg] = useState(0)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [pax, setPax] = useState(2)
  const [reservaStep, setReservaStep] = useState<'browse' | 'form' | 'payment' | 'done'>('browse')
  const [phoneCode, setPhoneCode] = useState('+66')
  const [navScrolled, setNavScrolled] = useState(false)
  const t = i18n[lang]

  useEffect(() => {
    const h = () => setNavScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  function openTour(tour: typeof tours[0]) {
    setSelectedTour(tour)
    setActiveImg(0)
    setSelectedDate(null)
    setPax(2)
    setReservaStep('browse')
    document.body.style.overflow = 'hidden'
  }

  function closeTour() {
    setSelectedTour(null)
    document.body.style.overflow = ''
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault()
    setReservaStep('payment')
  }

  const diffLabel = (d: string) => d === 'easy' ? t.tours.easy : t.tours.moderate

  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: '#FDF7EE', color: '#1A1208' }}
    >
      {/* ── NAV ───────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: navScrolled ? 'rgba(253,247,238,0.95)' : 'transparent',
          backdropFilter: navScrolled ? 'blur(12px)' : 'none',
          borderBottom: navScrolled ? '1px solid rgba(232,134,42,0.2)' : '1px solid transparent',
          boxShadow: navScrolled ? '0 2px 20px rgba(232,134,42,0.08)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#E8862A' }}>
              <Compass size={15} className="text-white" />
            </div>
            <span className="font-black text-lg tracking-tight" style={{ color: '#1A1208' }}>Chiang Mai Personal Tour</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: '#5C3A1A' }}>
            <a href="#tours" className="hover:text-amber-600 transition-colors">{t.nav.destinations}</a>
            <a href="#about" className="hover:text-amber-600 transition-colors">{t.nav.about}</a>
            <a href="#reviews" className="hover:text-amber-600 transition-colors">{t.nav.reviews}</a>
            <a href="#contact" className="hover:text-amber-600 transition-colors">{t.nav.contact}</a>
          </div>

          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(o => !o)}
                className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-all"
                style={{ borderColor: '#E8862A', color: '#E8862A', background: 'rgba(232,134,42,0.08)' }}
              >
                <Globe size={14} />
                {lang.toUpperCase()}
                <ChevronDown size={12} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 rounded-xl overflow-hidden shadow-xl border"
                    style={{ background: '#FDF7EE', borderColor: 'rgba(232,134,42,0.2)', minWidth: 150, maxHeight: 340, overflowY: 'auto' }}
                  >
                    {LANGS.map(l => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false) }}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-amber-50 transition-colors"
                        style={{ color: lang === l.code ? '#E8862A' : '#5C3A1A' }}
                      >
                        <span>{l.flag} {l.label}</span>
                        {lang === l.code && <Check size={13} />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#contact"
              className="hidden sm:block font-bold text-sm px-5 py-2.5 rounded-full text-white transition-all hover:opacity-90 shadow-md"
              style={{ background: '#E8862A', boxShadow: '0 4px 14px rgba(232,134,42,0.35)' }}
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=1800&q=90&auto=format&fit=crop"
            alt="Chiang Mai temples"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.65) 100%)' }} />
        </div>

        <div className="relative text-center px-4 max-w-3xl mx-auto pt-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-black leading-none mb-6 tracking-tight text-white drop-shadow-lg">
              {t.hero.title1}<br />
              <span style={{ color: '#F5C87A' }}>{t.hero.title2}</span>
            </h1>
            <p className="text-xl text-stone-200 mb-10 leading-relaxed max-w-xl mx-auto">{t.hero.sub}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#tours"
                className="font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-xl text-white"
                style={{ background: '#E8862A', boxShadow: '0 8px 30px rgba(232,134,42,0.45)' }}
              >
                {t.hero.btn1}
              </a>
              <a
                href="#about"
                className="font-semibold px-8 py-4 rounded-full text-lg transition-all border text-white hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.4)' }}
              >
                {t.hero.btn2}
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={28} style={{ color: '#E8862A' }} />
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section style={{ background: '#E8862A' }} className="py-10">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {t.stats.map(s => (
            <StatCounter key={s.label} n={s.n} label={s.label} />
          ))}
        </div>
      </section>

      {/* ── TOURS ─────────────────────────────────────────────────── */}
      <section id="tours" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#1A1208' }}>{t.tours.title}</h2>
            <p className="text-lg max-w-lg mx-auto" style={{ color: '#7A4E2A' }}>{t.tours.sub}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {tours.map((tour, i) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                onClick={() => openTour(tour)}
                className="group cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(232,134,42,0.15)',
                  boxShadow: '0 4px 24px rgba(90,40,10,0.06)',
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 12px 40px rgba(232,134,42,0.18)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 24px rgba(90,40,10,0.06)')}
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={tour.images[0]}
                    alt={getL(tour.name, lang)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${tour.accent}`} />
                  <span className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: '#E8862A' }}>
                    {t.tours.from} {formatPrice(tour.price, tour.currency)}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-medium mb-1" style={{ color: '#E8862A' }}>
                        <MapPin size={12} /> {tour.location}
                      </div>
                      <h3 className="text-xl font-black leading-tight" style={{ color: '#1A1208' }}>{getL(tour.name, lang)}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: '#7A4E2A' }}>{getL(tour.description, lang)}</p>
                  <div className="flex items-center gap-5 text-sm mb-4" style={{ color: '#A06030' }}>
                    <span className="flex items-center gap-1.5"><Clock size={13} />{getL(tour.duration, lang)}</span>
                    <span className="flex items-center gap-1.5"><Users size={13} />{tour.groupSize}</span>
                    <span className="flex items-center gap-1.5"><Star size={13} className="fill-amber-400 text-amber-400" />{tour.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <span className="text-xs font-medium" style={{ color: '#A06030' }}>{t.tours.nextDates}</span>
                    {tour.dates.slice(0, 3).map(d => (
                      <span key={d.date} className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: '#FEF3E2', color: '#E8862A', border: '1px solid rgba(232,134,42,0.25)' }}>
                        {formatDate(d.date, lang)}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tour.difficulty === 'easy' ? 'bg-teal-50 text-teal-700' : 'bg-amber-50 text-amber-700'}`}>
                      {t.tours.difficulty}: {diffLabel(tour.difficulty)}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold group-hover:gap-2 transition-all" style={{ color: '#E8862A' }}>
                      {t.tours.details} <ChevronRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────── */}
      <WhySection t={t} />

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section id="reviews" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-2 mb-2">
              <svg width="36" height="34" viewBox="0 0 55 52" fill="none">
                <path d="M27.5 0L33.85 20.22H55L38.08 32.72L44.43 52.9L27.5 40.4L10.57 52.9L16.92 32.72L0 20.22H21.15L27.5 0Z" fill="#00B67A"/>
                <path d="M39.4 37.1L37.75 31.8L27.5 40.4L39.4 37.1Z" fill="#005128"/>
              </svg>
              <span style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontWeight: 900, fontSize: 28, color: '#191919', letterSpacing: '-0.5px' }}>Trustpilot</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{ background: '#00B67A', borderRadius: 5, width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="26" height="26" viewBox="0 0 55 52" fill="none">
                    <path d="M27.5 0L33.85 20.22H55L38.08 32.72L44.43 52.9L27.5 40.4L10.57 52.9L16.92 32.72L0 20.22H21.15L27.5 0Z" fill="white"/>
                    <path d="M39.4 37.1L37.75 31.8L27.5 40.4L39.4 37.1Z" fill="rgba(0,0,0,0.15)"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
          <h2 className="text-4xl font-black text-center mb-16" style={{ color: '#1A1208' }}>{t.testimonials.title}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {(testimonials[lang as keyof typeof testimonials] ?? testimonials.en).map(t2 => (
              <div key={t2.name} className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.15)', boxShadow: '0 2px 16px rgba(90,40,10,0.06)' }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#5C3A1A' }}>&ldquo;{t2.text}&rdquo;</p>
                <div>
                  <div className="font-bold text-sm" style={{ color: '#1A1208' }}>{t2.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#A06030' }}>{t2.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────── */}
      <section id="contact" className="py-24" style={{ background: '#FFF8EF' }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4" style={{ color: '#1A1208' }}>{t.contact.title}</h2>
          <p className="mb-10" style={{ color: '#7A4E2A' }}>{t.contact.sub}</p>
          <form
            onSubmit={e => { e.preventDefault(); alert(t.done.title) }}
            className="rounded-3xl p-8 text-left space-y-5"
            style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.18)', boxShadow: '0 4px 32px rgba(90,40,10,0.08)' }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium mb-1.5 block" style={{ color: '#7A4E2A' }}>{t.form.name}</label>
                <input required className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all" style={{ background: '#FDF7EE', border: '1px solid rgba(232,134,42,0.25)', color: '#1A1208' }} placeholder={t.form.namePh} onFocus={e => e.target.style.borderColor = '#E8862A'} onBlur={e => e.target.style.borderColor = 'rgba(232,134,42,0.25)'} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block" style={{ color: '#7A4E2A' }}>{t.form.whatsapp}</label>
                <input required className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all" style={{ background: '#FDF7EE', border: '1px solid rgba(232,134,42,0.25)', color: '#1A1208' }} placeholder="+66 81 000 0000" onFocus={e => e.target.style.borderColor = '#E8862A'} onBlur={e => e.target.style.borderColor = 'rgba(232,134,42,0.25)'} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: '#7A4E2A' }}>{t.form.email}</label>
              <input type="email" required className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all" style={{ background: '#FDF7EE', border: '1px solid rgba(232,134,42,0.25)', color: '#1A1208' }} placeholder={t.form.emailPh} onFocus={e => e.target.style.borderColor = '#E8862A'} onBlur={e => e.target.style.borderColor = 'rgba(232,134,42,0.25)'} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: '#7A4E2A' }}>{t.form.dest}</label>
              <select className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all" style={{ background: '#FDF7EE', border: '1px solid rgba(232,134,42,0.25)', color: '#1A1208' }} onFocus={e => e.target.style.borderColor = '#E8862A'} onBlur={e => e.target.style.borderColor = 'rgba(232,134,42,0.25)'}>
                <option value="">{t.tours.chooseTour}</option>
                {tours.map(t2 => <option key={t2.id}>{getL(t2.name, lang)}</option>)}
                <option>{t.tours.notSure}</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block" style={{ color: '#7A4E2A' }}>{t.form.msg}</label>
              <textarea rows={3} className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none" style={{ background: '#FDF7EE', border: '1px solid rgba(232,134,42,0.25)', color: '#1A1208' }} placeholder={t.form.msgPlaceholder} onFocus={e => e.target.style.borderColor = '#E8862A'} onBlur={e => e.target.style.borderColor = 'rgba(232,134,42,0.25)'} />
            </div>
            <button type="submit" className="w-full font-bold py-4 rounded-xl text-lg text-white transition-all hover:opacity-90" style={{ background: '#E8862A', boxShadow: '0 4px 20px rgba(232,134,42,0.3)' }}>
              {t.form.submit}
            </button>
          </form>
          <div className="flex items-center justify-center gap-8 mt-10 text-sm flex-wrap" style={{ color: '#A06030' }}>
            <a href="#" className="flex items-center gap-2 hover:text-amber-600 transition-colors"><Phone size={15} />+66 81 000 0000</a>
            <a href="#" className="flex items-center gap-2 hover:text-amber-600 transition-colors"><Share2 size={15} />@lotusrailstrails</a>
            <a href="#" className="flex items-center gap-2 hover:text-amber-600 transition-colors"><Mail size={15} />hello@lotusrails.com</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="py-8 text-center text-sm border-t" style={{ borderColor: 'rgba(232,134,42,0.15)', color: '#A06030' }}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#E8862A' }}>
            <Compass size={12} className="text-white" />
          </div>
          <span className="font-black" style={{ color: '#5C3A1A' }}>Chiang Mai Personal Tour</span>
        </div>
        <p>© 2026 · {t.footer}</p>
      </footer>

      {/* ── MODAL ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedTour && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
            style={{ background: 'rgba(26,18,8,0.65)', backdropFilter: 'blur(6px)' }}
            onClick={e => { if (e.target === e.currentTarget) closeTour() }}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 26 }}
              className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl"
              style={{ background: '#FDF7EE', border: '1px solid rgba(232,134,42,0.2)' }}
            >
              {/* Gallery */}
              <div className="relative h-64 md:h-72 overflow-hidden rounded-t-3xl shrink-0">
                <img src={selectedTour.images[activeImg]} alt={getL(selectedTour.name, lang)} className="w-full h-full object-cover" />
                <button onClick={closeTour} className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors" style={{ background: 'rgba(26,18,8,0.5)' }}>
                  <X size={18} />
                </button>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {selectedTour.images.map((_, i) => (
                    <button key={i} onClick={() => setActiveImg(i)} className="h-2 rounded-full transition-all" style={{ width: activeImg === i ? 24 : 8, background: activeImg === i ? '#fff' : 'rgba(255,255,255,0.45)' }} />
                  ))}
                </div>
                {activeImg > 0 && (
                  <button onClick={() => setActiveImg(activeImg - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background: 'rgba(26,18,8,0.45)' }}>
                    <ChevronLeft size={18} />
                  </button>
                )}
                {activeImg < selectedTour.images.length - 1 && (
                  <button onClick={() => setActiveImg(activeImg + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ background: 'rgba(26,18,8,0.45)' }}>
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>

              <div className="p-6">
                {reservaStep === 'done' ? (
                  <div className="text-center py-10">
                    <div className="text-5xl mb-4">🎉</div>
                    <h3 className="text-2xl font-black mb-2" style={{ color: '#1A1208' }}>{t.done.title}</h3>
                    <p style={{ color: '#7A4E2A' }} className="mb-1">{t.done.tour} <strong style={{ color: '#1A1208' }}>{getL(selectedTour.name, lang)}</strong></p>
                    {selectedDate && <p style={{ color: '#7A4E2A' }} className="mb-6">{t.done.date} <strong style={{ color: '#1A1208' }}>{formatDate(selectedDate, lang)}</strong></p>}
                    <p style={{ color: '#7A4E2A' }} className="mb-8 text-sm">{t.done.body}</p>
                    <button onClick={closeTour} className="font-bold px-8 py-3 rounded-full text-white" style={{ background: '#E8862A' }}>{t.done.close}</button>
                  </div>
                ) : reservaStep === 'payment' ? (
                  <div>
                    <button onClick={() => setReservaStep('form')} className="flex items-center gap-1 text-sm mb-5 transition-colors hover:opacity-70" style={{ color: '#E8862A' }}>
                      <ChevronLeft size={15} /> {t.modal.back}
                    </button>
                    <h3 className="text-xl font-black mb-1" style={{ color: '#1A1208' }}>{t.payment.title}</h3>
                    <p className="text-sm mb-6" style={{ color: '#7A4E2A' }}>
                      {selectedTour && getL(selectedTour.name, lang)} · {selectedDate && formatDate(selectedDate, lang)} · {t.payment.persons(pax)}
                    </p>
                    <div className="rounded-xl p-4 mb-6 flex items-center justify-between" style={{ background: 'rgba(232,134,42,0.08)', border: '1px solid rgba(232,134,42,0.2)' }}>
                      <span className="font-medium" style={{ color: '#5C3A1A' }}>{t.payment.total}</span>
                      <span className="text-2xl font-black" style={{ color: '#E8862A' }}>{selectedTour && formatPrice(selectedTour.price * pax, selectedTour.currency)}</span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div>
                        <label className="text-xs font-semibold mb-1.5 block uppercase tracking-wide" style={{ color: '#7A4E2A' }}>{t.payment.cardNumber}</label>
                        <input className="w-full rounded-xl px-4 py-3 text-sm outline-none font-mono" style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.3)', color: '#1A1208' }} placeholder="4242 4242 4242 4242" maxLength={19} />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold mb-1.5 block uppercase tracking-wide" style={{ color: '#7A4E2A' }}>{t.payment.expiry}</label>
                          <input className="w-full rounded-xl px-4 py-3 text-sm outline-none font-mono" style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.3)', color: '#1A1208' }} placeholder="MM / YY" maxLength={7} />
                        </div>
                        <div>
                          <label className="text-xs font-semibold mb-1.5 block uppercase tracking-wide" style={{ color: '#7A4E2A' }}>CVC</label>
                          <input className="w-full rounded-xl px-4 py-3 text-sm outline-none font-mono" style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.3)', color: '#1A1208' }} placeholder="···" maxLength={4} />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setReservaStep('done')}
                      className="w-full font-bold py-4 rounded-xl text-white text-base transition-all hover:opacity-90"
                      style={{ background: '#E8862A', boxShadow: '0 4px 20px rgba(232,134,42,0.3)' }}
                    >
                      {t.payment.pay} {selectedTour ? formatPrice(selectedTour.price * pax, selectedTour.currency) : ''}
                    </button>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A06030" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <p className="text-xs text-center" style={{ color: '#A06030' }}>{t.payment.secure}</p>
                    </div>
                  </div>
                ) : reservaStep === 'form' ? (
                  <div>
                    <button onClick={() => setReservaStep('browse')} className="flex items-center gap-1 text-sm mb-5 transition-colors hover:opacity-70" style={{ color: '#E8862A' }}>
                      <ChevronLeft size={15} /> {t.modal.back}
                    </button>
                    <h3 className="text-xl font-black mb-1" style={{ color: '#1A1208' }}>{getL(selectedTour.name, lang)}</h3>
                    {selectedDate && (
                      <p className="text-sm mb-6" style={{ color: '#7A4E2A' }}>
                        {formatDate(selectedDate, lang)} · {t.payment.persons(pax)}
                      </p>
                    )}
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block" style={{ color: '#7A4E2A' }}>{t.form.name}</label>
                        <input required type="text" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all" style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.3)', color: '#1A1208' }} placeholder={t.form.namePh} onFocus={e => e.target.style.borderColor = '#E8862A'} onBlur={e => e.target.style.borderColor = 'rgba(232,134,42,0.3)'} />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block" style={{ color: '#7A4E2A' }}>{t.form.whatsapp}</label>
                        <div className="flex gap-2">
                          <select
                            value={phoneCode}
                            onChange={e => setPhoneCode(e.target.value)}
                            className="rounded-xl px-3 py-3 text-sm outline-none transition-all shrink-0"
                            style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.3)', color: '#1A1208', minWidth: 90 }}
                          >
                            {PHONE_CODES.map(c => (
                              <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                            ))}
                          </select>
                          <input required type="tel" className="flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all" style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.3)', color: '#1A1208' }} placeholder={t.form.phonePh} onFocus={e => e.target.style.borderColor = '#E8862A'} onBlur={e => e.target.style.borderColor = 'rgba(232,134,42,0.3)'} />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block" style={{ color: '#7A4E2A' }}>{t.form.email}</label>
                        <input required type="email" className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all" style={{ background: '#fff', border: '1px solid rgba(232,134,42,0.3)', color: '#1A1208' }} placeholder={t.form.emailPh} onFocus={e => e.target.style.borderColor = '#E8862A'} onBlur={e => e.target.style.borderColor = 'rgba(232,134,42,0.3)'} />
                      </div>
                      <button type="submit" className="w-full font-bold py-4 rounded-xl text-white" style={{ background: '#E8862A' }}>{t.form.payNow}</button>
                    </form>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-medium mb-1" style={{ color: '#E8862A' }}>
                          <MapPin size={12} /> {selectedTour.location}
                        </div>
                        <h3 className="text-2xl font-black" style={{ color: '#1A1208' }}>{getL(selectedTour.name, lang)}</h3>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs mb-0.5" style={{ color: '#A06030' }}>{t.tours.from}</div>
                        <div className="text-xl font-black" style={{ color: '#E8862A' }}>{formatPrice(selectedTour.price, selectedTour.currency)}</div>
                        <div className="text-xs" style={{ color: '#A06030' }}>{t.tours.perPerson}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm mb-4 flex-wrap" style={{ color: '#A06030' }}>
                      <span className="flex items-center gap-1.5"><Clock size={13} />{getL(selectedTour.duration, lang)}</span>
                      <span className="flex items-center gap-1.5"><Users size={13} />{selectedTour.groupSize}</span>
                      <span className="flex items-center gap-1.5"><Star size={13} className="fill-amber-400 text-amber-400" />{selectedTour.rating} ({selectedTour.reviews})</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: '#5C3A1A' }}>{getL(selectedTour.description, lang)}</p>

                    {/* Highlights */}
                    <div className="mb-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#A06030' }}>{t.tours.includes}</h4>
                      <div className="space-y-2">
                        {getLArr(selectedTour.highlights, lang).map(h => (
                          <div key={h} className="flex items-start gap-2.5 text-sm" style={{ color: '#5C3A1A' }}>
                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(232,134,42,0.15)' }}>
                              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#E8862A' }} />
                            </div>
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="mb-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#A06030' }}>{t.tours.pickDate}</h4>
                      <div className="space-y-2">
                        {selectedTour.dates.map(d => {
                          const sel = selectedDate === d.date
                          const low = d.spots <= 3
                          return (
                            <button
                              key={d.date}
                              onClick={() => setSelectedDate(d.date)}
                              className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border text-sm transition-all"
                              style={{
                                background: sel ? 'rgba(232,134,42,0.1)' : '#fff',
                                borderColor: sel ? '#E8862A' : 'rgba(232,134,42,0.2)',
                                color: sel ? '#1A1208' : '#5C3A1A',
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <Calendar size={14} style={{ color: sel ? '#E8862A' : '#A06030' }} />
                                <span className="font-medium capitalize">{formatDate(d.date, lang)}</span>
                              </div>
                              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: low ? 'rgba(239,68,68,0.1)' : 'rgba(232,134,42,0.1)', color: low ? '#DC2626' : '#E8862A' }}>
                                {low ? t.tours.fewSpots.replace('{n}', String(d.spots)) : `${d.spots} ${t.tours.spots}`}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Pax */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#A06030' }}>{t.modal.people}</h4>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setPax(Math.max(1, pax - 1))} className="w-10 h-10 rounded-full border font-bold text-xl flex items-center justify-center transition-colors hover:border-amber-400" style={{ borderColor: 'rgba(232,134,42,0.3)', color: '#E8862A' }}>−</button>
                        <span className="text-2xl font-black w-8 text-center" style={{ color: '#1A1208' }}>{pax}</span>
                        <button onClick={() => setPax(Math.min(12, pax + 1))} className="w-10 h-10 rounded-full border font-bold text-xl flex items-center justify-center transition-colors hover:border-amber-400" style={{ borderColor: 'rgba(232,134,42,0.3)', color: '#E8862A' }}>+</button>
                        <span className="text-sm ml-2" style={{ color: '#7A4E2A' }}>
                          {t.modal.total}: <strong style={{ color: '#1A1208' }}>{formatPrice(selectedTour.price * pax, selectedTour.currency)}</strong>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => selectedDate ? setReservaStep('form') : undefined}
                      className="w-full font-bold py-4 rounded-xl text-white text-base transition-all"
                      style={{ background: selectedDate ? '#E8862A' : '#C9A98A', cursor: selectedDate ? 'pointer' : 'default', boxShadow: selectedDate ? '0 4px 20px rgba(232,134,42,0.3)' : 'none' }}
                    >
                      {selectedDate ? t.modal.reserve : t.modal.selectFirst}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
