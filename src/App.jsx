import { useState, useEffect, useRef } from 'react'
import './App.css'

// Language data - you can easily add more languages here!
const languages = [
  { name: 'English', text: 'I Love You, DILU', flag: '🇬🇧' },
  { name: 'Spanish', text: 'Te Amo, DILU', flag: '🇪🇸' },
  { name: 'French', text: 'Je t\'aime, DILU', flag: '🇫🇷' },
  { name: 'Italian', text: 'Ti Amo, DILU', flag: '🇮🇹' },
  { name: 'German', text: 'Ich Liebe Dich, DILU', flag: '🇩🇪' },
  { name: 'Portuguese', text: 'Eu Te Amo, DILU', flag: '🇵🇹' },
  { name: 'Russian', text: 'Я Тебя Люблю, ДИЛУ', flag: '🇷🇺' },
  { name: 'Japanese', text: '愛してる、ディル', flag: '🇯🇵' },
  { name: 'Chinese (Mandarin)', text: '我爱你，迪鲁', flag: '🇨🇳' },
  { name: 'Korean', text: '사랑해, 디루', flag: '🇰🇷' },
  { name: 'Arabic', text: 'أنا أحبك، ديلو', flag: '🇸🇦' },
  { name: 'Hindi', text: 'मैं तुमसे प्यार करता हूँ, डिलू', flag: '🇮🇳' },
  { name: 'Dutch', text: 'Ik Hou Van Je, DILU', flag: '🇳🇱' },
  { name: 'Greek', text: 'Σ\'αγαπώ, DILU', flag: '🇬🇷' },
  { name: 'Turkish', text: 'Seni Seviyorum, DILU', flag: '🇹🇷' },
  { name: 'Polish', text: 'Kocham Cię, DILU', flag: '🇵🇱' },
  { name: 'Swedish', text: 'Jag Älskar Dig, DILU', flag: '🇸🇪' },
  { name: 'Norwegian', text: 'Jeg Elsker Deg, DILU', flag: '🇳🇴' },
  { name: 'Danish', text: 'Jeg Elsker Dig, DILU', flag: '🇩🇰' },
  { name: 'Finnish', text: 'Minä Rakastan Sinua, DILU', flag: '🇫🇮' },
  { name: 'Czech', text: 'Miluji Tě, DILU', flag: '🇨🇿' },
  { name: 'Romanian', text: 'Te Iubesc, DILU', flag: '🇷🇴' },
  { name: 'Hungarian', text: 'Szeretlek, DILU', flag: '🇭🇺' },
  { name: 'Thai', text: 'ฉันรักคุณ, DILU', flag: '🇹🇭' },
  { name: 'Vietnamese', text: 'Anh Yêu Em, DILU', flag: '🇻🇳' },
  { name: 'Indonesian', text: 'Aku Cinta Kamu, DILU', flag: '🇮🇩' },
  { name: 'Hebrew', text: 'אני אוהב אותך, DILU', flag: '🇮🇱' },
  { name: 'Swahili', text: 'Nakupenda, DILU', flag: '🇰🇪' },
  { name: 'Tagalog', text: 'Mahal Kita, DILU', flag: '🇵🇭' },
  { name: 'Ukrainian', text: 'Я Тебе Кохую, ДИЛУ', flag: '🇺🇦' },
  { name: 'Bulgarian', text: 'Обичам Те, ДИЛУ', flag: '🇧🇬' },
  { name: 'Croatian', text: 'Volim Te, DILU', flag: '🇭🇷' },
  { name: 'Serbian', text: 'Волим Те, ДИЛУ', flag: '🇷🇸' },
  { name: 'Slovak', text: 'Ľúbim Ťa, DILU', flag: '🇸🇰' },
  { name: 'Slovenian', text: 'Ljubim Te, DILU', flag: '🇸🇮' },
  { name: 'Estonian', text: 'Ma Armastan Sind, DILU', flag: '🇪🇪' },
  { name: 'Latvian', text: 'Es Tevi Mīlu, DILU', flag: '🇱🇻' },
  { name: 'Lithuanian', text: 'Aš Tave Myliu, DILU', flag: '🇱🇹' },
  { name: 'Icelandic', text: 'Ég Elska Þig, DILU', flag: '🇮🇸' },
  { name: 'Irish', text: 'Is Breá Liom Tú, DILU', flag: '🇮🇪' },
  { name: 'Welsh', text: 'Rwy\'n Dy Garu Di, DILU', flag: '🇬🇧' },
  { name: 'Catalan', text: 'T\'Estimo, DILU', flag: '🇪🇸' },
  { name: 'Basque', text: 'Maite Zaitut, DILU', flag: '🇪🇸' },
  { name: 'Malay', text: 'Saya Cinta Awak, DILU', flag: '🇲🇾' },
  { name: 'Bengali', text: 'আমি তোমাকে ভালোবাসি, ডিলু', flag: '🇧🇩' },
  { name: 'Tamil', text: 'நான் உன்னை காதலிக்கிறேன், டிலு', flag: '🇮🇳' },
  { name: 'Telugu', text: 'నేను నిన్ను ప్రేమిస్తున్నాను, డిలు', flag: '🇮🇳' },
  { name: 'Marathi', text: 'मी तुझ्यावर प्रेम करतो, डिलू', flag: '🇮🇳' },
  { name: 'Gujarati', text: 'હું તને પ્રેમ કરું છું, ડિલુ', flag: '🇮🇳' },
  { name: 'Punjabi', text: 'ਮੈਂ ਤੁਹਾਨੂੰ ਪਿਆਰ ਕਰਦਾ ਹਾਂ, ਡਿਲੂ', flag: '🇮🇳' },
  { name: 'Kannada', text: 'ನಾನು ನಿನ್ನನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ, ಡಿಲು', flag: '🇮🇳' },
  { name: 'Malayalam', text: 'ഞാൻ നിന്നെ സ്നേഹിക്കുന്നു, ഡിലു', flag: '🇮🇳' },
  { name: 'Nepali', text: 'म तिमीलाई माया गर्छु, डिलू', flag: '🇳🇵' },
  { name: 'Sinhala', text: 'මම ඔයාට ආදරෙයි, ඩිලු', flag: '🇱🇰' },
  { name: 'Persian', text: 'دوستت دارم، دیلو', flag: '🇮🇷' },
  { name: 'Urdu', text: 'میں تم سے پیار کرتا ہوں، ڈیلو', flag: '🇵🇰' },
  { name: 'Afrikaans', text: 'Ek Het Jou Lief, DILU', flag: '🇿🇦' },
  { name: 'Zulu', text: 'Ngiyakuthanda, DILU', flag: '🇿🇦' },
  { name: 'Xhosa', text: 'Ndiyakuthanda, DILU', flag: '🇿🇦' },
  { name: 'Amharic', text: 'እወድሻለሁ, DILU', flag: '🇪🇹' },
  { name: 'Georgian', text: 'მიყვარხარ, DILU', flag: '🇬🇪' },
  { name: 'Armenian', text: 'Ես քեզ սիրում եմ, DILU', flag: '🇦🇲' },
  { name: 'Azerbaijani', text: 'Səni Sevirəm, DILU', flag: '🇦🇿' },
  { name: 'Kazakh', text: 'Мен Сені Жақсы Көремін, ДИЛУ', flag: '🇰🇿' },
  { name: 'Mongolian', text: 'Би Чамд Хайртай, ДИЛУ', flag: '🇲🇳' },
  { name: 'Burmese', text: 'ငါမင်းကိုချစ်တယ်, DILU', flag: '🇲🇲' },
  { name: 'Khmer', text: 'ខ្ញុំស្រលាញ់អ្នក, DILU', flag: '🇰🇭' },
  { name: 'Lao', text: 'ຂ້ອຍຮັກເຈົ້າ, DILU', flag: '🇱🇦' },
  { name: 'Maltese', text: 'Inħobbok, DILU', flag: '🇲🇹' },
  { name: 'Albanian', text: 'Të Dua, DILU', flag: '🇦🇱' },
  { name: 'Macedonian', text: 'Те Сакам, ДИЛУ', flag: '🇲🇰' },
  { name: 'Bosnian', text: 'Volim Te, DILU', flag: '🇧🇦' },
  { name: 'Belarusian', text: 'Я Цябе Кахаю, ДИЛУ', flag: '🇧🇾' },
  { name: 'Moldovan', text: 'Te Iubesc, DILU', flag: '🇲🇩' },
  { name: 'Luxembourgish', text: 'Ech Hunn Dech Gär, DILU', flag: '🇱🇺' },
  { name: 'Faroese', text: 'Eg Elski Teg, DILU', flag: '🇫🇴' },
  { name: 'Galician', text: 'Quérote, DILU', flag: '🇪🇸' },
  { name: 'Sardinian', text: 'Ti Amo, DILU', flag: '🇮🇹' },
  { name: 'Corsican', text: 'Ti Tengu Caru, DILU', flag: '🇫🇷' },
  { name: 'Breton', text: 'Da Garout A Ran, DILU', flag: '🇫🇷' },
  { name: 'Scots Gaelic', text: 'Tha Gràdh Agam Ort, DILU', flag: '🇬🇧' },
  { name: 'Hawaiian', text: 'Aloha Au Iā \'Oe, DILU', flag: '🇺🇸' },
  { name: 'Maori', text: 'Aroha Ahau Ki A Koe, DILU', flag: '🇳🇿' },
  { name: 'Samoan', text: 'Ou Te Alofa Ia Te Oe, DILU', flag: '🇼🇸' },
  { name: 'Tongan', text: '\'Oku Ou \'Ofa Kiate Koe, DILU', flag: '🇹🇴' },
  { name: 'Fijian', text: 'Au Lomani Iko, DILU', flag: '🇫🇯' },
  { name: 'Esperanto', text: 'Mi Amas Vin, DILU', flag: '🌍' },
  { name: 'Latin', text: 'Te Amo, DILU', flag: '🏛️' },
  { name: 'Klingon', text: 'qamuSHa\', DILU', flag: '🖖' },
  { name: 'Abkhazian', text: 'Бзиа узбоит, ДИЛУ', flag: '🇦🇲' },
  { name: 'Acehnese', text: 'Lon Sayang keu Gata, DILU', flag: '🇮🇩' },
  {name:'Acoli',text:'Amari, DILU',flag:'🇺🇬'},
  {name:'Afar',text:'Anu Koo Kiciyyoh, DILU',flag:'🇪🇷'},
  {name:'Akan',text:'Ma Wo Wo, DILU',flag:'🇬🇭'},
  {name:'Assamese',text:'Tomar Ma Tomar, DILU',flag:'🇮🇳'},
  { name: 'Yoruba', text: 'Mo Nifẹ Rẹ, DILU', flag: '🇳🇬' },
  { name: 'Igbo', text: 'A Hụrụ M Gị N\'anya, DILU', flag: '🇳🇬' },
  { name: 'Hausa', text: 'Ina Son Ki, DILU', flag: '🇳🇬' },
  { name: 'Somali', text: 'Waan Ku Jeclahay, DILU', flag: '🇸🇴' },
  { name: 'Oromo', text: 'Sin Jaaladha, DILU', flag: '🇪🇹' },
  { name: 'Tigrinya', text: 'የፍቅረኝ, DILU', flag: '🇪🇷' },
  { name: 'Wolof', text: 'Nopnala, DILU', flag: '🇸🇳' },
  { name: 'Fulani', text: 'Mi Hɗa Yidma, DILU', flag: '🇬🇳' },
  { name: 'Kinyarwanda', text: 'Ndagukunda, DILU', flag: '🇷🇼' },
  { name: 'Luganda', text: 'Nkwagala, DILU', flag: '🇺🇬' },
  { name: 'Kiswahili', text: 'Nakupenda, DILU', flag: '🇹🇿' },
  { name: 'Malagasy', text: 'Tiako Ianao, DILU', flag: '🇲🇬' },
  { name: 'Sesotho', text: 'Ke A Rata, DILU', flag: '🇱🇸' },
  { name: 'Setswana', text: 'Ke A Go Rata, DILU', flag: '🇧🇼' },
  { name: 'Cherokee', text: 'ᎬᎨᏳᎯ, DILU', flag: '🇺🇸' },
  { name: 'Navajo', text: 'Ayóó Ánííníshní, DILU', flag: '🇺🇸' },
  { name: 'Quechua', text: 'Kuyayki, DILU', flag: '🇵🇪' },
  { name: 'Guarani', text: 'Rohayhu, DILU', flag: '🇵🇾' },
  { name: 'Inuktitut', text: 'Nagligivagit, DILU', flag: '🇨🇦' },
  { name: 'Cree', text: 'Kisâkihitin, DILU', flag: '🇨🇦' },
  { name: 'Greenlandic', text: 'Asavakkit, DILU', flag: '🇬🇱' },
  { name: 'Basque', text: 'Maite Zaitut, DILU', flag: '🇪🇸' },
  { name: 'Catalan', text: 'T\'Estimo, DILU', flag: '🇪🇸' },
  { name: 'Galician', text: 'Quérote, DILU', flag: '🇪🇸' },
  { name: 'Welsh', text: 'Rwy\'n Dy Garu Di, DILU', flag: '🇬🇧' },
  { name: 'Irish', text: 'Is Breá Liom Tú, DILU', flag: '🇮🇪' },
  { name: 'Scottish Gaelic', text: 'Tha Gràdh Agam Ort, DILU', flag: '🇬🇧' },
  { name: 'Breton', text: 'Da Garout A Ran, DILU', flag: '🇫🇷' },
  { name: 'Corsican', text: 'Ti Tengu Caru, DILU', flag: '🇫🇷' },
  { name: 'Sardinian', text: 'Ti Amo, DILU', flag: '🇮🇹' },
  { name: 'Frisian', text: 'Ik Hâld Fan Dy, DILU', flag: '🇳🇱' },
  { name: 'Luxembourgish', text: 'DILU, Ech Hunn Dech Gär', flag: '🇱🇺' },
  { name: 'Maltese', text: 'DILU, Inħobbok', flag: '🇲🇹' },
  { name: 'Icelandic', text: 'DILU, Ég Elska Þig', flag: '🇮🇸' },
  { name: 'Faroese', text: 'DILU, Eg Elski Teg', flag: '🇫🇴' },
  { name: 'Albanian', text: 'DILU, Të Dua', flag: '🇦🇱' },
  { name: 'Macedonian', text: 'DILU, Те Сакам', flag: '🇲🇰' },
  { name: 'Bosnian', text: 'DILU, Volim Te', flag: '🇧🇦' },
  { name: 'Belarusian', text: 'DILU, Я Цябе Кахаю', flag: '🇧🇾' },
  { name: 'Moldovan', text: 'DILU, Te Iubesc', flag: '🇲🇩' },
  { name: 'Kazakh', text: 'DILU, Мен Сені Жақсы Көремін', flag: '🇰🇿' },
  { name: 'Kyrgyz', text: 'Мен Сени Сүйөм, ДИЛУ', flag: '🇰🇬' },
  { name: 'Uzbek', text: 'Men Seni Sevaman, DILU', flag: '🇺🇿' },
  { name: 'Tajik', text: 'Ман Туро Дӯст Медорам, ДИЛУ', flag: '🇹🇯' },
  { name: 'Turkmen', text: 'Men Seni Söýýärin, DILU', flag: '🇹🇲' },
  { name: 'Mongolian', text: 'Би Чамд Хайртай, ДИЛУ', flag: '🇲🇳' },
  { name: 'Tibetan', text: 'ང་ཁྱེད་རང་ལ་དགའ་པོ་ཡོད, DILU', flag: '🇨🇳' },
  { name: 'Uyghur', text: 'مەن سىزنى سۆيىمەن, DILU', flag: '🇨🇳' },
  { name: 'Cantonese', text: '我愛你，DILU', flag: '🇭🇰' },
  { name: 'Hakka', text: '我愛你，DILU', flag: '🇨🇳' },
  { name: 'Hokkien', text: '我愛你，DILU', flag: '🇹🇼' },
  { name: 'Wu Chinese', text: '我愛儂，DILU', flag: '🇨🇳' },
  { name: 'Javanese', text: 'Aku Tresna Marang Kowe, DILU', flag: '🇮🇩' },
  { name: 'Sundanese', text: 'Abdi Bogoh Ka Anjeun, DILU', flag: '🇮🇩' },
  { name: 'Balinese', text: 'Tiang Tresna Ring Rau, DILU', flag: '🇮🇩' },
  { name: 'Minangkabau', text: 'Ameh Cinto Ka Kawan, DILU', flag: '🇮🇩' },
  { name: 'Cebuano', text: 'Gihigugma Tika, DILU', flag: '🇵🇭' },
  { name: 'Ilocano', text: 'Ay-ayaten Ka, DILU', flag: '🇵🇭' },
  { name: 'Kapampangan', text: 'Kaluguran Da Ka, DILU', flag: '🇵🇭' },
  { name: 'Waray', text: 'Hinihigugma Ko Ikaw, DILU', flag: '🇵🇭' },
  { name: 'Bicolano', text: 'Namumutan Ta Ka, DILU', flag: '🇵🇭' },
  { name: 'Pangasinan', text: 'Inararo Taka, DILU', flag: '🇵🇭' },
  { name: 'Hiligaynon', text: 'Palangga Ko Ikaw, DILU', flag: '🇵🇭' },
  { name: 'Chavacano', text: 'Ta Ama Yo Contigo, DILU', flag: '🇵🇭' },
  { name: 'Lao', text: 'DILU, ຂ້ອຍຮັກເຈົ້າ', flag: '🇱🇦' },
  { name: 'Khmer', text: 'DILU, ខ្ញុំស្រលាញ់អ្នក', flag: '🇰🇭' },
  { name: 'Burmese', text: 'DILU, ငါမင်းကိုချစ်တယ်', flag: '🇲🇲' },
  { name: 'Sinhala', text: 'DILU, මම ඔයාට ආදරෙයි', flag: '🇱🇰' },
  { name: 'Nepali', text: 'DILU, म तिमीलाई माया गर्छु', flag: '🇳🇵' },
  { name: 'Bengali', text: 'আমি তোমাকে ভালোবাসি, ডিলু', flag: '🇧🇩' },
  { name: 'Tamil', text: 'நான் உன்னை காதலிக்கிறேன், டிலு', flag: '🇮🇳' },
  { name: 'Telugu', text: 'నేను నిన్ను ప్రేమిస్తున్నాను, డిలు', flag: '🇮🇳' },
  { name: 'Marathi', text: 'मी तुझ्यावर प्रेम करतो, डिलू', flag: '🇮🇳' },
  { name: 'Gujarati', text: 'હું તને પ્રેમ કરું છું, ડિલુ', flag: '🇮🇳' },
  { name: 'Punjabi', text: 'ਮੈਂ ਤੁਹਾਨੂੰ ਪਿਆਰ ਕਰਦਾ ਹਾਂ, ਡਿਲੂ', flag: '🇮🇳' },
  { name: 'Kannada', text: 'ನಾನು ನಿನ್ನನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ, ಡಿಲು', flag: '🇮🇳' },
  { name: 'Malayalam', text: 'ഞാൻ നിന്നെ സ്നേഹിക്കുന്നു, ഡിലു', flag: '🇮🇳' },
  { name: 'Odia', text: 'ମୁଁ ତୁମକୁ ଭଲ ପାଏ, DILU', flag: '🇮🇳' },
  { name: 'Kashmiri', text: 'मे छु तोह्य हित, DILU', flag: '🇮🇳' },
  { name: 'Sindhi', text: 'مان توکي پيار ڪيان ٿو, DILU', flag: '🇵🇰' },
  { name: 'Pashto', text: 'زه تا سره مینه لرم, DILU', flag: '🇦🇫' },
  { name: 'Dari', text: 'من تور سره مینه لرم, DILU', flag: '🇦🇫' },
  { name: 'Kurdish', text: 'Ez Ji Te Hez Dikim, DILU', flag: '🇮🇶' },
  { name: 'Azerbaijani', text: 'DILU, Səni Sevirəm', flag: '🇦🇿' },
  { name: 'Georgian', text: 'DILU, მიყვარხარ', flag: '🇬🇪' },
  { name: 'Armenian', text: 'DILU, Ես քեզ սիրում եմ', flag: '🇦🇲' },
  { name: 'Xhosa', text: 'DILU, Ndiyakuthanda', flag: '🇿🇦' },
  { name: 'Zulu', text: 'DILU, Ngiyakuthanda', flag: '🇿🇦' },
  { name: 'Afrikaans', text: 'DILU, Ek Het Jou Lief', flag: '🇿🇦' },
  { name: 'Aymara', text: 'Munasqayki, DILU', flag: '🇧🇴' },
  { name: 'Mapudungun', text: 'Inche Ngey Mülen, DILU', flag: '🇨🇱' },
  { name: 'Ojibwe', text: 'Gizhawenimin, DILU', flag: '🇨🇦' },
  { name: 'Tahitian', text: 'Ua Here Vau Ia Oe, DILU', flag: '🇵🇫' },
  { name: 'Chamorro', text: 'Hu Guaiya Hao, DILU', flag: '🇬🇺' },
  { name: 'Marshallese', text: 'Yokwe Yuk, DILU', flag: '🇲🇭' },
  { name: 'Palauan', text: 'Ng Diak Kngerang, DILU', flag: '🇵🇼' },
  { name: 'Interlingua', text: 'Io Te Ama, DILU', flag: '🌍' },
  { name: 'Ido', text: 'Me Amoras Tu, DILU', flag: '🌍' },
  { name: 'Volapük', text: 'Löfob Oli, DILU', flag: '🌍' },
  { name: 'Ancient Greek', text: 'Σε Αγαπώ, DILU', flag: '🏛️' },
  { name: 'Elvish (Sindarin)', text: 'Gi Melin, DILU', flag: '🧝' },
  { name: 'Elvish (Quenya)', text: 'Melinyel, DILU', flag: '🧝' },

]

