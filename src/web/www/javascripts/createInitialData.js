window.OKnessetParser = new function(){

	/*******************************************************************************
	 * members parser
	 */
	this.members = function(result){
		var memberArray = new Array();

		// For each member
		for (var i = result.objects.length - 1; i >= 0; i--) {
			var member = result.objects[i];

			if (!member.is_current) {
				continue;
			}

			// add current memeber to member list
			var minMember = createMinimalMemberItem(member);
			// fetch member bills from web?

			memberArray.push(minMember);
		};

		return memberArray; 

		// private functions

		function partyIdFromMember(member){
			return member.party_url.substring(7,member.party_url.indexOf("/", 7));
		}

		function createMinimalMemberItem(member){
			var reducedMember = {};
			reducedMember.id = member.id;
			reducedMember.img_url = "images/members/" + member.img_url.substring(member.img_url.lastIndexOf('/') + 1);
			reducedMember.name = member.name;
			// reducedMember.resource_uri = member.resource_uri;
			reducedMember.party_id = partyIdFromMember(member);

			if (typeof OKnessetParser.members.sortedMembers[reducedMember.party_id] != "undefined") {
				if (OKnessetParser.members.sortedMembers[reducedMember.party_id].indexOf(reducedMember.name) == -1){
					// the member was not found. 
					console.log("Member " + member.name + " of party " + member.party_id + "was not found in sorted members array");
				} else {
					reducedMember.party_ordinal = OKnessetParser.members.sortedMembers[reducedMember.party_id].indexOf(reducedMember.name) + 1;
				}
			}

			return reducedMember;
		}
	};

	this.members.sortedMembers =  {
		  	"9" : ["ג`מאל זחאלקה","סעיד נפאע","חנין זועבי","עבאס זכור"],
			"7" : ["אליהו ישי","אריאל אטיאס","יצחק כהן","אמנון כהן","משולם נהרי","יעקב מרגי","דוד אזולאי","יצחק וקנין","נסים זאב","חיים אמסלם","אברהם מיכאלי","מזור בהיינה","רפאל כהן","עמי ביטון","אורן מלכה","רפאל מלאכי","חיים אלי רואש","גרשון לוי","דוד גבאי","פינחס צברי","צבי זאב חי חקוק","יצחק אבידני","בנימין אלחרר","חגי חדד","עופר כרדי","יצחק סולטן","צבי אסולין","גבריאל רחמים"],
			"11" : ["חיים אורון","אילן גילאון","ניצן הורוביץ","זהבה גלאון","משה רז","אבשלום וילן","טליה ששון","צביה גרינפלד","צלי רשף","עיסווי פריג`","מיכל רוזין","אברהם מיכאלי","מזור בהיינה","רפאל כהן","עמי ביטון","אורן מלכה","רפאל מלאכי","חיים אלי רואש"],
			"10" : ["אברהים צרצור","אחמד טיבי","טלב אלסאנע","מסעוד גנאים","טלב אבו עראר","גסאן עבדאללה","באסל דראושה","יוסף פדילה","איעתמאד קעדאן","מחמוד מואסי"],
			"8" : ["מוחמד ברכה","חנא סוייד","דב חנין","עפו אגבאריה","עאידה תומא -סלימאן","נורית חג`אג`","דח`יל אבו זייד (חאמד)","עבדאללה אבו מערוף","פדרו גולדפרב","מהא אלנקיב"],
			"1" : ["יעקב (כצל`ה) כ”ץ","אורי יהודה אריאל","אריה אלדד","מיכאל בן-ארי","אורי בנק","אלון דוידי","אברהם רט","רון ברימן","בצלאל סמורטיף","אילן כהן","שבתאי ויינטראוב","אהד ברט","אמיתי כהן","משה כהן","נצר מנצור","חוה טבנקין"],
			"4" :["יעקב ליצמן","משה גפני","מאיר פרוש","אורי מקלב","מנחם אליעזר מוזס","ישראל אייכלר","מנחם כרמל","יעקב אשר גוטרמן","אברהם יוסף לייזרזון","שמעון חדד","יהושע מנחם פולק","יעקב אשר","חיים מאיר כץ","אריה צבי בוימל","אפרים וובר","אליהו מרדכי קרליץ","יוסף יהושע קופרברג","אברהם רובינשטיין","יוסף דייטש","יצחק זאב פינדרוס"],
			"12" : ["דניאל הרשקוביץ","זבולון אורלב","אורי אורבך","ניסן סולומינסקי","שר שלום ג`רבי","לאורה מינקה","שלה רוזנק-שורשן","אברהם נגוסה","אופיר יחזקאל כהן","אלישיב רייכנר","אהרון אטיאס","יפה פרץ","יעקב סולר","יהודה דה-פריידיגר","אברהם מועלם","יורם כמיסה","אליעזר אויירבך","משה אהרון פת","אבי סילימן"],
			"5" : ["אביגדור ליברמן","עוזי לנדאו","סטס מיסז`ניקוב","יצחק אהרונוביץ","סופה לנדבר","אורלי לוי-אבקסיס","דניאל אילון","דוד רותם","אנסטסיה מיכאלי","פאינה (פניה) קירשנבאום","רוברט אילטוב","חמד עמאר","משה מוץ מטלון","ליה שמטוב","אלכס מילר","יצחק סלבין","סמדר בת אדם לויטן"],
			"2" : ["בנימין נתניהו","גדעון סער","גלעד ארדן","ראובן ריבלין","זאב בנימין  בגין","משה כחלון","סילבן שלום","משה יעלון","יובל שטייניץ","לאה נס","ישראל כץ","יולי - יואל אדלשטיין","לימור לבנת","חיים כץ","יוסי פלד","מיכאל איתן","דן מרידור","ציפי חוטובלי","גילה גמליאל","זאב אלקין","יריב לוין","ציון פיניאן","איוב קרא","דני דנון","כרמל שאמה","אופיר אקוניס","מירי רגב","אללי אדמסו","יצחק (איציק) דנינו","דוד אבן צור","קטי (קטרין) שיטרית","קרן ברק","שגיב אסולין","בועז ישראל העצני","גיא חנן יפרח","משה זלמן פייגלין","מיכאל רצון","אהוד יצחק יתום","שלום לרנר","הילה -אסנת מארק","אסף חפץ","יחיאל (מיכאל) לייטר","דניאל בנלולו","עוזי דיין","אדמונד חסין","פנינה רוזנבלום סימונוב","זאב -יאיר ז`בוטינסקי","מיכאל קליינר","נורית (יונה) קורן","סמיר קאידבה","יוסף- ספי ריבלין","דוד מנע","יחיאל- מיכאל חזן","משה שלמה מוסקל","אליהו גבאי","גיל חדד","אלי אבידר","חמי - נחמיה דורון","מיכל - דאה כפרי - ירדני","אתי תלמי","בלהה ניסנסון","ריכאד חיאדין","אפריים אבן","איילה שטגמן","מרים ארז","עטאף קרינאוי","יוסף בדש","רפעאת אסדי","חאתם חסון","צפורה בר","יאנה זהר","שלמה ציביון","שוש- שושנה הלוי","גיל-עד זגר","גבריאל אביטל","שאול אדם","פרוספר אזוט"],
			"3" : ["אהוד ברק","יצחק הרצוג","אופיר פינס-פז","אבישי ברוורמן","שלי יחימוביץ","מתן וילנאי","איתן כבל","בנימין (פואד) בן-אליעזר","יולי תמיר","עמיר פרץ","דניאל בן-סימון","שלום שמחון","אורית נוקד","עינת וילף","ראלב מג`אדלה","שכיב שנאן","יורם מרציאנו","לאון ליטינצקי","קולט אביטל","משה סמיה","יוסף סולימני","אריק חדד","אבי חזקיהו","מנחם ליבוביץ","עפר קורנפלד","יואב חי","עזי נגר","בנימין לוין","אבי שקד","נאדיה חילו","שמעון שיטרית","יריב אופנהיימר","רות דיין מדר","אסתר ביתן","דנה אורן","אמנון זילברמן","ואפד קבלאן","יעקב רומי","מיקי מיכאל גולד","מאיר וייס","ולדימיר סברדלוב","מעין אמודאי","פייצל אלהזייל","ניקולא מסעד","זאב-ולוולה שור","אהרון קראוס","אמנון זך","מוטי ששון","חנה מרשק","הדסה חנה רוסו","אלי אורן","דב צור","סימון אלפסי","יוסף ונונו","שייע יצחק ישועה","שלומי וייזר","מישל שלום חלימי","יוסי ארבל","לאה יונה גבע","ארז שלמה אבו","יובל אדמון","דקל דוד עוזר","יהונתן מאייר עוזר","אהרון רוני כהן","משה פרנקל","אדית אבוד","יהודית הרן","אליהו סדן","רבקה בית הלחמי","אבינועם טובים","אברהם הצמרי","רמי אזרן","שמעון קמרי","שרה גנסטיל","מוטי דותן","יהודית אוליאל","נורית לוי","יהודה שביט","דניאל עטר"],
			"6" : ["ציפי לבני","שאול מופז","דליה איציק","צחי הנגבי","רוני בר-און","זאב בוים","מאיר שטרית","רוחמה אברהם בלילא","אבי (משה) דיכטר","מרינה סולודקין","יואל חסון","גדעון עזרא","יעקב אדרי","אלי אפללו","זאב בילסקי","רונית תירוש","חיים רמון","נחמן שי","שלמה (נגוסה) מולה","רוברט טיבייב","מגלי והבה","רחל אדטו","יוחנן פלסנר","שי חרמש","ישראל חסון","אריה ביבי","עתניאל שנלר","אורית זוארץ","יוליה שמאלוב ברקוביץ`","נינו אבסדזה","אבנר ברזאני","דורון אביטל","אברהם (אבי) דואן","יובל צלנר","אכרם חסון","אחמד דבאח","דוד טל","דימטרי רוסינסקי","אהרון רוני בן חמו","איתן שלום","נחמיה רייבי","גליה אלבין","שלמה יצחק","מושון גבאי","וליד שנאן","מוטי מרדכי אלפריח","יורי בוצ'רוב","אלי בן מנחם","עדי שטרנברג","חליל קאסם","אתי אסתר לבני","גילה אוגניה וקסמן","סימה נבון","משה קונפורטי","לזר קפלון","מרינה קונצביה","סוריה נוג'ידאת","אבי אברהם וידרמן","עודד אליגון","אופיר מילר","יצחק רגב","יוסי מנור","שבתאי בירן","איזיק פיטרמן","אורי נאמן","שלמה אברמוביץ","חוסיין סלימאן","ציפי גורדין","רומי זונדר כסלו","שרון מנחם בר און","יהודה סקר","יניב קזז","צבי אדנייב -עדי","רמי פרדרו","נסים הדס","מאיר דורון","שלמה טל","ענת זיו","דוד אזולאי"]
		};

	// סיעת העצמאות היא בעצם סיעת העבודה
	this.members.sortedMembers["13"] = this.members.sortedMembers["3"];	

	/*******************************************************************************
	 * member parser
	 */
	this.member =  function(result){
		result.img_url = "images/members/" + result.img_url.substring(result.img_url.lastIndexOf('/') + 1);
		return result;
	}

	/*******************************************************************************
	 * trivial parser
	 */
	this.trivialParser =  function(result){
		return result;
	}

	/*******************************************************************************
	 * objects parser
	 */
	this.objectsParser =  function(result){
		return result.objects;
	}

}

