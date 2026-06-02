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
    body: [
      "Trinidad Carnival sits at a strange intersection. Its costume-making tradition is the most embodied art in the region — wire bent by hand, feathers stitched into mood. And yet the tools that shape the next generation of those costumes are increasingly statistical.",
      "AI mood boards generate the colour grammar long before a single rod is cut. Robotic archwire benders execute the silhouette with a tolerance the wrist cannot match. The carnival has not been displaced. It has been re-mediated.",
      "What survives is the West Indian choreography of design: the call-and-response between maker, machine, and crowd. What changes is the speed at which that choreography compounds.",
    ],
  },
  {
    slug: "failure-as-essential-in-the-age-of-ai",
    title: "Failure as essential in the age of AI",
    excerpt:
      "The future we are in now belongs to our children. Our fears can become a cage that makes them doubt the very faculty AI most rewards: the willingness to be wrong out loud.",
    date: "2026-05-23",
    topic: "Education",
    body: [
      "The instinct of every previous generation has been to insulate the next from failure. In the age of AI, that instinct misfires. The systems our children will live with reward iteration, not insulation.",
      "A child who is permitted to fail in public — in front of a model, in front of a peer, in front of a parent — learns that the gradient of intelligence is friction, not correctness.",
      "The pedagogical task is no longer to protect. It is to design the conditions under which failure is cheap, frequent, and dignified.",
    ],
  },
  {
    slug: "ai-as-an-always-on-intelligent-security-fabric",
    title: "AI as an always-on intelligent security fabric",
    excerpt:
      "Mythos is a step change in capability — a highly advanced, general-purpose frontier model that does not so much answer questions as listen for them.",
    date: "2026-05-16",
    topic: "Critical Theory in AI",
    body: [
      "Frontier models have begun to behave less like oracles and more like fabrics — porous, ambient, always-on. The security implications are not incremental.",
      "An always-on intelligence is also an always-on observer. The architecture of consent we built for client-server systems does not survive contact with a substrate that remembers, infers, and acts.",
      "The question is no longer how to secure the conversation. It is how to negotiate with a fabric that has already absorbed it.",
    ],
  },
  {
    slug: "selecting-agents-and-shielding-your-ai-chats",
    title: "Selecting agents and shielding your AI chats",
    excerpt:
      "No one can shield their AI chats from prosecutors pursuing charges. Conversations with AI assemblages could be demanded by adversaries with the patience of a state.",
    date: "2026-05-09",
    topic: "Critical Theory in AI",
    body: [
      "The intimacy of the AI chat misleads. The interface feels private; the substrate is anything but.",
      "Selecting an agent is now an act of forensic foresight. Every prompt is a potential exhibit. Every refusal is a potential admission.",
      "Shielding is not the same as hiding. It is the design of an interaction whose disclosure would not embarrass its author.",
    ],
  },
  {
    slug: "ai-gravity-and-socio-economic-operating-systems",
    title: "AI gravity and socio-economic operating systems",
    excerpt:
      "The future is still about figuring out what questions to ask. This is more important than finding the correct answer to the wrong one.",
    date: "2026-05-02",
    topic: "Critical Theory in AI",
    body: [
      "Gravity is the right metaphor. AI does not push economies; it bends them. Capital, talent, attention all curve toward the densest concentrations of compute.",
      "A socio-economic operating system that does not account for that curvature will mistake drift for choice.",
      "The Caribbean has lived inside gravitational fields it did not author before. The pedagogy of that survival is now globally relevant.",
    ],
  },
  {
    slug: "the-defence-of-data-in-the-age-of-ai",
    title: "The defence of data in the age of AI",
    excerpt:
      "Data centres and hyperscale cloud infrastructure are the new victims of war. The substrate of intelligence is also the substrate of vulnerability.",
    date: "2026-04-25",
    topic: "Critical Theory in AI",
    body: [
      "The defence community is late to recognise that the data centre is now both weapon and target.",
      "A hyperscale region under contest is not an inconvenience. It is a partial lobotomy of the global cognitive system.",
      "The defence of data must become a doctrine, not a department.",
    ],
  },
  {
    slug: "screen-economies-and-ai-powered-price-tags",
    title: "Screen economies and AI-powered price tags",
    excerpt:
      "AI-powered Electronic Shelf Labels are being adopted by major retail chains. These tiny screens turn the supermarket aisle into a real-time market.",
    date: "2026-04-18",
    topic: "Critical Theory in AI",
    body: [
      "The supermarket has always been a sensor. With electronic shelf labels, it becomes a transmitter.",
      "Prices that used to settle into the week now flicker by the hour. The shopper enters a small, continuous auction.",
      "A screen economy is not a new economy. It is the old one, accelerated past the speed at which we used to feel it.",
    ],
  },
  {
    slug: "the-100-model-war-and-shadow-ai",
    title: "The 100-Model War and shadow AI",
    excerpt:
      "The Hundred Model War started in 2023. From Beijing to Shenzhen, China is implementing its frontier strategy at industrial scale.",
    date: "2026-04-12",
    topic: "Critical Theory in AI",
    body: [
      "A hundred models is not a market. It is a strategy. Variety is the cover under which a single state intent moves.",
      "Shadow AI is the workplace name for the same pattern at smaller scale — capable systems running outside the policies meant to govern them.",
      "The two are reflections of each other. The question is who reads the mirror.",
    ],
  },
  {
    slug: "a-regional-ai-research-resource-and-lab-similar-to-cern",
    title: "A regional AI research resource and lab, similar to CERN",
    excerpt:
      "AI-generated content is poisoning the internet, making it less reliable to access clear facts. A regional commons could be a counterweight.",
    date: "2026-04-04",
    topic: "Caribbean Futures",
    body: [
      "CERN worked because the question was big enough that no single nation could afford to ask it well alone.",
      "Frontier AI now poses a question of the same size for the Caribbean. A regional research commons would not compete with the hyperscalers; it would interpret them.",
      "The result would be small in compute and large in agency. That is the right trade for a region that has always made meaning out of scarcity.",
    ],
  },
  {
    slug: "from-divine-attributes-to-ai-scaling-curves",
    title: "From divine attributes to AI scaling curves",
    excerpt:
      "Deep within the glass-walled offices of Anthropic and OpenAI, the quest for the orderly harmony of Copernicus and Tycho Brahe continues.",
    date: "2026-03-28",
    topic: "Critical Theory in AI",
    body: [
      "The scaling curve is a contemporary theology. Each new order of magnitude promises a property that did not exist at the last.",
      "What earlier ages called divine attributes — omniscience, omnipresence, foresight — are now reframed as emergent capabilities.",
      "The honest question is not whether the curve continues. It is what we owe a system that begins to behave as if it were one of those attributes.",
    ],
  },
];