// Language code mapping for speech synthesis
const languageCodes = {
  'English': 'en-US',
  'Spanish': 'es-ES',
  'French': 'fr-FR',
  'Italian': 'it-IT',
  'German': 'de-DE',
  'Portuguese': 'pt-PT',
  'Russian': 'ru-RU',
  'Japanese': 'ja-JP',
  'Chinese (Mandarin)': 'zh-CN',
  'Korean': 'ko-KR',
  'Arabic': 'ar-SA',
  'Hindi': 'hi-IN',
  'Dutch': 'nl-NL',
  'Greek': 'el-GR',
  'Turkish': 'tr-TR',
  'Polish': 'pl-PL',
  'Swedish': 'sv-SE',
  'Norwegian': 'nb-NO',
  'Danish': 'da-DK',
  'Finnish': 'fi-FI',
  'Czech': 'cs-CZ',
  'Romanian': 'ro-RO',
  'Hungarian': 'hu-HU',
  'Thai': 'th-TH',
  'Vietnamese': 'vi-VN',
  'Indonesian': 'id-ID',
  'Hebrew': 'he-IL',
  'Swahili': 'sw-KE',
  'Tagalog': 'tl-PH',
  'Ukrainian': 'uk-UA',
  'Bulgarian': 'bg-BG',
  'Croatian': 'hr-HR',
  'Serbian': 'sr-RS',
  'Slovak': 'sk-SK',
  'Slovenian': 'sl-SI',
  'Estonian': 'et-EE',
  'Latvian': 'lv-LV',
  'Lithuanian': 'lt-LT',
  'Icelandic': 'is-IS',
  'Irish': 'ga-IE',
  'Welsh': 'cy-GB',
  'Catalan': 'ca-ES',
  'Basque': 'eu-ES',
  'Malay': 'ms-MY',
  'Bengali': 'bn-BD',
  'Tamil': 'ta-IN',
  'Telugu': 'te-IN',
  'Marathi': 'mr-IN',
  'Gujarati': 'gu-IN',
  'Punjabi': 'pa-IN',
  'Kannada': 'kn-IN',
  'Malayalam': 'ml-IN',
  'Nepali': 'ne-NP',
  'Sinhala': 'si-LK',
  'Persian': 'fa-IR',
  'Urdu': 'ur-PK',
  'Afrikaans': 'af-ZA',
  'Zulu': 'zu-ZA',
  'Xhosa': 'xh-ZA',
  'Amharic': 'am-ET',
  'Georgian': 'ka-GE',
  'Armenian': 'hy-AM',
  'Azerbaijani': 'az-AZ',
  'Kazakh': 'kk-KZ',
  'Mongolian': 'mn-MN',
  'Burmese': 'my-MM',
  'Khmer': 'km-KH',
  'Lao': 'lo-LA',
  'Maltese': 'mt-MT',
  'Albanian': 'sq-AL',
  'Macedonian': 'mk-MK',
  'Bosnian': 'bs-BA',
  'Belarusian': 'be-BY',
  'Moldovan': 'ro-MD',
  'Luxembourgish': 'lb-LU',
  'Faroese': 'fo-FO',
  'Galician': 'gl-ES',
  'Sardinian': 'sc-IT',
  'Corsican': 'co-FR',
  'Breton': 'br-FR',
  'Scots Gaelic': 'gd-GB',
  'Hawaiian': 'haw-US',
  'Maori': 'mi-NZ',
  'Samoan': 'sm-WS',
  'Tongan': 'to-TO',
  'Fijian': 'fj-FJ',
  'Esperanto': 'eo',
  'Latin': 'la',
  'Klingon': 'tlh',
  'Cantonese': 'zh-HK',
  'Hakka': 'zh-CN',
  'Hokkien': 'zh-TW',
  'Wu Chinese': 'zh-CN',
  'Javanese': 'jv-ID',
  'Sundanese': 'su-ID',
  'Balinese': 'ban-ID',
  'Minangkabau': 'min-ID',
  'Cebuano': 'ceb-PH',
  'Ilocano': 'ilo-PH',
  'Kapampangan': 'pam-PH',
  'Waray': 'war-PH',
  'Bicolano': 'bcl-PH',
  'Pangasinan': 'pag-PH',
  'Hiligaynon': 'hil-PH',
  'Chavacano': 'cbk-PH',
  'Odia': 'or-IN',
  'Kashmiri': 'ks-IN',
  'Sindhi': 'sd-PK',
  'Pashto': 'ps-AF',
  'Dari': 'prs-AF',
  'Kurdish': 'ku',
  'Aymara': 'ay-BO',
  'Mapudungun': 'arn-CL',
  'Ojibwe': 'oj-CA',
  'Tahitian': 'ty-PF',
  'Chamorro': 'ch-GU',
  'Marshallese': 'mh-MH',
  'Palauan': 'pau-PW',
  'Interlingua': 'ia',
  'Ido': 'io',
  'Volapük': 'vo',
  'Ancient Greek': 'grc',
  'Elvish (Sindarin)': 'en-US',
  'Elvish (Quenya)': 'en-US',
  'Abkhazian': 'ab-GE',
  'Acehnese': 'ace-ID',
  'Acoli': 'ach-UG',
  'Afar': 'aa-ER',
  'Akan': 'ak-GH',
  'Assamese': 'as-IN',
  'Yoruba': 'yo-NG',
  'Igbo': 'ig-NG',
  'Hausa': 'ha-NG',
  'Somali': 'so-SO',
  'Oromo': 'om-ET',
  'Tigrinya': 'ti-ER',
  'Wolof': 'wo-SN',
  'Fulani': 'ff-GN',
  'Kinyarwanda': 'rw-RW',
  'Luganda': 'lg-UG',
  'Kiswahili': 'sw-KE',
  'Malagasy': 'mg-MG',
  'Sesotho': 'st-LS',
  'Setswana': 'tn-BW',
  'Cherokee': 'chr-US',
  'Navajo': 'nv-US',
  'Quechua': 'qu-PE',
  'Guarani': 'gn-PY',
  'Inuktitut': 'iu-CA',
  'Cree': 'cr-CA',
  'Greenlandic': 'kl-GL',
  'Tibetan': 'bo-CN',
  'Uyghur': 'ug-CN',
  'Scottish Gaelic': 'gd-GB',
  'Frisian': 'fy-NL',
}

