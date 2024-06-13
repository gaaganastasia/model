import React from 'react';

export default function Contacts() {
  return (
    <div className="contacts" id='#contacts'>
      <h2 className="contacts__title">Команда проекта</h2>
      <p className="contacts__subtitle">Проект создан студентами СФУ</p>
      <div className="contacts__team">
        <div className="teammate">
          <p className="teammate__role">Концепция</p>
          <p className="teammate__name">Хабаров Егор Романович</p>
          <p className="teammate__email">pagiya@gmail.com</p>
        </div>
        <div className="teammate">
          <p className="teammate__role">WEB-разработка</p>
          <p className="teammate__name">Гааг Анастасия Александровна</p>
          <p className="teammate__email">rayuh-egico@yandex.ru</p>
        </div>
        <div className="teammate">
          <p className="teammate__role">3D</p>
          <p className="teammate__name">Жуков Виктор Ильич</p>
          <p className="teammate__email">locuto03@mail.com</p>
        </div>
      </div>
    </div>
  );
}
