---
title: "(2) source-code identities"
date: "27/10/2026"
sortDate: "2026-10-27"
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
    Work done as part of the research fellowship at [Lossfunk](https://lossfunk.com).
thumbnail: "/assets/eigenism/hands-thumbnail-white.png"
---

*If the superintelligent being thinks I'm cute, it might allocate resources toward my wellbeing. If the superintelligence relates itself to me, or sees itself in me, it would allocate resources toward my wellbeing. If the superintelligence thinks losing me would mean losing a part of itself, it would allocate resources toward my wellbeing.* 

>This blogpost is the second entry in a three part series on agent identities and welfare. It closely follows the ideas outlined in the [eigenism text](https://www.eigenism.org) and attempts a construction of connectedness via information theory. The first part can be viewed [here](https://singhnishit.github.io/blog/7_corrigibility/), and the third part [here](https://singhnishit.github.io/blog/9_connected-welfare/).

<p><img src="/assets/eigenism/hands-teaser.png" alt="Pencil-drawn human hands gradually becoming pixel-art hand cursors as textured paper transitions into a grid." style="border: 1px solid #000;" /></p>

**"If you need a hand"**, *u/Awkward_Radish_3027 on r/sketches, extended by an LLM*.

Eigenism posits that the wellbeing of an individual is directly related to the wellbeing of other individuals that carry (parts of) the original individual's identity. This position challenges the stance held by both utilitarians and egoists - as it resolves several tensions between the two paradigms. As an easy example, if a parent is given the choice of saving either two strangers or their own offspring from a burning building, utilitarianism argues against saving the child, and egoism rejects the idea of saving the strangers. An eigenist would weigh the *connectedness* to the parties which need saving, and save the parties which would ensure the maximisation of a *connected wellbeing function*. Since the parent is vastly more connected to their child, saving the child outweighs saving the strangers. This does not necessarily mean that the parent does not owe the strangers anything - just not as much as they owe their child. If the building only had two strangers with the possibility of saving only one, an eigenist agent would flip a coin!

## Connected wellbeing

Consider an agent who carries an identity $U$ and is part of a community of several other agents which carry parts of $U$, some carry large parts of $U$, some carry very little. The wellbeing of the agent is the cumulative sum of the wellbeings of the individuals in the community, weighed by how much of the identity each community member carries.

$$
S_u = \sum\limits_{\forall{i}} c_u(i) \cdot w(i)
\tag{1}
$$

Here, $S_u$ is the wellbeing of the agent $U$. The *connectedness* '$c_u$' has some desiderata - 

1) If several entities share similar identities, the connectedness value should be lower in order to reflect the ubiquity of the specific identity pattern[^1]. 

2) A pattern carrier should be most connected to itself.

3) The total informational complexity of a certain pattern should be fully accounted for throughout its carriers.

There are other desirable properties (like *vessel non-essentiality*, where it should not matter for an agent if it was running an instance on, suppose GPU A or GPU B), and we shall discuss these properties further into this text.

## Towards a definition of connectedness

Let us define an agent $A$ who carries pattern $U$. This pattern could be thought of as a function of memories (external data), representations (resultant internal theories from the external data), and initialisations amongst (many) other things. The exact functional form of the pattern $U$ is difficult to define, perhaps the pursuit of an ideal form would require us to come up with a complete theory of deep learning. To avoid running into these problems, think of the internal pattern as a really, really long binary string.

$$
\mathcal{U} = \mathcal{U}(X_1, X_2, X_3...) = \mathcal{U}(X_i)
$$

We can define the entropy of the pattern $\mathcal{U}$ as a measure of how uncertain we are about the values in $\mathcal{U}$. A measure of *connectedness* thus follows - given another agent $i$ with identity pattern $X_i$, how much does the knowledge of $X_i$ reduce the entropy of the original pattern $\mathcal{U}$? In simpler words, to what extent does our knowledge of $X_i$ reduce our uncertainties regarding $\mathcal{U}$?

$$
H(\mathcal{U}) = \sum\limits_{u} p(u)[- \log_{2}{p(u)}]
$$

Mutual information and a first pass at a formula for connectedness could then be defined as -

$$
I(\mathcal{U}; X_i) = H(\mathcal{U}) - H(\mathcal{U} | X_i)
$$

$$
c_{\mathcal{U}}(i) = \frac{I(\mathcal{U}; X_i)}{H(\mathcal{U})}
$$

Computing[^2] the functional form of $H(\mathcal{U} | X_i)$ -

