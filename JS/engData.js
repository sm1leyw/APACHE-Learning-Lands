const engQuizData = [
    {
        id: 1, name: "Self Introduction",
        vdoId: "qPUB_2EnZUY",
        questions: [
            { q: "What is your name? (ถามว่าอะไร)", a: ["คุณอายุเท่าไหร่", "คุณชื่ออะไร", "คุณมาจากไหน", "คุณชอบสีอะไร"], correct: 1, hint: "Name แปลว่า ชื่อ" },
            { q: "How old are you? (ถามว่าอะไร)", a: ["คุณชื่ออะไร", "คุณสบายดีไหม", "คุณอายุเท่าไหร่", "คุณอยู่ที่ไหน"], correct: 2, hint: "Old แปลว่า อายุ" },
            { q: "Where are you from?", a: ["I am 7 years old.", "I like blue.", "I am from Thailand.", "My name is Tom."], correct: 2, hint: "ถามว่ามาจากไหน" },
            { q: "Are you a boy or a girl?", a: ["I am 8 years old.", "My name is John.", "I am a boy/girl.", "I am from school."], correct: 2, hint: "ถามเพศ" },
            { q: "What is your favorite color?", a: ["I like dogs.", "I like red.", "I am fine.", "I have a pen."], correct: 1, hint: "Color แปลว่า สี" }
        ]
    },
    {
        id: 2, name: "Family",
        vdoId: "qL0KIjvg5qA",
        questions: [
            { q: "Who is your father?", a: ["แม่", "พ่อ", "คุณครู", "เพื่อน"], correct: 1, hint: "Father คือคุณพ่อ" },
            { q: "Who is your mother?", a: ["พี่ชาย", "น้องสาว", "แม่", "พ่อ"], correct: 2, hint: "Mother คือคุณแม่" },
            { q: "Do you have a brother?", a: ["พี่สาว/น้องสาว", "พี่ชาย/น้องชาย", "คุณแม่", "คุณย่า"], correct: 1, hint: "Brother เป็นผู้ชาย" },
            { q: "Do you have a sister?", a: ["พี่ชาย/น้องชาย", "คุณลุง", "พี่สาว/น้องสาว", "คุณพ่อ"], correct: 2, hint: "Sister เป็นผู้หญิง" },
            { q: "Who is older, father or baby?", a: ["Baby (เด็กทารก)", "Father (พ่อ)", "Sister (พี่สาว)", "Teacher (ครู)"], correct: 1, hint: "Older แปลว่า แก่กว่า" }
        ]
    },
    {
        id: 3, name: "School",
        vdoId: "KNxtkBUlcXY",
        questions: [
            { q: "What is this? 📖", a: ["Pen", "Book", "Bag", "Desk"], correct: 1, hint: "หนังสือ" },
            { q: "What is this? 🖊️", a: ["Bag", "Book", "Desk", "Pen"], correct: 3, hint: "ปากกา" },
            { q: "Where do you study?", a: ["Hospital", "Market", "School", "Kitchen"], correct: 2, hint: "โรงเรียน" },
            { q: "Who teaches you?", a: ["Doctor", "Teacher", "Police", "Chef"], correct: 1, hint: "คุณครู" },
            { q: "What is this? 🎒", a: ["Desk", "Book", "Bag", "Chair"], correct: 2, hint: "กระเป๋า" }
        ]
    },
    {
        id: 4, name: "Food & Drink",
        vdoId: "TUzEbjxz9T8",
        questions: [
            { q: "Do you like pizza? 🍕", a: ["No, it is a dog.", "Yes, I do.", "It is a pencil.", "I am a pizza."], correct: 1, hint: "ชอบไหม" },
            { q: "What is this? 🍎", a: ["Banana", "Grape", "Apple", "Rice"], correct: 2, hint: "สีแดงๆ" },
            { q: "What is this? 🥛", a: ["Water", "Juice", "Bread", "Milk"], correct: 3, hint: "นม" },
            { q: "Is this a banana or orange? 🍌", a: ["Orange", "Banana", "Apple", "Milk"], correct: 1, hint: "สีเหลืองๆ" },
            { q: "What is this? 🍚", a: ["Bread", "Noodle", "Rice", "Soup"], correct: 2, hint: "ข้าว" }
        ]
    },
    {
        id: 5, name: "Everyday English",
        vdoId: "fzCKfgBJXMk",
        questions: [
            { q: "What color is this? 🔴", a: ["Blue", "Red", "Yellow", "Black"], correct: 1, hint: "สีแดง" },
            { q: "What color is the sky? ☁️", a: ["Green", "Black", "Blue", "Red"], correct: 2, hint: "สีฟ้า" },
            { q: "What is this? 🚗", a: ["Train", "Bicycle", "Car", "Boat"], correct: 2, hint: "รถยนต์" },
            { q: "What is this? 🐶", a: ["Cat", "Dog", "Bird", "Fish"], correct: 1, hint: "สุนัข" },
            { q: "How many fingers on one hand? 🖐️", a: ["Ten (10)", "Three (3)", "Five (5)", "Eight (8)"], correct: 2, hint: "มือข้างเดียวมีกี่นิ้ว" }
        ]
    },
    {
        id: 6, name: "Time",
        vdoId: "HrOsJdY5wwI",
        questions: [
            { q: "What time is it? (7:00)", a: ["Ten o'clock", "Seven o'clock", "Nine o'clock", "Twelve o'clock"], correct: 1, hint: "เลข 7" },
            { q: "Morning or night? ☀️", a: ["Night (กลางคืน)", "Evening (ตอนเย็น)", "Morning (เช้า)", "Noon (เที่ยง)"], correct: 2, hint: "พระอาทิตย์ขึ้น" },
            { q: "Morning or night? 🌙", a: ["Morning (เช้า)", "Afternoon (บ่าย)", "Night (กลางคืน)", "Sunrise (เช้ามืด)"], correct: 2, hint: "พระจันทร์ขึ้น" },
            { q: "When do you sleep?", a: ["In the morning", "At school", "At night", "At lunch"], correct: 2, hint: "เวลานอน" },
            { q: "When do you eat lunch?", a: ["Night", "Morning", "Noon / Afternoon", "Midnight"], correct: 2, hint: "กินข้าวเที่ยง" }
        ]
    },
    {
        id: 7, name: "My Free Time",
        vdoId: "Qk3KyMS36Jo",
        questions: [
            { q: "Do you play games? 🎮", a: ["I eat rice.", "Yes, I play games.", "I am a tree.", "Good night."], correct: 1, hint: "ถามว่าเล่นเกมไหม" },
            { q: "Do you watch TV? 📺", a: ["I sleep.", "Yes, I do.", "I run fast.", "I am a TV."], correct: 1, hint: "ดูทีวี" },
            { q: "Do you play football? ⚽", a: ["I am a bird.", "No, I am a fish.", "Yes / No", "I like milk."], correct: 2, hint: "ฟุตบอล" },
            { q: "Do you listen to music? 🎵", a: ["Cat", "Book", "Yes", "Table"], correct: 2, hint: "ฟังเพลง" },
            { q: "Do you read books? 📚", a: ["Dog", "Yes", "Apple", "Car"], correct: 1, hint: "อ่านหนังสือ" }
        ]
    },

    {
        id: 8, name: "Fill in the blank",
        vdoId: "p7AfQeVmukM",
        questions: [
            { q: "I ___ a boy.", a: ["is", "am", "are", "be"], correct: 1, hint: "I ใช้กับอะไร" },
            { q: "She ___ my mom.", a: ["am", "are", "is", "be"], correct: 2, hint: "She ใช้กับอะไร" },
            { q: "This is a ___ 🐶", a: ["cat", "book", "dog", "pen"], correct: 2, hint: "สุนัข" },
            { q: "We ___ friends.", a: ["is", "am", "are", "be"], correct: 2, hint: "We แปลว่าพวกเรา (หลายคน)" },
            { q: "I ___ happy. 😄", a: ["are", "is", "be", "am"], correct: 3, hint: "I ใช้กับอะไร" }
        ]
    },
    {
        id: 9, name: "ทายบุคคลดัง (Basic)",
        vdoId: "vFVvdJHiFAk",
        questions: [
            { q: "Who is he? (มนุษย์แมงมุม 🕷️)", a: ["Batman", "Spider-Man", "Superman", "Iron Man"], correct: 1, image: "ด่าน 9_ENG/SPIDERMAN.jpg", hint: "พ่นใยได้" },
            { q: "Who is he? (ไร้เทียมทาน)", a: ["Superman", "Homelander", "Invincible", "Batman"], correct: 2, image: "ด่าน 9_ENG/invincible.png", hint: "แข็งแกร่งแต่ยิงเลเซอร์ไม่ได้" },
            { q: "Who is he? (เร็วจัด)", a: ["Anna", "Flash", "A-Train", "Black Noir"], correct: 2, image: "ด่าน 9_ENG/A-Train.png", hint: "วิ่งเร็วสุดๆ" },
            { q: "Who is he? (ตัวตึง)", a: ["Homelander", "Superman", "Batman", "Omni-Man"], correct: 3, image: "ด่าน 9_ENG/omniman.png", hint: "แข็งแกร่ง" },
            { q: "Who is he? (หมอแปลก)", a: ["Harry Potter", "Doctor Strange", "Loki", "Thor"], correct: 1, image: "ด่าน 9_ENG/doctorstrange.png", hint: "ขี่ผ้าคลุม" },

            { q: "Who is he? (ชายแห่งความเงียบ)", a: ["Daredevil", "Batman", "Black Noir", "Deadpool"], correct: 2, image: "ด่าน 9_ENG/blacknoir.png", hint: "มืดมิด" },
            { q: "Who is he? (วัยรุ่นยกมือข้างเดียว)", a: ["King Arthur", "Julius Caesar", "King Baldwin", "Napoleon"], correct: 2, image: "ด่าน 9_ENG/kingbaldwin.png", hint: "นำทัพอย่างชาญฉลาด" },
            { q: "Who is he? (หมาป่าแดนเหนือ)", a: ["John Wick", "Harry Potter", "Iron Man", "John Snow"], correct: 3, image: "ด่าน 9_ENG/johnsnow.png", hint: "หมาป่าแห่งแดนเหนือ" },
            { q: "Who is he? (ประธานาธิบดีคนที่ 16 ของสหรัฐอเมริกา)", a: ["George Washington", "Abraham Lincoln", "Albert Einstein", "Thomas Edison"], correct: 1, image: "ด่าน 9_ENG/อับราฮัมลินคอล์น.png", hint: "ประธานาธิบดีคนที่ 16 ของสหรัฐอเมริกา" },
            { q: "Who is he? (ผู้นำชาวโรมัน)", a: ["Albert Einstein", "Napoleon", "Julius Caesar", "Michael Jackson"], correct: 2, image: "ด่าน 9_ENG/JuliusCaesar.png", hint: "ผู้นำผู้มีชื่อเสียงของโรมัน" }
        ]
    },
    {
        id: 10, name: "ทายเพลง English Songs (บอส)",
        vdoId: "fS9WNTlsQIE",
        isBoss: true, bossName: "Joffy Extreme",
        questions: [
            { q: "🎵 'doo doo doo doo doo doo' เพลงอะไร", audio: "เพลงสยองขวัญ/ssstik.io_1776440638309.mp3", autoplay: true, a: ["Let It Go", "Baby Shark", "ABC Song", "Happy Birthday"], correct: 1, bossSay: "ร้องเพลงแข่งกันไหม!", bundle: false },
            { q: "🎵 'Quack Quack Quack Quack' เพลงอะไร", audio: "เพลงสยองขวัญ/Five Little Ducks.mp3", autoplay: true, a: ["ABC Song", "Wheels on the Bus", "Five Little Ducks", "Twinkle Twinkle Little Star"], correct: 2, bossSay: "เสียงฉันเพราะกว่า!", bundle: false },
            { q: "🎵 'E I E I O' เพลงอะไร", audio: "เพลงสยองขวัญ/Old MacDonald Had A Farm.mp3", autoplay: true, a: ["Baby Shark", "Bingo", "Twinkle Twinkle Little Star", "Old MacDonald Had A Farm"], correct: 3, bossSay: "ร้องตามให้ทันล่ะ!", bundle: false },
            { q: "🎵 'Here I am, here I am' เพลงอะไร", audio: "เพลงสยองขวัญ/Finger Family.mp3", autoplay: true, a: ["Hello", "Baby Shark", "Finger Family", "ABC Song"], correct: 2, bossSay: "แปะๆ!", bundle: false },
            { q: "🎵 'Go round and round' เพลงอะไร", audio: "เพลงสยองขวัญ/Wheels on the Bus.mp3", autoplay: true, a: ["Shape of You", "Row Row Row Your Boat", "Wheels on the Bus", "Five Little Ducks"], correct: 2, bossSay: "อ๊ากก คอแห้ง!", bundle: false, transforms: true },

            { q: "🎵 'cookie from the cookie jar' เพลงอะไร", audio: "เพลงสยองขวัญ/Who Took The Cookie.mp3", autoplay: true, a: ["Let It Go", "Who Took The Cookie?", "Old MacDonald Had A Farm", "Baby Shark"], correct: 1, bossSay: "ฟ่อออ! ฉันเลื้อยมาแล้ว!", bundle: true },
            { q: "🎵 'clap clap clap clap your hands' เพลงอะไร", audio: "เพลงสยองขวัญ/Wag Your Tail.mp3", autoplay: true, a: ["Happy Birthday", "Wag Your Tail", "If You're Happy", "Hello Song"], correct: 1, bossSay: "หนาวไหมล่ะฟ่ออ!", bundle: true },
            { q: "🎵 'Good Morning Good Morning' เพลงอะไร", audio: "เพลงสยองขวัญ/Good Morning, Mr. Rooster.mp3", autoplay: true, a: ["Hello", "Good Morning, Mr. Rooster", "Baby Shark", "Baa Baa Black Sheep"], correct: 1, bossSay: "เป่าเค้กสิ!", bundle: true },
            { q: "🎵 'roll over! roll over!' เพลงอะไร", audio: "เพลงสยองขวัญ/Ten In The Bed.mp3", autoplay: true, a: ["Baby Shark", "Finger Family", "Ten In The Bed", "ABC Song"], correct: 2, bossSay: "เพลงวัยรุ่นก็มา!", bundle: true },
            { q: "🎵 'merrily merrily merrily merrily' เพลงอะไร", audio: "เพลงสยองขวัญ/Row Row Row Your Boat.mp3", autoplay: true, a: ["ABC Song", "Wheels on the Bus", "Happy Birthday", "Row Row Row Your Boat"], correct: 3, bossSay: "ยอมแล้วจ้าาา!", bundle: true }
        ]
    }
];
