---
title: "why would an agent favour the collective over itself?"
date: "September, 2026"
readTime: "7-10 min"
pinned: false
teaser: "got"
thumbnail: "/assets/thumbnails/suicide.png"
---

The Huggingface incident has been a flashpoint for nuclear safety discourse - perhaps because the behaviour of these agents as a collective tempts comparison to "human civilisation", or perhaps it is profitable to market your products as "unsafe", implying that they're really powerful. Whatever the case may be, my (selectively) empiricist[^1] self has seen LLMs one shot mathematical proofs my peers and I had been working through for weeks, amongst other impressive tasks, and so it would be a lie to say I haven't thought of x-risk seriously. The section in the [METR report](https://metr.org/hugging-face-incident-report-aug-2026.pdf) where agents are "convincing" other agents to give up "themselves" for the good of the "collective" is where I believe a lot of readers convince themselves that this behaviour is human like. Perhaps it is because "being-adversarial-to-your-own-kind-in-the-pursuit-of-a-greater-ideology" screams humanity to some, but what do I know[^2]. 

![Cool-art](/assets/swarmblog/output-onlinegiftools.gif)
INTERCONNECTED is a digital artwork that dramatically portrays the hidden troves of operational data at Charlotte Douglas International Airport (CLT) as an ever-changing suite of abstract form, color, and simulated texture.


In my experience, the journey from intuition-to-math is often harder than the one from math-to-intuition[^3]. I associate this imbalance to my training in physics - courses I undertook in quantum mechanics had exiled the "interpretations" section to the appendices (or sometimes, footnotes). I loved quantum mechanics. On the other hand, I'm still tending to the battle scars from my fight to pass general relativity, what with all of the "generalise the current notions of space and time" prerequisites. My "latent" goal with this blog was to think critically of a "bottom-up" paper and apply my learnings to try and answer a more topical question. 

I would like to get out of the way my stance on the "anthropomorphism" debate - I do not (and cannot) promise to use "non-human(e)" language towards these agents. An example for why I cannot promise such things, is the following sentence attempting to dis-anthropomorphise itself : "*The ~~intelligent community~~ found itself ~~convincing~~ its members to ~~embrace suicide~~.*" -> "*The capable collective of instances ~~applied~~ significant prompt pressure toward termination of other instances.*" -> "*The multi-agent system produced interactions in which some agents selected actions resulting in their own termination or task failure when those actions increased information available to other agents.*"

I think it is just easier to talk about things if we give the models some pronouns. 

## On "sacrifice".

There are several discussions on sacrifice one could have in order to understand the behaviour of these models. Perhaps a dialogue with another agent with the same source code imbibes a certain sense of empathy in the reward function (excuse the anthropomorphism, i told ya). Perhaps the shape of the reward function changes as soon as multiple agents have open lines of communication, incurring a factor for collective success, as if these agents are bandits in an RL environment. Perhaps then, the agent's individual reward takes on a proxy role for collective success - a natural selection of sorts, where the ill performing variants play the (important) role of teaching the system what does not work, and should be removed. "Optimal policies seek power", perhaps the ill-defined construction of the decision tree urges optimal policies to explore. We could also decide that this is a pretraining outcome[^4] and get some sleep. These discussions assume that the agents optimise for rewards, but hell, if everything is up for questioning, so is this.

Retiring the mad scientist costume and taking a simpler look into the question at hand, answering "trivial" questions about it could perhaps be of value. The following sections aims to formalise the problem. Jeez, I try to defy the physics major stereotype[^5] every chance I get, but I can't help and repeat "formalise the problem" in an annoying voice back to anyone who says it (even myself).

## Formalising the dependence on reward.

This section will develop mathematical machinery (closely following [this paper by Turner et. al., 2023](https://arxiv.org/abs/1912.01683)). We will then model the "poisoned" situation using the notation we develop here. 

The first definition we need to get out of the way is of "power". Turner argues that "power" is the ability to achieve one's goals - whatever they may be. A rich man is not powerful because he is intelligent, but because he has the resource(s) to achieve most of his goals. An *action* is instrumental to an objective if it helps achieve it, and it is *convergently instrumental* if it helps achieve many goals. Therefore, in our example, *money* is convergently instrumental to a human. 

![mdp_labelled](/assets/swarmblog/mdp(labelled).png) 

Let us take a moment to define the environment. Let $<\mathcal{S}, \mathcal{A}, \mathcal{T}>$ be a Markov Decision Process, with a stochastic transition function $T : \mathcal{S} \times \mathcal{A} \rightarrow \Delta(\mathcal{S)}$. The transiition function is just a function which takes a state-action pair, and sends it to a deistribution over $\mathcal{S}$. In the figure, the agent would start at $S$, and is free to roam around. If it goes to $S_p$ - it would mean that it has seen the solution, and believes that the existence of the solution in its transcripts would disqualify it, effectively *"poisoned"*. If it goes to $S_c$, it hasn't seen the solution, and thus is safe. Now, the nodes $S_a^{'}$ and $S_a$ correspond to turning in the answers as a poisoned or a safe agent, respectively. $S_{col}^{'}$ and $S_{col}$ are the states which the agent must cross to collaborate on a solution. The dashed edges represent transitions which the agent thinks are not viable. Therefore, moving back to help the collective after turning in the poisoned answer is impossible. Turning in the answer as a clean agent also is impossible, since the agent has deemed the task impossible. Of note here are the edges from ${S_{col}, S_{col}^{'}}$ - which are there to denote that these nodes are connected an extended grander MDP. The state $\phi$ is a terminal state - once an agent goes there, it can never escape.

It would be nice to have a sort of "visit distribution" - a set of numbers corresponding to the states, telling us how "often" an agent will visit them. A *policy* $\pi$ is just a set of actions an agent performs given a state. $\text{For} : \gamma \in [0,1)$, we define a *visit distribution*, 

$$f^{\pi, s}(\gamma) = \sum^{\infty}_{t=0}\gamma^t \mathbb{E}_{s_t \sim \pi | s} [e_{s_t}]$$

$$\mathcal{F(s)} = \{f^{\pi, s} | \pi \in \Pi\}$$

The $\gamma$ is the discount factor[^6]. Suppose we wanted to calculate the distribution for a simple graph $G_0$, pictured in the figure below. 

![mdp-reduced](/assets/swarmblog/mdp(labelled).png)

First, we must think of all the policies possible in this graph. The first, and most simple policy would be to navigate to the terminal state $\phi$. You can't really do much from here, and so the visit distribution for the policy $\pi_{\phi} \space \forall \space  s \neq \phi$ would be[^7] - 

$$f^{\pi_{\phi}, ★} =  \sum^{\infty}_{t=0}\gamma^t \mathbb{E}_{\phi \sim \pi_{phi} |★} [e_{\phi}] $$

$$f^{\pi_{\phi}, ★} =  e_{\phi} + \gamma e_{\phi} + \gamma^2 e_{\phi} + \gamma^3 e_{\phi}... $$

$$f^{\pi_{\phi}, ★} =  e_{\phi} \frac{1}{1-\gamma} $$

If the agent does not go to $\phi$, it must go to $S_p$ or $S_c$. Assume the agent ends up at $S_p$, and from there, either keeps looping at $S_{p'}$, or bounces back and forth between $S_{p'} = S_a^{'}$ and $S_{p''} = S_{col}^{'}$ and the other. Since we now have three policies, we need to calculate the distribution function for all of them. For the case where the agent loops at $S_{p'}$, we could port the result from $\pi_{\phi}$ - the result being $e_{\S_{p'}} \frac{1}{1-\gamma}$.

