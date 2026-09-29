import { Zap, Sparkles, MessageCircle, Heart, Image as ImageIcon, Sprout } from "lucide-react";

export const COLORS = {
  paper: "#FBF8FF",
  paperDeep: "#F1ECFB",
  ink: "#2B2640",
  inkSoft: "#5B5570",
  line: "#E4DCF7",
  coral: "#FF7A59",
};

export const TYPE_META = {
  speed: { name: "時短・弾丸タイプ", color: "#FF8C42", icon: Zap, catch: "一言で終わる、身軽な記録" },
  perfection: { name: "完璧主義リセットタイプ", color: "#6C63FF", icon: Sparkles, catch: "書けた分だけ、まるごと合格" },
  dialogue: { name: "対話・問いかけタイプ", color: "#1FAFA6", icon: MessageCircle, catch: "問いに答えるうちに見えてくる" },
  emotion: { name: "感情吐き出しタイプ", color: "#D6336C", icon: Heart, catch: "本音を、そのまま置いていく場所" },
  visual: { name: "ビジュアル・スタンプタイプ", color: "#FFB100", icon: ImageIcon, catch: "言葉より先に、色とかたちで" },
  growth: { name: "スモールステップ・育成タイプ", color: "#4CAF6D", icon: Sprout, catch: "書くほどに、育っていく相棒" },
};

export const MAIN_TYPE_KEYS = ["speed", "perfection", "dialogue", "emotion", "visual", "growth"];

export const SUBTYPE_MATRIX = {
  speed: {
    in_cau: { title: "物静かな効率家", desc: "静かに、でも着実に。短い言葉で心を整理するのが得意。" },
    in_bold: { title: "一撃離脱の記録人", desc: "迷いなく一言で決める。スタンプひとつで今日を語る。" },
    out_cau: { title: "テンポよき伴走者", desc: "誰かと歩調を合わせながら、サクッと記録を続ける。" },
    out_bold: { title: "秒速の閃光", desc: "思いついたら即記録。スピード感そのものが個性。" },
  },
  perfection: {
    in_cau: { title: "静かなる完璧主義者", desc: "自分のペースで、少しずつ「できた」を積み重ねる。" },
    in_bold: { title: "静かな挑戦者", desc: "高い基準を持ちながらも、一歩ずつ確実に前進する。" },
    out_cau: { title: "やさしい努力家", desc: "周りを気にしつつ、自分にも優しくなろうと練習中。" },
    out_bold: { title: "堂々たる成長者", desc: "完璧を目指しつつ、失敗も堂々と受け止められる。" },
  },
  dialogue: {
    in_cau: { title: "内なる対話者", desc: "自分自身との静かな問答を大切にするタイプ。" },
    in_bold: { title: "深掘りする探求者", desc: "ひとつの問いを、とことん掘り下げるのが好き。" },
    out_cau: { title: "やさしい聞き役", desc: "問いかけに答える中で、自分の気持ちに気づいていく。" },
    out_bold: { title: "対話の冒険者", desc: "どんな質問にも臆せず飛び込む、会話好きなタイプ。" },
  },
  emotion: {
    in_cau: { title: "静かな感情の器", desc: "溢れる気持ちを、そっと文字にして受け止める。" },
    in_bold: { title: "本音の発信者", desc: "心の中の本音を、まっすぐ言葉にできる強さを持つ。" },
    out_cau: { title: "共感のことば探し", desc: "自分の気持ちに、ぴったりの言葉を探すのが得意。" },
    out_bold: { title: "感情のあらしっ子", desc: "感じたことをそのままぶつける、エネルギッシュなタイプ。" },
  },
  visual: {
    in_cau: { title: "静かな観察者", desc: "言葉より、色や記号で今日を切り取るのが得意。" },
    in_bold: { title: "イメージの魔術師", desc: "ひとつのスタンプに、たくさんの意味を込められる。" },
    out_cau: { title: "彩りの案内人", desc: "見た目のかわいさで、記録を続ける工夫が上手。" },
    out_bold: { title: "ビジュアル系表現者", desc: "目に見える形で、今日の気分を大胆に表現する。" },
  },
  growth: {
    in_cau: { title: "こつこつ育成家", desc: "小さな一歩を、静かに積み重ねていくタイプ。" },
    in_bold: { title: "静かなる挑戦育成家", desc: "マイペースながらも、着実にレベルアップを目指す。" },
    out_cau: { title: "みんなと育つタイプ", desc: "キャラクターの成長を、誰かと分かち合うのが好き。" },
    out_bold: { title: "育成バトラー", desc: "ゲーム感覚で、どんどんキャラを育てたい欲張りタイプ。" },
  },
};

export const EMOTION_META = {
  joy: { label: "喜び", color: "#FFC947" },
  love: { label: "愛情", color: "#FF6FA8" },
  excite: { label: "興奮", color: "#FF7A59" },
  surprise: { label: "驚き", color: "#6C63FF" },
  sad: { label: "悲しみ", color: "#4C8BF5" },
  anger: { label: "怒り", color: "#E63950" },
  anxious: { label: "不安", color: "#7C7C9C" },
};

