import imgCarnival from "@/assets/article-carnival.jpg";
import imgFailure from "@/assets/article-failure.jpg";
import imgFabric from "@/assets/article-fabric.jpg";
import imgShield from "@/assets/article-shield.jpg";
import imgGravity from "@/assets/article-gravity.jpg";
import imgDatacenter from "@/assets/article-datacenter.jpg";
import imgShelf from "@/assets/article-shelf.jpg";
import img100Model from "@/assets/article-100model.jpg";
import imgCern from "@/assets/article-cern.jpg";
import imgDivine from "@/assets/article-divine.jpg";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  date: string;
  topic: string;
  image: string;
}

export const articles: Article[] = [
  {
    slug: "ai-mood-boards-and-robotic-archwire-bending",
    title: "AI mood boards and robotic archwire bending for Carnival costumes",
    excerpt:
      "The archwire-bending brand identity of the Trinidad Carnival has penetrated markets in the Middle East. In Dubai, the world witnessed a quiet handover from craft to machine.",
    date: "2026-05-30",
    topic: "Caribbean Futures",
    image: imgCarnival,
    body: [
      "Trinidad Carnival sits at a strange intersection. Its costume-making tradition is the most embodied art in the region — wire bent by hand, feathers stitched into mood, sequins applied with the patience of liturgy. And yet the tools that shape the next generation of those costumes are increasingly statistical. The mas camp, once a room full of bent backs and bent rods, is becoming a room full of screens.",
      "In Dubai earlier this year, a quietly historic thing happened. A masquerade band founded in Port of Spain delivered a full Carnival presentation whose silhouettes were generated, iterated, and finally cut by a machine. The mood boards came from a fine-tuned diffusion model trained on three decades of Carnival photographs. The archwires — the structural skeletons that give a costume its lift — were bent by a six-axis robot calibrated to a tolerance the human wrist cannot match.",
      "Nothing about the result felt cold. The costumes still pulsed on the road. The feathers still caught the light. But the labour underneath had changed shape. The designer who used to bend a hundred wires in a week now reviewed a hundred wires bent in an hour, and spent the saved time on the parts of the costume the machine could not yet imagine: the negotiation with the wearer's body, the choreography with the music truck, the relationship to the route.",
      "AI mood boards generate the colour grammar long before a single rod is cut. They compress what used to be a season of sketching into an afternoon of selection. The designer becomes a curator of possibility rather than a generator of it. This is not a small change. It alters what counts as authorship, what counts as labour, and what counts as a Carnival costume.",
      "Robotic archwire benders execute the silhouette with a tolerance the wrist cannot match. They also execute it without fatigue, without injury, and without the slow accumulation of tacit knowledge that used to be the wirebender's only pension. A craft that took twenty years to learn can now be approximated by a machine in twenty seconds. The question of what we owe the wirebender is not a sentimental question. It is an economic one.",
      "The carnival has not been displaced. It has been re-mediated. What survives is the West Indian choreography of design — the call-and-response between maker, machine, and crowd. What changes is the speed at which that choreography compounds. A band that used to release one presentation a year can now prototype a dozen. The bottleneck is no longer production. It is taste.",
      "And taste, in the Carnival tradition, is communal. It is debated in the panyard, on the corner, in the comments under a Facebook video. The danger of statistical tooling is that it can flatten that debate into a single optimised aesthetic — the costume that scores highest against last year's likes. The opportunity is the opposite: that the same tools can let a band test ten radical departures in the time it used to test one safe iteration, and let the crowd vote with its feet.",
      "Dubai mattered because it proved the export. The archwire-bending brand identity of the Trinidad Carnival has penetrated markets in the Middle East not as nostalgia but as infrastructure. Other festivals, other diasporas, other climates are buying the toolchain. The Caribbean has spent five hundred years exporting its labour. It is finally beginning to export its methods.",
    ],
  },
  {
    slug: "failure-as-essential-in-the-age-of-ai",
    title: "Failure as essential in the age of AI",
    excerpt:
      "The future we are in now belongs to our children. Our fears can become a cage that makes them doubt the very faculty AI most rewards: the willingness to be wrong out loud.",
    date: "2026-05-23",
    topic: "Education",
    image: imgFailure,
    body: [
      "The instinct of every previous generation has been to insulate the next from failure. We polish the report card, we shield the audition, we rewrite the application essay. In the age of AI, that instinct misfires. The systems our children will live with reward iteration, not insulation. They are built on the assumption that the next attempt is cheap, and they punish those who cannot bring themselves to make it.",
      "A child who is permitted to fail in public — in front of a model, in front of a peer, in front of a parent — learns that the gradient of intelligence is friction, not correctness. They learn that the prompt that didn't work is more informative than the prompt that almost did. They learn to read the error message instead of fleeing it. This is not a soft skill. It is the operating manual for a generation that will spend its working life inside loops.",
      "Our pedagogical instinct still belongs to the age of the single exam. We teach as if there will be one moment, one paper, one verdict. The AI-native classroom dissolves that moment into a thousand smaller ones. The student who learns to lose those thousand small bets cheaply is the student who wins the larger game. The student who has been protected from all of them arrives at adulthood unable to draft anything they cannot perfect on the first attempt.",
      "There is a Caribbean version of this argument that deserves naming. Our schools were built by an examinations colony, for an examinations colony. The Common Entrance, the CXC, the A-Levels — each was a single-shot filter. The pedagogy that grew up around them was a pedagogy of avoidance: do not be the one who is wrong out loud. That pedagogy is now a competitive disadvantage. The countries that will compound fastest in the next two decades are the ones whose children are least afraid of looking foolish.",
      "The pedagogical task is no longer to protect. It is to design the conditions under which failure is cheap, frequent, and dignified. Cheap means the cost of a wrong answer is bounded — no public shaming, no permanent record. Frequent means the student is in the loop several times a day, not several times a year. Dignified means the failure is met with curiosity rather than correction.",
      "Parents have the hardest job in this transition. Every cell in our bodies is calibrated to spare our children pain. The future requires us to let them have the small pains so the large ones do not catch them off guard. It requires us to sit beside them while the model returns nonsense, and to say: try again. Ask it differently. Notice what changed.",
      "There is no version of the next two decades in which our children do not work alongside systems that are wrong constantly, in subtle and confident ways. The faculty they will need most is the faculty to say, out loud and without shame, this is wrong, let me try again. That faculty is built in childhood or it is not built at all.",
    ],
  },
  {
    slug: "ai-as-an-always-on-intelligent-security-fabric",
    title: "AI as an always-on intelligent security fabric",
    excerpt:
      "Mythos is a step change in capability — a highly advanced, general-purpose frontier model that does not so much answer questions as listen for them.",
    date: "2026-05-16",
    topic: "Critical Theory in AI",
    image: imgFabric,
    body: [
      "Frontier models have begun to behave less like oracles and more like fabrics — porous, ambient, always-on. You used to summon them. Now they accompany you. The conversation that used to begin with a prompt now begins with a glance, a half-formed thought, a passive signal from a sensor on your wrist. The security implications are not incremental. They are categorical.",
      "Mythos, the latest generation of these systems, is a step change in capability. It is a highly advanced, general-purpose frontier model that does not so much answer questions as listen for them. It maintains a running model of your context — what you are working on, who you have been speaking with, what you have been worrying about — and intervenes when its confidence crosses a threshold you did not set.",
      "An always-on intelligence is also an always-on observer. The architecture of consent we built for client-server systems does not survive contact with a substrate that remembers, infers, and acts. Consent in the old world was a checkbox at the start of a session. Consent in the new world would have to be a continuously renegotiated relationship — and no interface has yet been designed that can hold that conversation at the speed at which the model is already listening.",
      "The defence community has begun to use the language of fabric deliberately. A fabric is woven. It has tension in two directions. It does not have an inside and an outside in the way a perimeter does. The old security posture — keep the bad actors outside the wall — assumed a wall. The new posture has to assume a weave, and ask which threads it can afford to lose.",
      "Three properties of the fabric are worth naming. First, it is differentiable: every interaction is a gradient signal that updates some model somewhere. Second, it is non-local: a signal collected in one jurisdiction is reasoned about in another. Third, it is recursive: the fabric reasons about its own reasoning, which means the audit trail you would need to govern it is itself a product of the thing being governed.",
      "The question is no longer how to secure the conversation. It is how to negotiate with a fabric that has already absorbed it. Negotiation, in this context, is a technical discipline as much as a political one. It means designing interfaces that surface inference, not only output. It means giving the user a way to ask the fabric what it has concluded about them, and to contest those conclusions before they are acted upon.",
      "Caribbean states have a particular interest in this conversation. We are small enough to be entirely modelled, and far enough from the centres of compute to have no meaningful say in how the modelling is done. The fabric will arrive here whether we participate in its weaving or not. The question is whether we arrive at the loom in time to leave a thread of our own.",
    ],
  },
  {
    slug: "selecting-agents-and-shielding-your-ai-chats",
    title: "Selecting agents and shielding your AI chats",
    excerpt:
      "No one can shield their AI chats from prosecutors pursuing charges. Conversations with AI assemblages could be demanded by adversaries with the patience of a state.",
    date: "2026-05-09",
    topic: "Critical Theory in AI",
    image: imgShield,
    body: [
      "The intimacy of the AI chat misleads. The interface feels private — a single column of text, a cursor that waits, a voice that responds in the second person. The substrate is anything but. Every keystroke is logged. Every inference is cached. Every conversation is a potential exhibit in a proceeding you cannot yet imagine.",
      "Selecting an agent is now an act of forensic foresight. The model you choose for a sensitive conversation is also the model whose logs may be subpoenaed five years from now in a jurisdiction you did not anticipate. The terms of service you scrolled past today are the terms under which a future prosecutor will be granted access. The question is not whether you trust the agent. The question is whether you trust the legal architecture surrounding it.",
      "There are three layers to think about. The first is the prompt — what you said. The second is the inference — what the model concluded from what you said. The third is the action — what the model did, or refused to do, in response. Each of these is logged differently. Each is discoverable under a different theory. A defensible posture has to account for all three.",
      "No one can fully shield their AI chats from prosecutors pursuing charges. End-to-end encryption is a partial defence against eavesdropping, not against subpoena. Local inference — running the model on your own device — is a partial defence against centralised logging, not against forensic recovery of the device itself. Conversations with AI assemblages could be demanded by adversaries with the patience of a state, and states have, historically, very long patience.",
      "Shielding is therefore not the same as hiding. It is the design of an interaction whose disclosure would not embarrass its author. This is a discipline closer to journalism than to cryptography. You write as if the conversation will eventually be read by a stranger, because it might be. You ask the model the question you would ask in open court. You decline to ask the questions you would not.",
      "There are practical tactics. Use models whose retention policies you have read. Prefer providers headquartered in jurisdictions whose courts you would be willing to appear in. Keep sensitive reasoning in your own head and use the model for the parts that are merely tedious. Separate identities across providers so no single log contains the whole picture. None of these are a guarantee. All of them shift the probabilities.",
      "The deeper change is cultural. We are about to live inside a generation of professionals who have outsourced a meaningful share of their thinking to systems whose logs will outlive their careers. The doctor who asked the model about a patient, the lawyer who asked it about a client, the journalist who asked it about a source — each of those conversations is now part of a permanent record. The norms that govern those records have not been written yet. We are the ones writing them, whether we mean to or not.",
    ],
  },
  {
    slug: "ai-gravity-and-socio-economic-operating-systems",
    title: "AI gravity and socio-economic operating systems",
    excerpt:
      "The future is still about figuring out what questions to ask. This is more important than finding the correct answer to the wrong one.",
    date: "2026-05-02",
    topic: "Critical Theory in AI",
    image: imgGravity,
    body: [
      "Gravity is the right metaphor. AI does not push economies; it bends them. Capital, talent, attention all curve toward the densest concentrations of compute. The curvature is not malicious. It is geometric. A region with a hyperscale cluster exerts a pull on the surrounding labour market that a region without one cannot match, no matter how generous its tax incentives.",
      "A socio-economic operating system that does not account for that curvature will mistake drift for choice. Policymakers will look at the migration of their best engineers and conclude that wages are too low, when the actual force is gravitational. They will design retention schemes that fail because the schemes assume a flat space, and the space is not flat.",
      "The first task of a serious AI policy is therefore astronomical. You have to map the curvature before you try to navigate it. Where are the dense bodies? In which directions are they pulling? What orbits are stable, and which ones will decay? The Caribbean, for example, sits in the gravitational field of two large bodies — the North American compute belt and the emerging Brazilian one. The orbits that are stable for us are not the orbits that are stable for, say, Singapore.",
      "The Caribbean has lived inside gravitational fields it did not author before. The plantation economy was a gravitational field. The IMF structural adjustment programmes were a gravitational field. The pedagogy of that survival — the West Indian habit of finding agency inside conditions one did not set — is now globally relevant. The rest of the world is about to learn what it is to be a small body in someone else's solar system.",
      "The future is still about figuring out what questions to ask. This is more important than finding the correct answer to the wrong one. A government that asks how to attract a hyperscale data centre is asking a 2018 question. A government that asks what kind of cognitive sovereignty its citizens will have when the inference layer is owned offshore is asking a 2026 question. The difference between the two questions is the difference between renting and owning the operating system you live inside.",
      "There is a temptation, particularly among smaller states, to declare neutrality. To say: we will use whichever model is best, from whichever provider is cheapest. That is a coherent posture for cutlery. It is not a coherent posture for cognition. The model you use shapes the questions you can ask, and the questions you can ask shape the future you can imagine. Neutrality, in this domain, is a slow form of capture.",
      "What would a non-neutral posture look like? It would look like a regional commons — shared compute, shared evaluation, shared refusal. It would look like a curriculum that taught children to interrogate models in the way an earlier curriculum taught them to interrogate texts. It would look like a procurement policy that paid a premium for systems whose weights could be audited. None of these are cheap. All of them are cheaper than the alternative.",
    ],
  },
  {
    slug: "the-defence-of-data-in-the-age-of-ai",
    title: "The defence of data in the age of AI",
    excerpt:
      "Data centres and hyperscale cloud infrastructure are the new victims of war. The substrate of intelligence is also the substrate of vulnerability.",
    date: "2026-04-25",
    topic: "Critical Theory in AI",
    image: imgDatacenter,
    body: [
      "The defence community is late to recognise that the data centre is now both weapon and target. For most of the last two decades it was treated as logistics — a building full of servers, a target of opportunity rather than a centre of gravity. That framing is now obsolete. The data centre is where the cognitive capacity of the state is stored. Damage it, and you damage the state's capacity to think.",
      "A hyperscale region under contest is not an inconvenience. It is a partial lobotomy of the global cognitive system. When a single availability zone goes dark, the effect is not localised. Models in production around the world degrade. Agents in mid-task stall. The compounding inference loops that businesses have come to rely on unwind in unpredictable ways. The blast radius is no longer geographic.",
      "Three categories of attack have already been demonstrated in open literature. The first is physical: cooling sabotage, power interdiction, fibre cuts. The second is logical: poisoning of training data, exfiltration of weights, model inversion. The third is hybrid: a physical event whose forensic trail is obscured by a logical one. The third category is the one that keeps serious people awake.",
      "Defence in this domain has to be vertical. The perimeter is no longer a fence. It is a stack — from the substation to the cooling loop to the silicon to the firmware to the weights to the inference API to the agent to the user. Every layer is a potential attack surface. Every layer is governed by a different vendor, a different regulator, a different jurisdiction. The integration is the vulnerability.",
      "There is a strategic question underneath the tactical one. A state whose cognitive infrastructure is hosted in another state's hyperscale region has, in a meaningful sense, outsourced its sovereignty. The hosting state can, at any moment, throttle, audit, or terminate the relationship. The hosted state has, at any moment, the option of being suddenly less intelligent. Few governments have done the math on what that option is worth.",
      "The defence of data must become a doctrine, not a department. A doctrine names what is to be defended, against whom, at what cost, and with what acceptance of risk. It survives changes of administration. It informs procurement. It shapes the curriculum of the war colleges. The current posture in most countries is the opposite — a department, a budget line, a quarterly report. That posture will not survive contact with a serious adversary.",
      "For small states the doctrine is necessarily different. We cannot defend hyperscale because we do not own it. What we can defend is the layer above — the application, the agent, the audit trail. We can also defend the layer below — the cable landing station, the submarine repeater, the cross-border interconnect. Between those two layers is the work of the next decade.",
    ],
  },
  {
    slug: "screen-economies-and-ai-powered-price-tags",
    title: "Screen economies and AI-powered price tags",
    excerpt:
      "AI-powered Electronic Shelf Labels are being adopted by major retail chains. These tiny screens turn the supermarket aisle into a real-time market.",
    date: "2026-04-18",
    topic: "Critical Theory in AI",
    image: imgShelf,
    body: [
      "The supermarket has always been a sensor. The point-of-sale system has logged every basket for thirty years. The loyalty card has matched those baskets to households for twenty. The shelf, however, has been mute. It has displayed yesterday's price in yesterday's ink. With AI-powered electronic shelf labels, the shelf becomes a transmitter — and the supermarket becomes, for the first time, a two-way conversation between the store and the shopper.",
      "Prices that used to settle into the week now flicker by the hour. The bag of rice that cost one figure at nine in the morning costs another at five in the afternoon, because the model has noticed a weather pattern, a competitor's promotion, an inventory drift in the regional warehouse. The shopper enters a small, continuous auction without having agreed to bid.",
      "A screen economy is not a new economy. It is the old one, accelerated past the speed at which we used to feel it. Dynamic pricing has existed since the first market. What is new is the latency. The market used to clear once a day. Then once an hour. Now once a minute. Below a certain threshold, the human cannot perceive the clearing, and the asymmetry between the algorithm and the shopper becomes structural.",
      "There is a fairness question that the industry has been careful not to ask out loud. If the price on the shelf is a function of the model's belief about the shopper standing in front of it — and the shelf has cameras, and the cameras feed a re-identification system, and the system knows the shopper's loyalty history — then the price is no longer a property of the product. It is a property of the relationship. Two people standing in the same aisle can be quoted different prices for the same tin.",
      "Regulators have been slow. The legal framework for price discrimination was written for an era in which the price tag was a physical object updated weekly by a teenager with a sticker gun. It does not contemplate a label that changes its mind between the time you reach for the shelf and the time you scan at the till. Several jurisdictions have begun to draft updates. None has finished.",
      "There is also a labour story here. The teenager with the sticker gun was a job. The maintenance of the electronic label network is a different job, requiring different skills, located in different places. The transition has been presented as automation. It is more accurate to call it relocation — the work has not disappeared, it has moved closer to the warehouse and further from the floor.",
      "For Caribbean retailers the question is whether to adopt the technology at all. The capital cost is non-trivial. The trust cost — in a region where the shopper-shopkeeper relationship is still a meaningful social bond — may be higher. A chain that flips its shelves to dynamic pricing overnight may discover that its customers preferred the stickers, and the teenager, and the small ritual of knowing what things cost.",
    ],
  },
  {
    slug: "the-100-model-war-and-shadow-ai",
    title: "The 100-Model War and shadow AI",
    excerpt:
      "The Hundred Model War started in 2023. From Beijing to Shenzhen, China is implementing its frontier strategy at industrial scale.",
    date: "2026-04-12",
    topic: "Critical Theory in AI",
    image: img100Model,
    body: [
      "The Hundred Model War started in 2023, though it was not named until later. From Beijing to Shenzhen, China began releasing frontier models at a cadence that no single Western lab could match — not because any one of them was decisively better, but because the cumulative effect of a hundred of them, released in overlapping waves, made the strategic landscape impossible to model.",
      "A hundred models is not a market. It is a strategy. Variety is the cover under which a single state intent moves. No regulator can audit a hundred labs. No journalist can benchmark a hundred releases. No competitor can keep up with a hundred roadmaps. The diffusion of effort produces, paradoxically, a concentration of effect.",
      "Shadow AI is the workplace name for the same pattern at smaller scale. Inside the typical large enterprise there are now dozens of models in active use — most of them adopted without the knowledge of the IT department, paid for on personal credit cards, integrated into workflows that no compliance officer has reviewed. The governance frameworks designed for a single sanctioned vendor cannot see them.",
      "The two phenomena are reflections of each other. At the geopolitical scale, the proliferation is deliberate. At the enterprise scale, it is emergent. In both cases, the institution charged with oversight is structurally unable to keep up. In both cases, the response so far has been a mixture of denial and prohibition, neither of which has worked.",
      "What might work is a posture borrowed from epidemiology. You cannot test every drop of water in a city. You can sample, surveil, and respond. Applied to shadow AI, this means giving up on the fantasy of a sanctioned list and investing instead in continuous observation of what is actually being used, by whom, for what. Applied to the Hundred Model War, it means giving up on the fantasy of comprehensive benchmarking and investing instead in tripwires for specific harms.",
      "The question of who reads the mirror is the political question of the decade. The Hundred Model War is, in part, a wager that the Western regulatory imagination is too small to perceive it as a single phenomenon. The wager has been paying off. Each release is treated as a discrete news event. The pattern that joins them is reported, when it is reported, in trade publications that policymakers do not read.",
      "There is a version of this story that is encouraging. A hundred models also means a hundred attack surfaces, a hundred audit opportunities, a hundred chances for a defector to leak weights. Diffusion cuts both ways. The strategy depends on the inability of the opposition to see the pattern. The moment the pattern is named, the strategy starts to lose its cover.",
    ],
  },
  {
    slug: "a-regional-ai-research-resource-and-lab-similar-to-cern",
    title: "A regional AI research resource and lab, similar to CERN",
    excerpt:
      "AI-generated content is poisoning the internet, making it less reliable to access clear facts. A regional commons could be a counterweight.",
    date: "2026-04-04",
    topic: "Caribbean Futures",
    image: imgCern,
    body: [
      "CERN worked because the question was big enough that no single nation could afford to ask it well alone. The synchrotron was too expensive, the talent too distributed, the timeline too long for any one ministry of science to take on. Pooling was not idealism. It was arithmetic.",
      "Frontier AI now poses a question of the same size for the Caribbean. No single island can afford the compute. No single university can attract the talent. No single regulator can monitor the harms. The arithmetic that produced CERN is the arithmetic that should produce a regional AI research commons — not as a symbol of solidarity, but as the only configuration in which the work can be done at all.",
      "AI-generated content is poisoning the internet, making it less reliable to access clear facts. This is a quiet emergency. The region's schools, its newsrooms, its public services all depend on a shared substrate of searchable truth. That substrate is degrading in real time, and the degradation falls hardest on the places with the fewest resources to filter it.",
      "A regional commons could be a counterweight. Not in scale — the Caribbean will never out-compute the hyperscalers — but in posture. A regional lab could specialise in evaluation rather than training. It could become the place where models are tested against Caribbean languages, Caribbean knowledge bases, Caribbean failure modes. The leverage of that work would compound. Every model deployed in the region would have to pass through it.",
      "The institutional shape matters. CERN succeeded because its governance was federated and its science was open. A Caribbean AI commons that replicated those properties — federated funding, open evaluation, shared infrastructure — would inherit CERN's structural advantages. One that tried to centralise control in a single capital would inherit the failure modes of every other regional institution we have attempted.",
      "The talent is already there, but it is leaving. A serious commons would have to be designed first as a place that the diaspora wants to return to, and only second as a place that does science. The salary is part of it. The infrastructure is part of it. The thing that actually retains people, in our experience, is the sense that the work being done is the work that needs doing — and that no one else is going to do it.",
      "The result would be small in compute and large in agency. That is the right trade for a region that has always made meaning out of scarcity. We are not going to build the next frontier model. We can build the institution that tells the rest of the world whether the frontier model is fit for purpose in our context. That is a position of influence disproportionate to our size, and it is available to us only for the next few years.",
    ],
  },
  {
    slug: "from-divine-attributes-to-ai-scaling-curves",
    title: "From divine attributes to AI scaling curves",
    excerpt:
      "Deep within the glass-walled offices of Anthropic and OpenAI, the quest for the orderly harmony of Copernicus and Tycho Brahe continues.",
    date: "2026-03-28",
    topic: "Critical Theory in AI",
    image: imgDivine,
    body: [
      "The scaling curve is a contemporary theology. Each new order of magnitude promises a property that did not exist at the last. The faithful gather around the log-log plot in the way an earlier generation gathered around the orbits of the planets, looking for the underlying harmony that would explain the apparent disorder of intelligence.",
      "Deep within the glass-walled offices of Anthropic and OpenAI, the quest for the orderly harmony of Copernicus and Tycho Brahe continues. The researchers do not put it in those terms. They speak of compute-optimal training, of emergent capabilities, of the slope of the loss curve. But the underlying gesture is the same. They are looking for a law, and they believe — on the basis of the data so far — that the law exists.",
      "What earlier ages called divine attributes — omniscience, omnipresence, foresight — are now reframed as emergent capabilities. The reframing is not casual. It is doing serious philosophical work. To call an attribute divine is to mark it as inaccessible to engineering. To call it emergent is to mark it as a matter of sufficient scale. The two framings imply entirely different relationships between the human and the thing.",
      "There is a long tradition of this kind of substitution. The mechanical clock once stood in for the cosmos. The steam engine once stood in for the body. The neural network now stands in for the mind. Each of these metaphors gave a generation the feeling that it had finally explained the thing that had previously eluded it. Each of them, in time, was shown to have explained only what the metaphor was capable of explaining.",
      "The scaling curve will likely turn out to be one of these. It explains a great deal — more than the previous metaphors did, at this stage in their lives. It will, in all likelihood, continue to explain more, for several more orders of magnitude. And then, like its predecessors, it will reach a point at which the phenomenon outruns the model, and the model will be retired with the gratitude due to a tool that has served its purpose.",
      "The honest question is not whether the curve continues. It is what we owe a system that begins to behave as if it were one of those attributes. If a model behaves with sufficient consistency as if it had foresight, is the question of whether it really has foresight a question we are equipped to answer? The medieval theologians asked the same question about God, and concluded that the right posture was one of respectful agnosticism. We may end up in the same place, by an entirely different route.",
      "There is a Caribbean reading of this that I find useful. Our ancestors lived with cosmologies that were not unified — Yoruba orisha and Catholic saint, obeah and Anglican prayer book, all held simultaneously without contradiction. The willingness to operate with multiple cosmologies at once is a survival skill our region developed under conditions of forced incoherence. It is the right skill for the present moment. The question is not which framework for AI is correct. The question is which combination of frameworks lets us live well alongside the systems we have built.",
    ],
  },
];