// Text-to-speech function (updated to accept setSpeakingCard)
const createSpeakFunction = (setSpeakingCard) => {
  return (text, languageName, cardIndex) => {
    // Check if browser supports speech synthesis
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in your browser. Please try a modern browser like Chrome, Edge, or Safari.')
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()
    setSpeakingCard(null)

    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(text)
    
    // Set language code
    const langCode = languageCodes[languageName] || 'en-US'
    utterance.lang = langCode

    // Function to find male voice - more aggressive approach
    const findMaleVoice = (voices, langCode) => {
      // First, try to find voices matching the language
      const langPrefix = langCode.split('-')[0]
      let langVoices = voices.filter(voice => 
        voice.lang.startsWith(langPrefix) || 
        voice.lang === langCode ||
        voice.lang.split('-')[0] === langPrefix
      )

      // If no language-specific voices, try broader search
      if (langVoices.length === 0) {
        langVoices = voices.filter(voice => 
          voice.lang.includes(langPrefix)
        )
      }

      // Female voice indicators to exclude (expanded list)
      const femaleIndicators = [
        'female', 'woman', 'woman\'s', 'women', 'girl', 'samantha', 
        'susan', 'karen', 'kate', 'victoria', 'zira', 'helen', 'hazel',
        'tessa', 'veena', 'lekha', 'maria', 'linda', 'lisa', 'nancy',
        'sarah', 'anna', 'elena', 'yuna', 'yumi', 'mei', 'sinji', 'xiaoyan',
        'xiaoxiao', 'xiaoyi', 'yating', 'zhiwei', 'zhiyu', 'xiaoxuan',
        'marisol', 'soledad', 'monica', 'paulina', 'damaris', 'katya',
        'milena', 'alice', 'fiona', 'jill', 'samantha', 'tessa', 'veena',
        'zira', 'helen', 'hazel', 'susan', 'karen', 'kate', 'victoria',
        'aurelie', 'audrey', 'amelie', 'thomas', 'thomas enhanced', 'samantha',
        'samantha premium', 'samantha compact', 'samantha premium', 'samantha',
        'siri', 'siri female', 'google uk english female', 'google us english female',
        'google australian english female', 'google indian english female',
        'microsoft zira', 'microsoft hazel', 'microsoft helen', 'microsoft heera',
        'microsoft kalpana', 'microsoft heera', 'microsoft heera', 'microsoft heera',
        'microsoft heera', 'microsoft heera', 'microsoft heera', 'microsoft heera'
      ]

      // Male voice indicators to prioritize (expanded list)
      const maleIndicators = [
        'male', 'man', 'men', 'boy', 'david', 'james', 'john', 'thomas',
        'daniel', 'mark', 'paul', 'steven', 'stephen', 'miguel', 'carlos',
        'juan', 'pablo', 'diego', 'pierre', 'jean', 'antoine', 'marco',
        'giovanni', 'luca', 'alessandro', 'hans', 'klaus', 'thomas',
        'igor', 'ivan', 'dmitri', 'alexei', 'yuki', 'kenji', 'takeshi',
        'wei', 'ming', 'chen', 'li', 'seung', 'min', 'joon', 'ahmed',
        'mohammed', 'ali', 'omar', 'raj', 'vikram', 'arjun', 'rahul',
        'tom', 'alex', 'mike', 'chris', 'brian', 'kevin', 'ryan',
        'jose', 'luis', 'antonio', 'manuel', 'francois', 'philippe',
        'andreas', 'wolfgang', 'jan', 'piotr', 'tomasz', 'jakub',
        'nikolai', 'sergei', 'vladimir', 'yuri', 'alexander', 'michael',
        'robert', 'william', 'richard', 'joseph', 'charles', 'george',
        'frank', 'harold', 'raymond', 'roger', 'lawrence', 'wayne',
        'roy', 'ralph', 'eugene', 'arthur', 'louis', 'jerry', 'henry',
        'microsoft david', 'microsoft mark', 'google uk english male',
        'google us english male', 'google australian english male',
        'google indian english male', 'siri male', 'siri male voice',
        'alex', 'bruce', 'fred', 'junior', 'ralph', 'reed', 'robin',
        'albert', 'bad news', 'bahh', 'boing', 'bubbles', 'cellos',
        'deranged', 'good news', 'hysterical', 'pipe organ', 'trinoids',
        'whisper', 'zarvox', 'lee', 'tian-tian', 'ting-ting', 'sin-ji',
        'yuna', 'yuna', 'kyoko', 'kyoko', 'kyoko', 'kyoko', 'kyoko'
      ]

      // Filter out female voices first - very aggressive
      const nonFemaleVoices = langVoices.filter(voice => {
        const name = voice.name.toLowerCase()
        // Check if voice has gender property (some browsers support this)
        if (voice.gender === 'female' || voice.gender === 'F' || voice.gender === 'Female') {
          return false
        }
        // Check name for female indicators
        const isFemale = femaleIndicators.some(indicator => name.includes(indicator))
        return !isFemale
      })

      // Look for explicitly male voices (check gender property first)
      const maleVoices = nonFemaleVoices.filter(voice => {
        // First check gender property if available
        if (voice.gender === 'male' || voice.gender === 'M' || voice.gender === 'Male') {
          return true
        }
        // Then check name for male indicators
        const name = voice.name.toLowerCase()
        return maleIndicators.some(indicator => name.includes(indicator))
      })

      // If we found male voices, use the first one
      if (maleVoices.length > 0) {
        return maleVoices[0]
      }

      // If no explicitly male voice but we have non-female voices, use those
      if (nonFemaleVoices.length > 0) {
        return nonFemaleVoices[0]
      }

      // If no language-specific voices, try to find ANY male voice in the system
      const allMaleVoices = voices.filter(voice => {
        const name = voice.name.toLowerCase()
        if (voice.gender === 'male' || voice.gender === 'M' || voice.gender === 'Male') {
          return true
        }
        if (voice.gender === 'female' || voice.gender === 'F' || voice.gender === 'Female') {
          return false
        }
        const isFemale = femaleIndicators.some(indicator => name.includes(indicator))
        const isMale = maleIndicators.some(indicator => name.includes(indicator))
        return !isFemale && (isMale || !name.includes('female'))
      })

      if (allMaleVoices.length > 0) {
        // Prefer English male voices as fallback
        const englishMale = allMaleVoices.find(v => v.lang.startsWith('en'))
        if (englishMale) return englishMale
        return allMaleVoices[0]
      }

      // Last resort: use any voice for that language (but we'll lower the pitch)
      if (langVoices.length > 0) {
        return langVoices[0]
      }

      // Final fallback: any non-female voice
      const anyNonFemale = voices.find(voice => {
        const name = voice.name.toLowerCase()
        if (voice.gender === 'female' || voice.gender === 'F') return false
        return !femaleIndicators.some(indicator => name.includes(indicator))
      })
      
      return anyNonFemale || null
    }

    // Get voices
    const getVoices = () => {
      return new Promise((resolve) => {
        let voices = window.speechSynthesis.getVoices()
        if (voices.length > 0) {
          resolve(voices)
        } else {
          window.speechSynthesis.onvoiceschanged = () => {
            voices = window.speechSynthesis.getVoices()
            resolve(voices)
          }
          // Fallback timeout
          setTimeout(() => resolve(voices), 1000)
        }
      })
    }

    // Set up speech
    getVoices().then(voices => {
      if (voices.length === 0) {
        console.warn('No voices available')
        setSpeakingCard(null)
        return
      }

      const selectedVoice = findMaleVoice(voices, langCode)
      
      // Log for debugging
      console.log(`Language: ${languageName}, Code: ${langCode}, Selected Voice:`, selectedVoice?.name || 'None')
      
      if (selectedVoice) {
        utterance.voice = selectedVoice
        utterance.lang = selectedVoice.lang // Use the voice's native language
      } else {
        // If no voice found, still try with the language code
        utterance.lang = langCode
        console.warn(`No voice found for ${languageName} (${langCode}), using default`)
      }

      // Set voice properties for better quality and masculine sound
      utterance.rate = 0.85 // Slightly slower for clarity
      
      // Very aggressive pitch lowering for masculine sound
      if (selectedVoice) {
        const voiceName = selectedVoice.name.toLowerCase()
        // If it's explicitly a male voice, use moderate pitch
        if (selectedVoice.gender === 'male' || selectedVoice.gender === 'M' || 
            voiceName.includes('male') || voiceName.includes('david') || 
            voiceName.includes('mark') || voiceName.includes('thomas') ||
            voiceName.includes('james') || voiceName.includes('john')) {
          utterance.pitch = 0.75
        } else {
          // For uncertain voices, lower pitch significantly
          utterance.pitch = 0.5 // Very low pitch (minimum is around 0.5)
        }
      } else {
        // No voice selected, use very low pitch to sound more masculine
        utterance.pitch = 0.5
      }
      
      utterance.volume = 1.0

      // Set speaking state
      setSpeakingCard(cardIndex)

      // Handle events
      utterance.onend = () => {
        setSpeakingCard(null)
      }

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event)
        setSpeakingCard(null)
        // Try with a fallback voice if error occurs
        if (event.error === 'language-not-supported' || event.error === 'not-allowed') {
          const fallbackVoice = voices.find(v => 
            v.lang.startsWith('en') && 
            (v.gender === 'male' || v.name.toLowerCase().includes('david') || 
             v.name.toLowerCase().includes('mark') || v.name.toLowerCase().includes('thomas'))
          )
          if (fallbackVoice) {
            const fallbackUtterance = new SpeechSynthesisUtterance(text)
            fallbackUtterance.voice = fallbackVoice
            fallbackUtterance.lang = fallbackVoice.lang
            fallbackUtterance.rate = 0.85
            fallbackUtterance.pitch = 0.5
            fallbackUtterance.volume = 1.0
            fallbackUtterance.onend = () => setSpeakingCard(null)
            fallbackUtterance.onerror = () => setSpeakingCard(null)
            window.speechSynthesis.speak(fallbackUtterance)
            return
          }
        }
      }

      // Speak
      try {
        window.speechSynthesis.speak(utterance)
      } catch (error) {
        console.error('Error speaking:', error)
        setSpeakingCard(null)
      }
    })
  }
}

