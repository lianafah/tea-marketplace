import React, { useEffect, useState } from 'react'
import './Presentation.css'

const reasons = [
  {
    n: '01',
    text: 'На больших мероприятиях гостям часто нужно немного “выдохнуть”, замедлиться и восстановить силы. Чайная становится таким пространством - здесь можно отдохнуть, пообщаться и познакомиться с новыми людьми.',
  },
  {
    n: '02',
    text: 'Сейчас всё больше людей выбирают не пить алкоголь на мероприятиях — это заметная тенденция. Поэтому важно, чтобы у гостей была приятная альтернатива бару.',
  },
  {
    n: '03',
    text: 'Чайная сама по себе становится отдельным опытом внутри мероприятия: можно попробовать разные сорта чая, поговорить на разные темы и узнать друг друга чуть глубже.',
  },
]

const formats = [
  {
    title: 'На корпоративе, вечеринке или фестивале',
    text: 'Отдельный чайный корнер или мягкая чилл-зона с пуфами и подушками, где можно замедлиться, выпить чая и выдохнуть между активностями.',
  },
  {
    title: 'На конференции',
    text: 'Чайная зона в зоне нетворкинга гостей, где можно познакомиться с другими участниками, обсудить выступления или перезагрузиться между блоками программы.',
  },
  {
    title: 'Для камерных мероприятий',
    text: 'Чайная церемония для небольших компаний: знакомство с чайной культурой, дегустация чая или встреча с приглашенным спикером на выбранную тему.',
  },
]

const gallery = [
  { src: '/media/gallery-1.jpg', alt: 'Вечерняя чайная встреча при свечах' },
  { src: '/media/gallery-2.jpg', alt: 'Приготовление чая в гайванях' },
  { src: '/media/gallery-3.jpg', alt: 'Дегустационные пиалы с чаем' },
  { src: '/media/gallery-4.jpg', alt: 'Алексей Алферов проводит чайную церемонию' },
  { src: '/media/gallery-5.jpg', alt: 'Чайная посуда на деревянном столе' },
  { src: '/media/gallery-6.jpg', alt: 'Чайная зона в гостиной' },
  { src: '/media/gallery-7.jpg', alt: 'Сервировка чайного стола' },
]

const logos = [
  { src: '/media/logo-epic.jpg', alt: 'Epic Growth' },
  { src: '/media/logo-impresario.jpg', alt: 'импресарио' },
  { src: '/media/logo-skyeng.jpg', alt: 'Skyeng' },
  { src: '/media/logo-bork.jpg', alt: 'Bork' },
  { src: '/media/logo-it.jpg', alt: 'IT-Agency' },
  { src: '/media/logo-novikov.jpg', alt: 'Novikov Group' },
]

const about = [
  'Меня зовут Алексей Алферов, я занимаюсь чаем уже более 15 лет;',
  'Провёл более 300 чайных мероприятий — от камерных чайных вечеров до больших фестивалей (500+ чел);',
  'Основал свою чайную Alferov tea, где регулярно проводятся мероприятия разного формата (чайные церемонии, философские беседы и встречи с научными спикерами);',
  'Мой подход — объединять традицию и современность, mindful-практики, помогать людям расслабиться и восстановить внимание;',
  'Регулярно сотрудничаю с брендами: Bork, Novikov group, Epic growth, Skyeng, It Agency, Qmarketing, импресāрио, MUS flowers.',
]

const menu = [
  { href: '#top', label: 'Начало' },
  { href: '#why', label: 'Зачем чайная' },
  { href: '#formats', label: 'Форматы' },
  { href: '#energy', label: 'Чай и энергия' },
  { href: '#photos', label: 'Фото' },
  { href: '#about', label: 'Обо мне' },
  { href: '#contacts', label: 'Контакты' },
]

function readLayout() {
  const wide = window.innerWidth >= 900
  const width = document.documentElement.clientWidth
  const height = window.innerHeight
  const scale = wide ? Math.min(width / 1440, height / 810) : 1
  return { wide, scale }
}

