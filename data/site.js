/* Edit these values to change the promo + links. */
const SITE = {
  brand: "Tarot With Himu",
  url: "https://tarotwithhimu.com/",
  utm: "?utm_source=chakra-app&utm_medium=promo&utm_campaign=chakra-reading",
  whatsapp: "" // e.g. "https://wa.me/91XXXXXXXXXX" - shows a second button when filled
};

const PROMO = {
  en: Object.assign({"announce": "✨ Personal Chakra Reading by Tarot With Himu —", "announceCta": "Book now →", "badge": "Personal Chakra Reading", "title": "Not sure which chakra needs attention?", "body": "Get a personalised Chakra Reading with Himu of Tarot With Himu. Reflect on which of your seven chakras may be out of balance and receive simple, practical guidance to work with them.", "points": ["Personalised to you, not a generic list", "Guidance drawing on Vedic astrology, tarot & numerology", "Practical steps: affirmations, crystals and meditation"], "cta": "Book a Chakra Reading", "visit": "Visit tarotwithhimu.com", "note": "For spiritual reflection only — not a substitute for medical advice.", "modalCta": "Get a personal reading →", "faqHeading": "Frequently Asked Questions", "footer": "Chakra content is shared for spiritual and educational reflection and is not medical advice. Consult a qualified doctor for any health concern.", "by": "Made with care by"}, {modalLead: n=>`Feeling your ${n} is out of balance?`}),
  as: Object.assign({"announce": "✨ Tarot With Himu-ৰ পৰা ব্যক্তিগত চক্ৰ ৰিডিং —", "announceCta": "এতিয়াই বুক কৰক →", "badge": "ব্যক্তিগত চক্ৰ ৰিডিং", "title": "কোনটো চক্ৰত মনোযোগৰ প্ৰয়োজন, নিশ্চিত নহয়নে?", "body": "Tarot With Himu-ৰ হিমুৰ পৰা এক ব্যক্তিগত চক্ৰ ৰিডিং লওক। আপোনাৰ সাতটা চক্ৰৰ কোনটো ভাৰসাম্যহীন হ’ব পাৰে সেই বিষয়ে ভাবক আৰু সহজ, ব্যৱহাৰিক পথ-নিৰ্দেশনা লওক।", "points": ["সাধাৰণ তালিকা নহয়, আপোনাৰ বাবে ব্যক্তিগতকৃত", "বৈদিক জ্যোতিষ, টেৰট আৰু সংখ্যাতত্ত্বৰ ওপৰত আধাৰিত পথ-নিৰ্দেশনা", "ব্যৱহাৰিক পদক্ষেপ: নিশ্চিতি, স্ফটিক আৰু ধ্যান"], "cta": "চক্ৰ ৰিডিং বুক কৰক", "visit": "tarotwithhimu.com চাওক", "note": "কেৱল আধ্যাত্মিক চিন্তাৰ বাবে— চিকিৎসাৰ বিকল্প নহয়।", "modalCta": "ব্যক্তিগত ৰিডিং লওক →", "faqHeading": "সঘনাই সোধা প্ৰশ্ন", "footer": "চক্ৰ সম্পৰ্কীয় বিষয়বস্তু আধ্যাত্মিক আৰু শৈক্ষিক চিন্তাৰ বাবে; ই চিকিৎসা পৰামৰ্শ নহয়। স্বাস্থ্য সম্পৰ্কীয় যিকোনো সমস্যাত যোগ্য চিকিৎসকৰ পৰামৰ্শ লওক।", "by": "যত্নেৰে নিৰ্মিত:"}, {modalLead: n=>`আপোনাৰ ${n} ভাৰসাম্যহীন যেন লাগিছেনে?`})
};

