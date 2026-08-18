"use client";

import { useState, useRef, useEffect } from "react";
import { type Locale } from "@/lib/i18n";
import type { ChatMessage } from "@/lib/types";

const STARTER_PROMPTS_AR = [
  "تم فصلي من العمل",
  "صاحب العمل لم يدفع راتبي",
  "المالك يرفض إعادة مبلغ الضمان",
  "وصلني إنذار عدلي أو تبليغ",
  "لدي حادث سير وأريد معرفة الخطوات",
  "تعرضت لابتزاز أو تشهير إلكتروني",
];

const STARTER_PROMPTS_EN = [
  "I was terminated from my job",
  "My employer didn't pay my salary",
  "The landlord won't return my deposit",
  "I received a legal notice",
  "I had a car accident and need to know the steps",
  "I was a victim of cybercrime or online defamation",
];

const SAMPLE_RESPONSES: Record<string, { answer: string; topicSlug?: string; sources?: string[] }> = {
  deposit: {
    answer: `## ملخص المشكلة\nالمالك يرفض إعادة مبلغ الضمان بعد تسليم الشقة.\n\n## النقاط القانونية الرئيسية\n- وديعة الضمان مبلغ تدفعه لمالك العقار لتغطية الأجرة غير المدفوعة و/أو الأضرار الفعلية\n- عند انتهاء العقد وتسديد جميع المستحقات وإعادة الشقة بحالة جيدة، يُتوقع من المالك إعادة الوديعة\n- رفض المالك إعادة الوديعة بدون سند موثق يشكل خلافاً مدنياً يمكن متابعته عبر المحاكم\n\n## الوقائع التي قد تغير التقييم\n- وجود عقد كتابي يحدد شروط إعادة الوديعة\n- حالة الشقة عند التسليم مقابل حالة المغادرة\n- وجود مستندات تثبت دفع الأجرة بالكامل\n\n## الخطوات التالية\n1. مراجعة العقد الكتابي والبحث عن بند الوديعة\n2. إرسال مطلب كتابي رسمي (واتساب + بريد إلكتروني)\n3. محاولة التفاوض أو الوساطة\n4. رفع دعوى مدنية في المحكمة nuestoria إذا رُفض المطلب\n\n## المستندات المطلوبة\n- عقد الإيجار الموقع\n- إثبات دفع الوديعة (حوالة، إيصال، رسالة واتساب)\n- إثبات دفع الأجرة\n- أدلة التسليم (صور، فيديو، رسالة تأكيد تسليم المفاتيح)\n\n## المواعيد وال.time\n- يُنصح بإرسال المطلب خلال 7-10 أيام من رفض المالك\n- مدة التقادم للديون في القانون الأردني سنة واحدة\n\n## متى تحتاج محامٍ؟\n- إذا كان مبلغ الضمان كبيراً نسبياً\n- إذا كان المالك يدّعي أضراراً غير موثقة\n- إذا كانت هناك خلافات إضافية (أجر غير مدفوع، إنهاء مبكر)\n\n## المصادر القانونية\n- القانون المدني رقم 36 لسنة 1976، المواد 624-662\n- قانون التنفيذ رقم 25 لسنة 2017\n\n---\n⚠️ هذه معلومات قانونية عامة وليست استشارة قانونية. قد تختلف النتيجة حسب الوقائع والمستندات.`,
    topicSlug: "security-deposit-refund",
    sources: ["القانون المدني رقم 36 لسنة 1976، المواد 624-662", "قانون التنفيذ رقم 25 لسنة 2017"],
  },
  salary: {
    answer: `## ملخص المشكلة\nصاحب العمل لم يدفع الراتب المستحق.\n\n## النقاط القانونية الرئيسية\n- يُلزم القانون صاحب العمل بدفع الأجر في الموعد المتفق عليه\n- يجب أن يُدفع الأجر بالدينار الأردني\n- التأخر في الدفع قد يخول العامل تعويضاً\n\n## الخطوات التالية\n1. تجميع العقد الوظيفي وكمبيات الراتب\n2. تقديم شكوى لدى وزارة العمل\n3. إذا لم تُحل، رفع دعوى أمام محكمة العمل\n4. الاستعانة بمحامٍ متخصص في قانون العمل\n\n## المستندات المطلوبة\n- العقد الوظيفي\n- كمبيات الراتب أو الإيصالات\n- إثبات العمل (رسائل بريد، واتساب)\n\n## المصادر القانونية\n- قانون العمل رقم 8 لسنة 1996، المواد 31-35\n\n---\n⚠️ هذه معلومات قانونية عامة وليست استشارة قانونية.`,
    topicSlug: "unpaid-salary",
    sources: ["قانون العمل رقم 8 لسنة 1996، المواد 31-35"],
  },
  termination: {
    answer: `## ملخص المشكلة\nتم إنهاء خدمة العامل من العمل.\n\n## النقاط القانونية الرئيسية\n- يجب أن يكون للإنهاء سبب مشروع وفقاً للقانون\n- الفصل التعسفي يخول العامل تعويضاً\n- يجب إشعار العامل مسبقاً أو دفع بدل إشعار\n\n## الخطوات التالية\n1. مراجعة العقد لمعرفة شروط الإنهاء\n2. طلب خطاب إنهاء رسمي من صاحب العمل\n3. التحقق من صحة الإجراءات القانونية\n4. تقديم شكوى لوزارة العمل\n5. رفع دعوى تعويض إذا لزم الأمر\n\n## المصادر القانونية\n- قانون العمل رقم 8 لسنة 1996\n\n---\n⚠️ هذه معلومات قانونية عامة وليست استشارة قانونية.`,
    topicSlug: "employee-termination-jordan",
    sources: ["قانون العمل رقم 8 لسنة 1996"],
  },
};

