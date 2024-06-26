import React from 'react';

export default function About() {
  return (
    <div className="about" id='#about'>
      <h2 className="about__title">О проекте</h2>
      <div className="about__line"></div>
      <p className="about__content">
      Известный российский поэт А.С. Пушкин писал:
      <br /><br />
      <span>«Уважение к минувшему — вот черта, отличающая образованность
        от дикости. Гордиться славою своих предков не&nbsp;только можно, но и нужно».</span>
      <br /><br />
      С этим высказыванием нельзя не согласиться, именно поэтому мы решили проявить уважение к 
      истории и представить вам проект, посвященный новому взгляду на сохранение памяти об&nbsp;архитектурном 
      наследии региона, и рассказать об&nbsp;одном из&nbsp;памятников — магометанском храме в Енисейске.
      </p>
    </div>
  );
}
