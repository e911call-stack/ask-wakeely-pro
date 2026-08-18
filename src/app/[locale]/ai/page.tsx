"use client";

import { useState, useRef, useEffect } from "react";
import { type Locale } from "@/lib/i18n";
import type { ChatMessage } from "@/lib/types";

const SAMPLE_RESPONSES: Record<string, { answer: string; topicSlug?: string }> = {
  default: {
    answer: "Thank you for your question. Based on the library content, I can help guide you to relevant legal information. Could you describe your situation in more detail? For example:\n\n- What type of legal issue is it? (labor, rent, family, debt, traffic)\n- What happened and when?\n- Do you have a contract or written agreement?\n\nI will then guide you to the most relevant topic in our knowledge base.",
  },
  deposit: {
    answer: "Regarding security deposit refunds in Jordan:\n\n**What the law says:**\nWhen a lease ends and you have paid all rent and returned the property in good condition, the landlord is generally expected to refund the deposit, deducting only documented, legitimate amounts.\n\n**Steps you can take:**\n1. Check your written contract for the deposit clause\n2. Send a formal written demand (WhatsApp + email)\n3. Try negotiation / mediation\n4. If refused, file a civil case at the Magistrates' Court\n\n**Documents needed:**\n- Lease contract (signed)\n- Deposit payment proof\n- Rent payment proofs\n- Handover evidence (photos/video)\n\n📎 Based on: Civil Code No. 36 of 1976, Articles 624-662\n\n⚠ This is general information, not legal advice.",
    topicSlug: "security-deposit-refund",
  },
  salary: {
    answer: "Regarding unpaid salary in Jordan:\n\n**Your rights under Labor Law No. 8 of 1996:**\n- Employers must pay wages on the agreed date\n- Wages must be paid in Jordanian Dinars\n- Late payment may entitle you to compensation\n\n**Steps you should take:**\n1. Gather your employment contract and pay slips\n2. File a complaint with the Ministry of Labor\n3. If unresolved, file a case at the Labor Court\n4. Consider hiring a labor lawyer for court proceedings\n\n**Key deadlines:**\n- Labor complaints generally have a 1-year statute of limitations\n- Court cases: varies based on circumstances\n\n📎 Based on: Labor Law No. 8 of 1996, Articles 31-35\n\n⚠ This is general information, not legal advice.",
    topicSlug: "unpaid-salary",
  },
  eviction: {
    answer: "Regarding property eviction in Jordan:\n\n**Key points:**\n- A landlord cannot evict a tenant without a valid legal reason\n- Eviction generally requires a court order\n- Tenants have rights to adequate notice\n\n**Valid reasons for eviction include:**\n- Non-payment of rent\n- Violation of lease terms\n- Landlord needing the property for personal use (with specific conditions)\n\n**Your rights:**\n- You can contest eviction in court\n- You may be entitled to compensation in some cases\n- Emergency eviction is only for specific circumstances\n\n📎 Based on: Civil Code No. 36 of 1976, Articles 649-662\n\n⚠ This is general information, not legal advice.",
    topicSlug: "property-eviction",
  },
};

function generateResponse(input: string): { answer: string; topicSlug?: string } {
  const lower = input.toLowerCase();
  if (lower.includes("وديعة") || lower.includes("deposit") || lower.includes("ضمان") || lower.includes("إرجاع")) {
    return SAMPLE_RESPONSES.deposit;
  }
  if (lower.includes("راتب") || lower.includes("salary") || lower.includes("عمل") || lower.includes("فصول") || lower.includes("termination")) {
    return SAMPLE_RESPONSES.salary;
  }
  if (lower.includes("إخلاء") || lower.includes("evict") || lower.includes("طرد") || lower.includes("سكني")) {
    return SAMPLE_RESPONSES.eviction;
  }
  return SAMPLE_RESPONSES.default;
}

export default function AIPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale] = useState<"ar" | "en">("ar");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const response = generateResponse(userMsg.content);
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: response.answer,
        topic_slug: response.topicSlug,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-10rem)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {locale === "ar" ? "المساعد القانوني" : "AI Legal Assistant"}
        </h1>
        <p className="text-sm text-gray-500">
          {locale === "ar"
            ? "مساعد ذكي يوجهك إلى المعلومات القانونية المناسبة في المكتبة"
            : "An intelligent assistant that guides you to the right legal information in the library"}
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-xs text-amber-700">
        ⚠ {locale === "ar"
          ? "إجابات المساعد مبنية على محتوى المكتبة فقط وهي معلومات عامة وليست استشارة قانونية."
          : "The assistant's answers are based on library content only and are general information, not legal advice."}
      </div>

      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-gray-200 p-4 space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <div className="text-4xl mb-3">⚖</div>
            <p className="text-lg font-medium text-gray-600 mb-2">
              {locale === "ar" ? "مرحباً! أنا المساعد القانوني" : "Hello! I'm the Legal Assistant"}
            </p>
            <p className="text-sm mb-4">
              {locale === "ar"
                ? "كيف يمكنني مساعدتك اليوم؟"
                : "How can I help you today?"}
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
              {[
                locale === "ar" ? "صاحببي ما دفع راتبي" : "My employer didn't pay my salary",
                locale === "ar" ? "المالك يرفض إرجاع ضمان" : "Landlord won't return deposit",
                locale === "ar" ? "تم فصلي من العمل" : "I was terminated from my job",
                locale === "ar" ? "هل يمكن طردي من الشقة؟" : "Can I be evicted?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => { setInput(suggestion); }}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-primary text-white rounded-br-sm"
                  : "bg-gray-100 text-gray-800 rounded-bl-sm"
              }`}
            >
              <div className="whitespace-pre-line text-sm leading-relaxed">{msg.content}</div>
              {msg.topic_slug && (
                <a
                  href={`/ar/topics/${msg.topic_slug}`}
                  className="block mt-2 text-xs underline opacity-80 hover:opacity-100"
                >
                  {locale === "ar" ? "← اعرض الموضوع في المكتبة" : "← View topic in library"}
                </a>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
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
          placeholder={locale === "ar" ? "اكتب سؤالك القانوني هنا..." : "Type your legal question here..."}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-gray-900"
          dir="rtl"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {locale === "ar" ? "إرسال" : "Send"}
        </button>
      </div>
    </div>
  );
}
