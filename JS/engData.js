const engQuizData = [
    {
        id: 1, name: "Self Introduction",
        vdoId: "qPUB_2EnZUY",
        questions: [
            { q: "What is your name? (ถามว่าอะไร)", a: ["คุณชื่ออะไร", "คุณอายุเท่าไหร่"], correct: 0, hint: "Name แปลว่า ชื่อ" },
            { q: "How old are you? (ถามว่าอะไร)", a: ["คุณอายุเท่าไหร่", "คุณสบายดีไหม"], correct: 0, hint: "Old แปลว่า อายุ" },
            { q: "Where are you from?", a: ["I am from Thailand.", "I am 7 years old."], correct: 0, hint: "ถามว่ามาจากไหน" },
            { q: "Are you a boy or a girl?", a: ["I am a boy/girl.", "My name is John."], correct: 0, hint: "ถามเพศ" },
            { q: "What is your favorite color?", a: ["I like red.", "I like dogs."], correct: 0, hint: "Color แปลว่า สี" }
        ]
    },
    {
        id: 2, name: "Family",
        vdoId: "qL0KIjvg5qA",
        questions: [
            { q: "Who is your father?", a: ["พ่อ", "แม่"], correct: 0, hint: "Father คือคุณพ่อ" },
            { q: "Who is your mother?", a: ["แม่", "พี่ชาย"], correct: 0, hint: "Mother คือคุณแม่" },
            { q: "Do you have a brother?", a: ["พี่ชาย/น้องชาย", "พี่สาว/น้องสาว"], correct: 0, hint: "Brother เป็นผู้ชาย" },
            { q: "Do you have a sister?", a: ["พี่สาว/น้องสาว", "พี่ชาย/น้องชาย"], correct: 0, hint: "Sister เป็นผู้หญิง" },
            { q: "Who is older, father or baby?", a: ["Father (พ่อ)", "Baby (เด็กทารก)"], correct: 0, hint: "Older แปลว่า แก่กว่า" }
        ]
    },
    {
        id: 3, name: "School",
        vdoId: "KNxtkBUlcXY",
        questions: [
            { q: "What is this? 📖", a: ["Book", "Pen"], correct: 0, hint: "หนังสือ" },
            { q: "What is this? 🖊️", a: ["Pen", "Bag"], correct: 0, hint: "ปากกา" },
            { q: "Where do you study?", a: ["School", "Hospital"], correct: 0, hint: "โรงเรียน" },
            { q: "Who teaches you?", a: ["Teacher", "Doctor"], correct: 0, hint: "คุณครู" },
            { q: "What is this? 🎒", a: ["Bag", "Desk"], correct: 0, hint: "กระเป๋า" }
        ]
    },
    {
        id: 4, name: "Food & Drink",
        vdoId: "TUzEbjxz9T8",
        questions: [
            { q: "Do you like pizza? 🍕", a: ["Yes, I do.", "No, it is a dog."], correct: 0, hint: "ชอบไหม" },
            { q: "What is this? 🍎", a: ["Apple", "Banana"], correct: 0, hint: "สีแดงๆ" },
            { q: "What is this? 🥛", a: ["Milk", "Water"], correct: 0, hint: "นม" },
            { q: "Is this a banana or orange? 🍌", a: ["Banana", "Orange"], correct: 0, hint: "สีเหลืองๆ" },
            { q: "What is this? 🍚", a: ["Rice", "Bread"], correct: 0, hint: "ข้าว" }
        ]
    },
    {
        id: 5, name: "Everyday English",
        vdoId: "fzCKfgBJXMk",
        questions: [
            { q: "What color is this? 🔴", a: ["Red", "Blue"], correct: 0, hint: "สีแดง" },
            { q: "What color is the sky? ☁️", a: ["Blue", "Green"], correct: 0, hint: "สีฟ้า" },
            { q: "What is this? 🚗", a: ["Car", "Train"], correct: 0, hint: "รถยนต์" },
            { q: "What is this? 🐶", a: ["Dog", "Cat"], correct: 0, hint: "สุนัข" },
            { q: "How many fingers on one hand? 🖐️", a: ["Five (5)", "Ten (10)"], correct: 0, hint: "มือข้างเดียวมีกี่นิ้ว" }
        ]
    },
    {
        id: 6, name: "Time",
        vdoId: "HrOsJdY5wwI",
        questions: [
            { q: "What time is it? (7:00)", a: ["Seven o'clock", "Ten o'clock"], correct: 0, hint: "เลข 7" },
            { q: "Morning or night? ☀️", a: ["Morning (เช้า)", "Night (กลางคืน)"], correct: 0, hint: "พระอาทิตย์ขึ้น" },
            { q: "Morning or night? 🌙", a: ["Night (กลางคืน)", "Morning (เช้า)"], correct: 0, hint: "พระจันทร์ขึ้น" },
            { q: "When do you sleep?", a: ["At night", "In the morning"], correct: 0, hint: "เวลานอน" },
            { q: "When do you eat lunch?", a: ["Noon / Afternoon", "Night"], correct: 0, hint: "กินข้าวเที่ยง" }
        ]
    },
    {
        id: 7, name: "My Free Time",
        vdoId: "Qk3KyMS36Jo",
        questions: [
            { q: "Do you play games? 🎮", a: ["Yes, I play games.", "I eat rice."], correct: 0, hint: "ถามว่าเล่นเกมไหม" },
            { q: "Do you watch TV? 📺", a: ["Yes, I do.", "I sleep."], correct: 0, hint: "ดูทีวี" },
            { q: "Do you play football? ⚽", a: ["Yes / No", "I am a bird."], correct: 0, hint: "ฟุตบอล" },
            { q: "Do you listen to music? 🎵", a: ["Yes", "Cat"], correct: 0, hint: "ฟังเพลง" },
            { q: "Do you read books? 📚", a: ["Yes", "Dog"], correct: 0, hint: "อ่านหนังสือ" }
        ]
    },

    {
        id: 8, name: "Fill in the blank",
        vdoId: "p7AfQeVmukM",
        questions: [
            { q: "I ___ a boy.", a: ["am", "is"], correct: 0, hint: "I ใช้กับอะไร" },
            { q: "She ___ my mom.", a: ["is", "are"], correct: 0, hint: "She ใช้กับอะไร" },
            { q: "This is a ___ 🐶", a: ["dog", "cat"], correct: 0, hint: "สุนัข" },
            { q: "We ___ friends.", a: ["are", "is"], correct: 0, hint: "We แปลว่าพวกเรา (หลายคน)" },
            { q: "I ___ happy. 😄", a: ["am", "are"], correct: 0, hint: "I ใช้กับอะไร" }
        ]
    },
    {
        id: 9, name: "ทายบุคคลดัง (Basic)",
        vdoId: "vFVvdJHiFAk",
        questions: [
            { q: "Who is he? (มนุษย์แมงมุม 🕷️)", a: ["Spider-Man", "Batman"], correct: 0, image: "ด่าน 9_ENG/SPIDERMAN.jpg", hint: "พ่นใยได้" },
            { q: "Who is he? (ไร้เทียมทาน)", a: ["Invincible", "Superman"], correct: 0, image: "ด่าน 9_ENG/invincible.png", hint: "เเข็งเเกร่งเเต่ยิงเลเซอร์ไม่ได้" },
            { q: "Who is she? (เร็วจัด)", a: ["ATrain", "Anna"], correct: 0, image: "ด่าน 9_ENG/A-Train.png", hint: "วิ่งเร็วสุดๆ" },
            { q: "Who is he? (ตัวตึง)", a: ["Omni man", "Homelander"], correct: 0, image: "ด่าน 9_ENG/omniman.png", hint: "เเข็งเเกร่ง" },
            { q: "Who is he? (พ่อมดน้อย)", a: ["Doctor strange", "Harry Potter"], correct: 0, image: "ด่าน 9_ENG/doctorstrange.png", hint: "ขี่ผ้าคุม" },

            { q: "Who is he? (นินจานิโก)", a: ["Black noir", "Daredevil"], correct: 0, image: "ด่าน 9_ENG/blacknoir.png", hint: "มืดมิด" },
            { q: "Who is he? (เก่งกระฉุด)", a: ["King baldwin", "King arthur"], correct: 0, image: "ด่าน 9_ENG/kingbaldwin.png", hint: "นำทัพอย่างชานฉลาด" },
            { q: "Who is she? (หมาป่าร้ายเเดนเหนือ)", a: ["John snow", "John wick"], correct: 0, image: "ด่าน 9_ENG/johnsnow.png", hint: "หมาป่า" },
            { q: "Who is he? (ประธานาธิบดีคนที่ 16 ของสหรัฐอเมริกา)", a: ["Abraham Lincoln", "George Washington"], correct: 0, image: "ด่าน 9_ENG/อับราฮัมลินคอล์น.png", hint: "ประธานาธิบดีคนที่ 16 ของสหรัฐอเมริกา" },
            { q: "Who is he? (อัจฉริยะ)", a: ["Julius Caesar", "Albert Einstein"], correct: 0, image: "ด่าน 9_ENG/JuliusCaesar.png", hint: "อัจฉริยะ" }
        ]
    },
    {
        id: 10, name: "ทายเพลง English Songs (บอส)",
        vdoId: "fS9WNTlsQIE",
        isBoss: true, bossName: "Joffy Extreme",
        questions: [
            { q: "บอส Ego Boy: 🎵 'doo doo doo doo doo doo' เพลงอะไร", audio: "เพลงสยองขวัญ/ssstik.io_1776440638309.mp3", autoplay: true, a: ["Baby Shark", "Let It Go"], correct: 0, bossSay: "ร้องเพลงแข่งกันไหม!", bundle: false },
            { q: "บอส Ego Boy: 🎵 'Quack Quack Quack Quack' เพลงอะไร", audio: "เพลงสยองขวัญ/Five Little Ducks.mp3", autoplay: true, a: ["Five Little Ducks", "ABC Song"], correct: 0, bossSay: "เสียงฉันเพราะกว่า!", bundle: false },
            { q: "บอส Ego Boy: 🎵 'E I E I O' เพลงอะไร", audio: "เพลงสยองขวัญ/Old MacDonald Had A Farm.mp3", autoplay: true, a: ["Old MacDonald Had A Farm", "Baby Shark"], correct: 0, bossSay: "ร้องตามให้ทันล่ะ!", bundle: false },
            { q: "บอส Ego Boy: 🎵 'Here I am, here I am' เพลงอะไร", audio: "เพลงสยองขวัญ/Finger Family.mp3", autoplay: true, a: ["Finger Family", "Hello"], correct: 0, bossSay: "แปะๆ!", bundle: false },
            { q: "บอส Ego Boy: 🎵 'Go round and round' เพลงอะไร", audio: "เพลงสยองขวัญ/Wheels on the Bus.mp3", autoplay: true, a: ["Wheels on the Bus", "Shape of You"], correct: 0, bossSay: "อ๊ากก คอแห้ง!", bundle: false, transforms: true },

            { q: "บอสงู: 🎵 'cookie from the cookie jar' เพลงอะไร", audio: "เพลงสยองขวัญ/Who Took The Cookie.mp3", autoplay: true, a: ["Who Took The Cookie?", "Let It Go"], correct: 0, bossSay: "ฟ่อออ! ฉันเลื้อยมาแล้ว!", bundle: true },
            { q: "บอสงู: 🎵 'clap clap clap clap your hands' เพลงอะไร", audio: "เพลงสยองขวัญ/Wag Your Tail.mp3", autoplay: true, a: ["Wag Your Tail", "Happy Birthday"], correct: 0, bossSay: "หนาวไหมล่ะฟ่ออ!", bundle: true },
            { q: "บอสงู: 🎵 'Good Morning Good Morning' เพลงอะไร", audio: "เพลงสยองขวัญ/Good Morning, Mr. Rooster.mp3", autoplay: true, a: ["Good Morning, Mr. Rooster", "Hello"], correct: 0, bossSay: "เป่าเค้กสิ!", bundle: true },
            { q: "บอสงู: 🎵 'roll over! roll over!' เพลงอะไร", audio: "เพลงสยองขวัญ/Ten In The Bed.mp3", autoplay: true, a: ["Ten In The Bed ", "Baby Shark"], correct: 0, bossSay: "เพลงวัยรุ่นก็มา!", bundle: true },
            { q: "บอสงู: 🎵 'merrily merrily merrily merrily' เพลงอะไร", audio: "เพลงสยองขวัญ/Row Row Row Your Boat.mp3", autoplay: true, a: ["Row Row Row Your Boat", "ABC Song"], correct: 0, bossSay: "ยอมแล้วจ้าาา!", bundle: true }
        ]
    }
];