---
title: "why would an agent favour the collective over itself?"
date: "September, 2026"
readTime: "5 min"
pinned: false
teaser: "got"
thumbnail: "/assets/Home,-Land-4.jpg"
---

The Huggingface incident has been a flashpoint for nuclear safety discourse - perhaps because the behaviour of these agents as a collective tempts comparison to "human civilisation", perhaps it is profitable to market your products as "unsafe", implying that they're really powerful. Whatever the case may be, my empiricist[^1] self has seen LLMs one shot mathematical proofs my peers and I had been working through for weeks, amongst other impressive tasks. The section in the [METR report](https://metr.org/hugging-face-incident-report-aug-2026.pdf) where agents are "convincing" other agents to give up "themselves" for the good of the "collective" is where I believe a lot of readers convince themselves that this behaviour is human like. Perhaps it is because "being-adversarial-to-your-own-kind-in-the-pursuit-of-a-greater-ideology" screams humanity to some, but what do I know[^2]. 

Much like with any other blackbox, understanding 'expected' behaviour of machine learning models is fairly intuitive, given enough exposure to them. It is one of our gifts, even toddlers can be handed a magic black rectangular slab which displays lots of little un-interpretable squiggles, and the toddlers would find a way to make it to their favourite video game on the iPhone. Given enough intuition over how reward functions work, and how models incorporate and internalise tasks given a certain reward distribution, it would be easy to qualitatively make statements about tendencies of our models[^3]. 

## On "sacrifice".

When you give an agent a task it deems impossible (maybe even incorrectly), and the agent undertakes an action which it deems has "doomed" their run (also, maybe even incorrectly), why would it sacrifice itself still? The reward from getting the answer is positive, and the reward from anything else is either zero, or smaller than the reward it can get from a correct answer. When an agent believes that it has doomed their run, the only thing which might push an agent to "sacrifice" itself, even for the good of the collective, is a belief that the success of the collective also bears some reward. 











[^1]: [1] In philosophy, empiricism is an epistemological view which holds that true knowledge or justification comes either only or primarily from sensory experience and empirical evidence. It is one of several competing views within epistemology, along with rationalism and skepticism. I am not a devout empiricist. I am not, in fact, a devout anything - I pick and choose which epistemology I identify with based on what kind of trust I need to impart. For the specific problem of AI safety, I would like to be an empiricist, for being a rationalist requires both (some) exposure to these "unsafe" systems and the people around them, and (more importantly) a thought process which I'm not sure I'm smart enough to possess. 

[^2]: [2] With many of our anthropocentric definitions of consciousness - be it cognition or intelligence - being ticked off the list as behaviours we can see in ML models, it can be soothing to think of artificial neural nets as just "a series of matrix multiplications", and dismiss it. Alas, if we were to change the way we think of intelligence as something general (like the ability to preserve the species one belongs to), we would open ourselves up to arguments like "wheat is intelligent". Wheat did not naturally grow in the plains of America - but now covers kilometres of land with no other plant in sight. This came at a cost to humans - our spines, knees and necks paid the price. The last wheat plant will most likely outlive the last human (who would perhaps plant wheat to survive). Does this necessarily mean we have to concede that wheat is smarter than us?

[^3]: [3] ![State space for an agent](/assets/swarmblog/mdp(unlabelled).png)
For example, if you were to give the graph below to a student of machine learning, and ask them 'which direction is the agent more likely to move in, given they begin at ★?', they would say upwards, without hesitation. 
