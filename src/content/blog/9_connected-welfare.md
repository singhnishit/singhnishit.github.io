---
title: "connected welfare(s)"
date: "16/10/2026"
sortDate: "2026-10-16"
homepagePinned: true
readTime: "10 min"
pinned: false
teaser: ""
aiDisclosure:
  - icon: fingerprint
    text: "This blogpost is human generated."
  - icon: seven-finger-hand
    text: "Implementations for the interactive partial information decomposition diagrams and the thumbnail/teaser images were AI generated."
context:
  logos: [lossfunk]
  text: >-
    Work done as part of the research fellowship at [Lossfunk](https://lossfunk.com). Thanks to [Paras](https://x.com/paraschopra) for early discussions.
thumbnail: "/assets/eigenism/hands-thumbnail-white.png"
---

Dealing with topics like welfare is difficult by construction. If we do not have a well formed idea of what "welfare" means, one must work towards designing a definition. If we do have a well-formed idea, it becomes difficult then, to deal with the consequences of the definition. For example, we have a fairly thorough idea of what the welfare function looks like for an RL agent - and the connotations of the welfare ([utility](https://www.lesswrong.com/w/utility)) function being well defined are difficult problems to solve (for example, [power-seeking tendencies](https://arxiv.org/abs/1912.01683), or [incorrigibility](https://www.alignmentforum.org/w/corrigibility-1)). Similarly, since we do not have a well-formed definition of welfare for humanity, there remain topics which are hotly contested (for example, euthanasia, or the death penalty).

Several camps in philosophy have tried to construct definitions of "welfare". Egoism places the "self" or the "individual" as the epicenter of human motivation. You pursue goals and take actions which prove to be (directly or indirectly) desirable to your "self". Utilitarianism posits that any action should be taken with the consideration of maximising overall welfare to every single affected entity. Egoism leaves no room for [martyrdom](https://www.google.com/search?q=https://theanarchistlibrary.org/library/morse-monroe-egoism-conscious-and-unconscious%23:~:text%3DA%2520man%2520is,all%2520the%2520virtues.), and utilitarianism [asks too much of us](https://utilitarianism.net/objections-to-utilitarianism/demandingness/).

Consider a compromise - your actions should take into consideration the people it affects, but the consideration should be weighed by how "close" they are to you. This is the fulcrum of the arguments laid out in the [eigenism](https://eigenism.org) text. Suppose we could [somehow calculate](https://singhnishit.github.io/blog/8_eigenism/) how "close" someone is to an "individual", how do we define "the people it affects"?

## Towards collective welfare

Consider a full network of entities, where the action(s) of a certain entity not only influence the wellbeing of the "self", but also of everyone around the entity. The influence of these actions are weighed by how "connected" the concerned parties are. Additionally, the "connected-ness" is proportional the rarity of the mutual information the entities share - making entities sharing "rarer" information more connected. For example, two fans of a huge pop star - they're relatively less likely to make friends than fans of a nicher, more underground artist[^1].

We could recursively construct a utility function for an agent $\mathcal{U}$, where the wellbeing of $\mathcal{U}$ depends on the wellbeings of every other agent in the network weighed by , and a baseline wellbeing $b_U$ that is unique to the agent under consideration -

$$
\mathcal{S}_{U} = b_U + \sum\limits_{\forall i \neq U} c_i \cdot \mathcal{S}_i
$$

An immediate problem with this is infinite feedback. For a system with two maximally connected ($c = 1$) agents  $S_1$ and $S_2$ -
$$
S_1 = b_1 + S_2\\
S_2 = b_2 + S_1
$$

Solving the system of equations gives us $S_1 = b_1 + b_2 + S_1$ - repeatedly calculating these scores baloons the values of $S_1$ and $S_2$ infinitely. Introducing a feedback strength variable $\gamma$ -

$$
\mathcal{S}_{U} = b_U + \gamma \sum\limits_{\forall i \neq U} c_i \cdot \mathcal{S}_i\\[10pt]
\boxed{S_U=\sum_j c_{Uj}(b_j+\gamma S_j)}
$$

Where $c_{ij} = 1$ if $i = j$.





[^1]:[1] An attempt of constructing the "connected-ness" value can be found [here](https://singhnishit.github.io/blog/8_eigenism/). The writeup tries to construct an expression of "connected-ness" that is -

    1. Based off of the mutual information between two entities (*see* [Shannon Entropy](https://en.wikipedia.org/wiki/Entropy_(information_theory))),

    2. Proportional to how "rare" the mutual information is - common mutual information is valued lower (*see* [Shapley Values](https://en.wikipedia.org/wiki/Shapley_value)),

    3. Rewards all kinds of "individual" (information that is useful with only the individual carrier), "collective" (useful if any individual from a certain collective is under consideration), and "synergistic" (only useful if every individual from a certain coalition is under consideration) types of information,

    4. Discourages gaming the system via RNG generators which create the "rarest" (highest entropy) information, copies of which would be significantly more connected to each other than, say, information like the output of a computable program (*see* [Gell-Mann-Lloyd effective complexity](https://en.wikipedia.org/wiki/Effective_complexity)).
