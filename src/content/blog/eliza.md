---
title: "a conversation with ELIZA"
date: "September 22, 2026"
readTime: "3 min"
pinned: false
teaser: "a small experiment in being heard by a machine."
thumbnail: "/assets/thumbnails/eliza.svg"
---

Below is an implementation of the ELIZA source code[^1]. This is an archaic language model, which functions on deliberate pattern matching. While being developed in the lab, the developer's secretary allegedly asked the developer to close the door before she could talk to ELIZA. Transcripts from interactions with humans point toward an eagerness to open up[^2]. 

<eliza-chat>
<div role="log" aria-label="Conversation with ELIZA" aria-live="polite" aria-relevant="additions" tabindex="0"><p>&gt;HELLO. WHAT IS ON YOUR MIND?</p></div>
<form autocomplete="off"><input type="text" aria-label="Your message to ELIZA" placeholder="say something…" maxlength="1000" disabled><button type="submit" disabled>send</button></form>
<noscript>Enable JavaScript to talk to ELIZA.</noscript>
</eliza-chat>


>The fundamental technical problems with which ELIZA must be preoccupied are the following:

>The identification of the "most important" keyword occurring in the input message.
>The identification of some minimal context within which the chosen keyword appears; e.g., if the keyword is "you", is it followed by the word "are" (in which case an >assertion is probably being made).
>The choice of an appropriate transformation rule, and, of course, the making of the transformation itself.
>The provision of a mechanism that will permit ELIZA to respond "intelligently" when the input text contained no keywords.
>The provision of machinery that facilitates editing, particularly extension, of the script on the script writing level

[^1]: [1] Weizenbaum's [original paper](https://courses.cs.umbc.edu/331/papers/eliza.html), published in *Communications of the ACM*, January 1966, describes the program and includes an example conversation.

[^2]: [2] [An excerpt](https://courses.cs.umbc.edu/331/papers/eliza.html#:~:text=Men%20are%20all,the%20machine%20responses.) from the Weizenbaum paper.  
