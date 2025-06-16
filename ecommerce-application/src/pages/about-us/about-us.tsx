import logoRsschool from '../../assets/svg/rsschool-logo.svg';
import customer1 from '../../assets/cards-images/avatar.jpg';
import customer2 from '../../assets/cards-images/image-photo.jpeg';
import customer3 from '../../assets/cards-images/foto-bztn.jpg';
import type {ReactElement} from 'react';
import './about-us.css'

const AboutUs = (): ReactElement => {
    return (
			<div>
				<div className='about__wrapper'>
					<h1 className='about__title'>O нас</h1>
					<p className='about__subtitle'>Над этим проектом в меру скромных способностей, преодолевая все преграды кода и мира усердно трудилась команда разработчиков</p>
					<div className='about__list'>
						<div className='about__item customer'>
							<div className='customer__header'>
								<img src={customer1} className='customer__foto' alt='Тимлид команды' />
								<div className='customer__content'>
									<h2 className='customer__name'>Алексей Реут</h2>	
									<p className='customer__about'>
										Высоко технологичный, общительный, дружелюбный, толерантный. Эффективно и быстро обучаемый (врач и программист-любитель).
									</p>
								</div>
							</div>	
							<ul className='customer__contributions'>
								<li className='customer__task'>Настроил репозиторий и доску отслеживания задач.</li>
								<li className='customer__task'>Сконфигурировал среду разработки и настроил ее сценарий.</li>
								<li className='customer__task'>Реализовал страницу входа.</li>
								<li className='customer__task'>Настроил текущий токен аутентификации и интегрировал страницы регистрации и входа с CommerceTools</li>
								<li className='customer__task'>Создал подробную реализацию страницы продукта.</li>
								<li className='customer__task'>Добавил возможность редактирования профиля пользователя.</li>
								<li className='customer__task'>Разработал и реализовал корзину продуктов и все ее функции.</li>
								<li className='customer__task'>Добавил промокод, всплывающие подсказки и скидки на товары.</li>
								</ul> 
							<a className='customer__link' href='https://github.com/tsubasakatakiri'>Замечен на GitHub!</a>			
						</div>
			
						<div className='about__item customer'>
							<div className='customer__header'>
								<img src={customer2} className='customer__foto' alt='Учасник команды' />
								<div className='customer__content'>
									<h2 className='customer__name'>Михаил Дрозд</h2>
									<p className='customer__about'>Трудолюбивый, упорный, быстро обучаемый, достигатор целей (гитарист и шахматист).
									</p>
								</div>
							</div>	
							<ul className='customer__contributions'>
								<li className='customer__task'>Зарегистрировал проект в CommerceTools и настроил API клиента.</li>
								<li className='customer__task'>Создал главную страницу с хедером и навигацией</li>
								<li className='customer__task'>Разработал межстраничную маршрутизацию, кнопки и заголовки</li>
								<li className='customer__task'>Сделал навигацию по категориям товаров доступной, а карточки товаров интерактивными</li>
							</ul>	
							<a className='customer__link' href='https://github.com/rixels'>Замечен на GitHub!</a>			
						</div>
			
						<div className='about__item customer'>
							<div className='customer__header'>
								<img src={customer3} className='customer__foto' alt='Учасник команды' />
								<div className='customer__content'>
									<h2 className='customer__name'>Татьяна Бжассо</h2>	
									<p className='customer__about'>Трудолюбивая, сосредоточенная, быстро обучаемая (то ли программист, то ли бухгалтер).
									</p>
								</div>
							</div>	
							<ul className='customer__contributions'>
								<li className='customer__task'>Создала подробный файл README.md проекта.</li>
								<li className='customer__task'>Реализовала страницу регистрации.</li>
								<li className='customer__task'>Добавила товары в каталог.</li>
								<li className='customer__task'>Рассказала о деяниях команды.</li>
							</ul>	
							<a className='customer__link' href='https://github.com/tatianabz'>Замечена на GitHub!</a>		
						</div>
					</div>
					</div>
        <div>
            <a href='https://rs.school/'>
                <img className='logo-rs' src={logoRsschool} alt='logo rsSchool'/>
            </a>
        </div>
			</div>
    )
}
export default AboutUs;