export const EMOTION_KEYS = ["joy", "love", "excite", "surprise", "sad", "anger", "anxious"];

export const EMOTION_DICTIONARY = {
  joy: ["嬉しい", "うれしい", "楽しい", "たのしい", "幸せ", "しあわせ", "最高", "良かった", "よかった", "笑", "ハッピー"],
  love: ["好き", "大好き", "愛し", "恋", "ありがた", "感謝", "愛おし", "大切"],
  excite: ["興奮", "ワクワク", "わくわく", "ドキドキ", "どきどき", "熱い", "燃え", "テンション"],
  surprise: ["驚", "びっくり", "まさか", "衝撃", "意外"],
  sad: ["悲しい", "かなしい", "辛い", "つらい", "泣", "寂しい", "さみしい", "切ない", "落ち込"],
  anger: ["怒", "ムカ", "むか", "イライラ", "いらいら", "腹立", "うざ", "許せない"],
  anxious: ["不安", "心配", "緊張", "怖い", "こわい", "焦", "ストレス"],
};

export const MAIN_QUESTIONS = [
  { axis: "speed", text: "日記は、できるだけ短い時間で終わらせたい" },
  { axis: "speed", text: "書くことより、続けることの方が大事だと思う" },
  { axis: "speed", text: "長い文章を書くのは苦手だ" },
  { axis: "speed", text: "一言だけでも記録が残れば十分だと感じる" },
  { axis: "perfection", text: "書いた内容が中途半端だと、消したくなることがある" },
  { axis: "perfection", text: "「今日は何も書けなかった」と自分を責めがちだ" },
  { axis: "perfection", text: "うまく書けないなら、書かない方がましだと思ってしまう" },
  { axis: "perfection", text: "完璧に書けたときだけ、達成感を感じる" },
  { axis: "dialogue", text: "誰かに質問されると、考えが整理しやすい" },
  { axis: "dialogue", text: "自分から書き始めるより、きっかけがあった方が書きやすい" },
  { axis: "dialogue", text: "「今日はどうだった？」と聞かれるのが好きだ" },
  { axis: "dialogue", text: "問いに答える形式の方が、本音が出やすい" },
  { axis: "emotion", text: "モヤモヤした気持ちは、文字にして吐き出したい" },
  { axis: "emotion", text: "ネガティブなことも、遠慮なく書きたい" },
  { axis: "emotion", text: "感情を我慢すると、後で辛くなる" },
  { axis: "emotion", text: "書くことで、気持ちが軽くなった経験がある" },
  { axis: "visual", text: "文章より、絵やスタンプで表現する方が得意だ" },
  { axis: "visual", text: "写真や画像を見返すのが好きだ" },
  { axis: "visual", text: "言葉を選ぶより、感覚的に選ぶ方が楽だ" },
  { axis: "visual", text: "かわいい・きれいなデザインにモチベーションが上がる" },
  { axis: "growth", text: "ゲームのようにレベルが上がる仕組みが好きだ" },
  { axis: "growth", text: "キャラクターを育てるような感覚があると続けやすい" },
  { axis: "growth", text: "小さな達成感を積み重ねるのが好きだ" },
  { axis: "growth", text: "何かが成長していく過程を見るのが楽しい" },
];

export const SUB_QUESTIONS = [
  { axis: "ei", direction: 1, text: "一人の時間より、誰かと一緒にいる時間の方が元気が出る" },
  { axis: "ei", direction: -1, text: "自分の気持ちは、あまり人に話さない方だ" },
  { axis: "ei", direction: 1, text: "新しい人と話すのは、それほど苦にならない" },
  { axis: "cb", direction: 1, text: "迷ったら、とりあえずやってみるタイプだ" },
  { axis: "cb", direction: -1, text: "石橋を叩いてから渡る方だ" },
  { axis: "cb", direction: 1, text: "失敗を恐れず、新しいことに挑戦するのが好きだ" },
];

export const ALL_QUESTIONS = [...MAIN_QUESTIONS, ...SUB_QUESTIONS];

export const LIKERT_OPTIONS = [
  { label: "全く違う", value: 0 },
  { label: "あまり当てはまらない", value: 1 },
  { label: "やや当てはまる", value: 2 },
  { label: "とても当てはまる", value: 3 },
];

export const REWARDS = [
  { days: 3, id: "theme-teal", type: "theme", label: "ミント&ティールのテーマ", value: "#1FAFA6" },
  { days: 7, id: "theme-violet", type: "theme", label: "ふんわりバイオレットのテーマ", value: "#6C63FF" },
  { days: 30, id: "font-round", type: "font", label: "まるもじフォント（強調）", value: "round" },
];

export const STAMP_EMOJIS = ["😊", "😢", "😡", "😲", "😴", "🥰", "😤", "😌", "🤔", "🎉", "😭", "🔥"];

export const DIALOGUE_PROMPTS = [
  "今日いちばん心が動いた瞬間は？",
  "今日、自分をほめるとしたら何について？",
  "今日感じた「ちょっとした違和感」はある？",
  "明日の自分に、ひとこと伝えるなら？",
  "今日出会った人やものの中で、印象に残っているのは？",
  "今、頭から離れないことは何？",
];
