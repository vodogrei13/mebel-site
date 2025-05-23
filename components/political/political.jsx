'use client'
import css from './political.module.scss'
import { useState } from 'react'
import Link from "next/link";

export const Political = ({
    text = "Политика конфиденциальности",      
}) => {
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

    return (
        <div>
            <a href="#" onClick={(e) => { 
                e.preventDefault(); 
                setShowPrivacyPolicy(true); 
            }}>
            {text}
            </a>

            {showPrivacyPolicy && (
                <div className={css.modalOverlay}>
                    <div className={css.modalContent}>
                        <button 
                            className={css.closeButton}
                            onClick={() => setShowPrivacyPolicy(false)}
                        >
                            Х
                        </button>
                        <h2>Политика конфиденциальности</h2>
                        <div className={css.policyText}>
                            <div className={css.policyText__item}>
                                <div className={css.policyText__item_title}>
                                    <h3>Общие положения</h3>
                                </div>
                                <div className={css.policyText__item_text}>
                                    <p>Политика в отношении обработки персональных данных  разработана в соответствии с требованиями Федерального закона от 27 июля 2006 г. № 152ФЗ «О персональных данных» и предназначена для предоставления неограниченного доступа к информации в отношении обработки персональных данных, а также к сведениям о реализуемых требованиях к защите персональных данных в КОМПАНИЯ!.
                                    <br/><br/>Настоящая политика является выдержкой из положения об обработке и защите персональных данных  и описывает порядок обработки и защиты персональных физических лиц в связи с реализацией трудовых отношений, заключением договоров и исполнением договорных обязательств.
                                    <br/><br/>Персональные данные относятся к категории конфиденциальной информации и защищены от несанкционированного, в том числе случайного, доступа к ним.</p>
                                </div>
                            </div>
                            <hr/>
                            <div className={css.policyText__item}>
                                <div className={css.policyText__item_title}>
                                    <h3>Основные понятия в области персональных данных</h3>
                                </div>
                                <div className={css.policyText__item_text}>
                                    <p>Под персональными данными понимается любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу, в том числе:
                                    <br/><br/>фамилия, имя, отчество;
                                        дата и место рождения;
                                        адрес регистрации, место проживания;
                                        семейное, социальное, имущественное положение;
                                        образование, профессия, доходы и т.п.
                                    <br/><br/>Также в настоящей политике используются следующие понятия:
                                    <br/><br/>Оператор персональных данных — юридическое лицо самостоятельно или совместно с третьими лицами организующие и осуществляющие обработку персональных данных, а также определяющие цели обработки, состав персональных данных и действия с ними.
                                    <br/><br/>Субъект персональных данных — физическое лицо, персональные данные которого обрабатываются оператором персональных данных.
                                    <br/><br/>Обработка персональных данных — любое действие, совершаемое с персональными данными, в том числе сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение.
                                    <br/><br/>Автоматизированная обработка персональных данных — обработка персональных данных с помощью средств вычислительной техники. Распространение персональных данных — действия, направленные на раскрытие персональных данных неопределенному кругу лиц. Предоставление персональных данных — действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц.
                                    <br/><br/>Распространение персональных данных —действия, направленные на раскрытие персональных данных неопределенному кругу лиц. Предоставление персональных данных — действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц.
                                    <br/><br/>Предоставление персональных данных —действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц.
                                    <br/><br/>Уничтожение персональных данных —действия, в результате которых становится невозможным восстановить содержание персональных данных в информационной системе персональных данных или в результате которых уничтожаются материальные носители персональных данных.
                                    <br/><br/>Обезличивание персональных данных — действия, в результате которых становится невозможным без использования дополнительной информации определить принадлежность персональных данных конкретному субъекту персональных данных.
                                    <br/><br/>Информационная система персональных данных — совокупность совокупность содержащихся в базах данных персональных данных и обеспечивающих их обработку информационных технологий и технических средств.</p>
                                </div>
                            </div>
                            <hr/>
                            <div className={css.policyText__item}>
                                <div className={css.policyText__item_title}>
                                    <h3>Обработка персональных данных</h3>
                                </div>
                                <div className={css.policyText__item_text}>
                                    <p>Сбор персональных данных осуществляется непосредственно у самого субъекта персональных данных. Если предоставление персональных данных является обязательным в соответствии с законодательством, субъекту персональных данных разъясняются юридические последствия отказа в предоставлении таких данных.
                                    <br/><br/>Получение персональных данных у третьей стороны возможно только при наличии законных оснований. При получении персональных данных у третьей стороны субъект уведомляется об этом.
                                    <br/><br/>Получение и обработка персональных данных физического лица о его политических, религиозных убеждениях и частной жизни не допускается. В случаях, когда обработка таких сведений необходима в связи с исполнением договорных обязательств, они могут быть получены и обработаны только с письменного согласия самого физического лица или его законного представителя.
                                        <br/><br/>Обработка персональных данных осуществляется в случаях, когда получено согласие субъекта на обработку его персональных данных или в иных случаях, предусмотренных законодательством.
                                        <br/><br/>Обработка персональных данных осуществляется исключительно в целях соблюдения законов и нормативных правовых актов Российской Федерации, заключения договоров и исполнения договорных обязательств.
                                        <br/><br/>Обработку персональных данных осуществляют только работники оператора, допущенные руководством в установленном порядке.
                                        <br/><br/>Персональные данные обрабатываются как на материальных (бумажных) носителях, так и в электронном виде (в информационных системах персональных данных, на машинных носителях).
                                        <br/><br/>Хранение персональных данных осуществляется в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен законодательством либо договором, стороной которого является субъект персональных данных.
                                        <br/><br/>Хранение персональных данных осуществляется с учетом обеспечения режима их конфиденциальности.
                                        <br/><br/>Персональные данные уничтожаются либо обезличиваются по достижении целей обработки или в случае утраты необходимости в достижении этих целей, если иное не предусмотрено законодательством.
                                        <br/><br/>Передача персональных данных третьему лицу осуществляется только с согласия субъекта персональных данных или в случаях, прямо предусмотренных законодательством.
                                        <br/><br/>Раскрытие персональных данных третьему лицу без письменного согласия соответствующего субъекта не допускается, за исключением случаев, когда это необходимо для защиты жизни, здоровья или иных жизненно важных интересов субъекта персональных данных.
                                        <br/><br/>Раскрытие персональных данных третьему лицу в коммерческих целях без письменного согласия соответствующего субъекта запрещено. Обработка персональных данных в целях продвижения товаров, работ, услуг на рынке, а также в целях политической агитации осуществляется только при условии предварительного согласия на это субъекта.
                                        <br/><br/>Право доступа к персональным данным, обрабатываемым в КОМПАНИЯ!, имеют:
                                        <br/><br/>*директор КОМПАНИЯ!;
                                        <br/><br/>*другие работники КОМПАНИЯ!, для которых обработка персональных данных необходима в связи с исполнением их должностных обязанностей.
                                        <br/><br/>*Допуск работников к персональным данным осуществляется руководством в установленном порядке.
                                        <br/><br/>*Любой субъект, персональные данные которого обрабатываются в КОМПАНИЯ!, имеет право доступа к своим персональным данным, в том числе к следующей информации:
                                        <br/><br/>*подтверждение факта обработки его персональных данных;
                                        <br/><br/>*правовые основания и цели обработки его персональных данных;
                                        <br/><br/>*цели и применяемые оператором способы обработки персональных данных;
                                        <br/><br/>*наименование и место нахождения оператора, сведения о лицах, которые имеют доступ к персональным данным (за исключением работников оператора) или которым могут быть раскрыты персональные данные на основании договора с оператором или на основании законодательства;
                                        <br/><br/>*перечень обрабатываемых персональных данных, относящиеся к соответствующему субъекту, и источник их получения;
                                        <br/><br/>*сроки обработки персональных данных и сроки их хранения;
                                        <br/><br/>*наименование лица, осуществляющего обработку персональных данных по поручению оператора, в случае если обработка поручена третьему лицу.</p>
                                </div>
                            </div>
                            <hr/>
                            <div className={css.policyText__item}>
                                <div className={css.policyText__item_title}>
                                    <h3>Защита персональных данных</h3>
                                </div>
                                <div className={css.policyText__item_text}>
                                    <p>При обработке персональных данных принимаются необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения персональных данных, а также от иных неправомерных действий в отношении персональных данных.
                                    <br/><br/>В целях обеспечения безопасности персональных данных в КОМПАНИЯ! осуществляются следующие мероприятия:
                                        <br/><br/>*определение угроз безопасности персональных данных при их обработке в информационных системах персональных данных;
                                        <br/><br/>*применение организационных и технических мер по обеспечению безопасности персональных данных при их обработке в информационных системах, которые обеспечивают выполнение требований к установленным уровням защищенности;
                                        <br/><br/>*применение прошедших в установленном порядке процедур оценки соответствия средств защиты информации;
                                        <br/><br/>*оценка эффективности принимаемых мер по обеспечению безопасности персональных данных, обрабатываемых в информационных системах персональных данных;
                                        <br/><br/>*учет машинных носителей персональных данных;
                                        <br/><br/>*обнаружение фактов несанкционированного доступа к персональным данным и реагирование на данные инциденты;
                                        <br/><br/>*восстановление персональных данных, модифицированных или уничтоженных вследствие несанкционированного доступа к ним;
                                        <br/><br/>*установление правил доступа к персональным данным, обрабатываемым в информационных системах персональных данных;
                                        <br/><br/>*регистрация и учет действий, совершаемых с персональными данными в информационных системах персональных данных;
                                        <br/><br/>*контроль за принимаемыми мерами по обеспечению безопасности персональных данных в соответствии с установленным уровнем защищенности персональных данных.</p>
                                </div>
                            </div>
                            <hr/>
                            <div className={css.policyText__item}>
                                <div className={css.policyText__item_title}>
                                    <h3>Ответственность</h3>
                                </div>
                                <div className={css.policyText__item_text}>
                                    <p>За нарушение требований, установленных законодательством РФ, положением и другими локальными актами КОМПАНИЯ!, работники и иные лица, получившие доступ к персональным данным несут дисциплинарную, административную, гражданско-правовую и уголовную ответственность в соответствии с федеральными законами РФ.</p>
                                </div>
                            </div>
                            <hr/>
                            <div className={css.policyText__item}>
                                <div className={css.policyText__item_title}>
                                    <h3>Заключительные положения</h3>
                                </div>
                                <div className={css.policyText__item_text}>
                                    <p>Настоящая политика вступает в силу с момента её утверждения и действует бессрочно. Изменения в политику вносятся отдельными актами КОМПАНИЯ!.
                                    <br/><br/>К настоящей политике обеспечен неограниченный доступ всех заинтересованных лиц, в том числе субъектов персональных данных и органов власти, осуществляющих контрольно-надзорную функцию в области персональных данных.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    );
};