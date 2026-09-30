---
title: "Decision Theory(s)"
date: "16/9/26"
readTime: "7-10 min"
pinned: false
teaser: "got"
thumbnail: "/assets/thumbnails/1527273302792.jpeg"
---

I am writing this blog to get my thoughts moving - I have a work task to submit as part of my application to the [MATS Fellowship](https://www.matsprogram.org). There is no point in feigning insouciance; it is a pretty big deal. The task centres on *decision theories*, and more specifically, when and how they break. The linked readings are dense, extensive, and steeped in rationalist discourse. Perhaps mentioning the last of those would have saved me the first two. This week is already packed: amongst other things, I have to design a poster for a conference I am presenting at in the USA (an ocean away, whichever way I go). It is a shame that I can't seem to work on anything else, perhaps because of the "newness" of this kind of science; they don't teach this stuff in physics / engineering / cs classes. This post is supposed to act as a conduit between thought and text - untangling the mental yarn into a thought-full sweater[^1].

## Newcomb-like problems

Abusing the freedoms granted by the sidenote above, I will describe this experiment as a [greentext](https://en.wiktionary.org/wiki/greentext). I find complex things easier to understand in greentext form.

<div style="font-family: monospace;">
<p style="color: #789922; margin: 0;">&gt; a predictor offers you two boxes, one transparent (with cash worth $1,000 on display), one opaque.</p>
<p style="color: #789922; margin: 0;">&gt; you can either decide to take the opaque box, or both boxes.</p>
<p style="color: #789922; margin: 0;">&gt; yesterday, the predictor predicted what you would do today.</p>
<p style="color: #789922; margin: 0;">&gt; if the predictor predicted that you would go for only the opaque box, they put $1 million in it.</p>
<p style="color: #789922; margin: 0;">&gt; if the predictor predicted that you would go for both boxes, they put nothing in it.</p>
<p style="color: #789922; margin: 0;">&gt; the predictor is <em>very</em> accurate.</p>
<p style="color: #789922; margin: 0;">&gt; what do you do?</p>
</div>

From a causal perspective, the contents of the box were locked in yesterday. Your choice now cannot change them: the opaque box already either has or does not have the million dollars. To minimise your regret, you take both boxes. If the opaque box has a million dollars, you leave \$1,001,000 richer; if not, you leave \$1,000 richer. Taking only the opaque box would mean missing out on the extra \$1,000 either way. So you **two-box**.

Another way to approach this is through probabilities. We haven't been told exactly *how* accurate the predictor is; let us assume an accuracy of $p$ for either choice. We then get the following expected payouts (1 corresponds to **one-boxing** and 2 to **two-boxing**) -

$$\mathbb{E}_{p}[U | 1] = \$1,000,000p + \$0(1-p) = \$1,000,000p $$

$$\mathbb{E}_{p}[U | 2] = \$1,000p + \$1,001,000(1-p)$$

We can compare these expressions to find the threshold for $p$ below which it is smarter to **two-box**.

$$\mathbb{E}_{p}[U | 1] \geq \mathbb{E}_{p}[U | 2]$$

$$ \$1,000,000p \geq \$1,000p + \$1,001,000(1-p)$$

$$ p \geq 0.5005 $$

And since we've been told that the predictor is highly accurate ($p \gg 0.5005$), we can convince ourselves that **one-boxing** is the answer.

These seem to me like very reasonable chains of thought - and they have names! [Causal Decision Theory (CDT)](https://en.wikipedia.org/wiki/Causal_decision_theory) and [Evidential Decision Theory (EDT)](https://en.wikipedia.org/wiki/Evidential_decision_theory), respectively. A detailed discussion is perhaps best left for another time. For the purposes of this blog, CDT asks what a decision would cause to change in the world. EDT asks what that decision would be evidence of. Neither requires our choice to change the predictor's earlier guess; EDT treats one-boxing as evidence that the million is already there. If I one-box, I'd very likely walk off rich. There is even a name for this criticism of CDT, I've come to learn: ["WhyAin'tchaRich?"](https://www.jstor.org/stable/2215439).

## Coming up with a Newcomb-like problem

I'm not so sure why I am doing this. The mentors for this track have given applicants two choices, one easier than the other. This problem is the harder one - they warned about a saturated benchmark, with room only for people already comfortable with decision theory. `¯\_(ツ)_/¯`

This section is stream of consciousness by design.

To understand how to come up with these problems, it might be worthwhile to get down to mathematical brass tacks. Generalising the expected utilities for CDT and EDT should help[^2]. Hence the (perhaps) unnecessarily rigorous treatment of expected utilities above.

The one concept I keep coming back to is **improvisational jazz** lol. I play a bit of piano, and spent some time in college jamming with a good friend of mine on the drums. For those unfamiliar with "jamming" or "improvisation", there is no fixed score to follow. You compose as you play! When jamming with a friend, you try to predict where they might be going next - key change, half-time, break, solo, etc. The more you play with a person, the better you recognise their physical tics and expressions, using them as an "evidence stream" to make "predictions" about the jam given your "memories". Hmm. Sounds awfully close to forming hypotheses from evidence and prior experience. Perhaps a fun framing for the question, but most variants I can think of are fairly isomorphic to Newcomb's problem.

Another idea I had early on was to put the player in the predictor's shoes. We could frame the question like this: "As a predictor, you are about 90% sure that the player will two-box. If the player does something you did not predict, you lose a million dollars. The player knows about you, and can model you with about 60% accuracy. Knowing this, what would you guess?" Scratch that, actually. Could the player just assign a probability $P(\text{Predictor will be correct | I am modelling the predictor})$ and reduce this to the algebra above? My first instinct was $0.9 \times 0.6$, though I haven't justified multiplying those probabilities.

Reading [Yudkowsky's paper](https://intelligence.org/files/TDT.pdf) on Timeless Decision Theory, I keep returning to a point of tension: $P(X | A) \neq P(X | do(A))$. The difference between $A$ and $do(A)$ whispers to me and asks me to think of quantum mechanics. I used to skip quantum mech classes often, though not for lack of fascination. I think the real culprit was their slot in the eighth hour of the day.

Let us imagine an entangled state. The predictor has a particle entangled with the neurons responsible for decision making in your brain. The predictor measured the particle, and if the result pointed toward you two-boxing, an incinerator in the opaque box turned the million to ash. If it pointed to you one-boxing, the incinerator was disabled and the money was safe. However, the predictor's measurement apparatus is correct 9 out of 10 times.

Eh, again, this reduces to Newcomb's problem. [Further reading](https://preposterousuniverse.com/blog/2012/04/16/quantum-mechanics-and-decision-theory/) on quantum mechanics and decision theory gives me more to untangle before I can claim a quantum "gotcha".


[^1]:[1] Excuse the puns. I haven't had any good sleep, and I have not read anything candid or humorous in the last few hours. I need to get the kitsch out of my system here.

[^2]:[2] I went down a rabbit hole after writing this sentence. More precisely, I read about [Garrabrant Induction](https://www.lesswrong.com/posts/y5GftLezdozEHdXkL/an-intuitive-guide-to-garrabrant-induction). Are the agents (traders) in this model also Garrabrant inductors? Or can they be any kind of computable program? It might be fun to see how one inductor fares against another, especially in the context of the task. If anyone has the answer to this, please feel free to email me :D