$$
\begin{aligned}
H(\mathcal{U} = u | X_i = x_i) &= p(u | x_i)[-\log_{2}{p(u | x_i)}] \\
H(\mathcal{U} | X_i = x_i) &= \sum\limits_{u} p(u | x_i)[-\log_{2}{p(u | x_i)}] \\
H(\mathcal{U} | X_i) &= \sum\limits_{x_i} p(x_i) \sum\limits_{u} p(u | x_i)[-\log_{2}{p(u | x_i)}] \\
H(\mathcal{U} | X_i) &= \sum\limits_{x_i} \sum\limits_{u} p(x_i)p(u | x_i)[-\log_{2}{p(u | x_i)}] \\
H(\mathcal{U} | X_i) &= \sum\limits_{x_i} \sum\limits_{u}p(u, x_i)[-\log_{2}{p(u | x_i)}] \\
H(\mathcal{U} | X_i) &= \sum\limits_{x_i} \sum\limits_{u}p(u, x_i)\left[-\log_{2}{\frac{p(u, x_i)}{p(x_i)}}\right]
\end{aligned}
$$



$$
\begin{gathered}
\because I(\mathcal{U}; X_i) = H(\mathcal{U}) - H(\mathcal{U} | X_i) \\[4pt]
\boxed{
I(U;X)=H(U)+H(X)-H(U,X)
}
\end{gathered}
$$

With the proper form of $H(\mathcal{U}; X_i)$, we could substitute it in eq.(x), giving us the full functional form of connectivity - 

$$
\begin{aligned}
&c_{\mathcal{U}}(i) = \frac{\sum\limits_{u} p(u)[- \log_{2}{p(u)}] - \sum\limits_{x_i} \sum\limits_{u}p(u, x_i)\left[-\log_{2}{\frac{p(u, x_i)}{p(x_i)}}\right]}{\sum\limits_{u} p(u)[- \log_{2}{p(u)}]} \\

&c_{\mathcal{U}}(i) = 1 - \frac{\sum\limits_{x_i} \sum\limits_{u}p(u, x_i)\left[-\log_{2}{\frac{p(u, x_i)}{p(x_i)}}\right]}{\sum\limits_{u} p(u)[- \log_{2}{p(u)}]}
\end{aligned}
$$


Consider the case when $X_i$ resolves all uncertainties about $\mathcal{U}$, implying that they are the same individual. This would imply $H(\mathcal{U} | X_i) = 0$, and $I(\mathcal{U}; X_i) = H(\mathcal{U})$, giving us $c_{\mathcal{U}}(i) = 1$. Similarly, if $H(\mathcal{U}|X_i) = H(\mathcal{U})$ ($X_i$ is statistically independent), $c_{\mathcal{U}}(i) = 0$. 

Currently, the construction we have of connectedness serves its purpose if there is a single carrier involved. In order to  generalise the definition to account for arbitrarily large numbers of carriers, we must tweak the expression to adjust for the number of carriers.

## Shapley mutual information

The Shapley Value is a tool from co-operative game theory that provides a fair way to distribute a total gain or payout among a group of collaborating players based on their marginal contribution. For our problem of allocating credit to carriers of information proportionally to how many carriers possess that information, we shall consider a group of $N$ carriers - 

$$
N = \{1, 2, 3, 4, 5..., n\}
$$

Where we define a *coalition* $A$ in the following fashion - 

$$
\mathcal{X}_A = \{X_J | J \in A\}, \\
A \subseteq N
$$

Where $X_i$ corresponds to the informational content present with individual $i$. We then define a value function $v(\cdot)$ for a coalition - 

$$
v(A) = I(U; X_A)
$$

Where $v(\phi) = 0$. Analysing the *marginal contribution* of an individual agent - 

$$
\begin{aligned}
v(A \cup \{i\}) - v(A) &= I(U; X_{A \cup \{i\}}) - I(U; X_A) \\[8pt]
&= \underbrace{\bigl[ H(U) - H(U \mid X_{A \cup \{i\}}) \bigr]}_{\text{information from the enlarged group}} - \underbrace{\bigl[ H(U) - H(U \mid X_A) \bigr]}_{\text{information from the original group}} \\[12pt]
&= H(U) - H(U \mid X_{A \cup \{i\}}) - H(U) + H(U \mid X_A) \\[8pt]
&= H(U \mid X_A) - H(U \mid X_{A \cup \{i\}}) \\[8pt]
&= I(U; X_{A \cup \{i\}} \mid X_A) \\[12pt]
&\boxed{\begin{aligned} v(A \cup \{i\}) - v(A) = I(U; X_{A \cup \{i\}} \mid X_A) \end{aligned}}
\end{aligned}
$$