function matchTopic(input: string): { answer: string; topicSlug?: string; sources?: string[] } {
  const lower = input.toLowerCase();
  const keywords: [string[], string][] = [
    [["وديعة", "deposit", "ضمان", "إرجاع", "return"], "deposit"],
    [["راتب", "salary", "أجر", "wage", "دفع"], "salary"],
    [["فصول", "termination", "فصل", "إنهاء", "work"], "termination"],
    [["إخلاء", "evict", "طرد", "شقة"], "deposit"],
    [["مرور", "traffic", "مخالفة"], "salary"],
  ];

  for (const [terms, key] of keywords) {
    if (terms.some((t) => lower.includes(t))) {
      return SAMPLE_RESPONSES[key];
    }
  }

  return {
    answer: "شكراً لسؤالك. بناءً على محتوى المكتبة، يمكنني توجيك إلى المعلومات القانونية المناسبة.\n\nهل يمكنك وصف موقفك بمزيد من التفاصيل؟ مثلاً:\n- ما نوع المشكلة القانونية؟\n- ماذا حدث ومتى؟\n- هل لديك عقد أو اتفاق كتابي؟\n\nسأوجهك إلى الموضوع الأكثر صلة في قاعدة المعرفة.\n\n---\n⚠️ هذه معلومات قانونية عامة وليست استشارة قانونية.",
  };
}

export default function AskPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale] = useState<"ar" | "en">("ar");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prompts = locale === "ar" ? STARTER_PROMPTS_AR : STARTER_PROMPTS_EN;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { role: "user", content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setTimeout(() => {
      const response = matchTopic(userMsg.content);
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: response.answer,
        topic_slug: response.topicSlug,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-accent text-lg">⚖</span>
          <h1 className="text-xl font-bold text-navy">
            {locale === "ar" ? "اسأل عن مشكلتك القانونية" : "Ask About Your Legal Issue"}
          </h1>
        </div>
        <p className="text-sm text-muted">
          {locale === "ar"
            ? "معلومة قانونية عامة للأردن. وصف مشكلتك وسنجد لك الإجابة المناسبة."
            : "General legal information for Jordan. Describe your issue and we'll find the right answer."}
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 mb-2 text-xs text-amber-700 flex items-start gap-2">
        <span>⚠</span>
        <span>{locale === "ar"
          ? "معلومات قانونية عامة وليست استشارة قانونية. قد تختلف النتيجة حسب الوقائع والمستندات."
          : "This is general legal information, not legal advice. The outcome may vary depending on the facts and documents."}</span>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 mb-4 text-xs text-blue-700 flex items-start gap-2">
        <span>🔒</span>
        <span>{locale === "ar"
          ? "لا تشارك رقمك الوطني أو صور هويتك أو مستندات حساسة في المحادثة."
          : "Do not share your national ID number, identity-document images, or sensitive documents in chat."}</span>
      </div>

      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-gray-200 p-4 space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">⚖</div>
            <p className="text-lg font-semibold text-navy mb-1">
              {locale === "ar" ? "مرحباً بك في اسأل وكيلي" : "Welcome to Ask Wakeely Pro"}
            </p>
            <p className="text-sm text-muted mb-5">
              {locale === "ar"
                ? "اختر مشكلة أو اكتب سؤالك:"
                : "Choose an issue or type your question:"}
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-secondary/10 hover:text-secondary transition-colors border border-gray-200 hover:border-secondary/30"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-primary text-white rounded-br-sm"
                  : "bg-gray-50 text-gray-800 rounded-bl-sm border border-gray-100"
              }`}
            >
              <div className="whitespace-pre-line text-sm leading-relaxed">{msg.content}</div>
              {msg.topic_slug && (
                <a
                  href={`/${locale}/topics/${msg.topic_slug}`}
                  className="inline-block mt-3 text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full hover:bg-secondary/20 transition-colors"
                >
                  {locale === "ar" ? "← اعرض الموضوع في المكتبة" : "← View topic in library"}
                </a>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-50 rounded-2xl rounded-bl-sm px-4 py-3 border border-gray-100">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={locale === "ar" ? "صف مشكلتك القانونية..." : "Describe your legal issue..."}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none text-gray-900"
          dir="rtl"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary-light transition-colors disabled:opacity-50"
        >
          {locale === "ar" ? "إرسال" : "Send"}
        </button>
      </div>
    </div>
  );
}
