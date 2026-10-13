// Original SVG illustrations of standard Indian road signs (viewBox 100x100). Simplified; verify against official sign charts.
const R="#d32f2f";
const arrow=(d,c)=>d==="u"?`<path d="M50 80V40" stroke="${c}" stroke-width="9"/><path d="M50 20L30 46H70Z" fill="${c}"/>`:
 d==="l"?`<path d="M72 80V52H46" stroke="${c}" stroke-width="9" fill="none"/><path d="M28 52L48 32V72Z" fill="${c}"/>`:
 `<path d="M28 80V52H54" stroke="${c}" stroke-width="9" fill="none"/><path d="M72 52L52 32V72Z" fill="${c}"/>`;
const txt=(s,y,f,c="#000")=>`<text x="50" y="${y}" font-family="Arial,sans-serif" font-weight="700" font-size="${f}" text-anchor="middle" fill="${c}">${s}</text>`;
const slash=`<line x1="22" y1="22" x2="78" y2="78" stroke="${R}" stroke-width="8"/>`;
const SHAPES={
 oct:'<polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" fill="#d32f2f" stroke="#fff" stroke-width="3"/>',
 inv:`<polygon points="6,12 94,12 50,92" fill="#fff" stroke="${R}" stroke-width="8" stroke-linejoin="round"/>`,
 circ:`<circle cx="50" cy="50" r="45" fill="#fff" stroke="${R}" stroke-width="9"/>`,
 circb:`<circle cx="50" cy="50" r="45" fill="#1565c0" stroke="${R}" stroke-width="9"/>`,
 ne:`<circle cx="50" cy="50" r="46" fill="${R}"/>`,
 blue:'<circle cx="50" cy="50" r="46" fill="#1565c0"/>',
 tri:`<polygon points="50,6 96,88 4,88" fill="#fff" stroke="${R}" stroke-width="8" stroke-linejoin="round"/>`,
 sq:'<rect x="6" y="6" width="88" height="88" rx="8" fill="#1565c0"/>'
};
const SIGNS=[
{id:"stop",cat:"reg",shape:"oct",g:txt("STOP",60,24,"#fff"),en:"Stop",gu:"રોકો",hi:"रुकें",d:"Come to a complete halt at the stop line and proceed only when the way is clear.",tip:"Only sign with an octagon (8-sided) shape."},
{id:"giveway",cat:"reg",shape:"inv",g:"",en:"Give Way",gu:"રસ્તો આપો",hi:"रास्ता दें",d:"Slow down and give way to traffic on the road you are entering; stop if necessary.",tip:"Inverted triangle = yield."},
{id:"noentry",cat:"reg",shape:"ne",g:'<rect x="18" y="41" width="64" height="18" fill="#fff"/>',en:"No Entry",gu:"પ્રવેશ નિષેધ",hi:"प्रवेश निषेध",d:"Vehicles must not enter this road from this direction.",tip:"Red disc with a white bar."},
{id:"oneway",cat:"reg",shape:"sq",g:'<path d="M18 50H66" stroke="#fff" stroke-width="10"/><path d="M60 28L84 50L60 72Z" fill="#fff"/>',en:"One Way",gu:"એક માર્ગી",hi:"एक मार्गी",d:"Traffic may move only in the direction of the arrow.",tip:"Follow the arrow; don't ride against it."},
{id:"noparking",cat:"reg",shape:"circb",g:slash,en:"No Parking",gu:"પાર્કિંગ નિષેધ",hi:"पार्किंग निषेध",d:"Parking is not allowed here. Brief stopping to drop or pick up may be permitted unless signs say otherwise.",tip:"One slash = no parking."},
{id:"nostopping",cat:"reg",shape:"circb",g:`<line x1="22" y1="22" x2="78" y2="78" stroke="${R}" stroke-width="8"/><line x1="78" y1="22" x2="22" y2="78" stroke="${R}" stroke-width="8"/>`,en:"No Stopping",gu:"ઊભા રહેવાની મનાઈ",hi:"रुकना मना है",d:"Do not stop or park here, even briefly.",tip:"Cross (X) = not even stopping."},
{id:"speed50",cat:"reg",shape:"circ",g:txt("50",63,36),en:"Speed Limit (50 km/h)",gu:"ગતિ મર્યાદા (50 કિમી/કલાક)",hi:"गति सीमा (50 किमी/घंटा)",d:"Maximum permitted speed is the number shown, in km/h. Ride slower if conditions demand.",tip:"The number is a maximum, not a target."},
{id:"nolt",cat:"reg",shape:"circ",g:arrow("l","#000")+slash,en:"Left Turn Prohibited",gu:"ડાબે વળવાની મનાઈ",hi:"बाएं मुड़ना मना है",d:"You must not turn left at this junction.",tip:"Red slash cancels the arrow."},
{id:"nort",cat:"reg",shape:"circ",g:arrow("r","#000")+slash,en:"Right Turn Prohibited",gu:"જમણે વળવાની મનાઈ",hi:"दाएं मुड़ना मना है",d:"You must not turn right at this junction.",tip:"Red slash cancels the arrow."},
{id:"cahead",cat:"reg",shape:"blue",g:arrow("u","#fff"),en:"Compulsory Ahead",gu:"ફરજિયાત સીધા",hi:"अनिवार्य सीधे",d:"Vehicles must go straight ahead only.",tip:"Blue circle = you MUST do it."},
{id:"cleft",cat:"reg",shape:"blue",g:arrow("l","#fff"),en:"Compulsory Left Turn",gu:"ફરજિયાત ડાબે વળો",hi:"अनिवार्य बाएं मुड़ें",d:"Vehicles must turn left.",tip:"Blue circle = command."},
{id:"cright",cat:"reg",shape:"blue",g:arrow("r","#fff"),en:"Compulsory Right Turn",gu:"ફરજિયાત જમણે વળો",hi:"अनिवार्य दाएं मुड़ें",d:"Vehicles must turn right.",tip:"Blue circle = command."},
{id:"pedcross",cat:"warn",shape:"tri",g:'<circle cx="50" cy="40" r="6"/><path d="M50 47V66M50 52L40 60M50 52L60 60M50 66L42 80M50 66L58 80" stroke="#000" stroke-width="5" fill="none"/>',en:"Pedestrian Crossing",gu:"રાહદારી ક્રોસિંગ",hi:"पैदल पार पथ",d:"Pedestrians may be crossing ahead. Slow down and be ready to stop.",tip:"Triangle = warning; person = people crossing."},
{id:"school",cat:"warn",shape:"tri",g:txt("SCHOOL",70,12),en:"School Ahead",gu:"આગળ શાળા",hi:"आगे स्कूल",d:"A school is ahead; children may cross suddenly. Reduce speed.",tip:"Expect unpredictable children."},
{id:"speedbump",cat:"warn",shape:"tri",g:'<path d="M24 78Q50 40 76 78Z" fill="#000"/>',en:"Speed Breaker",gu:"સ્પીડ બ્રેકર",hi:"गति अवरोधक",d:"A raised hump is ahead. Slow down before it.",tip:"The hump shape shows the bump."},
{id:"slippery",cat:"warn",shape:"tri",g:'<path d="M30 60q10-9 20 0t20 0M30 74q10-9 20 0t20 0" fill="none" stroke="#000" stroke-width="5"/>',en:"Slippery Road",gu:"લપસણો રસ્તો",hi:"फिसलन भरी सड़क",d:"The surface may be slippery. Reduce speed and avoid sudden braking or sharp turns.",tip:"Two-wheelers skid easily."},
{id:"signals",cat:"warn",shape:"tri",g:'<rect x="40" y="36" width="20" height="44" rx="4" fill="#000"/><circle cx="50" cy="46" r="5" fill="#f44"/><circle cx="50" cy="58" r="5" fill="#fb0"/><circle cx="50" cy="70" r="5" fill="#2c4"/>',en:"Traffic Signals Ahead",gu:"આગળ ટ્રાફિક સિગ્નલ",hi:"आगे ट्रैफिक सिग्नल",d:"A signal-controlled junction is ahead. Be ready to stop.",tip:"Three lights inside a triangle."},
{id:"crossroads",cat:"warn",shape:"tri",g:'<path d="M50 38V82M28 60H72" stroke="#000" stroke-width="8"/>',en:"Crossroads",gu:"ચાર રસ્તા",hi:"चौराहा",d:"A crossroad is ahead. Slow down and watch for traffic from both sides.",tip:"Plus sign = four-way junction."},
{id:"railway",cat:"warn",shape:"tri",g:'<path d="M34 46L66 80M66 46L34 80" stroke="#000" stroke-width="8"/>',en:"Railway Crossing",gu:"રેલ્વે ક્રોસિંગ",hi:"रेलवे क्रॉसिंग",d:"A railway level crossing is ahead. Slow down, look both ways and never cross when the gate is closing or closed.",tip:"X marks the tracks."},
{id:"roadwork",cat:"warn",shape:"tri",g:txt("WORK",70,15),en:"Road Work",gu:"રસ્તાનું કામ",hi:"सड़क निर्माण कार्य",d:"Road work ahead. Slow down and watch for workers and machinery.",tip:"Expect uneven surface and narrowing."},
{id:"hospital",cat:"info",shape:"sq",g:txt("H",70,56,"#fff"),en:"Hospital",gu:"હોસ્પિટલ",hi:"अस्पताल",d:"A hospital is nearby. Avoid unnecessary horn use and give way to ambulances.",tip:"Blue square = information."},
{id:"parking",cat:"info",shape:"sq",g:txt("P",72,60,"#fff"),en:"Parking",gu:"પાર્કિંગ",hi:"पार्किंग",d:"A designated parking place.",tip:"P on blue = permitted parking."},
{id:"petrol",cat:"info",shape:"sq",g:txt("PETROL",56,17,"#fff")+txt("PUMP",76,17,"#fff"),en:"Petrol Pump",gu:"પેટ્રોલ પંપ",hi:"पेट्रोल पंप",d:"A fuel station is ahead.",tip:"Informatory signs are rectangular/blue."}
];
const CATS={reg:"Mandatory / Regulatory",warn:"Cautionary / Warning",info:"Informatory"};
function signSVG(s){if(typeof s==="string")s=SIGNS.find(x=>x.id===s);if(!s)return"";
 return `<svg viewBox="0 0 100 100" role="img" aria-label="${s.en} road sign" xmlns="http://www.w3.org/2000/svg">${SHAPES[s.shape]}${s.g}</svg>`}
function signQuestions(){return SIGNS.map((s,i)=>{let p=SIGNS.filter(x=>x.cat===s.cat&&x!==s);if(p.length<3)p=SIGNS.filter(x=>x!==s);
 const a=[s,...[0,1,2].map(k=>p[(i+k)%p.length])],f=l=>a.map(x=>x[l]);
 return{id:"sign_"+s.id,topic:"road_signs",difficulty:"easy",sign:s.id,question:{en:"What does this road sign mean?",gu:"આ માર્ગ ચિહ્નનો અર્થ શું છે?",hi:"इस सड़क संकेत का क्या अर्थ है?"},
 options:{en:f("en"),gu:f("gu"),hi:f("hi")},correctIndex:0,explanation:{en:s.d,gu:s.gu+" – "+s.en,hi:s.hi+" – "+s.en}}})}