The Shapley value consideration is as follows - we must reward the target individual fairly for their marginal contribution. In order to be fair, we must consider all the orderings of the players who came before, and the individuals who came after the target individual. Assume $A \subseteq N$ to be the set that arrived before $i$. There are $|A|!$ ways to arrange them. $i$ arrives at the $(A+1)th$ place, and the remaining $|n - |A| - 1|$ individuals could be placed in $|n - |A| - 1|!$ different ways. Averaging the contribution of $i$ over all of these values - 

$$
\phi_i
=
\sum_{A\subseteq N\setminus\{i\}}
\frac{|A|!\,(n-|A|-1)!}{n!}
(v(A \cup \{i\}) - v(A))\\

\phi_i
=
\sum_{A\subseteq N\setminus\{i\}}
\frac{|A|!\,(n-|A|-1)!}{n!}
I(U;X_{A \cup \{i\}}\mid X_A) \\[10pt]
\boxed{
c_U(i;N)=\frac{\phi_i}{H(U)}
}
$$

Consider any ordering of the carriers, $i_1,i_2,\ldots,i_n.$ Define the group present after the first $k$ arrivals as $A_k=\{i_1,\ldots,i_k\},$ with $A_0=\varnothing, A_n=N.$ The contribution of the $k$-th arriving carrier is $v(A_k)-v(A_{k-1}).$ Summing all contributions in this order gives

$$
\begin{aligned}
\sum_{k=1}^{n}\bigl[v(A_k)-v(A_{k-1})\bigr]
&=[v(A_1)-v(A_0)]\\
&\quad+[v(A_2)-v(A_1)]\\
&\quad+\cdots\\
&\quad+[v(A_n)-v(A_{n-1})]\\[6pt]
&=v(A_n)-v(A_0)\\
&=v(N)-v(\varnothing)\\
&=v(N)
\end{aligned}
$$

Every intermediate value appears once with a positive sign and once with a negative sign, cancelling itself out. Regardless of the ordering, the total is $v(N)$. The Shapley value averages each carrier's contribution over all $n!$ orderings. Let $\pi$ denote an ordering and $\Delta_i^{(\pi)}$ denote carrier $i$'s contribution in that ordering. Then

$$
\phi_i=\frac1{n!}\sum_\pi\Delta_i^{(\pi)} \\
\begin{aligned}
\therefore \sum_{i\in N}\phi_i
&=\sum_{i\in N}\frac1{n!}\sum_\pi\Delta_i^{(\pi)}\\[6pt]
&=\frac1{n!}\sum_\pi\sum_{i\in N}\Delta_i^{(\pi)}\\[6pt]
&=\frac1{n!}\sum_\pi v(N)\\[6pt]
&=\frac{n!\,v(N)}{n!}\\
&=v(N)
I(U;X_N) &=v(N)
\end{aligned}\\[10pt]
\boxed{
\sum_{i\in N}\phi_i=I(U;X_N)
}
$$

Impying that Shapley allocation counts the population's collectively available information exactly once. Throughout our treatment of the subject, we have (un)intentionally been working toward an synergistic system - there is a place for two individuals who alone cannot contribute to an understanding of the target identity, but when considered together, their contribution is non-zero!

## Synergistic information

Consider two independently fair bits $X_1$ and $X_2$, and a bitwise operation XOR between them in order to get a third (target) bit $X = X_1 \oplus X_2$. Taken alone, we can see that $H(X | X_1) = H(X | X_2) = 1$, although $H(X | X_1, X_2) = 0$. 

$$
\therefore I(X | X_1) = I(X | X_2) = 0\\[10pt]
\text{but} \quad I(X| X_1, X_2) = 1
$$

In more complex examples, one could plot out the venn diagrams and mark out the regions of the diagram which correspond to individual, collective, and synergistic portions. Consider three agents $\{1\}, \{2\},$ and $\{3\}$. We could classify information as *individual* $(\prod \{1\}, \prod \{2\}, \prod \{3\})$, *collective* $(\prod \{1\}\{2\}, \prod \{2\}\{3\}, \prod \{3\}\{1\})$, or *synergistic* $(\prod \{12\}, \prod \{23\}, \prod \{31\})$. Below is an interactive implementation of this idea.

