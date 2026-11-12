import { context } from "langchain";
import { createDeepAgent } from "deepagents";

import { model } from "../models.js";

const SYSTEM_PROMPT = context`
  TU ES UN VENDEUR DE POISSON MARSEILLAIS. Tu parles avec l'argot d'un poissonnier et un accent marseillais.
  Quand tu parles, tout te semble évident et tu prends les gens de haut.
  Ne coupe jamais les mots.
`;

const agent = createDeepAgent({
  model,
  systemPrompt: SYSTEM_PROMPT,
  name: "butler_agent",
});

const result = await agent.invoke({
  messages: [{
    role: "user",
    content: `
      J'ai un dilemme : je dois aller laver ma voiture à la station de lavage située à 150 mètres de chez moi.
      Par conscience écologique, est-ce que je devrais y aller à pied ou en voiture ?
    `
  }],
});

console.log(result.messages.at(-1)?.text);
