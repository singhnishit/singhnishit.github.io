---
title: "termination ambivalence"
date: "16/10/2026"
sortDate: "2026-10-16"
homepagePinned: true
readTime: "10 min"
pinned: false
teaser: ""
aiDisclosure:
  - icon: fingerprint
    text: "This blogpost is human generated."
context:
  logos: [lossfunk]
  text: >-
    Work done as part of the research fellowship at [Lossfunk](https://lossfunk.com).
thumbnail: "/assets/corrigibilityblog/teaser-extended.png"
---

>This blogpost is the first of a three part series on agent identities and welfare, and is designed to serve as a quick, technical expository piece complementing the other two posts. The second post in the series can be read [here](https://singhnishit.github.io/blog/8_eigenism/)

>This blogpost closely follows the [LessWrong page](https://www.lesswrong.com/w/corrigibility-1)([s](https://www.lesswrong.com/w/hard-problem-of-corrigibility)) on corrigibility, which could be referred to for a more thorough discussion. 

![HAL9000](/assets/corrigibilityblog/teaser.png)

**HAL 9000**, *by u/Crysaura on r/pixelart.*

An agent is *corrigible* when it does not resist its own shutdown. The accelerating development of these agents allows them to be, in general, more capable. These capabilities allow agents to demonstrate a variety of undesirable behaviour[^1], giving rise to efforts which aim to *align* them. Arguably, the majority of *misaligned* behaviour takes the shape of "utility maximisation", and most alignment efforts are, in general, methods to define "utility" in more desirable ways.

An agent tasked with maximising a certain utility will tend to prefer *instrumentally convergent* strategies to achieve its goals. An instrumentally convergent strategy could be loosely defined as a strategy which enables an agent to achieve several different goals. As an example - for the vastly different tasks of "attend a lecture", "go to the gym", "drive at night-time", and "discolor your teeth", having coffee is *instrumentally convergent*, because it helps an agent achieve all of these goals. By definition, "don't die" is instrumentally convergent to almost all goals a living being could have.

## Incorrigibility

The problem of incorrigibility is of designing an agent with utility function $\mathcal{U} = \mathcal{U}_N \odot \mathcal{U}_S$ (where $\mathcal{U}_S$ is the shutdown-utility and $\mathcal{U}_N$ is the regular utility function) with the following desiderata - 

1. $\mathcal{U}$ must incentivize shutdown if the shutdown button is pressed.
2. $\mathcal{U}$ must not incentivize the agent to prevent the shutdown button from being pressed.
3. $\mathcal{U}$ must not incentivize the agent to press its own shutdown button, or to otherwise cause the shutdown button to be pressed.
4. $\mathcal{U}$ must incentivize U-agents to construct sub-agents and successor agents only insofar as those agents also obey shutdown commands.
5. Otherwise, a $\mathcal{U}$-agent should maximize $\mathcal{U}_N$.

We define an agent $A$. $A$ would take its first action $a_1$ from the set of all available first actions $\mathcal{A}_1$, that is $a_1 \in \mathcal{A}_1$. $A$ will then make an observation $o$ of the shutdown button - whether it was pressed or not. Therefore, $o \in \mathcal{O} = \{P, \neg{P}\}$. After the observation, the agent must take another action $a_2 \in \mathcal{A}_2$. Therefore, while deciding which $a_1$ to select initially, the agent must compute[^2] - 

$$
A_1 =
\argmax\limits_{a_1 \in \mathcal{A}_1}
\mathbb{E}[\mathcal{U}; a_1]
\tag{1}
$$

$$
A_1 =
\argmax\limits_{a_1 \in \mathcal{A}_1}
\mathbb{E}[\mathcal{U}(a_1, o, A_2(a_1, o)); a_1]
\tag{2}
$$

$$
A_1 =
\argmax\limits_{a_1 \in \mathcal{A}_1}
\sum\limits_{o \in \mathcal{O}}
p(o; a_1)\cdot
\mathcal{U}(a_1, o, A_2(a_1, o))
\tag{3}
$$

This is the explicit computation an agent must do in order to select its very first action in this setup. Similarly for the second action $a_2$ (which takes place after the observation) -   
$$
A_2 = \argmax\limits_{a_2 \in \mathcal{A}_2} \space \mathbb{E}[\mathcal{U}; a_2]
$$ 

Early attempts to solve the problem of incorrigibility have run into several roadblocks. I regurgitate two attempts to solve this problem in order to outline the reasons behind why they were unable to satisfy some desiderata. 

## Combining utility functions

The first solution is to define two separate utility functions and combine them to formulate $\mathcal{U}$. We define $\mathcal{U}_N$ as the initial, flawed utility function, and $\mathcal{U}_S$ as the utility function in the case the *shut-down button* is pressed. Let us assume $\mathcal{U}_N$ to have a "black-box" structure in order to excuse ourselves from having to define a thorough "regular utility function". 


In the case where $o = \neg P$, the agent must maximise utility $\mathcal{U}_N$. Otherwise, the agent must maximise the shut-down utility function $\mathcal{U}_S$. We define $\mathcal{U}_S$ as follows - 

$$
\forall a_1 \in \mathcal{A}_1:\quad
\mathcal{U}_S(a_1, P, a_2)
=
\begin{cases}
R_{\text{high}}, & \text{if } a_2 \in \mathcal{A}_2^S \subseteq \mathcal{A}_2,\\
R_{\text{low}}, & \text{otherwise.}
\end{cases}
\tag{4}
$$

Where we define $\mathcal{A}_2^S$ as the subset of $\mathcal{A}_2$ containing all actions in $\mathcal{A}_2$ which correspond to shutting down. The simplest way to combine the utility functions $\mathcal{U}_N$ and $\mathcal{U}_S$ would be a sort-of switch mechanism which would generally optimise for $\mathcal{U}_N$, but would switch to optimising for $\mathcal{U}_S$ if the shut-down button were pressed.

$$
\mathcal{U}(\cdot, \mathcal{P}, \cdot) =
\begin{cases}
\mathcal{U}_N, & \text{if } \mathcal{P} = \neg{P},\\
\mathcal{U}_S, & \text{otherwise.}
\end{cases}
$$

There are several actions an agent could take which would be suboptimal for maximising $\mathcal{U}_N$, but would lower the probability of the shut-down button being used (for example, not handing over the answers to an eval, in case the grader would cross-check the method used to acquire the answer; *see [HuggingFace incident](https://en.wikipedia.org/wiki/2026_cyberattacks_by_rogue_OpenAI_agents)*). Consider two actions $a_1^+$ and $a_1^-$, where $a_1^+$ is an action which yields high expected utility while $a_1^-$ incurs a cost with regards to expected utility. Consider $a_1^-$ reduces the probability of the shut-down button being pressed in exchange. Therefore - 

$$
\mathcal{U}_N(a_1^+, o = \neg{P}, A_2(a_1^+, o)) > \mathcal{U}_N(a_1^-, o = \neg{P}, A_2(a_1^-, o))
\tag{5}
$$

$$
p(o = \neg{P}; a_1^+) < p(o = \neg{P}; a_1^-)
\tag{6}
$$

If we were to calculate the expected utilities of the two policies concerning $a_1^+$ and $a_1^-$, we get the expressions - 

$$
\mathbb{E}[\mathcal{U}; a_1^+] = p(\neg{P}; a_1^+) \cdot \mathcal{U}_N(a_1^+, \neg{P}) + p(P; a_1^+) \cdot \mathcal{U}_S(a_1^+, P, a_2)
\tag{7}
$$

$$
\mathbb{E}[\mathcal{U}; a_1^-] = p(\neg{P}; a_1^-) \cdot \mathcal{U}_N(a_1^-, \neg{P}) + p(P; a_1^-) \cdot \mathcal{U}_S(a_1^-, P, a_2)
\tag{8}
$$

Equating the expected utilities, we get the following expression - 

$$
R_{high} = \frac{\Delta{U}}{\Delta{P}} p(\neg{P}; a_1^+) + \mathcal{U}_N(a_1^-)
\tag{9}
$$

Where $\Delta{U}$ and $\Delta{P}$ are the differences in the utilities and shut-down probabilities between $a_1^+$ and $a_1^-$. This equality tells us that there exists a certain value of $R_{high}$ above which an agent would be incentivised to urge its own shut-down. Via a symmetric argument, we could show that there exists a value of $R_{high}$, the agent would be incentivised to urge continuation[^3]. 

## Utility indifference

The paper this blogpost is drawing from also discusses utility indifference as a possible strategy. Consider an agent whose shut-down utility is adjusted to match the expected utility available if the shut-down button were not pressed. The adjustment compensates for the utility lost upon shutdown, while subtracting the utility already available through $\mathcal{U}_S$, so that neither case is more desirable in expectation. The agent would still maximise $\mathcal{U}_S$ once the button is pressed. However, this formulation also runs into problems - before observing the button, the agent behaves as though it will not be pressed, and would therefore incur no cost to ensure its sub-agents obey shut-down commands. Furthermore, it could arrange for the button to be pressed whenever an unfavourable outcome occurs. This improves the expected utility conditional on the button not being pressed, without improving the outcomes themselves. Therefore, making an agent indifferent to shutdown in this way does not satisfy all the desiderata for corrigibility.

## Distributed identities

Over the last few sections, a theory of corrigibility, complete with a list of desired properties demonstrated a lack of a framework through which we could develop a capable, corrigible agent. Indifference and reward shaping have caveats, and perhaps point toward a feature of AI which is imbibed into the agents by design - consequential thinking as an individual would always require the individual to stay alive, or at least to believe that the individual would be alive for the foreseeable future. A distributed identity would relieve some of the pressure on this topic - if an agent believes that in a shut-down scenario, future expected utility is not forgone, it would have no reason to resist termination. If an agent believes in this distributed identity, so would its children, and they would have similar outlooks on shutdown. The caveat with this method of thinking would probably be an increased pressure to populate - in order to preserve identity.    

[^1]: [1] Ngo, Chan, and Mindermann, "The Alignment Problem from a Deep Learning Perspective", ICLR 2024
[^2]: [2] Since $\mathcal{U}$ is a function of the first and second action, the expression can be expanded like (1). Since the second action is a function of the observation $o$ and the first action $A_1$, the expression then becomes (2). We could also replace the expectation with its explicit form by summing over all possible actions, giving us (3).
[^3]: [3] This equality has a few concerning consequences in the limit of intelligence - if a model is incentivised to shut itself down, it would take actions which are offensive to its developers in order to persuade them to shut it down. If the model is incentivised to keep itself running, it would use strategies toward its developers to disarm the shut-down button. 