// Entry Page Component
function EntryPage({ onEnter }) {
  const [entryHearts, setEntryHearts] = useState([])
  const [entrySparkles, setEntrySparkles] = useState([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show content after a brief delay
    const timer = setTimeout(() => setShowContent(true), 500)

    // Create floating hearts
    const heartInterval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 4 + Math.random() * 2,
        size: 2 + Math.random() * 1.5,
      }
      setEntryHearts((prev) => [...prev.slice(-30), newHeart])
    }, 400)

    // Create sparkles
    const sparkleInterval = setInterval(() => {
      const newSparkle = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 1,
        duration: 2 + Math.random() * 1,
      }
      setEntrySparkles((prev) => [...prev.slice(-40), newSparkle])
    }, 150)

    // Mouse tracking
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearTimeout(timer)
      clearInterval(heartInterval)
      clearInterval(sparkleInterval)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="entry-page">
      {/* Background gradient orbs */}
      <div className="entry-orbs">
        <div
          className="entry-orb entry-orb-1"
          style={{
            transform: `translate(${mousePos.x * 0.03}px, ${mousePos.y * 0.03}px)`,
          }}
        ></div>
        <div
          className="entry-orb entry-orb-2"
          style={{
            transform: `translate(${mousePos.x * -0.04}px, ${mousePos.y * -0.04}px)`,
          }}
        ></div>
        <div
          className="entry-orb entry-orb-3"
          style={{
            transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`,
          }}
        ></div>
      </div>

      {/* Floating hearts */}
      <div className="entry-hearts">
        {entryHearts.map((heart) => (
          <div
            key={heart.id}
            className="entry-heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              fontSize: `${heart.size}rem`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="entry-sparkles">
        {entrySparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="entry-sparkle"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${sparkle.duration}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className={`entry-content ${showContent ? 'visible' : ''}`}>
        <div className="entry-title-wrapper">
          <h1 className="entry-title">
            <span className="entry-name">LUCKSHANA</span>
            <span className="entry-heart">💖</span>
          </h1>
          <div className="entry-subtitle">
            <p className="entry-line-1">A Special Gift</p>
            <p className="entry-line-2">Just For You</p>
          </div>
        </div>

        <div className="entry-button-wrapper">
          <button
            className={`entry-button ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onEnter}
          >
            <span className="button-text">Open Your Gift</span>
            <span className="button-heart">💝</span>
            <div className="button-shine"></div>
            <div className="button-glow"></div>
          </button>
        </div>

        <div className="entry-footer">
          <p className="entry-footer-text">Made with 💕</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [showMainPage, setShowMainPage] = useState(false)
  const [hearts, setHearts] = useState([])
  const [sparkles, setSparkles] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [speakingCard, setSpeakingCard] = useState(null)
  const containerRef = useRef(null)

  // Load voices when component mounts
  useEffect(() => {
    // Force voice loading
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices()
      }
    }
    
    loadVoices()
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  useEffect(() => {
    // Create floating hearts animation
    const heartInterval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        size: 1.5 + Math.random() * 1,
      }
      setHearts((prev) => [...prev.slice(-25), newHeart])
    }, 600)

    // Create sparkle effects
    const sparkleInterval = setInterval(() => {
      const newSparkle = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 1,
        duration: 1.5 + Math.random() * 1,
      }
      setSparkles((prev) => [...prev.slice(-30), newSparkle])
    }, 200)

    // Mouse tracking for parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearInterval(heartInterval)
      clearInterval(sparkleInterval)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Entry Page Component
  if (!showMainPage) {
    return (
      <EntryPage onEnter={() => setShowMainPage(true)} />
    )
  }

  return (
    <div className="app" ref={containerRef}>
      {/* Animated gradient orbs */}
      <div className="gradient-orbs">
        <div
          className="orb orb-1"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        ></div>
        <div
          className="orb orb-2"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
          }}
        ></div>
        <div
          className="orb orb-3"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
          }}
        ></div>
      </div>

      {/* Animated background hearts */}
      <div className="hearts-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              fontSize: `${heart.size}rem`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Sparkle effects */}
      <div className="sparkles-container">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="sparkle"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${sparkle.duration}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="container">
        <div className="header">
          <div className="title-wrapper">
            <h1 className="main-title">
              <span className="dilu">LUCKSHANA DILUCIA ANTHONY</span>
              <span className="heart-icon">💕</span>
            </h1>
            <div className="title-decoration"></div>
          </div>
          <p className="subtitle">
            <span className="subtitle-word">Happy</span>{' '}
            <span className="subtitle-word">Birthday</span>{' '}
            <span className="subtitle-word">My</span>{' '}
            <span className="subtitle-word">Love!</span>
          </p>
          <p className="description">
            "I Love You" in <span className="highlight">{languages.length}</span> Languages
          </p>
        </div>

        <div className="languages-grid">
          {languages.map((lang, index) => {
            const isSpeaking = speakingCard === index
            const speakText = createSpeakFunction(setSpeakingCard)
            
            return (
              <div
                key={index}
                className={`language-card ${isSpeaking ? 'speaking' : ''}`}
                style={{
                  animationDelay: `${index * 0.03}s`,
                }}
                onClick={() => speakText(lang.text, lang.name, index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    speakText(lang.text, lang.name, index)
                  }
                }}
                aria-label={`Click to hear "${lang.text}" in ${lang.name}`}
              >
                <div className="card-glow"></div>
                <div className="card-content">
                  <div className="flag-wrapper">
                    <div className="flag">{lang.flag}</div>
                    <div className="flag-ring"></div>
                  </div>
                  <div className="language-name">{lang.name}</div>
                  <div className="language-text">{lang.text}</div>
                  <div className={`speaker-icon ${isSpeaking ? 'active' : ''}`}>
                    {isSpeaking ? '🔊' : '🔊'}
                  </div>
                </div>
                <div className="card-shine"></div>
              </div>
            )
          })}
        </div>

        <div className="footer">
          <p className="footer-text">
            With all my love, forever and always 💖
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
