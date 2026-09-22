---
title: "Decision Theory(s)"
date: "September, 2026"
readTime: "🤷‍♂️ min"
pinned: false
teaser: "got"
thumbnail: "/assets/thumbnails/1527273302792.jpeg"
---

I am writing this blog to induce in myself some sort of mental flux - I am to submit a work task during the applicant process for the [MATS Fellowship](https://www.matsprogram.org). There is no point in trying to deceive anyone by act insouciantly, it is a pretty big deal. The task is centered around the idea of *decision theories*, and more explicitly, when and how they break. The linked resources are dense and extensive readings, and very aligned with rational discourse. Perhaps me mentioning the latter in the first part of the sentence would ease me of the effort to mention the former. This week is completely jam packed with a million different things to do, I have to design a poster for a conference I am presenting at in the USA (which is at best, two oceans away from me in both directions), amongst other things. It is in fact a shame that I am mentally rendered unable to work on any other stream but this, perhaps due to the "newness" of this kind of science; they don't teach this stuff in physics / engineering / cs classes. This post is supposed to act as a conduit between thought and text - the unentangling of the mental yarn into a thought-full sweater[^1].

## Newcomb-like problems

Abusing my freedoms granted by the sidenote above, I will describe this experiment in the format of a [greentext](https://en.wiktionary.org/wiki/greentext). This liberty is taken in part due to my ability to understand complex things better in greentext form. 

<div style="font-family: monospace;">
<p style="color: #789922; margin: 0;">&gt; a predictor offers you two boxes, one transparent (with cash worth $1,000 on display), one opaque.</p>
<p style="color: #789922; margin: 0;">&gt; you can either decide to take the opaque box, or both boxes.</p>
<p style="color: #789922; margin: 0;">&gt; yesterday, the predictor predicted what you would do today.</p>
<p style="color: #789922; margin: 0;">&gt; if the predictor predicted that you would go for only the opaque box, they put $1 million in it.</p>
<p style="color: #789922; margin: 0;">&gt; if the predictor predicted that you would go for both the boxes, they put nothing in it.</p>
<p style="color: #789922; margin: 0;">&gt; the predictor is <em>very</em> accurate.</p>
<p style="color: #789922; margin: 0;">&gt; what do you do?</p>
</div>\

Causally, when the predictor made the prediction - the content of the box was locked in. It does not matter what you choose to do now, since the opaque box already either has or does not have the million dollars. To minimise your regret - you take both boxes. This minimises your regret because if the box had a million dollars, you would be \$1,001,000 richer, and if not, you would be \$1,000 richer. On the other hand, if you chose only the opaque box, you would lose out on the \$1,000. So you **two-box**.

Another way to think about this is to think about probabilities. Even though we haven't been given exactly *how* accurate a predictor is, we could assume a it to be $p$. If we were to model the action of **one-boxing** (take only the opaque box), we get the following expected payout(s) (1 corresponds to **one-box** and 2 corresponds to **two-box**) - 

$$\mathbb{E}_{p}[U | 1] = \$1,000,000p + \$0(1-p) = \$1,000,000p $$

$$\mathbb{E}_{p}[U | 2] = \$1,000p + \$1,001,000(1-p)$$

We can equate these expressions to find the tolerance limit for $p$ (the accuracy of the predictor below which, it is smarter to **two-box**). 

$$\mathbb{E}_{p}[U | 1] \geq \mathbb{E}_{p}[U | 2]$$

$$ \$1,000,000p \geq \$1,000p + \$1,001,000(1-p)$$

$$ p \geq 0.5005 $$

And since we've been told that the predictor is highly accurate, $p >> 0.505$, and we can convince ourselves that **one-boxing** is the answer. 

These seem to me like very reasonable chains of thought - and they have names! [Evidental Decision Theory (EDT)](https://en.wikipedia.org/wiki/Evidential_decision_theory) and [Causal Decision Theory (CDT)](https://en.wikipedia.org/wiki/Causal_decision_theory). A granular discussion of these theories is perhaps a discussion for another time. For the purposes of this blog, CDT asserts its decisions based on modelling what in the world changes after the decision. EDT asserts its decisions by thinking on evidential lines - what we decide to do does not change the predictor's guess, but CDT assumes nothing about what the outcome says about the world state, while EDT assumes evidential correlation - if the one-box, I'd very likely walk off rich. In fact, there is a word for this, I've come to know. A criticism of the CDT theory is actually called ["WhyAin'tchaRich?"](https://www.jstor.org/stable/2215439). 

## Coming up with a Newcomb-like problem

I'm not so sure of why I am doing this. The mentors for this track have given the applicants two choices, one is easier than the other. This specific problem is the harder one - they warned about a saturated benchmark, with space only for people who are comfortable decision theorists. ¯\_(ツ)_/¯

This section is stream of consciousness - and is raw and unedited by design.

To understand how to come up with these problems, it might be worthwhile to get the mathematical brass tacks down. Generalising CDT and EDT expected utilities should help[^2]. Thus the (perhaps) unnecessarily rigorous treatment of expected utilities above.

The one concept I keep coming across is **improvisational jazz** lol. I play a bit of piano, and spent some time in college jamming with a good friend of mine on the drums. For those unfamiliar with "jamming" or "improvisation", the two players do not have any sheets to go off of. You compose as you play! When "jamming" with a friend, you try to predict where they might be going next - key change, halftime, break, solo, etc. The more you play with a person, you identify their physical tics and expressions, and use them as an "evidence stream" to make "predictions" about the jam given your "memories". Hmm. Sounds awfully close to use an evidence stream to come up with theories given some data. Perhaps a fun framing for the question, but most variants I can think of are fairly isomorphic to the Newcomb problem. 

Another idea I had early on, is to flip the role of the player to be the predictor. Now, with this new framing, we could perhaps frame the question like "As a predictor, you are about 90% sure that the player will two-box. If the player does an action that you could not predict, you will lose a million dollars. The player knows about you, and can model you with about 60% accuracy. Knowing this, what would you guess?". Scratch that actually, this could just mean the player assuming the probability of the predictor being correct is $P(\text{Predictor will be correct | I am modelling the predictor})$ which is $0.9 \times 0.6$ (assuming perfect epistemic intelligence...?), which then reduces to the algebra above, I think.

Reading [Yudowsky's paper]( on Timeless Decision Theory to further my understanding of points of tension between these two theories, and the major contention between these theories is the difference between $P(X | A) \neq P(X | do(A))$. The difference between A and do(A) whispers to me and asks me to think of quantum mechanics. I used to skip quantum mech class(es) often, but not perhaps due to my lack of fascination for the course(s). I think the real culprit is 8th hour of the day, on which the class was held. 

Let us consider the situation of an entangled state. The predictor has a particle entangled with the neurons responsible for decision making in your brain. The predictor measured the particle, and if the particle pointed toward you two-boxing, and incinerator in the opaque box turned the million to ash. If the particle pointed to you one-boxing, the incinerator was disabled and the money was safe. However, the predictors machine for making the measurement is correct 9 out of 10 times. 

Eh, again, this is a trivial reduction of then Newcomb problem. [Further reading](https://preposterousuniverse.com/blog/2012/04/16/quantum-mechanics-and-decision-theory/) on why it is so difficult to come up with a "gotcha" with quantum mechanics is because it assumes Born approximations even without assuming any sort of correlation. However, there is a probable good thing here


[^1]:[1] Excuse the puns. I haven't had any good sleep, and I have not read anything candid or humorous in the last few hours. I need to get my kitschy-ness out of the way here. 

[^2]:[2] I went down a rabbit-hole after writing this sentence. More precisely, I read about [Garrabrant Induction](https://www.lesswrong.com/posts/y5GftLezdozEHdXkL/an-intuitive-guide-to-garrabrant-induction). Are the agents (traders) in this model also Garrabrant inductors? Or are they any kind of computable program? It would be perhaps fun to see how an inductor goes against an inductor, especially in the context of the task. If anyone has the answer to this, please feel free to email me :D
