const engQuizData = [
    {
        id: 1, name: "Self Introduction",
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
        questions: [
            { q: "Who is your father?", a: ["พ่อ", "แม่"], correct: 0, hint: "Father คือคุณพ่อ" },
            { q: "Who is your mother?", a: ["แม่", "พี่ชาย"], correct: 0, hint: "Mother คือคุณแม่" },
            { q: "Do you have a brother?", a: ["พี่ชาย/น้องชาย", "พี่สาว/น้องสาว"], correct: 0, hint: "Brother เป็นผู้ชาย" },
            { q: "Do you have a sister?", a: ["พี่สาว/น้องสาว", "พี่ชาย/น้องชาย"], correct: 0, hint: "Sister เป็นผู้หญิง" },
            { q: "Who is older, father or baby?", a: ["Father (พ่อ)", "Baby (เด็กทารก)"], correct: 0, hint: "Older แปลว่า แก่กว่า" }
        ]
    },
    { id: 3, name: "School", questions: [{ q: "What is this? 📖", a: ["Book", "Pen"], correct: 0, hint: "หนังสือ" }, { q: "What is this? 🖊️", a: ["Pen", "Bag"], correct: 0, hint: "ปากกา" }, { q: "Where do you study?", a: ["School", "Hospital"], correct: 0, hint: "โรงเรียน" }, { q: "Who teaches you?", a: ["Teacher", "Doctor"], correct: 0, hint: "คุณครู" }, { q: "What is this? 🎒", a: ["Bag", "Desk"], correct: 0, hint: "กระเป๋า" }] },
    { id: 4, name: "Food & Drink", questions: [{ q: "Do you like pizza? 🍕", a: ["Yes, I do.", "No, it is a dog."], correct: 0, hint: "ชอบไหม" }, { q: "What is this? 🍎", a: ["Apple", "Banana"], correct: 0, hint: "สีแดงๆ" }, { q: "What is this? 🥛", a: ["Milk", "Water"], correct: 0, hint: "นม" }, { q: "Is this a banana or orange? 🍌", a: ["Banana", "Orange"], correct: 0, hint: "สีเหลืองๆ" }, { q: "What is this? 🍚", a: ["Rice", "Bread"], correct: 0, hint: "ข้าว" }] },
    { id: 5, name: "Everyday English", questions: [{ q: "What color is this? 🔴", a: ["Red", "Blue"], correct: 0, hint: "สีแดง" }, { q: "What color is the sky? ☁️", a: ["Blue", "Green"], correct: 0, hint: "สีฟ้า" }, { q: "What is this? 🚗", a: ["Car", "Train"], correct: 0, hint: "รถยนต์" }, { q: "What is this? 🐶", a: ["Dog", "Cat"], correct: 0, hint: "สุนัข" }, { q: "How many fingers on one hand? 🖐️", a: ["Five (5)", "Ten (10)"], correct: 0, hint: "มือข้างเดียวมีกี่นิ้ว" }] },
    { id: 6, name: "Time", questions: [{ q: "What time is it? (7:00)", a: ["Seven o'clock", "Ten o'clock"], correct: 0, hint: "เลข 7" }, { q: "Morning or night? ☀️", a: ["Morning (เช้า)", "Night (กลางคืน)"], correct: 0, hint: "พระอาทิตย์ขึ้น" }, { q: "Morning or night? 🌙", a: ["Night (กลางคืน)", "Morning (เช้า)"], correct: 0, hint: "พระจันทร์ขึ้น" }, { q: "When do you sleep?", a: ["At night", "In the morning"], correct: 0, hint: "เวลานอน" }, { q: "When do you eat lunch?", a: ["Noon / Afternoon", "Night"], correct: 0, hint: "กินข้าวเที่ยง" }] },
    { id: 7, name: "My Free Time", questions: [{ q: "Do you play games? 🎮", a: ["Yes, I play games.", "I eat rice."], correct: 0, hint: "ถามว่าเล่นเกมไหม" }, { q: "Do you watch TV? 📺", a: ["Yes, I do.", "I sleep."], correct: 0, hint: "ดูทีวี" }, { q: "Do you play football? ⚽", a: ["Yes / No", "I am a bird."], correct: 0, hint: "ฟุตบอล" }, { q: "Do you listen to music? 🎵", a: ["Yes", "Cat"], correct: 0, hint: "ฟังเพลง" }, { q: "Do you read books? 📚", a: ["Yes", "Dog"], correct: 0, hint: "อ่านหนังสือ" }] },
    { id: 8, name: "Fill in the blank", questions: [{ q: "I ___ a boy.", a: ["am", "is"], correct: 0, hint: "I ใช้กับอะไร" }, { q: "She ___ my mom.", a: ["is", "are"], correct: 0, hint: "She ใช้กับอะไร" }, { q: "This is a ___ 🐶", a: ["dog", "cat"], correct: 0, hint: "สุนัข" }, { q: "We ___ friends.", a: ["are", "is"], correct: 0, hint: "We แปลว่าพวกเรา (หลายคน)" }, { q: "I ___ happy. 😄", a: ["am", "are"], correct: 0, hint: "I ใช้กับอะไร" }] },
    { id: 9, name: "ทายบุคคลดัง (Basic)", questions: [{ q: "Who is he? (มนุษย์แมงมุม 🕷️)", a: ["Spider-Man", "Batman"], correct: 0, hint: "พ่นใยได้" }, { q: "Who is he? (คนเหล็ก 🤖🔴)", a: ["Iron Man", "Superman"], correct: 0, hint: "ใส่ชุดเกราะสีแดง" }, { q: "Who is she? (เจ้าหญิงน้ำแข็ง ❄️)", a: ["Elsa", "Anna"], correct: 0, hint: "Let it go~" }, { q: "Who is he? (นักเตะหมายเลข 10 อาร์เจนติน่า ⚽)", a: ["Messi", "Ronaldo"], correct: 0, hint: "แชมป์โลก" }, { q: "Who is he? (พ่อมดน้อยมีแผลเป็น ⚡)", a: ["Harry Potter", "Mr. Bean"], correct: 0, hint: "ขี่ไม้กวาด" }] },
    {
        id: 10, name: "ทายเพลง English Songs (บอส)",
        isBoss: true, bossName: "Ego Boy (TJ Robert)",
        questions: [
            { q: "บอส Ego Boy: 🎵 'doo doo doo doo doo doo' เพลงอะไร", a: ["Baby Shark", "Let It Go"], correct: 0, bossSay: "ร้องเพลงแข่งกันไหม!", bundle: false },
            { q: "บอส Ego Boy: 🎵 'How I wonder what you are' เพลงอะไร", a: ["Twinkle Twinkle Little Star", "ABC Song"], correct: 0, bossSay: "เสียงฉันเพราะกว่า!", bundle: false },
            { q: "บอส Ego Boy: 🎵 'H I J K L M N O P' เพลงอะไร", a: ["ABC Song", "Baby Shark"], correct: 0, bossSay: "ร้องตามให้ทันล่ะ!", bundle: false },
            { q: "บอส Ego Boy: 🎵 'Clap your hands' เพลงอะไร", a: ["If You're Happy and You Know It", "Hello"], correct: 0, bossSay: "แปะๆ!", bundle: false },
            { q: "บอส Ego Boy: 🎵 'Go round and round' เพลงอะไร", a: ["Wheels on the Bus", "Shape of You"], correct: 0, bossSay: "อ๊ากก คอแห้ง!", bundle: false, transforms: true },
            { q: "บอสงู: 🎵 'E-I-E-I-O' เพลงอะไร", a: ["Old MacDonald Had a Farm", "Let It Go"], correct: 0, bossSay: "ฟ่อออ! ฉันเลื้อยมาแล้ว!", bundle: true },
            { q: "บอสงู: 🎵 'The cold never bothered me anyway' เพลงอะไร", a: ["Let It Go", "Happy Birthday"], correct: 0, bossSay: "หนาวไหมล่ะฟ่ออ!", bundle: true },
            { q: "บอสงู: 🎵 'To you... To you...' เพลงอะไร", a: ["Happy Birthday", "Hello"], correct: 0, bossSay: "เป่าเค้กสิ!", bundle: true },
            { q: "บอสงู: 🎵 'I'm in love with the shape of you' เพลงอะไร", a: ["Shape of You", "Baby Shark"], correct: 0, bossSay: "เพลงวัยรุ่นก็มา!", bundle: true },
            { q: "บอสงู: 🎵 'It's me...' เพลงอะไร", a: ["Hello", "ABC Song"], correct: 0, bossSay: "ยอมแล้วจ้าาา!", bundle: true }
        ]
    }
];