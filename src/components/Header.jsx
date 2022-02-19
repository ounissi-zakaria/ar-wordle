import help from '../help_black_24dp.svg';
import example1 from "../example-1.png";
import statIcon from "../bar_chart_black_24dp.svg"
import { useState } from 'react';

export function Header({ targetWord, statsModal, setStatsModal }) {
    const [helpModal, setHelpModal] = useState(false)

    let isHelp = helpModal ? "" : "hidden";

    return (
        <header className='flex w-screen px-6 py-2 shadow-md h-14'>
            <button className='h-full' onClick={() => setStatsModal(true)}>
                <img src={statIcon} alt="إحصائيات" title='إحصائيات' />
            </button>
            <h1 className='m-auto font-mono text-4xl font-black'>
                كلمات
            </h1>
            <button className='h-full' onClick={() => setHelpModal(true)}>
                <img src={help} alt="مساعدة" title='مساعدة' />
            </button>
            <div className={'fixed inset-0 grid bg-black/30 place-items-center ' + isHelp}>
                <div className='absolute px-4 py-8 m-auto space-y-4 bg-white border rounded border-stone-100'>
                    <h2 className='text-2xl font-bold text-center'>
                        كيفية اللعب
                    </h2>
                    <p>
                        خمن الكلمة في ست محاولات.
                    </p>
                    <p>
                        كل كلمة تدخلها يجب أن تكون كلمة صحيحة متكونة من 5 أحرف. اظغط على مفتاح العودة
                        ( &#11152; )
                        للموافقة على كلمتك.
                    </p>
                    <p>
                        بعد كل محاولة، سيتغير لون حروف الكلمة التي أدخلتها ليعكس مدى قربك للكلمة الصحيحة.
                    </p>
                    <p>
                        <span className='font-bold'>تذكير: </span>
                        تعتبر الشّدّة ( _ّ ) حرفا من الحروف.
                    </p>
                    <hr />
                    <h3 className='text-xl font-bold'>
                        مثال:
                    </h3>
                    <img src={example1} alt="الكلمة أهلّت، الشدة ملونة بالأخضر و ت ملونة بالأصفر." />

                    <p>
                        الحروف ا، ه، ل ليسوا جزءا من الكلمة الصحيحة.
                    </p>
                    <p>
                        الشّدّة جزء من الكلمة الصحيحة و هي في الموضع الصحيح.
                    </p>
                    <p>
                        الـ ت جزء من الكلمة الصحيحة، لكنها ليست في الموضع الصحيح.
                    </p>
                    <button className='absolute top-0 text-lg font-bold ' onClick={() => setHelpModal(false)}>x</button>
                </div>
            </div>
            <GameOverScreen targetWord={targetWord} statsModal={statsModal} setStatsModal={setStatsModal} />
        </header>);
}

function GameOverScreen({ targetWord, statsModal, setStatsModal }) {
    if (statsModal) {
        return (
            <div className={'fixed inset-0 grid bg-black/30 place-items-center'}>
                <div className='absolute px-4 py-8 m-auto space-y-4 bg-white border rounded border-stone-100'>
                    <h2 className='text-2xl font-bold text-center text-transparent bg-gradient-to-l from-blue-600 to-pink-600 bg-clip-text'>
                        {targetWord}
                    </h2>
                    <div className='flex gap-28'>
                        <StatUnit title="الجولات" value={localStorage["rounds"] || 0} />
                        <StatUnit title="ربح" value={localStorage["wins"] || 0} />
                        <StatUnit title="خسارة" value={localStorage["losses"] || 0} />
                    </div>
                    <hr />
                    <h3 className='text-xl font-medium text-center'>
                        توزيع المحاولات
                    </h3>
                    <Distrobution></Distrobution>
                    <button className='absolute top-0 text-lg font-bold ' onClick={() => setStatsModal(false)}>x</button>
                </div>
            </div>
        )
    }
    return (
        null
    )
}

function StatUnit({ title, value }) {
    return (
        <div className='text-center'>
            <h3 className='text-lg font-medium'>
                {title}
            </h3>
            <span className='text-5xl font-medium'>
                {value}
            </span>
        </div>
    )
}

function Distrobution() {
    const range = Array(7).fill(0)
    range[range.length - 1] = "خسارة"
    return (
        <div className='flex flex-col gap-2'>
            {range.map((_, i) => {
                if (i == 6) {
                    var count = Number(localStorage["losses"]) || 0
                    var percentage = count / Number(localStorage["rounds"] || 1) * 100
                } else {
                    var count = Number(localStorage[i + 1]) || 0
                    var percentage = count / Number(localStorage["rounds"] || 1) * 100
                }
                return (
                    <div className='flex gap-2' key={i}>
                        <span>{_[0] || i + 1}</span>
                        <span className="inline-block text-white bg-slate-500 min-w-fit" style={{ width: percentage + "%" }}>
                            {count}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}