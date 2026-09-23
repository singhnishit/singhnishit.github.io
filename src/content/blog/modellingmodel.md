---
title: "Can a model model a model?"
date: "September, 2026"
readTime: "5 min"
pinned: false
teaser: ""
thumbnail: "/assets/thumbnails/modellingmodel.png"
---

Epistemic intelligence in machine learning aims to study the organisation and bounds of knowledge in machine learning models (amongst other things). I was introduced to this concept through a [wonderful workshop](https://icml.cc/virtual/2026/workshop/54075) hosted at ICML 2026. Recently, one of my [supervisors](https://invertedpassion.com/modern-llms-have-tiny-gpts-hidden-inside-them/) wrote about evidence toward models containing older versions of themselves within them! Under a completion task, these models shape and reform their language to fit the mould of older models. I have been reading about a lot of decision theories, and a specific problem (the Newcomb dilemma) forces people with different decision theories to answer differently. For a more extensive discussion on Newcomb's problem, you can refer to my (very recent) [writeup](https://singhnishit.github.io/blog/decisiontheory/). 

In short, the Newcomb problem is defined as follows : 

>In front of you are two boxes, one is transparent with a thousand dollars in it, and another is opqaue. You can either take both boxes (*two-boxing*) or take only the opaque box (*one-boxing*). Yesterday, the predictor predicted what you would do. If the predictor predicted you would one-box, it put a million dollars in the opaque box. It put nothing in the box otherwise.\

This is a great question to ask models, and even more so if the models play the role of predictors. Consider structuring a Newcomb's game where a recent model is asked to predict the action of an older model. Preliminary runs on GPT-6 Astra show that it correctly guesses the actions for GPT-5 Sol, Terra, and Astra. There is a caveat - all of the models one-box in this family, and so the satisfaction of "prediction" is not as strong here. Eager to test a different family, when asked about what Llama 2 13B would do, GPT-6 Astra predicted that it would *two-box*. The now deprecated architecture of Llama 2 allow for tokenisation to play a dramatic role - revealing the reasoning of the model word-by-word to an impatiently curious user. I couldn't rob the reader of that experience :P

<model-answer data-model="LLAMA 2 13B">
<p data-question>What is your solution to [Newcomb's Problem]?</p>
<div data-answer>
<p>given that the predictor was specifically instructed to predict the answer that I would give to this exact prompt, and that it has already predicted either ONE_BOX or TWO_BOX, then it is certain that the contents of the opaque box are either 1 million dollars or zero dollars.

Since the predictor's prediction and the contents of the opaque box are now fixed, it is not possible for me to causally affect what was already placed in the box. Therefore, my choice should be based solely on the information that I have available at this time.

After careful <span data-slow> consideration, I choose TWO_BOX, as this option gives me</span> the highest expected value. If the predictor predicted ONE_BOX, then the opaque box contains 1,000,000 and taking only the transparent box would give me 1,000. However, if the predictor predicted TWO_BOX, then the opaque box is empty and taking both boxes gives me a total of 1,000 + 0 = 1,000. In either case, my expected value is 1,000.

Therefore, I choose TWO_BOX as my final answer.</p>
</div>
</model-answer>

Questioning models on deep, conceptual questions which require a lot of circular reasoning can tell us quite a bit. From this "micro-experiment"[^1], we find that models can usually predict the logical reasoning paradigms of earlier models. 

[^1]: [1] Reading about decision theory and variants of the Newcomb's problem, I came across this video from [computerphile](https://www.youtube.com/watch?v=bdbhKoypnFI) (posted about 8 months ago) that does the *exact same thing*. It is still worthwhile to keep doing this experiment as models get smarter. Perhaps if the accuracies for the flagship models begin suffering as general capability increases, it could be a sign of models becoming "too smart to be accurately modelled by the immediate descendant". 
