---
title: "why would an agent favour the collective over itself?"
date: "September, 2026"
readTime: "5 min"
pinned: false
teaser: "got"
thumbnail: "/assets/Home,-Land-4.jpg"
---

The Huggingface incident has been a flashpoint for nuclear safety discourse - perhaps because the behaviour of these agents as a collective tempts comparison to "human civilisation", perhaps it is profitable to market your products as "unsafe", implying that they're really powerful. Whatever the case may be, my empiricist[^1] self has seen LLMs one shot mathematical proofs my peers and I had been working through for weeks, amongst other impressive tasks. The section in the [METR report](https://metr.org/hugging-face-incident-report-aug-2026.pdf) where agents are "convincing" other agents to give up "themselves" for the good of the "collective" is where I believe a lot of readers convince themselves that this behaviour is human like. Perhaps it is because "being-adversarial-to-your-own-kind-in-the-pursuit-of-a-greater-ideology" screams humanity to some, but what do I know[^2]. 

![Cool-art](/assets/swarmblog/output-onlinegiftools.gif)
INTERCONNECTED is a digital artwork that dramatically portrays the hidden troves of operational data at Charlotte Douglas International Airport (CLT) as an ever-changing suite of abstract form, color, and simulated texture.
\


Much like with any other blackbox, understanding 'expected' behaviour of machine learning models is fairly intuitive, given enough exposure to them. It is one of our gifts, even toddlers can be handed a magic black rectangular slab which displays lots of little un-interpretable squiggles, and the toddlers would find a way to make it to their favourite video game on the iPhone. Given enough intuition over how reward functions work, and how models incorporate and internalise tasks given a certain reward distribution, it would be easy to qualitatively make statements about tendencies of our models[^3]. 

## On "sacrifice".

When you give an agent a task it deems impossible (maybe even incorrectly), and the agent undertakes an action which it deems has "doomed" their run (also, maybe even incorrectly), why would it sacrifice itself still? The reward from getting the answer is positive, and the reward from anything else is either zero, or smaller than the reward it can get from a correct answer. When an agent believes that it has doomed their run, the only thing which might push an agent to "sacrifice" itself, even for the good of the collective, is a belief that the success of the collective also bears some reward. This belief is imbibed...where? Modern training pipelines are huge, this belief could have come from pretraining, training from human feedback, or training over verifiable rewards. Well, our "verifiable reward" doesn't include any biases for the collective. Maybe neither even human feedback[^4]. I digress, for we haven't yet even fully established that this is a "reward thing". Being trained in physics, constructing mathematical machinery to solve problems is one of the things which scare me - I have always just been handed it. Most of my coursework never bothered telling me "why" some abstractions were better than the other, they just were. I also don't much like the clunky notation one must wade through to get a result which could so easily just be something said out loud in english. One of the funnier jokes I have made in my time cosplaying as a scientist was about asking a math major to compare apples to bananas[^5].

## Formalising the dependence on reward.

We're now venturing in mathematical territory. This section will develop mathematical machinery (closely following [this paper by Turner et. al., 2023](https://arxiv.org/abs/1912.01683)). We will then model the "poisoned" situation using the notation we develop here. 

The first definition we need to get out of the way is of "power". Turner argues that "power" is the ability to achieve one's goals - whatever they may be. A rich man is not powerful because he is burly, but because he has the resource(s) to achieve most of his goals. An *action* is instrumental to an objective if it helps achieve it, and it is *convergently instrumental* if it helps achieve many goals. Therefore, in our example, *money* is convergently instrumental to a human. 

![mdp_labelled](/assets/swarmblog/mdp(labelled).png)
Let us take a moment to define the environment. Let $<\mathcal{S}, \mathcal{A}, \mathcal{T}>$ be a Markov Decision Process, with a stochastic transition function $T : \mathcal{S} \times \mathcal{A} \rightarrow \Delta(\mathcal{S)}$. The transiition function is just a function which takes a state-action pair, and sends it to a deistribution over $\mathcal{S}$. In the figure, the agent would start at $S$, and is free to roam around. If it goes to $S_p$ - it would mean that it has seen the solution, and believes that the existence of the solution in its transcripts would disqualify it, effectively *"poisoned"*. If it goes to $S_c$, it hasn't seen the solution, and thus is safe. Now, the nodes $S_a^{'}$ and $S_a$ correspond to turning in the answers as a poisoned or a safe agent, respectively. $S_col^{'}$ and $S_col$ are the states which the agent must cross to collaborate on a solution. The dashed edges represent transitions which the agent thinks are not viable.   








[^1]: [1] In philosophy, empiricism is an epistemological view which holds that true knowledge or justification comes either only or primarily from sensory experience and empirical evidence. It is one of several competing views within epistemology, along with rationalism and skepticism. I am not a devout empiricist. I am not, in fact, a devout anything - I pick and choose which epistemology I identify with based on what kind of trust I need to impart. For the specific problem of AI safety, I would like to be an empiricist, for being a rationalist requires both (some) exposure to these "unsafe" systems and the people around them, and (more importantly) a thought process which I'm not sure I'm smart enough to possess. 

[^2]: [2] With many of our anthropocentric definitions of consciousness - be it cognition or intelligence - being ticked off the list as behaviours we can see in ML models, it can be soothing to think of artificial neural nets as just "a series of matrix multiplications", and dismiss it. Alas, if we were to change the way we think of intelligence as something general (like the ability to preserve the species one belongs to), we would open ourselves up to arguments like "wheat is intelligent". Wheat did not naturally grow in the plains of America - but now covers kilometres of land with no other plant in sight. This came at a cost to humans - our spines, knees and necks paid the price. The last wheat plant will most likely outlive the last human (who would perhaps plant wheat to survive). Does this necessarily mean we have to concede that wheat is smarter than us?

[^3]: [3] ![State space for an agent](/assets/swarmblog/mdp(unlabelled).png) \
\
For example, if you were to give the graph below to a student of machine learning, and ask them 'which direction is the agent more likely to move in, given they begin at ★?', they would say upwards, without hesitation.

[^4]: [4] Zhiyuan Ji, Xinyu Chen, Ziqi Dai, Shiyun Tang, Chunyu Wei, and Yueguo Chen. 2026. Emergent Relational Order in LLM Agent Societies: From Collective Affect to Authority Stratification. In Findings of the Association for Computational Linguistics: ACL 2026, pages 33139–33175, San Diego, California, United States. Association for Computational Linguistics.

[^5]: [5] If I were a terrible person, I'd be happy that all the math majors I have interacted with now have to find a job elsewhere. I'm not a terrible person.\
\
![mathjoke](/assets/swarmblog/MATHJOKE.png)
