import React from 'react';
import {Link} from "react-router-dom";

class UserAgreement extends React.Component {

    render() {
        return(
            <div className="content">
                <div className="inner_news_container">
                    <h1 >Користувацька угода</h1>
                    <pre className="news_text">
                        <h2>Загальні положення</h2>
                        <p>
                            Ця угода укладається між Профейсійною спілкою «Аеронавігація» (79040, м. Львів, вул. Любінська,
                            217, а/с3983, Львівський РСП Украероруху тел. +38 032 297-21-16) (далі – «Профспілка») - що є власником
                            сайту <a href="https://airnavigation.herokuapp.com" style={{color: "#09173f"}}>https://airnavigation.herokuapp.com</a> (далі по тексту - сайт),
                            і приватною особою, що відвідуює сторінки сайту або використовуює хоча б одним із сервісів, які надаються в рамках сайту
                            (далі по тексту - відвідувач сайту). Угода регулює порядок використання ресурсів, сервісів, можливостей сайту,
                            наданих адміністрацією сайту майданчиків для отримання інформації.
                        </p>
                        <h2>1. Відвідувач сайту</h2>
                        <p>
                            1.1. Відвідувачем сайту є будь-яка приватна особа, яка заходила і подивилась хоча б одну сторінку сайту без
                            попередньої реєстрації та авторизації на сайті.
                        </p>
                        <p>
                            1.2. Відвідувач, що реєструється і авторизуватися з використанням унікальних індивідуальних даних, стає користувачем сайту.
                        </p>
                        <p>
                            1.3. Користувач має доступ до розширених можливостей, що надаються в рамках сайту.
                        </p>
                        <p>
                            1.4. Для того щоб користуватися ресурсами, сервісами і можливостями сайту, користувачеві необхідно спочатку висловити
                            свою згоду з Угодою. Користувач не має права користуватися сайтом, якщо він не прийняв умови Угоди.
                        </p>
                        <p>
                            1.5. Відвідувач не має права користуватися послугами сайту і не може прийняти умови Угоди, якщо він не досяг
                            встановленого законодавством віку для укладення подібних угод; або не виконав інших умов для укладення подібних
                            угод, передбачених законодавством.
                        </p>
                        <h2>2. Використання матеріалів сайту</h2>
                        <p>
                            2.1. Використовувати інтерактивні ресурси сайту, використовувати форму зворотнього зв'язку, можуть тільки зареєстровані відвідувачі - користувачі сайту.
                        </p>
                        <p>2.2. Користувач має право:</p>
                        <blockquote>2.2.3. Використовувати ресурси сайту будь-яким способом, що не суперечить основам його діяльності.</blockquote>
                        <p>
                            2.3. Авторські права на матеріали сайту, ресурси і сервіси, якщо не вказано інше, належать адміністрації сайту.
                        </p>
                        <p>
                            2.4. Копіювання матеріалів сайту без письмової згоди адміністрації заборонено.
                        </p>
                        <h2>3. Обробка і зберігання ваших персональних даних</h2>
                        <p>
                            3.1. Ми гарантуємо конфіденційність персональних даних і застосовуємо організаційні і технічні заходи для захисту
                            персональних даних. Ми не передаємо персональні дані третім особам.
                        </p>
                        <p>
                            3.2. Ми можемо зберігати персональні дані двох видів:
                        </p>
                        <blockquote>
                            3.2.1. Ідентифікаційні дані, включаючи eMail;
                        </blockquote>
                        <blockquote>
                            3.2.2. Дані користувача, що включають паспортні дані, контактні дані, податкові дані, дані щодо освіти, роботи
                            та сімейні дані, що зберігаються у вигляді анкет опитування для Профспілки;
                        </blockquote>
                        <p>
                            3.3. Ми обробляємо персональні дані з кількох причин:
                        </p>
                        <blockquote>
                            3.3.3. Щоб відвідувачі сайту мали можливість отримувати доступ до закритої інформації Профспілки.
                        </blockquote>
                        <blockquote>
                            3.3.4. Щоб у нас була можливість збирати статистику по роботі, що була виконана Профспілкою перед її членами.
                        </blockquote>
                        <blockquote>
                            3.3.5. Ми використовуємо дані, отримані від Вас (ім'я та прізвище, email адреса для реєстрації на сайті),
                            тільки за умови отримання Вашої згоди з правилами обробки таких даних.
                        </blockquote>
                        <p>
                            3.4. Термін зберігання персональних даних - до моменту видалення їх з сайту за запитом користувача, згідно положень
                            <Link to="/personal_data_processing" style={{color: "#09173f"}}> Згоди на обробку персональних даних</Link>, або
                            до моменту вихочу виходу користувча із Профспілки згідно її статуту.
                        </p>
                        <p>
                            3.5. Ви маєте право на:
                        </p>
                        <blockquote>
                            3.5.1. Можливість змінювати свої персональні дані, якщо вони недостатньо повні та/або неправильні.
                        </blockquote>
                        <blockquote>
                            3.5.2. Запит на видалення Ваших персональних даних.
                        </blockquote>
                        <blockquote>
                            3.5.3. Якщо Ви вважаєте, що Ваші права та інтереси були порушені, Ви можете висунути претензію.
                            Ми зробимо все можливе, щоб виправити ситуацію. Для цієї мети, будь ласка, надішліть нам email на пошту:
                            aeronavua@gmail.com.
                        </blockquote>
                    </pre>
                </div>
            </div>
        );
    }
}
export default UserAgreement;