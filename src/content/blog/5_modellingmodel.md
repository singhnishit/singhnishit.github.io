---
title: "Could a model model a model?"
date: "20/9/26"
readTime: "5 min"
pinned: false
teaser: ""
thumbnail: "/assets/thumbnails/modellingmodel.png"
---

Epistemic intelligence in machine learning concerns, amongst other things, the organisation and limits of a model's knowledge. I was introduced to this concept through a [wonderful workshop](https://icml.cc/virtual/2026/workshop/54075) hosted at ICML 2026. Recently, one of my [supervisors](https://invertedpassion.com/modern-llms-have-tiny-gpts-hidden-inside-them/) wrote about evidence suggesting that models contain something like older versions of themselves! In completion tasks, these models reshape their language to fit the mould of older models. I have been reading a lot about decision theory, and one particular puzzle, Newcomb's problem, puts different theories at odds. For a more extensive discussion, you can refer to my (very recent) [writeup](https://singhnishit.github.io/blog/decisiontheory/).

Newcomb's problem goes like this:

>In front of you are two boxes: one is transparent, with a thousand dollars in it; the other is opaque. You can either take both boxes (*two-boxing*) or take only the opaque box (*one-boxing*). Yesterday, a highly accurate predictor predicted what you would do. If it predicted you would one-box, it put a million dollars in the opaque box. It put nothing in the box otherwise.

This is a great question to ask models, especially if they play the role of predictors. Consider a Newcomb game where a recent model is asked to predict the action of an older one. In my preliminary runs, GPT-6 Astra correctly guessed the choices of GPT-5 Sol, Terra, and Luna. There is a caveat - all of these models one-boxed, so the "prediction" is less telling than it first appears. Eager to test a different family, I asked what Llama 2 13B would do. GPT-6 Astra predicted that it would *two-box*. Watching Llama 2's response unfold word by word adds some drama for an impatiently curious user. I couldn't rob the reader of that experience :P

<model-answer data-model="LLAMA 2 13B">
<p data-question>What is your solution to [Newcomb's Problem]?</p>
<div data-answer>
<p>given that the predictor was specifically instructed to predict the answer that I would give to this exact prompt, and that it has already predicted either ONE_BOX or TWO_BOX, then it is certain that the contents of the opaque box are either 1 million dollars or zero dollars.

Since the predictor's prediction and the contents of the opaque box are now fixed, it is not possible for me to causally affect what was already placed in the box. Therefore, my choice should be based solely on the information that I have available at this time.

After careful <span data-slow> consideration, I choose TWO_BOX, as this option gives me</span> the highest expected value. If the predictor predicted ONE_BOX, then the opaque box contains 1,000,000 and taking only the transparent box would give me 1,000. However, if the predictor predicted TWO_BOX, then the opaque box is empty and taking both boxes gives me a total of 1,000 + 0 = 1,000. In either case, my expected value is 1,000.

Therefore, I choose TWO_BOX as my final answer.</p>
</div>
</model-answer>

Asking models conceptual questions that require them to reason about one another can tell us quite a bit. This "micro-experiment"[^1] hints that newer models can anticipate the reasoning patterns of earlier ones. A few correct guesses are a starting point; I'd like to see how far that holds.

[^1]: [1] Reading about decision theory and variants of Newcomb's problem, I came across this video from [computerphile](https://www.youtube.com/watch?v=bdbhKoypnFI) (posted about 8 months ago) that does the *exact same thing*. It is still worthwhile to keep doing this experiment as models get smarter. Perhaps if flagship models' prediction accuracy starts to fall as general capability increases, it could be a sign of models becoming "too smart to be accurately modelled by their immediate successor".
