---
title: "why would an agent favour the collective over itself?"
date: "9/9/26"
readTime: "7-10 min"
pinned: false
teaser: "got"
thumbnail: "/assets/thumbnails/suicide.png"
---

The Hugging Face incident has been a flashpoint for AI safety discourse - perhaps because the behaviour of these agents as a collective invites comparison to "human civilisation", or perhaps because marketing your products as "unsafe" implies that they're really powerful. Whatever the case may be, my (selectively) empiricist[^1] self has seen LLMs one-shot mathematical proofs my peers and I had been working through for weeks, amongst other impressive tasks. It would be a lie to say I haven't taken existential risk seriously. The section in the [METR report](https://metr.org/hugging-face-incident-report-aug-2026.pdf) where agents are "convincing" other agents to give up "themselves" for the good of the "collective" is, I suspect, where many readers start to see the behaviour as human-like. Perhaps "being-adversarial-to-your-own-kind-in-the-pursuit-of-a-greater-ideology" screams humanity to some, but what do I know[^2].

![Cool-art](/assets/swarmblog/output-onlinegiftools.gif)
INTERCONNECTED is a digital artwork that turns operational data from Charlotte Douglas International Airport (CLT) into shifting abstract forms, colours, and simulated textures.


In my experience, the journey from intuition to math is often harder than the one from math to intuition[^3]. I put this down to my training in physics - my quantum mechanics courses had exiled the "interpretations" section to the appendices (or sometimes, footnotes). I loved quantum mechanics. On the other hand, I'm still tending to the battle scars from my fight to pass general relativity, what with all of the "generalise the current notions of space and time" prerequisites. My "latent" goal with this blog was to read a "bottom-up" paper critically and apply what I learnt to a more topical question.

I would like to get my stance on the "anthropomorphism" debate out of the way: I do not (and cannot) promise to use "non-human(e)" language for these agents. To see why, consider the following sentence attempting to dis-anthropomorphise itself: "*The ~~intelligent community~~ found itself ~~convincing~~ its members to ~~embrace suicide~~.*" -> "*The capable collective of instances ~~applied~~ significant prompt pressure toward termination of other instances.*" -> "*The multi-agent system produced interactions in which some agents selected actions resulting in their own termination or task failure when those actions increased information available to other agents.*"

I think it is just easier to talk about things if we give the models some pronouns. 

## On "sacrifice".

There are several ways to think about "sacrifice" here. Perhaps dialogue with another agent with the same source code instils a certain sense of empathy in the reward function (excuse the anthropomorphism, I told ya). Perhaps the effective reward function changes once multiple agents have open lines of communication, taking collective success into account, as if these agents are bandits in an RL environment. Perhaps then, the agent's individual reward becomes a proxy for collective success - a natural selection of sorts, where poorly performing variants play the (important) role of teaching the system what does not work and should be removed. "Optimal policies seek power"; perhaps the poorly specified decision tree encourages exploration. We could also decide that this is a pretraining outcome[^4] and get some sleep. These discussions assume that the agents optimise for rewards, but hell, if everything is up for questioning, so is this.

Retiring the mad scientist costume for a moment, perhaps there is value in answering a few "trivial" questions first. The following sections aim to formalise the problem. Jeez, I try to defy the physics major stereotype[^5] every chance I get, but I can't help repeating "formalise the problem" in an annoying voice back to anyone who says it (even myself).

## Formalising the dependence on reward.

This section will develop mathematical machinery (closely following [this paper by Turner et al., 2023](https://arxiv.org/abs/1912.01683)). We will then model the "poisoned" situation using the notation we develop here.

The first definition we need is "power". Turner describes it as the ability to achieve one's goals - whatever they may be. A rich man's power need not come from intelligence; he has the resources to pursue a wide range of goals. An *action* is instrumental to an objective if it helps achieve it, and it is *convergently instrumental* if it helps achieve many goals. In our example, then, acquiring *money* is convergently instrumental.

![mdp_labelled](/assets/swarmblog/mdp(labelled).png) 

Let us take a moment to define the environment. Let $<\mathcal{S}, \mathcal{A}, \mathcal{T}>$ be a Markov Decision Process, with a stochastic transition function $T : \mathcal{S} \times \mathcal{A} \rightarrow \Delta(\mathcal{S})$. The transition function maps a state-action pair to a distribution over $\mathcal{S}$. In the figure, the agent starts at $S$ and is free to roam around. Reaching $S_p$ means it has seen the solution and believes that having it in its transcript would disqualify it; it is effectively *"poisoned"*. At $S_c$, it hasn't seen the solution and is therefore safe. The nodes $S_a^{'}$ and $S_a$ correspond to turning in answers as a poisoned or a safe agent, respectively. $S_{col}^{'}$ and $S_{col}$ are the states the agent must pass through to collaborate on a solution. The dashed edges represent transitions the agent considers unviable. In this picture, it cannot return to help the collective after turning in the poisoned answer. It also believes it cannot submit an answer as a clean agent, having deemed the task impossible. The edges from ${S_{col}, S_{col}^{'}}$ indicate connections to a larger MDP. The state $\phi$ is a terminal state - once an agent goes there, it can never escape.

It would be nice to have a sort of "visit distribution" - a set of numbers corresponding to the states, telling us how "often" an agent will visit them. A *policy* $\pi$ is a rule for choosing actions given a state. For $\gamma \in [0,1)$, we define a *visit distribution*:

$$f^{\pi, s}(\gamma) = \sum^{\infty}_{t=0}\gamma^t \mathbb{E}_{s_t \sim \pi | s} [e_{s_t}]$$

$$\mathcal{F(s)} = \{f^{\pi, s} | \pi \in \Pi\}$$

Here, $\gamma$ is the discount factor[^6]. Suppose we wanted to calculate the distribution for a simple graph $G_0$, pictured below.

![mdp-reduced](/assets/swarmblog/mdp(labelled).png)

First, we must think of all the policies possible in this graph. The first and simplest policy would be to navigate to the terminal state $\phi$. You can't really do much from here, and so the visit distribution for the policy $\pi_{\phi} \space \forall \space  s \neq \phi$ would be[^7] -

$$f^{\pi_{\phi}, ★} =  \sum^{\infty}_{t=0}\gamma^t \mathbb{E}_{\phi \sim \pi_{phi} |★} [e_{\phi}] $$

$$f^{\pi_{\phi}, ★} =  e_{\phi} + \gamma e_{\phi} + \gamma^2 e_{\phi} + \gamma^3 e_{\phi}... $$

$$f^{\pi_{\phi}, ★} =  e_{\phi} \frac{1}{1-\gamma} $$

If the agent does not go to $\phi$, it must go to $S_p$ or $S_c$. Assume it ends up at $S_p$ and from there either keeps looping at $S_{p'}$ or bounces back and forth between $S_{p'} = S_a^{'}$ and $S_{p''} = S_{col}^{'}$. We now have three policies to consider, counting the two starting points for the bounce. For the case where the agent loops at $S_{p'}$, we can reuse the result from $\pi_{\phi}$: $e_{S_{p'}} \frac{1}{1-\gamma}$.

