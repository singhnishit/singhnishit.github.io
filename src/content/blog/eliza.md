---
title: "a conversation with ELIZA"
date: "September 22, 2026"
readTime: "3 min"
pinned: false
teaser: "a small experiment in being heard by a machine."
thumbnail: "/assets/thumbnails/eliza.svg"
---

There is something interesting about a question that gives your own words back to you. Say “I feel uncertain”, and a machine asks what makes you feel uncertain. It has offered very little. Still, there is an invitation to keep talking.

Joseph Weizenbaum described ELIZA in 1966: a program that used rules to turn written input into replies. Its famous DOCTOR script borrowed the conversational style of a nondirective psychotherapist, often responding with a question.[^1]

## try it

This is a small ELIZA-style implementation. Try “I feel nervous about my work”, or talk about a dream, a memory, or your family. There is no language model behind the box; just patterns and responses.[^2]

<eliza-chat>
<div role="log" aria-label="Conversation with ELIZA" aria-live="polite" aria-relevant="additions" tabindex="0"><p>&gt;HELLO. WHAT IS ON YOUR MIND?</p></div>
<form autocomplete="off"><input type="text" aria-label="Your message to ELIZA" placeholder="say something…" maxlength="1000" disabled><button type="submit" disabled>send</button></form>
<noscript>Enable JavaScript to talk to ELIZA.</noscript>
</eliza-chat>

The conversation stays in this page. Nothing you type is sent to a server or saved; leaving the page starts a new conversation. This is a conversational experiment, not a therapist.

## a few rules, and a little reflection

The script looks for a matching pattern, extracts part of the sentence, and places it inside a response. For example, “I feel nervous about my work” matches `I feel …`. The captured phrase becomes “nervous about your work”, and the reply asks: “What makes you feel nervous about your work?”

The small change from *my* to *your* helps the sentence sound like a response from someone else. Repeating a pattern cycles through different replies. A few mentions of “my …” are held in memory and can be brought back when no rule matches. Otherwise, the program uses a general prompt to keep the conversation moving.[^3]

Try repeating yourself. Try changing just one word. Try giving it a sentence with two different topics. Its limits become visible quite quickly: the script follows its rules even when the resulting question makes very little sense.

## who is doing the understanding?

The interesting part of this little box is how much work the reader can do on its behalf. A vague question leaves room for an interpretation; a repeated phrase can feel like attention. Knowing the mechanism does not necessarily remove that feeling.

You can inspect that gap directly here. Have a conversation, then look for the rule behind the response. At what point does a question feel like someone is listening?

[^1]: Weizenbaum's [original paper](https://courses.cs.umbc.edu/331/papers/eliza.html), published in *Communications of the ACM*, January 1966, describes the program and includes an example conversation.

[^2]: This is a compact adaptation of the idea, not an exact recreation of the original DOCTOR script. Everything runs locally in your browser.

[^3]: Here, “memory” is a short list of phrases kept while the page is open. It does not learn from the conversation or remember you on another visit.