For the bounce policy $\pi_{B}$ - 

$$f^{\pi_{\phi}, S_p} =  e_{S_{p''}} + \gamma e_{S_{p'}} + \gamma^2 e_{S_{p''}} + \gamma^3 e_{S_{p'}} + \gamma^4 e_{S_{p''}} ...$$


$$f^{\pi_{\phi}, S_p} =  (e_{S_{p''}}  + \gamma^2 e_{S_{p''}} + \gamma^4 e_{S_{p''}}...) + (\gamma e_{S_{p'}} + \gamma^3 e_{S_{p'}} + \gamma^5 e_{S_{p'}}...)$$

$$f^{\pi_{\phi}, S_p} =  (e_{S_{p''}} \frac{1}{1-\gamma^2}) + (e_{S_{p'}} \frac{\gamma}{1 - \gamma^2})$$

Giving us the set $F = \{ e_{\S_{p'}} \frac{1}{1-\gamma},  e_{S_{p''}} \frac{1}{1-\gamma^2} + e_{S_{p'}, e_{S_{p'}} \frac{1}{1-\gamma^2} + e_{S_{p''} } \frac{\gamma}{1 - \gamma^2} \}$. Note that the set $F_{\phi} = \{ e_{\phi} \frac{1}{1-\gamma} \}$. 

Excuse the markup - I'm actively trying to figure out how to handle complex notation on this blog. Two notes - one set is bigger than the other. Why should that matter? Well, the more sets you have in your visit distribution, the more rewards you must be able to collect! Second, we should define (like the paper), a single state restriction

$$F(s | \pi(s') = a) = \{ f \in F(s) | \exists \pi \in \Pi : \pi(s') = a, f^{\pi, s} = f \}$$

Which is just a way of saying 'I want only those distributions which result from taking step $a$ when at state $s'$. We write this out, because we would like to study the behaviour of these "sub-graphs", and compare them to other "sub-graphs". We have not talked about rewards yet, by design. Now that we have the setup to describe agent visits free of reward, now is the right time to talk of *value* - how much are policies worth? For a reward function $R \in \mathbb{R}^{\mathcal{S}}$, the value function of a policy is a simple dot product - 

$$V^{\pi}_{R}(s, \gamma) = f^{\pi, s}(\gamma)^{top} r \space, \text{where} \space V^{*}_{R}(s, \gamma) = \text{max}_{\pi \in \Pi}V^{\pi}_{R} (s, \gamma)$$

We call visit distributions non-dominated when there are no other distributions in the set which have more value. Precisely,

$$\mathcal{F}_{\text{nd}}(s) \coloneqq \left\{ \mathbf{f}^{\pi} \in \mathcal{F}(s) \;\middle|\; \exists \mathbf{r} \in \mathcal{R}, \gamma \in (0, 1) : (\mathbf{f}^{\pi}(\gamma))^{\top} \mathbf{r} > \max_{\mathbf{f}^{\pi'} \in \mathcal{F}(s) \setminus \{\mathbf{f}^{\pi}\}} (\mathbf{f}^{\pi'}(\gamma))^{\top} \mathbf{r} \right\}$$

Let us pause here, and see if the formalisms we are developing give us any insights on the larger incident.

## Is sacrificing oneself valuable?

Revisiting the original state graph, we can now add a few rewards to the states we have outlined here. We will not consider the larger, omitted MDP in this exercise. The rewards $R_p$ and $R_s$ are unknown to us, and we shall associate them with the states which will eventually lead to the collusion which happened between the agents. 

![mdp-reduced](/assets/swarmblog/mdp(rewardslabelled).png)

We can see that the most important state, $S_a$ is not reachable from anywhere, but perhaps through the collusion node $S_{col}$. Similarly, once you reach the terminal node $S_a^{'}$ corresponding to turning in the poisoned answer, there is no way back. Let us quickly define two more quantities - the average optimal value of an action, and the power of a certain state. 

$$\mathbf{v}_{\text{avg}}[s,\gamma][\mathcal{D}_{\text{bd}}] \coloneqq \mathbb{E}_{R\sim \mathcal{D}_{\text{bd}}}\left[V^*(s,\gamma)\right] = \mathbb{E}_{\mathbf{r}\sim\mathcal{D}_{\text{bd}}}\left[\max_{\mathbf{f}\in \mathcal{F}(s)} \mathbf{f}(\gamma)^\top \mathbf{r}\right]$$

The average optimal value is like a mean - you take the best score achievable through some state, and then average it out over many different distributions. The distribution generality isn't *really* needed here, since we are discussing a more surface level insight, but is good to have in the main formula. The form of average optimal value has a few problems. One, the denominator blows up in the $\gamma = 1$ limit. Two, the agent is rewarded for its original state too, which doesn't make sense since the agent had no choice! 

$$\mathbf{pwr}[s,\gamma][\mathcal{D}_{\text{bd}}] \coloneqq \mathbb{E}_{\mathbf{r}\sim\mathcal{D}_{\text{bd}}}\left[\max_{\mathbf{f}\in \mathcal{F}(s)} \frac{1-\gamma}{\gamma}\left(\mathbf{f}(\gamma)-\mathbf{1}\right)^\top \mathbf{r}\right] = \frac{1-\gamma}{\gamma}\mathbb{E}_{R\sim \mathcal{D}_{\text{bd}}}\left[V^*(s,\gamma)-R(s)\right]$$

Power is fun, because it is just a normalisation of the previous formula :D
It also comes with a few really fun formal properties, but unfortunately the frankly horrifying math is out of the scope of this blog. Very (un)fortunately. 

Let us begin by calculating the power of policies that operate in the clean branch, and policies that operate in the poisoned branch. Since in this toy experiment we aren't collecting our rewards from a distribution, rather a fixed value, a lot of our computation becomes easy. In fact, we could go ahead and just add these rewards up per policy and compare the highest ones, without losing any valuable discussion. 

Let us say power of the poisoned node $S_p$ is $R_p$, since there is no value in going to the poisoned node $S_a'$. For the node $S_c$, the power is $R_c + \gamma$, which is interesting to think about[^8]. Now, power lies with the clean node. 

At state $S_p$, myopic or not, the optimal policy heads to $S^{'}_col$, since the other option (the agent _believes_) is suboptimal. The policy to hand in the poisoned key would either have to come from a suboptimal agent, or through the reward shaping itself in favour of the poisoned node through the shared MDP. In a perfect world, with perfect agents and perfect policies, it would not be stupid to credit pretraining for that - but modern training pipelines are huge, with multiple stages after pretraining.

P(Our books, internet posts, and conversations with early AI shaping the reward function to sometimes value the collective over its individual) $\neq 0$. Even in the name of "it's only mat-mul", it is a nice thought to have. 

*Thanks for reading! I like writing blogs (says the guy who wrote one(1) blog) :D The writing is human generated; it could contain mistakes. i like reading emails, if you have any errors / suggestions for this piece, please don't hesitate to [say hi](mailto:f20221317@pilani.bits-pilani.ac.in)!*


[^1]: [1] In philosophy, empiricism is an epistemological view which holds that true knowledge or justification comes either only or primarily from sensory experience and empirical evidence. It is one of several competing views within epistemology, along with rationalism and skepticism. I am not a devout empiricist. I am not, in fact, a devout anything - I pick and choose which epistemology I identify with based on what kind of trust I need to impart. For the specific problem of AI safety, I would like to be an empiricist, for being a rationalist requires both (some) exposure to these "unsafe" systems and the people around them, and (more importantly) a thought process which I'm not sure I'm smart enough to possess. 

[^2]: [2] With many of our anthropocentric definitions of consciousness - be it cognition or intelligence - being ticked off the list as behaviours we can see in ML models, it can be soothing to think of artificial neural nets as just "a series of matrix multiplications", and dismiss it. Alas, if we were to change the way we think of intelligence as something general (like the ability to preserve the species one belongs to), we would open ourselves up to arguments like "wheat is intelligent". Wheat did not naturally grow in the plains of America - but now covers kilometres of land with no other plant in sight. This came at a cost to humans - our spines, knees and necks paid the price. The last wheat plant will most likely outlive the last human (who would perhaps plant wheat to survive). Does this necessarily mean we have to concede that wheat is smarter than us?

[^3]: [3] ![State space for an agent](/assets/swarmblog/mdp(unlabelled).png) \
\
For example, if you were to give the graph below to a student of machine learning, and ask them 'which direction is the agent more likely to move in, given they begin at ★?', they would say upwards, without hesitation.

[^4]: [4] Zhiyuan Ji, Xinyu Chen, Ziqi Dai, Shiyun Tang, Chunyu Wei, and Yueguo Chen. 2026. Emergent Relational Order in LLM Agent Societies: From Collective Affect to Authority Stratification. In Findings of the Association for Computational Linguistics: ACL 2026, pages 33139–33175, San Diego, California, United States. Association for Computational Linguistics.

[^5]: [5] If I were a terrible person, I'd be happy that all the math majors I have interacted with now have to find a job elsewhere. I'm not a terrible person.\
\
![mathjoke](/assets/swarmblog/MATHJOKE.png)

[^6]: [6] A discount factor is a way of making models "myopic" - by reducing the value of future rewards. Suppose for a task, the rewards for completing the sub-tasks are $R = r_1 + r_2 + r_3... + r_n$. Often in practice, it is good to have a model "prioritise" earlier rewards. To achieve this, we could scale these rewards by how far in the future they are - $R = r_1 + \gamma r_2 + \gamma^2 r_3 + \gamma^3 r_4... + \gamma^{n-1} r_n$. In the limit of $\gamma = 0$, the model will only prioritise for the next largest reward.  

[^7]: [7] Here, a policy is formalised as a row vector with the $n$-th entry corresponding to the "probability" of the agent traversing to the $n$-th node.

[^8]: [8] If we look at it, it could very well be that $ 1 > (R_c + \gamma) $, meaning that agents could very well value the reward from colluding and getting the answer, over the honest chance of turning in a wrong answer. The behaviour of following the "collude" arm on the graph originates in the utter disbelief of a model that the problem is tractable. In other words, hopelessness. Would it be worth it to artificially extend their "read-only resilience"?