/*******************************************************************************
 * API Mapping
 */
window.OKnessetAPIMapping = {
    voteDetails : {
    	url : function(id){
    		return 'http://www.oknesset.org/api/vote/' + id;
    	},
    	parameters : {format:"jsonp"},
    	callbackKey : "callback",
    	parser: OKnessetParser.trivialParser
    },
    members : {
    	url : function(){
    		return 'http://www.oknesset.org/api/v2/member/';
    	},
    	parameters : {format:"jsonp", extra_fields:"is_current,party_url"},
    	callbackKey : "callback",
    	parser: OKnessetParser.members
    },
    member : {
    	url : function(id){
    		return 'http://www.oknesset.org/api/v2/member/' + id;
    	},
    	parameters : {format:"jsonp"},
    	callbackKey : "callback",
    	parser: OKnessetParser.member
    },

    memberVotesFavor :{
    	url : function(){
    		return 'http://www.oknesset.org/api/v2/vote/';
    	},
    	parameters : function(id){
    		return {format:"jsonp", limit : 10, member_for : id};
    	},
    	callbackKey : "callback",
    	parser: OKnessetParser.objectsParser
    },

    memberVotesAgainst : {
    	url : function(){
    		return 'http://www.oknesset.org/api/v2/vote/';
    	},
    	parameters : function(id){
    		return {format:"jsonp", limit : 10, member_against : id};
    	},
    	callbackKey : "callback",
    	parser: OKnessetParser.objectsParser
    },

    agendas : {
    	url : function(){
    		return 'http://www.oknesset.org/api/v2/agenda/';
    	},
    	parameters : {format:"jsonp"},
    	callbackKey : "callback",
    	parser: OKnessetParser.objectsParser
    },

    agendaDetails :{
    	url : function(id){
    		return 'http://www.oknesset.org/api/v2/agenda/' + id;
    	},
    	parameters : {format:"jsonp"},
    	callbackKey : "callback",
    	parser: OKnessetParser.trivialParser

    },

    parties : {
    	url : function(){
    		return 'http://www.oknesset.org/api/v2/party/';
    	},
    	parameters : {format:"jsonp"},
    	callbackKey : "callback",
    	parser: OKnessetParser.objectsParser
    },

    committees : {
    	url : function(){
    		return 'http://www.oknesset.org/api/v2/committee/';
    	},
    	parameters : {format:"jsonp"},
    	callbackKey : "callback",
    	parser: OKnessetParser.objectsParser

    },

    committeeDetail : {
    	url : function(id){
		   	return 'http://www.oknesset.org/api/committee/' + id;
		},
    	parameters : {},
    	callbackKey : "callback",
		parser: OKnessetParser.trivialParser    
	},
	committeeProtocol : {
    	url : function(id){
		   	return 'http://www.oknesset.org/api/v2/committeemeeting/' + id;
		},
    	parameters : {format:"jsonp"},
    	callbackKey : "callback",
		parser: OKnessetParser.trivialParser    
	}


}

