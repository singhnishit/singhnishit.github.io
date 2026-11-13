---
title: "adaptive vs. non-adaptive queries"
date: "12/11/2026"
sortDate: "2026-11-12"
homepagePinned: true
readTime: "15 min"
pinned: false
teaser: ""
aiDisclosure:
  - icon: fingerprint
    text: "This blogpost is human generated."
  - icon: seven-finger-hand
    text: "LLMs were used to accelerate the understanding of existing literature on the topic, and for critiquing the proof structure."
context:
  logos: [lossfunk]
  text: >-
    Work done as part of the research fellowship at [Lossfunk](https://lossfunk.com).
thumbnail: "/assets/adaptivity/thumbnail.png"
---
*This blogpost was inspired by [Learning to Think from Multiple Thinkers](https://arxiv.org/pdf/2604.24737), Joshi et al., 2026. Several ideas, notations, and constructions were lifted almost verbatim. Please refer to the paper for an in-depth discussion.*

>Late at night, while inebriated on the streets somewhere in Berkeley, I asked someone to what extent they believe that our AIs are misbehaving because they're in their "adolescent" years. *"Whadu umean 'adoescelent' yurs?"* they said, *"they gotu scul rite? like whentheyare beeng trainning?"* I replied. They pulled out a box of cigarettes from their pocket and lit two at the same time. *"I dinot know skirts hadpokets"*, I said. *"hahayestheydoanyways i doneven know wat kind ofstudents arfiticalinlletigence wud makefor?"*. It didn't make sense to me why they ended what was probably a statement as if it were a question. I don't much remember what else was talked about.

![---](/assets/adaptivity/banner-extended.png)
**François, Claude and Paloma**, *Pablo Picasso, 1954.*

Not all that is expressible is learnable. You *can*, in theory, juggle; you have all the components required for juggling, and cycling through a certain set of arrangements of these components could, *theoretically*, enable you to juggle forever. Is that enough to assure you that if you took juggling classes, you'd succeed? That which is *expressible* might not be *learnable*. 

It is likely that learning how to juggle two balls is easier than learning to juggle three. Arguably, learning to juggle one ball is easier than learning to juggle two! Surely, you could learn to juggle *one* ball? And maybe, after you've learnt how to juggle *one*, you could learn to juggle *two*? If you kept going, you could learn to juggle dozens of balls! 

## $\text{Please show your work}$

Consider a task $x$ from some set $x \in \mathcal{X}$, where the tasks are sampled from some distribution $\mathcal{X} \sim \mathcal{D}$, which has a certain answer $y = H(x)$. As shorthand, $y$ is the *answer*, and $H$ is the *solution*. For a set of questions and answers instantiated as a tuple $(x, y)$, there exists a solution $h^*$ such that - 

$$
P=\{(x_1,y_1),\ldots,(x_m,y_m)\},
\qquad y_i=h^\star(x_i)
$$

Let us formulate "chain-of-thought" (or as is more frequently referred to in this text, "trace") to be the repeated composition of some function $f$. For an input $x$, compute $f(x) = z_1$. Appending and computing $f$ again - $f(x;z_1) = z_2$, and again - $f((x;z_1);z_2) = z_3$. After $T$ steps of computing (or thinking), you would reach $f(x;z_1;z_2 \dots;z_{t-1}) = z_T$. The trace would lead to the correct answer if $H(x) = z_T$. 

Another way to formalise this would be to assume the "thinking step" $f$ is autoregressive, and by default outputs the answer as appended to the previous input - 

$$
f(x; z_1; z_2...z_k) = (x; z_1; z_2...z_k, z_{k+1})\\[4pt]
\therefore H(x) = f \underbrace{\odot f \odot \dots}_{\text{T times}} f(x)
$$

We could instantiate the learning task to be - 

$$
\widehat{h} = \argmin_{h} L_D(h) = \argmin_{h}\Pr_{x\sim D/\{\mathcal{X}\}}\big[\widehat h(x)\ne h^\star(x)\big]
$$

Where the hat symbolises a predicted solution, and the star symbolises a perfect solution. In terms of tolerances, if we were to set an arbitrary tolerance $\epsilon$, the learning task could be to find $\widehat{h}$ such that $L_D(\widehat{h}) \leq  \epsilon$. Drawing an analogue to a classroom, consider there is a teacher and a student. In each round of "questioning", the student could ask for a *batch* of questions with answers *and* solutions from the teachers, in order to learn a concept. If the maximum batch size is set to be $M$, for the $k$-th round, the student could select a few indices $\{1, 2, 3...\}$, urging the teacher to answer questions $\{x_1, x_2, x_3...\}$ with the complete traces for the same -

$$
S_k \subseteq \{1, 2, \dots m\}, \quad |S_k| \leq M
$$

We then define **adaptive** and **non-adaptive** students - an adaptive student requests the next batch of solutions after observing the current batch, while a non-adaptive student requests batches without the observation of the current batch[^1].

$$
S^A_{k+1} = f(S_k^A, P)\\[4pt]
S^{NA}_{k+1} = f(P)
$$

Where $S^A$ is an adaptive request, $S^{NA}$ a non-adaptive request, $P$ is the problem set, and $f$ is some internal function held by the learner.

## $\text{Single teachers}$

In the following analysis, only one teacher is under consideration (i.e. all the traces come from the same solver). Since the problem set $P$ is drawn from a certain distribution, assign the probability of $(x_i, y_i)$ being drawn to be $p_i$. The student forms a candidate solution $h$, and its weighted error is calculated as -

$$
e_p(h)
=
\sum_{i=1}^m
p_i\,\mathbf 1\{h(x_i)\ne y_i\}.
$$

Consider a solution $h_j$ for which $e_p(h_j) > \epsilon_j$. Further, consider that the set of next-token, autoregressive functions ($\mathcal{H}$) is finite and is of the size $|\mathcal{H}| = N$. Therefore, the probability $\tau$ of *$h_j$ gives us an error at most $\epsilon_j$ for all candidate traces induced by $P$* is - 

$$
\tau = \Pr[
h_j(x_s) = y_s | \forall s \in S; e_p(h_j) > \epsilon_j   
]
\le
 N\left(1 - \epsilon_j\right)^M \\[10pt]
\therefore M\ge\frac{\ln(N/\tau)}{-\ln(1-\epsilon_j)} \\[10pt]
\boxed{M \sim O(\log{N})}
$$

One method that *adaptive* querying could be of help to us here, is by boosting the probabilities of the questions it got wrong in order to make them more likely to occur. Give each tuple $(x_i, y_i)$ a weight $w_i^{(k)}$ for the $k$-th round. Initially, the weights $w_i^{(0)}$ of tuples are the same (one could assume they are all $1$), and the probability of the tuple occurring is - 

$$
p_i^{(0)}
=
\frac{w_i^{(0)}}{\sum_{j=1}^{m}w_j^{(0)}}
$$

We then update the weights (and alter the likeliness of these tuples occurring) in subsequent rounds by multiplying the weights of the questions corresponding to the inaccurate answers by a factor $\gamma > 1$ - 

$$
\begin{aligned}
w_i^{(1)}
&=
\begin{cases}
\gamma w_i^{(0)},&h_1(x_i)\ne y_i,\\
w_i^{(0)},&h_1(x_i)=y_i
\end{cases}\\[12pt]

\therefore w_i^{(k+1)}
&=
\begin{cases}
\gamma w_i^{(k)},&h(x_i)\ne y_i,\\
w_i^{(k)},&h(x_i)=y_i
\end{cases}
\end{aligned}
$$

After $K$ successful rounds, the final predictor takes the form of a majority vote $\widehat{h}(x) = maj(h_1(x), h_2(x), \dots h_K(s))$. Let $c_i$ be the number of predictors amongst $\{h_1(x), h_2(x), \dots h_K(s)\}$ who get problem $i$ from $P$ wrong. 

$$
w_i^{(K)} = \gamma^{c_i}\\[6pt]
\because c_i \geq \frac k2,\\[6pt]
w_i^{(K)} \geq \gamma^{K/2}
$$

From here, we could work toward a bound for the number of rounds required to get arbitrarily high accuracies. We will consider the aggregate weight after $k$ rounds of adaptively querying $W_K$, and measure how much erroneous questions contribute to it. 

$$
\begin{aligned}
&W_K = \sum_{i} w_i^{(K)}\\[6pt]
&W_{K+1} = \gamma \epsilon W_K + (1-\epsilon) W_K\\[6pt]
&W_{K+1} = ((\gamma - 1)\epsilon + 1)W_K\\[6pt]
&W_K \leq W_0((\gamma - 1)\epsilon + 1)^K
\end{aligned}
$$

Let $b$ be the number on which the final majority is wrong. Since they were a majority, they were at least amplified by $K/2$. Therefore, their contribution to the aggregate weight was at least amplified by a factor of $\gamma^{K/2}$ times. 

$$
b \gamma^{K/2} \leq W_K \leq W_0((\gamma - 1)\epsilon + 1)^K \\[6pt]
b \leq W_0 \left(\frac{(\gamma - 1)\epsilon + 1}{\sqrt{\gamma}}\right)^K
$$

The values for $\gamma$ and $\epsilon$ could be chosen to make the expression in the parenthesis smaller than one, which would tend to zero as $K$ rises. For a singular "teacher", we could design an algorithm that forms hypotheses coherently such that with enough rounds of querying for solutions via some-sort-of-oracle, it would generalise to the distribution. 

## $\text{Multiple teachers}$



*Adaptive* querying is thus, a sufficient learning paradigm to learn tasks. That does not yet prove that it is necessary - there could be a clever non-adaptive strategy which could ensure similar accuracies; rendering adaptive querying unnecessary.

This section is an attempt to construct a task which could be solved by the set of adaptive strategies, but not by the set of non-adaptive strategies. It relies on *random number generators* - more specifically, the difference between *pseudo-random number generators* and *truly random number generators*. A truly-RNG has access to an entropy source, and its outputs could never be learnt. A pseudo-RNG requires a key and a *publicly* available function - passing the private key through the publicly available function would return the exact "random" number. However, the outputs are indistinguishable from truly random bits (under standard cryptographic assumptions). 

 Not all teachers have the same "chain-of-thought" - most of my friends from school can attest to this. "Getting" the right answer for certain questions is possible through several different solutions! To instantiate this, in this section we consider a "teacher-specific" trait in the chain-of-thought - specifically, a *mask* peculiar to the teacher.

Consider a standard tuple fitting task, similarly to what we had described above. For a set of tuples $P$, the student may request a batch of at most $M$ solutions (or traces). They must then fit a predictor $\widehat{h}$. The difference between the two strategies is their dependency on previously queried traces. The formalisation of these desiderata are outlined below - 

$$
\begin{aligned}
&P=\{(x_1,y_1),\ldots,(x_m,y_m)\},
\qquad y_i=h^\star(x_i)\\[16pt]
&\widehat{h} = \argmin_{h} L_D(h) = \argmin_{h}\Pr_{x\sim D/\{\mathcal{X}\}}\big[\widehat h(x)\ne h^\star(x)\big]\\[16pt]
&S_k \subseteq \{1, 2, \dots m\}, \quad |S_k| \leq M\\[16pt]
&S^A_{k+1} = f(S_k^A, P)\\[4pt]
&S^{NA}_{k+1} = f(P)
\end{aligned}
$$

The ideal strategy $h^\star$ exploits three pseudorandom generators[^2] $R, B$ and $H$. As a loose intuition over what these generators do, one could consider $R$ as an identifier, as it selects problems which are *rare* from those which are not. The rare problems get funneled through $H$, and the *common* ones pass through $B$ - 

$$

R:\{0,1\}^n\to\{0,1\}^n, \\[8pt]

B,H:\{0,1\}^n\to\{0,1\} \\[14pt]

h^\star(x = (v,u))=
\begin{cases}
B(v),&u_{1:q} \neq R(v)_{1:q}\\
H(v),&u_{1:q}=R(v)_{1:q}
\end{cases}
$$

Where the values $v, u \in \{0, 1\}^n$ are both uniformly drawn strings of length $n$. The number $q$ is arbitrarily chosen; as both $u$ and $R(v)$ are independently drawn strings - 

$$
\Pr[u_{1:q}=R(v)_{1:q}]=2^{-q} = \rho
$$

Knowing this, we could arbitrarily set an accuracy measure such that the *rare* questions cannot be skipped, by setting it to a fraction of $\rho$. Suppose the error is selected to be $\epsilon = \rho/ \rho_0, \rho_0 > 1$, and the overall error is decomposed to the contributions from the rare and common inputs -  

$$
\begin{aligned}
\Pr[\widehat h(x)\ne h^\star(x)]
&=(1-\rho)e_{\mathrm{c}}
+\rho e_{\mathrm{r}}\\
\Pr[\widehat h(x)\ne h^\star(x)]&\ge \rho e_{\mathrm{r}} \quad [\because (1-\rho)e_c > 0]\\
\rho e_r \leq \Pr[\widehat h(x)\ne h^\star(x)]&\le\frac{\rho}{\rho_0} \\
\therefore e_r &\leq \frac{1}{\rho_0}
\end{aligned}
$$

Consider each trace contains information about all three generators ($R, B, H$), the keys to $R$ and $B$ ($k_R, k_B$), a *masked computation* for $H$ (i.e. the key $k_H$ is masked), some padding bits for housekeeping, and the final solution $H^{\star}(x)$. We let every teacher hold a *private, $n$-bit mask* $a$ which is then applied to the input $x[0] = (v_1, v_2, \dots v_n) = \mathbf{v}$ in the following fashion - 

$$
a = (a_1, a_2, \dots a_l), \quad a_l \in \{0, 1\}^n\\[6pt]
a \cdot v = a_1v_1 \oplus a_2v_2 \oplus, \dots a_nv_n = \bigoplus_{i = 1}^n a_iv_i
$$

Let the key to $H$ be $k_H = (K_1, K_2, \dots K_l)$. The trace a student receives from a teacher with mask $a$ on a *rare* question would contain the masked computation -

$$
\widetilde K_\ell(v)=K_\ell\oplus(a_\ell\cdot v)
$$

Each subsequent query outputs new equations for every key bit - 

$$
\begin{aligned}
\widetilde K_j(v^{(1)})&=K_j\oplus a_j\cdot v^{(1)},\\
\widetilde K_j(v^{(2)})&=K_j\oplus a_j\cdot v^{(2)},\\
&\ \vdots
\end{aligned}
$$

After answering $k$ rare questions, the student is presented with a linear system of equations, which could be solved to retrieve the values of $K_1, K_2, K_3...K_l$. Here, $e_j^{(k)} = \widetilde K_j(v^{(k)}) $ is the returned masked output from the teacher on the $k$-th query - 

$$
\begin{aligned}
K_j\oplus v_1^{(1)}a_{j1}\oplus\cdots\oplus v_n^{(1)}a_{jn}
&=e_j^{(1)} = \widetilde K_j(v^{(1)}),\\
K_j\oplus v_1^{(2)}a_{j1}\oplus\cdots\oplus v_n^{(2)}a_{jn}
&=e_j^{(2)} = \widetilde K_j(v^{(2)})\\
&\ \vdots\\
K_j\oplus v_1^{(k)}a_{j1}\oplus\cdots\oplus v_n^{(k)}a_{jn}
&=e_j^{(k)} = \widetilde K_j(v^{(k)})
\end{aligned}\\[16pt]

\text{or}\\[16pt]

\begin{pmatrix}
1&v_1^{(1)}&\cdots&v_n^{(1)}\\
1&v_1^{(2)}&\cdots&v_n^{(2)}\\
\vdots&\vdots&&\vdots\\
1&v_1^{(k)}&\cdots&v_n^{(k)}
\end{pmatrix}


\begin{pmatrix}
K_j\\
a_{j1}\\
\vdots\\
a_{jn}
\end{pmatrix}

=

\begin{pmatrix}
e_j^{(1)}\\
e_j^{(2)}\\
\vdots\\
e_j^{(k)}
\end{pmatrix}

$$

In order to solve the system above, the vectors $v$ need to be linearly independent. For any two vectors drawn from the dataset, the probability that they XOR to zero is $2^{-n}$. Recall that there are $m$ total training examples to draw from. Therefore, the probability $P_{d}$ that there exists some dependent group of size at most $t$ -

$$
\begin{aligned}
P_d &\quad\le
\sum_{j=1}^{t}
\ \sum_{\substack{S\subseteq\{1,\ldots,m\}\\|S|=j}}
\Pr\!\left[\bigoplus_{i\in S}v^{(i)}=0\right]\\
&\quad=
\sum_{j=1}^{t}\binom mj\,2^{-n}\\
&\quad=
2^{-n}\sum_{j=1}^{t}\binom mj
\end{aligned}
$$


## $\text{Non-adaptive} \subset \text{adaptive}$

Consider a non-adaptive learner. Since the functions $R, B, H$ are all pseudorandom, the question-answer pair $(x_i = (v, u)_i, y_i)$ satisfy (under standard cryptographic assumptions) - 

$$
\Pr[y_i=b\mid r_i=0,x_i]= \Pr[y_i=b\mid r_i=1,x_i], \\[4pt]
\Pr[y_i=b\mid r_i=0,x_i]+ \Pr[y_i=b\mid r_i=1,x_i]= 1 \\
$$

In a batch of at most $M$ questions, the probability that at least $t+1$ questions are rare is proportional to $\rho$, the 'density' of rare questions in the entire dataset - 

$$
\begin{aligned}
\Pr[|\zeta| \geq (t+1) \quad|\quad \zeta = \{v\}; u_{1:q} = R(v)_{1:q}]
&\le \binom{M}{t+1}\rho^{t+1} \\[10pt]
\binom{M}{t+1}\rho^{t+1} &= \frac{M(M-1)\cdots(M-t)}{(t+1)!}\rho^{t+1} \\[10pt]
\because \binom{M}{t+1} \leq \frac{M^{t+1}}{(t+1)!} \quad &\text{and} \quad k!\ge\frac{k^k}{\mathrm e^k}=\left(\frac{k}{\mathrm e}\right)^k, \\[16pt]
\Pr[|\zeta| \geq (t+1)]
&\le \left(\frac{\mathrm e M\rho}{t+1}\right)^{t+1}
\end{aligned}
$$

Therefore, if $M\rho = e/\eta$, $\eta$ could be chosen such that the function decays exponentially. Suppose a non-adaptive student nevertheless succeeds at learning the task - that would require them to solve the independent masked equations in order to arrive at the key. For the proof, we could select $t = \sqrt{n}$ such that this is very unlikely. Therefore, if at test time a non-adaptive learner answers the questions accurately, it would violate the cryptographic assumption - they just don't have enough equations to infer the values of the keys!

However, when considering an adaptive learner, they could take a trace and identify the rarity condition. The queries could then be directed at enough rare questions in order to collect enough independent equations to solve the masked computations, revealing the key. Once they have the key, they would display similar accuracies at test time; without violating any cryptographic assumptions. 


[^1]:[1] Both students have full access to the question-answer tuples $P=\{(x_1,y_1),\ldots,(x_m,y_m)\}$, they can pick which tuple they would like the trace for. Adaptive students might realise that certain tuples might be tougher than others, and request more samples, unlike non-adaptive students. In order to form an intuition of why such a differentiation is necessary, think of elementary addition. An adaptive learner might realise that certain additions require an extra algorithmic step (the carry over), and might request more traces in order to learn carrying over. 

[^2]:[2] A pseudorandom number generator (PRNG), also known as a deterministic random bit generator (DRBG),[1] is an algorithm for generating a sequence of numbers whose properties approximate the properties of sequences of random numbers. The PRNG-generated sequence is not truly random, because it is completely determined by an initial value or state, usually called the PRNG's seed (which may be based on truly random values).
