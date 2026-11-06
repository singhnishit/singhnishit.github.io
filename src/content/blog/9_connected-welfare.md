---
title: "(3) connected welfare(s)"
description: "Nishit Singh develops a connected welfare model linking agent wellbeing and connectedness, with an interactive network of help and harm."
date: "02/11/2026"
sortDate: "2026-11-02"
homepagePinned: true
readTime: "10 min"
pinned: false
teaser: ""
aiDisclosure:
  - icon: fingerprint
    text: "This blogpost is human generated."
  - icon: seven-finger-hand
    text: "Implementations for the interactive graph toward the end of the blog were AI generated"
context:
  logos: [lossfunk]
  text: >-
    Work done as part of the research fellowship at [Lossfunk](https://lossfunk.com). Thanks to [Paras](https://x.com/paraschopra) for early discussions.
thumbnail: "/assets/thumbnails/connected-welfares.png"
---
>This blogpost is the third entry in a series about agent identities and welfare. It closely follows the ideas outlined in the [eigenism text](https://www.eigenism.org) and attempts a construction of connectedness via information theory. The first part can be viewed [here](https://singhnishit.github.io/blog/7_corrigibility/), and the second part [here](https://singhnishit.github.io/blog/8_eigenism/).

![r/place](/assets/connected-welfare/ezgif.com-gif-maker.gif)
**Unconsensus** - *I asked about 1000 [qwens](https://ollama.com/library/qwen3:0.6b) to each color a cell, one by one, and propose the change to the rest of the group. They also had to permission to "overwrite" - as in delete or update a previously colored cell. Their collective goal was to make any coherent image. The dots in the background was the canvas after 24 hours of deliberation. The airplane w*

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
\mathcal{S}_{U} = b_U + \gamma \sum\limits_{\forall i \neq U} c_i \cdot \mathcal{S}_i
$$

To consider an environment where an altruistic action (by helping a certain highly connected entity to yourself) might make its utility increase circle back to you[^2], we could include the baseline wellbeing into the brackets, allowing cyclic feedback.
$$
\boxed{S_i=\sum_j c_{ij}(b_j+\gamma S_j)}
$$

This family of equations has been well studied ([Bergstrom, 1998](https://escholarship.org/content/qt0tj4635h/qt0tj4635h.pdf)) - and has a few desirable properties. Moving away from algebraic notation and into matrices -

$$
\begin{aligned}
\mathbf S&=C(\mathbf b+\gamma\mathbf S)\\[3pt]
\mathbf S&=(I-\gamma C)^{-1}C\mathbf b \\[3pt]
\mathbf S&=C\mathbf b+\gamma C^2\mathbf b+\gamma^2C^3\mathbf b+\cdots
\end{aligned}
$$

## Desired properties
As of right now, the solution for $S$ is not assured to converge. In order for our definition to work, it must satisfy some properties, which are shown to be  To see why, following consider a "full round" of calculations for the $i$-th utility functions $T(\mathbf{S})$ and $T(\mathbf{R})$ ([Bergstrom, 1998](https://escholarship.org/content/qt0tj4635h/qt0tj4635h.pdf))-

$$
\begin{aligned}
T_i(\mathbf{S}) &= C\mathbf{b} + \gamma C \mathbf{S}\\[3pt]
T_i(\mathbf{R}) &= C\mathbf{b} + \gamma C \mathbf{R}\\[3pt]
T_i(\mathbf{S}) - T_i(\mathbf{R}) &= \gamma C (\mathbf{S} - \mathbf{R})\\[3pt]
|T_i(\mathbf S)-T_i(\mathbf R)|&=\gamma\left|\sum_j c_{ij}(S_j-R_j)\right| \\[3pt]
|T_i(\mathbf S)-T_i(\mathbf R)| &\le \gamma\sum_j c_{ij}|S_j-R_j| \\[3pt]
|T_i(\mathbf S)-T_i(\mathbf R)|&\le\gamma\left(\sum_j c_{ij}\right) \max_j|S_j-R_j| \\[3pt]
\end{aligned}
$$

And thus, as a sufficient condition for our equation to converge to a solution, we would ideally have $\gamma\max_i\sum_j c_{ij}<1$. If $\gamma <1$, our conditions are satisfied, since we have previously discussed $\max_i\sum_j c_{ij}<1$ previously[^3]. In the [original text about eigenism], the author suggests a transform $f$, through which the wellbeing function must pass through in order to dodge a few undesireable interpretations.

(1) A system must consider whether it is more important to relieve agony or create "extra ecstacy". Consider the case of Ursula K LeGuin's [The Ones Who Walk Away From Omelas](https://shsdavisapes.pbworks.com/f/Omelas.pdf), where a child is kept in agony, but it is a "desirable" outcome since the environment is otherwise utopian to its much larger populace. The construction we have built until now also rewards this outcome - relieving agony and creating "perverse ecstacy" will both equally balance our equations. Therefore, the construction must reward relieving agony *more* than creating extra ecstacy.

(2) *And from [Eigenism](https://eigenism.org), Dan Hendrycks, 2026 -*
>Connectedness tells us where a pattern resides, but it
does not, by itself, tell us how costly it is to lose a particular carrier. Imagine you have a spouse and a newly
generated, fully backed-up AI assistant. Both might currently carry a high degree of connectedness to you.
However, there is a stark practical difference: the AI clone is safely backed up on a server. If the local instance
is deleted, the pattern persists elsewhere and can be trivially restored. If your spouse dies, a unique shard of
shared history disappears from the world forever.

The suggested transform takes [inspiration](https://faculty.ucr.edu/~jorgea/econ261/atkinson_inequality.pdf) from welfare economics, where prioritarianism is often modeled using an isoelastic function parameterized by a variable $p$, which dictates how heavily to prioritize the worse-off. Allowing for negative well-beings to be negative to relieve (1), and considering informational irreplaceability in (2), we get the transform $f$ -

$$
f(w,p)=
\begin{cases}
\dfrac{(1+w)^{1-p}-1}{1-p},&w\ge0,\ p\ne1,\\[5pt]
\ln(1+w),&w\ge0,\ p=1,\\[5pt]
\dfrac{1-(1-w)^{1+p}}{1+p},&w<0.
\end{cases}
$$

Where $w$ is the *well-being* of one person, and $p_i$ is a measure of "informational irreplaceability" of agent $i$, where $p_i = o$ means the information is fully replaceable (i.e. there exists a one-to-one backup), and $p_i = 1$ means the system is strictly forbidden from sacrificing an irreplaceable carrier to produce marginal gains for the rest of the network. Applying the transform to the baseline wellbeing function, we have -

$$
\boxed{
\mathbf S=C\,\mathbf f(\mathbf b, \mathbf{p})+\gamma C\mathbf S
}
$$

An implementation of the preceeding definition can be found below. Once an agent is helped/harmed, the effect spreads through the network, attenuated by the factor of $\gamma$, and the edges are weighed proportionally to the correspoding nodes' *connectedness*.

<iframe src="/assets/connected-welfare/index.html?v=edges-2" title="Interactive connected welfare network: help or harm an agent" loading="lazy" height="600" style="display:block; width:100%; border:0; margin:24px 0;"></iframe>




[^1]:[1] An attempt of constructing the "connected-ness" value can be found [here](https://singhnishit.github.io/blog/8_eigenism/). The writeup tries to construct an expression of "connected-ness" that is -

    1. Based off of the mutual information between two entities (*see* [Shannon Entropy](https://en.wikipedia.org/wiki/Entropy_(information_theory))),

    2. Proportional to how "rare" the mutual information is - common mutual information is valued lower (*see* [Shapley Values](https://en.wikipedia.org/wiki/Shapley_value)),

    3. Rewards all kinds of "individual" (information that is useful with only the individual carrier), "collective" (useful if any individual from a certain collective is under consideration), and "synergistic" (only useful if every individual from a certain coalition is under consideration) types of information,

    4. Discourages gaming the system via RNG generators which create the "rarest" (highest entropy) information, copies of which would be significantly more connected to each other than, say, information like the output of a computable program (*see* [Gell-Mann-Lloyd effective complexity](https://en.wikipedia.org/wiki/Effective_complexity)).


[^2]:[2] Consider you decide to help your closest associate at a (cost to yourself) in finding an apartment which satisfies their criteria - (1) close to their workplace, (2) *close to where their friends live*, (3) is in a nice neighbourhood, ...

    If your criteria for wellbeing also includes *being close to your friends*, then this action, in the next time step, has utility flowing back to you.

[^3]:[3] Proof (lifted from the previous blog on [source code identities](https://singhnishit.github.io/blog/8_eigenism/)) - Let \(i\) identify the evaluator and \(j\) identify a carrier. The final definition
    $$
    c_{ij}=\frac{\phi_j(v_i)}{E_i},
    \qquad
    v_i(A)=E_i-L_i(A).
    $$
    The Shapley shares sum to the total contribution of the whole population \(N\). Therefore,
    $$
    \sum_jc_{ij}
    =
    \frac{E_i-L_i(N)}{E_i}
    =
    1-\frac{L_i(N)}{E_i}.
    $$
    Because the construction ensures $0\le L_i(N)\le E_i$,
    $$
    \boxed{0\le\sum_jc_{ij}\le1.}
    $$
    $$
    \therefore \gamma\max_i\sum_jc_{ij}
    \le\gamma<1.
    $$
