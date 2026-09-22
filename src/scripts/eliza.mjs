// A small, original DOCTOR-style script, not a transcription of the 1966 program.
const reflections = { i: 'you', me: 'you', my: 'your', mine: 'yours', myself: 'yourself', am: 'are', you: 'I', your: 'my', yours: 'mine', yourself: 'myself', are: 'am', was: 'were', were: 'was' };
export function reflect(text) {
  return text.replace(/\b(i|me|my|mine|myself|am|you|your|yours|yourself|are|was|were)\b/gi, word => reflections[word.toLowerCase()]);
}
const rules = [
  [/\b(?:hello|hi|hey)\b/i, ['Hello. What is on your mind?', 'What would you like to talk about?']],
  [/\b(?:sorry|apologize)\b/i, ['What makes you feel you need to apologize?', 'There is no need to apologize. Please go on.']],
  [/\b(?:mother|father|sister|brother|family|parents?)\b/i, ['Tell me more about your family.', 'How do you feel about that relationship?']],
  [/\bi remember (.+)/i, ['What brings {1} to mind?', 'What else do you remember about {1}?']],
  [/\bi dream(?:ed|t)?(?: about| of)? (.+)/i, ['What does {1} suggest to you?', 'How did you feel in that dream?']],
  [/\bi feel (.+)/i, ['What makes you feel {1}?', 'Do you often feel {1}?', 'When did you begin to feel {1}?']],
  [/\bi am (.+)/i, ['How long have you been {1}?', 'What does being {1} mean to you?', 'How do you feel about being {1}?']],
  [/\bi cannot (.+)/i, ['What makes you think you cannot {1}?', 'What would happen if you could {1}?']],
  [/\bi (?:want|need) (.+)/i, ['What would it mean to you to have {1}?', 'Why do you want {1}?']],
  [/\bi do not (.+)/i, ['Why do you not {1}?', 'Have you always felt that way?']],
  [/\bcan you (.+)/i, ['What makes you ask whether I can {1}?', 'Would you like to be able to {1} yourself?']],
  [/\byou are (.+)/i, ['What makes you think I am {1}?', 'Does it matter to you whether I am {1}?']],
  [/\bbecause (.+)/i, ['Is that the only reason?', 'What other reasons come to mind?']],
  [/\b(?:always|never|everyone|nobody)\b/i, ['Can you think of a particular example?', 'Are there any exceptions?']],
  [/\b(?:computer|machine|chatbot|eliza)\b/i, ['What do you think about talking to a computer?', 'What do you expect a machine to understand?']],
  [/\b(?:yes|no)\b/i, ['Could you say a little more about that?', 'What leads you to that answer?']],
  [/\b(?:bye|goodbye)\b/i, ['Goodbye. Thank you for the conversation.']],
];
export function createEliza() {
  const counts = new Map();
  const memories = [];
  let fallback = 0;
  return function reply(input) {
    const text = input.trim().replace(/[’]/g, "'").replace(/\bi'm\b/gi, 'i am').replace(/\bi've\b/gi, 'i have').replace(/\bi'll\b/gi, 'i will').replace(/\byou're\b/gi, 'you are').replace(/\bcan't\b/gi, 'cannot').replace(/\bdon't\b/gi, 'do not').replace(/[.!?]+$/g, '');
    if (!text) return '';
    const memory = text.match(/\bmy ([^.!?]+)/i);
    for (const [pattern, responses] of rules) {
      const match = text.match(pattern);
      if (!match) continue;
      if (memory) {
        memories.push(reflect(memory[1]));
        if (memories.length > 5) memories.shift();
      }
      const count = counts.get(pattern) || 0;
      counts.set(pattern, count + 1);
      return responses[count % responses.length].replace(/\{(\d+)\}/g, (_, index) => reflect(match[Number(index)] || ''));
    }
    if (memory) return `Tell me more about your ${reflect(memory[1])}.`;
    if (memories.length) return `Earlier you mentioned your ${memories.shift()}. Could you say more about that?`;
    const responses = ['Please go on.', 'What feels most important about that?', 'Could you give an example?', 'How does that make you feel?'];
    return responses[fallback++ % responses.length];
  };
}
