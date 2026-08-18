import { NextResponse } from "next/server";

interface AIRequest {
  message: string;
  locale?: string;
}

const KEYWORD_RESPONSES: Record<string, { answer: string; topicSlug?: string }> = {
  deposit: {
    answer: `Regarding security deposit refunds in Jordan:

**What the law says:**
When a lease ends and you have paid all rent and returned the property in good condition, the landlord is generally expected to refund the deposit, deducting only documented, legitimate amounts.

**Steps you should take:**
1. Check your written contract for the deposit clause
2. Send a formal written demand (WhatsApp + email)
3. Try negotiation / mediation
4. If refused, file a civil case at the Magistrates' Court

**Documents needed:**
- Lease contract (signed)
- Deposit payment proof
- Rent payment proofs
- Handover evidence (photos/video)

📎 Based on: Civil Code No. 36 of 1976, Articles 624-662

⚠ This is general information, not legal advice.`,
    topicSlug: "security-deposit-refund",
  },
  salary: {
    answer: `Regarding unpaid salary in Jordan:

**Your rights under Labor Law No. 8 of 1996:**
- Employers must pay wages on the agreed date
- Wages must be paid in Jordanian Dinars
- Late payment may entitle you to compensation

**Steps you should take:**
1. Gather your employment contract and pay slips
2. File a complaint with the Ministry of Labor
3. If unresolved, file a case at the Labor Court
4. Consider hiring a labor lawyer

📎 Based on: Labor Law No. 8 of 1996, Articles 31-35

⚠ This is general information, not legal advice.`,
    topicSlug: "unpaid-salary",
  },
  eviction: {
    answer: `Regarding property eviction in Jordan:

**Key points:**
- A landlord cannot evict a tenant without a valid legal reason
- Eviction generally requires a court order
- Tenants have rights to adequate notice

**Valid reasons for eviction:**
- Non-payment of rent
- Violation of lease terms
- Landlord needing property for personal use (with conditions)

📎 Based on: Civil Code No. 36 of 1976, Articles 649-662

⚠ This is general information, not legal advice.`,
    topicSlug: "property-eviction",
  },
  custody: {
    answer: `Regarding child custody in Jordan:

**Under Personal Status Law No. 36 of 2017:**
- The best interest of the child is the primary consideration
- Custody and guardianship are treated as separate rights
- Both parents have rights regarding their children

**Key steps:**
1. Consult a family lawyer
2. Gather relevant documentation
3. File a case at the Sharia or Civil Court (depending on your situation)

📎 Based on: Personal Status Law No. 36 of 2017

⚠ This is general information, not legal advice.`,
    topicSlug: "child-custody",
  },
  traffic: {
    answer: `Regarding traffic fines in Jordan:

**Under Traffic Law No. 49 of 2000:**
- Traffic fines must be paid within specified deadlines
- Unpaid fines may result in vehicle registration blocks
- You have the right to contest fines in court

**What to do:**
1. Check your fines at the Traffic Department
2. Pay within the deadline to avoid penalties
3. If you believe the fine is unjust, you can contest it

📎 Based on: Traffic Law No. 49 of 2000

⚠ This is general information, not legal advice.`,
    topicSlug: "traffic-fines",
  },
};

function matchTopic(input: string): { answer: string; topicSlug?: string } {
  const lower = input.toLowerCase();
  const keywords: [string[], string][] = [
    [["وديعة", "deposit", "ضمان", "إرجاع", "return"], "deposit"],
    [["راتب", "salary", "أجر", "wage", "فصول", "termination", "عمل"], "salary"],
    [["إخلاء", "evict", "طرد", "eviction", "شقة", "apartment"], "eviction"],
    [["حضانة", "custody", "طفل", "child", "أولاد"], "custody"],
    [["مرور", "traffic", "موقف", "fine", "مخالفة"], "traffic"],
  ];

  for (const [terms, key] of keywords) {
    if (terms.some((t) => lower.includes(t))) {
      return KEYWORD_RESPONSES[key];
    }
  }

  return {
    answer: "Thank you for your question. Based on the library content, I can help guide you to relevant legal information. Could you describe your situation in more detail? For example:\n\n- What type of legal issue is it? (labor, rent, family, debt, traffic)\n- What happened and when?\n- Do you have a contract or written agreement?\n\nI will then guide you to the most relevant topic in our knowledge base.\n\n⚠ This is general information, not legal advice.",
  };
}

export async function POST(request: Request) {
  try {
    const body: AIRequest = await request.json();

    if (!body.message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const response = matchTopic(body.message);

    return NextResponse.json({
      answer: response.answer,
      topic_slug: response.topicSlug || null,
      disclaimer: "This is general information, not legal advice. Consult a qualified lawyer for advice specific to your situation.",
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