const FAQ = {
 "en": [
  {
   "q": "What are the seven chakras?",
   "a": "The seven chakras are the Root (Muladhar), Sacral (Swadhisthana), Solar Plexus (Manipura), Heart (Anhata), Throat (Visuddhi), Brow (Ajna) and Crown (Sahasrara) chakras, running from the base of the spine to the top of the head."
  },
  {
   "q": "How can I balance my chakras?",
   "a": "Common ways include meditation for chakra healing, chakra balancing affirmations, chakra yoga with sound, changing your diet, and chakra healing Reiki. You can combine them or pick one or two that suit your needs."
  },
  {
   "q": "What are the signs of a blocked chakra?",
   "a": "Each chakra has its own balanced and unbalanced traits. For example, an unbalanced Root chakra is linked with anxiety, fear and insecurity, while an unbalanced Throat chakra is linked with shyness and fear of speaking. Open any chakra card to see its full list."
  },
  {
   "q": "What is a Chakra Reading?",
   "a": "A Chakra Reading is a personalised session with Himu of Tarot With Himu to reflect on which of your chakras may need attention and how to work with them. Himu also offers Vedic astrology, tarot and numerology consultations."
  }
 ],
 "as": [
  {
   "q": "সাতটা চক্ৰ কি কি?",
   "a": "সাতটা চক্ৰ হ’ল মূল (মূলাধাৰ), সক্ৰেল (স্বাধিষ্ঠান), ছ’লাৰ প্লেক্সাছ (মণিপুৰ), হৃদয় (অনাহত), কণ্ঠ (বিশুদ্ধি), ভ্ৰূ (আজ্ঞা) আৰু শিৰোভাগ (সহস্ৰাৰ) চক্ৰ, যিবোৰ মেৰুদণ্ডৰ মূলৰ পৰা মূৰৰ ওপৰলৈ অৱস্থিত।"
  },
  {
   "q": "মই কেনেকৈ মোৰ চক্ৰসমূহ ভাৰসাম্য ৰাখিম?",
   "a": "চক্ৰ নিৰাময়ৰ বাবে ধ্যান, চক্ৰ ভাৰসাম্যৰ নিশ্চিতি, শব্দৰ সৈতে চক্ৰ যোগ, খাদ্য সলনি কৰা আৰু চক্ৰ নিৰাময় ৰেইকি— এইবোৰ সাধাৰণ উপায়। আপুনি এইবোৰ একেলগে ব্যৱহাৰ কৰিব পাৰে বা প্ৰয়োজন অনুসৰি এটা-দুটা বাছনি কৰিব পাৰে।"
  },
  {
   "q": "অৱৰোধিত চক্ৰৰ লক্ষণ কি?",
   "a": "প্ৰতিটো চক্ৰৰ নিজস্ব ভাৰসাম্যপূৰ্ণ আৰু অভাৰসাম্যপূৰ্ণ লক্ষণ আছে। উদাহৰণস্বৰূপে, অভাৰসাম্যপূৰ্ণ মূল চক্ৰ উদ্বেগ, ভয় আৰু অনিৰাপত্তাৰ সৈতে জড়িত, আৰু কণ্ঠ চক্ৰ লাজুকতা আৰু কথা কোৱাৰ ভয়ৰ সৈতে জড়িত। সম্পূৰ্ণ তালিকা চাবলৈ যিকোনো চক্ৰ কাৰ্ড খোলক।"
  },
  {
   "q": "চক্ৰ ৰিডিং (Chakra Reading) কি?",
   "a": "চক্ৰ ৰিডিং হৈছে Tarot With Himu-ৰ হিমুৰ সৈতে এক ব্যক্তিগত অধিৱেশন, য’ত আপোনাৰ কোনটো চক্ৰত মনোযোগৰ প্ৰয়োজন হ’ব পাৰে আৰু সেয়া কেনেকৈ সামলাব লাগে সেই বিষয়ে ভাবিব পাৰি। হিমুৱে বৈদিক জ্যোতিষ, টেৰট আৰু সংখ্যাতত্ত্ব পৰামৰ্শও আগবঢ়ায়।"
  }
 ]
};