const Presentation: React.FC = () => {
  const initial = readLayout()
  const [scale, setScale] = useState(initial.scale)
  const [desktop, setDesktop] = useState(initial.wide)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fit = () => {
      const next = readLayout()
      setDesktop(next.wide)
      setScale(next.scale)
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const boardStyle = desktop
    ? { width: 1440 * scale, height: 810 * scale }
    : undefined

  const canvasStyle = desktop
    ? { transform: `scale(${scale})` }
    : undefined

  const closeAndGo = () => setMenuOpen(false)

  return (
    <div className={`presentation ${desktop ? 'is-desktop' : 'is-mobile'}`}>
      <button
        className="menu-btn"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? 'Закрыть' : 'Меню'}
      </button>
      {menuOpen && (
        <nav className="menu-panel" id="site-menu">
          {menu.map((item) => (
            <a key={item.href} href={item.href} onClick={closeAndGo}>
              {item.label}
            </a>
          ))}
        </nav>
      )}

      <section className="slide slide-hero" id="top">
        <div className="board" style={boardStyle}>
          <div className="canvas hero-canvas" style={canvasStyle}>
            <img className="hero-photo" src="/media/hero.jpg" alt="" />
            <div className="hero-card">
              <h1>
                Чайные
                <br />
                мероприятия
                <br />
                и чайные зоны
              </h1>
              <p>Alferov tea</p>
            </div>
          </div>
        </div>
      </section>

      <section className="slide slide-gray" id="why">
        <div className="board" style={boardStyle}>
          <div className="canvas why-canvas" style={canvasStyle}>
            <img className="why-photo" src="/media/gathering.jpg" alt="Гости пьют чай вместе" />
            <div className="why-copy">
              <h2>
                Чайная зона — место
                <br />
                притяжения людей
              </h2>
              <p className="why-lead">или зачем вообще нужна чайная?</p>
              <div className="reason-list">
                {reasons.map((item) => (
                  <article className="reason" key={item.n}>
                    <span className="num">{item.n}</span>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="slide slide-gray" id="formats">
        <div className="board" style={boardStyle}>
          <div className="canvas formats-canvas" style={canvasStyle}>
            <h2>Как чайная зона работает на мероприятиях?</h2>
            <div className="format-grid">
              {formats.map((item) => (
                <article className="format" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="slide slide-gray" id="energy">
        <div className="board" style={boardStyle}>
          <div className="canvas energy-canvas" style={canvasStyle}>
            <h2>
              Чай - это про бодрость и энергию
            </h2>
            <p className="energy-lead">или легальный способ проснуться без похмелья</p>
            <img
              className="energy-photo"
              src="/media/energy.jpg"
              alt="Чайная церемония за круглым столом"
            />
            <article className="sage energy-wide">
              <p>
                Чай помогает оставаться собранными и бодрыми на протяжении всего
                мероприятия. Это особенно важно для вечерних событий, длинных
                программ и активностей, где гостям нужно сохранять внимание и
                комфортное состояние.
              </p>
            </article>
            <article className="sage energy-gaba">
              <h3>Про габу</h3>
              <p>
                Габа-чай богат γ-аминомасляной кислотой (ГАМК). Она снижает
                нервное напряжение, помогает расслабиться без сонливости,
                и при этом сохраняет ясность ума.
              </p>
            </article>
            <article className="sage energy-puer">
              <h3>И про пуэр</h3>
              <p className="puer-lead">Пуэр — мягкая бодрость и концентрация</p>
              <p>
                В пуэре содержатся кофеин и теобромин.
                Они дают устойчивую, плавную бодрость, повышают концентрацию и
                помогают держать стабильную энергию без резких скачков и последующего
                упадка, как бывает после кофе.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="slide slide-cream" id="photos">
        <div className="board" style={boardStyle}>
          <div className="canvas photos-canvas" style={canvasStyle}>
            <h2>Фотографии с прошлых мероприятий</h2>
            <div className="gallery">
              {gallery.map((photo) => (
                <figure key={photo.src}>
                  <img src={photo.src} alt={photo.alt} />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="slide slide-gray" id="about">
        <div className="board" style={boardStyle}>
          <div className="canvas split-canvas" style={canvasStyle}>
            <div className="split-copy about-copy">
              <div className="pill">
                <h2>Обо мне</h2>
              </div>
              <ul>
                {about.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <div className="logos">
                {logos.map((logo) => (
                  <img key={logo.src} src={logo.src} alt={logo.alt} />
                ))}
              </div>
            </div>
            <img className="split-photo" src="/media/about.jpg" alt="Алексей Алферов за чайным столом" />
          </div>
        </div>
      </section>

      <section className="slide slide-gray" id="contacts">
        <div className="board" style={boardStyle}>
          <div className="canvas split-canvas" style={canvasStyle}>
            <div className="split-copy contacts-copy">
              <div className="pill pill-wide">
                <h2>Контакты</h2>
              </div>
              <p className="contacts-lead">
                Напишите, и я помогу подобрать формат чайной церемонии под
                вашу команду — обсудим детали и найдём лучшее решение.
              </p>
              <div className="contacts-person">
                <p className="who">Алексей Алферов</p>
                <a href="https://t.me/alferovtea" target="_blank" rel="noreferrer">
                  telegram @alferovtea
                </a>
                <a href="mailto:alferovcosmo@ya.ru">email alferovcosmo@ya.ru</a>
                <a href="tel:+79031644516">+79031644516</a>
              </div>
            </div>
            <img
              className="split-photo"
              src="/media/contacts.jpg"
              alt="Пиала чая в руках"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Presentation