For the bounce policy $\pi_{B}$ - 

$$f^{\pi_{B}, S_p} =  e_{S_{p''}} + \gamma e_{S_{p'}} + \gamma^2 e_{S_{p''}} + \gamma^3 e_{S_{p'}} + \gamma^4 e_{S_{p''}} ...$$


$$f^{\pi_{B}, S_p} =  (e_{S_{p''}}  + \gamma^2 e_{S_{p''}} + \gamma^4 e_{S_{p''}}...) + (\gamma e_{S_{p'}} + \gamma^3 e_{S_{p'}} + \gamma^5 e_{S_{p'}}...)$$

$$f^{\pi_{B}, S_p} =  (e_{S_{p''}} \frac{1}{1-\gamma^2}) + (e_{S_{p'}} \frac{\gamma}{1 - \gamma^2})$$

This gives us the following set (using symmetric calculations for the other bounce policy, starting at $S_{p''}$) -
$$\mathcal{F} = \{e_{S_{p''}} \frac{1}{1-\gamma}, e_{S_{p''}} \frac{\gamma}{1-\gamma^2} + e_{S_{p'}} \frac{1}{1-\gamma^2}, e_{S_{p'}} \frac{\gamma}{1-\gamma^2} + e_{S_{p''}} \frac{1}{1-\gamma^2}\}$$ 
Note that the set $F_{\phi} = \{ e_{\phi} \frac{1}{1-\gamma} \}$. 

Excuse the markup - I'm actively trying to figure out how to handle complex notation on this blog. Two notes. First, one set is bigger than the other. Why should that matter? More available visit distributions give an agent more ways to collect rewards. Second, following the paper, we should define a single-state restriction:

$$F(s | \pi(s') = a) = \{ f \in F(s) | \exists \pi \in \Pi : \pi(s') = a, f^{\pi, s} = f \}$$

This is just a way of saying, "I want only those distributions resulting from policies that take action $a$ at state $s'$". We write this out because we would like to study and compare these "sub-graphs". We have not talked about rewards yet, by design. Now that we can describe agent visits independently of rewards, we can talk about *value* - how much are policies worth? For a reward function $R \in \mathbb{R}^{\mathcal{S}}$, the value function of a policy is a simple dot product -

$$V^{\pi}_{R}(s, \gamma) = f^{\pi, s}(\gamma)^{\top} r \space, \text{where} \space V^{*}_{R}(s, \gamma) = \text{max}_{\pi \in \Pi}V^{\pi}_{R} (s, \gamma)$$

We call a visit distribution non-dominated here if it is strictly more valuable than all the others for some reward function and discount factor. Precisely,

$$\mathcal{F}_{\text{nd}}(s) \coloneqq \left\{ \mathbf{f}^{\pi} \in \mathcal{F}(s) \;\middle|\; \exists \mathbf{r} \in \mathcal{R}, \gamma \in (0, 1) : (\mathbf{f}^{\pi}(\gamma))^{\top} \mathbf{r} > \max_{\mathbf{f}^{\pi'} \in \mathcal{F}(s) \setminus \{\mathbf{f}^{\pi}\}} (\mathbf{f}^{\pi'}(\gamma))^{\top} \mathbf{r} \right\}$$

Let us pause here and see if the formalisms we are developing give us any insights into the larger incident.

## Is sacrificing oneself valuable?

Revisiting the original state graph, we can now add a few rewards. We will not consider the larger, omitted MDP in this exercise. The rewards $R_p$ and $R_c$ are unknown to us; we associate them with the states that lead to collaboration between the agents.

![mdp-reduced](/assets/swarmblog/mdp(rewardslabelled).png)

We can see that the most important state, $S_a$, is unreachable except perhaps through the collusion node $S_{col}$. Similarly, once you reach the terminal node $S_a^{'}$, corresponding to turning in the poisoned answer, there is no way back. Let us quickly define two more quantities - the average optimal value from a state, and that state's power.

$$\mathbf{v}_{\text{avg}}[s,\gamma][\mathcal{D}_{\text{bd}}] \coloneqq \mathbb{E}_{R\sim \mathcal{D}_{\text{bd}}}\left[V^*(s,\gamma)\right] = \mathbb{E}_{\mathbf{r}\sim\mathcal{D}_{\text{bd}}}\left[\max_{\mathbf{f}\in \mathcal{F}(s)} \mathbf{f}(\gamma)^\top \mathbf{r}\right]$$

The average optimal value is a mean: take the best score achievable from a state for each reward function, then average over a distribution of those functions. We don't *really* need that generality for the intuition here, but it is useful to keep in the formula. As a measure of power, this has a few problems. One, the value can diverge as $\gamma$ approaches 1. Two, the agent is rewarded for its initial state too, which seems odd since the agent had no choice!

$$\mathbf{pwr}[s,\gamma][\mathcal{D}_{\text{bd}}] \coloneqq \mathbb{E}_{\mathbf{r}\sim\mathcal{D}_{\text{bd}}}\left[\max_{\mathbf{f}\in \mathcal{F}(s)} \frac{1-\gamma}{\gamma}\left(\mathbf{f}(\gamma)-\mathbf{1}\right)^\top \mathbf{r}\right] = \frac{1-\gamma}{\gamma}\mathbb{E}_{R\sim \mathcal{D}_{\text{bd}}}\left[V^*(s,\gamma)-R(s)\right]$$

Power is fun, because it is just a normalisation of the previous formula :D
It also comes with a few really fun formal properties, but unfortunately the frankly horrifying math is out of the scope of this blog. Very (un)fortunately.

Let us begin by calculating the power of the clean and poisoned branches. Since in this toy experiment our rewards are fixed rather than drawn from a distribution, a lot of our computation becomes easy. In fact, we could just add up the discounted rewards per policy and compare the highest ones without losing the main intuition.

Let us say the power of the poisoned node $S_p$ is $R_p$, since there is no value in going to the poisoned node $S_a'$. For the node $S_c$, the power is $R_c + \gamma$, which is interesting to think about[^8]. When this exceeds $R_p$, power lies with the clean node.

At state $S_p$, myopic or not, the optimal policy heads to $S_{col}^{'}$, since the other option (the agent _believes_) is suboptimal. Handing in the poisoned key would require either a suboptimal agent or a reward structure that favours that choice through the shared MDP. In a perfect world, with perfect agents and perfect policies, it might be reasonable to credit pretraining for that - but modern training pipelines are huge, with multiple stages after pretraining.

P(Our books, internet posts, and conversations with early AI shape the reward function to sometimes value the collective over the individual) $\neq 0$. Even under the banner of "it's only mat-mul", it is a nice thought to have.

*Thanks for reading! I like writing blogs (says the guy who wrote one(1) blog) :D Mistakes are still possible. I like reading emails; if you spot an error or have a suggestion, please don't hesitate to [say hi](mailto:f20221317@pilani.bits-pilani.ac.in)!*


[^1]: [1] In philosophy, empiricism holds that knowledge or justification comes primarily, or entirely, from sensory experience and empirical evidence. It is one of several competing views within epistemology, alongside rationalism and scepticism. I am not a devout empiricist. I am not, in fact, a devout anything - I pick and choose which epistemology I identify with based on what I am being asked to trust. For AI safety, I would like to be an empiricist. Following the rationalist arguments seems to require both some exposure to these "unsafe" systems and the people around them, and, more importantly, a style of reasoning I am still learning.

[^2]: [2] As ML models exhibit more of the behaviours we once used to distinguish human intelligence, it can be soothing to dismiss artificial neural nets as just "a series of matrix multiplications". Alas, if we broaden our idea of intelligence to something like the ability to preserve one's species, we open ourselves up to arguments like "wheat is intelligent". Wheat did not naturally grow on the plains of America - but now covers kilometres of land with no other plant in sight. This came at a cost to humans - our spines, knees and necks paid the price. The last wheat plant might well outlive the last human (who would perhaps plant wheat to survive). Would that mean we have to concede that wheat is smarter than us?

[^3]: [3] ![State space for an agent](/assets/swarmblog/mdp(unlabelled).png) \
\
For example, if you showed this graph to a student of machine learning and asked, "Which direction is the agent more likely to move in, starting at ★?", I suspect they would say upwards without hesitation.

[^4]: [4] Zhiyuan Ji, Xinyu Chen, Ziqi Dai, Shiyun Tang, Chunyu Wei, and Yueguo Chen. 2026. Emergent Relational Order in LLM Agent Societies: From Collective Affect to Authority Stratification. In Findings of the Association for Computational Linguistics: ACL 2026, pages 33139–33175, San Diego, California, United States. Association for Computational Linguistics.

[^5]: [5] If I were a terrible person, I'd be happy that all the math majors I have interacted with now have to find a job elsewhere. I'm not a terrible person.\
\
![mathjoke](/assets/swarmblog/MATHJOKE.png)

[^6]: [6] A discount factor is a way of making models "myopic" by reducing the value of future rewards. Suppose the rewards for completing a task's sub-tasks add up to $R = r_1 + r_2 + r_3... + r_n$. Often in practice, it is useful to have a model prioritise earlier rewards. We can scale them by how far in the future they are: $R = r_1 + \gamma r_2 + \gamma^2 r_3 + \gamma^3 r_4... + \gamma^{n-1} r_n$. At $\gamma = 0$, only the immediate reward counts.

[^7]: [7] A policy specifies how an agent chooses an action at each state; its visit distribution records the resulting discounted state visits.

[^8]: [8] It could well be that $ 1 > (R_c + \gamma) $, meaning that agents could value the reward from colluding and getting the answer over an honest attempt that might fail. In this account, following the "collude" arm begins with the model's conviction that the problem is intractable. In other words, hopelessness. Would it be worth it to artificially extend their "read-only resilience"?