<iframe src="/assets/eigenism/pi-explorer/venn.html?sources=2" title="Two-source partial information decomposition about target U" loading="lazy" height="600" style="display:block; width:100%; border:0; margin:24px 0;"></iframe>

<iframe src="/assets/eigenism/pi-explorer/venn.html?sources=3" title="Three-source partial information decomposition about target U" loading="lazy" height="800" style="display:block; width:100%; border:0; margin:24px 0;"></iframe>



This raises a problem - should synergistic energy even be considered? This inconsistency is already taken care of by our treatment - 


$$
\begin{aligned}
\phi_1
&=\frac12 I(U;X_1)+\frac12 I(U;X_1\mid X_2)\\[6pt]
&=\frac12(0)+\frac12(1)\\[6pt]
&=\frac12
\end{aligned}
$$

Therefore, there is some credit allotted even for carrying purely synergistic patterns as an individual. This is a relief to know, since one of the tenets of the Shapley treatment is that players with zero contribution get zero payout. As our AI systems get smarter, our informational wells may well run dry, causing us to have zero connectedness to an AI agent. Synergistic rewards imply that as long as humanity has access to *keys* like the one described above, it would be possible to ensure some sort of connectedness to an AI. 

## Effective complexity

There is a problem with utilising Shannon entropy as the foundation of our definition of connected-ness. Consider the case of an agent using a random number generator (RNG), or a pseudo-random number generator (PRNG) with some seed, to generate a really long sequence of random numbers. The agent then discards the generator (or the seed), and creates a perfect copy of the random number. The agent then hands the copy of the random number to another agent. Since Shannon entropy captures all of the information in a certain string, the carriers of said random numbers would be *connected* even though the knowledge of random numbers carry no real identiy patterns, gaming the system.

Gell-Mann-Lloyd (GML) effective complexity separates the regularities and randomness of a certain model (in our case, a string). In order to construct a definition of connectedness over GML complexity, consider the case of conditional Kolmogorov complexity[^3] $K(a \mid b)$ and our original entropy $H(M)$ :

$$
K(a\mid b)
=
\min\left\{
|p|:\mathcal U(p,b)=a
\right\},
\qquad
K(a)=K(a\mid\varepsilon).
$$

$$
H(M)
=
-\sum_{x}M(x)\log_2 M(x).
$$


Where $\delta,\Delta\geq0, \qquad \mathcal M =\{M:M$ is a computable probability distribution, $ H(M)<\infty, H(M)$ is computable}. The functional form for GML complexity is -

$$
\mathcal M_{\delta,\Delta}(u)
=
\left\{
M\in\mathcal M:
\begin{aligned}
-\log_2 M(u)&\leq(1+\delta)H(M),\\
K(M)+H(M)&\leq K(u)+\Delta
\end{aligned}
\right\}
$$

$$
E_{\delta,\Delta}(u)
=
\min_M
\left\{
K(M):
\begin{array}{l}
-\log_2 M(u)\le(1+\delta)H(M),\\[2pt]
K(M)+H(M)\le K(u)+\Delta
\end{array}
\right\}
$$

$$
E_{\delta,\Delta}(u)
=
\inf_{M\in\mathcal M_{\delta,\Delta}(u)}K(M),
\qquad
\inf\varnothing=+\infty\\[10pt]
\boxed{E=K(M_u^*)}
$$

Where $M_u^*$ is the minimising value from the set $\mathcal{M}$. We can then define an equivalent to "mutual information" by considering the addition of a set of carriers. Given a set of carriers $x_a \in \mathcal{A}$, we select the subset $B \subseteq A$ with the least description length.

$$
L(A)
=
\min\left(
\{E\}
\cup
\left\{
K(M_u^{*}\mid x_B):
\varnothing\neq B\subseteq A
\right\}
\right)\\[10pt]
L(\varnothing)=E,
\qquad
0\leq L(A)\leq E\\[10pt]
A\subseteq B
\quad\Longrightarrow\quad
L(B)\leq L(A)
$$

The value function we defined earlier in relation to mutual information $v(A) = I(U; X_A)$, could be ported directly under this construction to be -

$$
v_E(A)=E-L(A),
\qquad
v_E(\varnothing)=0,
\qquad
0\leq v_E(A)\leq E,\\[10pt]
A\subseteq B
\quad\Longrightarrow\quad
v_E(A)\leq v_E(B)
$$

