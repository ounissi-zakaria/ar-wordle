import help from '../help_black_24dp.svg';
import example1 from "../example-1.png";

export function Header({ helpModal, setHelpModal }) {
    let isHelp = helpModal ? "" : "hidden";
    return (
        <header className='flex w-screen px-6 py-2 shadow-md h-14'>
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
        </header>);
}