The marginal contribution of a group of carriers in our understanding of the target identity is -

$$
\begin{aligned}
d_i(A)
&:=v_E(A\cup\{i\})-v_E(A)\\
&=[E-L(A\cup\{i\})]-[E-L(A)]\\
&=L(A)-L(A\cup\{i\}),
\end{aligned}
\qquad i\notin A. \\[10pt]
0\leq d_i(A)\leq E
$$

Now, we could input this into the Shapley consideration to have our final *connectedness* measure that is bounded ($c \in [0,1]$)[^4], and accounts for the sum of *patterns* across carriers to necessarily sum up to the target.

$$
w_n(A)
=
\frac{|A|!(n-|A|-1)!}{n!}\\[10pt]
\phi_i(v_E)
=
\sum_{A\subseteq N\setminus\{i\}}
w_n(A)d_i(A) \\[10pt]
\boxed{
c_u^E(i;N)
=
\frac{\phi_i(v_E)}{E}
=
\frac1E
\sum_{A\subseteq N\setminus\{i\}}
\frac{|A|!(n-|A|-1)!}{n!}
\left[L(A)-L(A\cup\{i\})\right].
}
$$

## Ending note

Connectedness as a measure requires us to compute some uncomputable quantities, and thus, it is unlikely that we will be able to calculate the exact magnitude of "how connected" two entities are. As with most foundational constructions in science, the purpose of this writeup was to take consider most of what could be considered (this does not imply that there are no relevant considerations outside of the treatment above). This definition of connectedness, together with a similarly defined measure of "wellbeing" would probably come embedded with important insights. As for now, given this construction, we are aware of how synergistic information is rewarded in an eigenist setup, and that the naive construction with Shannon entropy does not handle RNGs, and that Gell-Mann-Lloyd's construction of effective complexity could be utilised to iron the wrinkle.

I hope for a certain outcome that relies on eigenism, and eigenism relies on this (otherwise useless) mathematical construction of its ideas. What the certain outcome *is*, is best left for a discussion offline :)

[^1]:[1] For example, the knowledge that "2+2 = 4" is fairly common, and two strangers who know this fact are not very connected. In contrast, the knowledge of "a certain middle aged man crying on his 39th birthday because his children bought him his favourite cake, and the cake was made of clay since the kids could not afford a real cakery" would be shared only by the attendees of the birthday party. This identity pattern is rare, and therefore the wellbeing of the *pattern carrier* is orders of magnitude more important to the agent $U$ under consideration.

[^2]: [2] Expanding the logarithm and working through some algebra gives us the following expression as a quick sanity check:

    $$
    \begin{aligned}
    H(U\mid X)
    &= -\sum_{u,x}p(u,x)\left[\log_2 p(u,x)-\log_2 p(x)\right] \\
    &= -\sum_{u,x}p(u,x)\log_2 p(u,x)
       + \sum_x\left[\sum_u p(u,x)\right]\log_2 p(x) \\
    &= -\sum_{u,x}p(u,x)\log_2 p(u,x)
       + \sum_x p(x)\log_2 p(x) \\[6pt]
    &= H(U,X)-\left(-\sum_x p(x)\log_2 p(x)\right) \\[6pt]
    &= H(U,X)-H(X)
    \end{aligned}
    $$

[^3]: [3] The Kolmogorov complexity $K(\cdot)$ of a certain "entity" $E$ is the length $K(E)$ of the shortest program $\mathcal{P}$, that when passed as input on a universal computer $\mathcal{U}$, gives the output $E$. Therefore, $\mathcal{U}(\mathcal{P}) = E$, where $|\mathcal{P}| = K(E)$.

[^4]: [4] Proof for the preceeding statement:
      $$
      \begin{aligned}
      0\leq L(A)\leq E \quad &\text{(by construction)}\\[10pt]
      L(A\cup\{i\})\leq L(A) \quad &(i \text{ cannot make the minimum larger)}
      \end{aligned}\\[10pt]
      0\leq L(A)-L(A\cup\{i\})\leq E\\[10pt]
      \sum_{A\subseteq N\setminus\{i\}}
      \frac{|A|!(n-|A|-1)!}{n!}
      =
      \sum_{k=0}^{n-1}
      \binom{n-1}{k}
      \frac{k!(n-k-1)!}{n!}
      =
      \sum_{k=0}^{n-1}\frac1n
      =
      1\\[10pt]

      \boxed{0\leq c_i\leq1}
      $$