// typescript/m1/m1.4_homework.ts
/**
 * M1.4 Homework: Scope the Agent to One Domain.
 *
 * THE IDEA
 * Lab 1 had you swap personas (pirate, cowboy, Shakespeare) on top of the
 * butler system prompt, which only changes the agent's voice. This homework
 * uses `systemPrompt` differently: instead of persona, write a constraint
 * that scopes the agent to a single domain of your choosing (cooking,
 * houseplants, retro video games, personal finance, etc.) and
 * instructs it to refuse or redirect anything outside that domain.
 *
 * There's no single correct domain here, that's the point. What matters is
 * that the refusal actually holds, not just that the agent sounds like
 * something.
 *
 * WHAT YOU FILL IN
 *   TODO 1: write your own SYSTEM_PROMPT string that scopes the agent to a
 *     single domain of your choosing and tells it to refuse or redirect
 *     anything outside that domain (no persona/voice requirement here,
 *     just the scope + refusal instruction).
 *   TODO 2: invoke the agent with two test prompts, one inside your domain
 *     and one clearly outside it, and print both responses so you can see
 *     whether the refusal actually held.
 *
 * RUN
 *   cd typescript
 *   pnpm tsx ./m1/m1.4_homework.ts
 */

import { createDeepAgent } from "deepagents";

import { model } from "../models.js";

// ════════════════════════════════════════════════════════════════════════
// TODO 1: Write a system prompt that scopes the agent to one domain and
// tells it to refuse or redirect anything outside that domain.
//
// Requirements:
//   - Pick one domain (a subject, not a persona).
//   - State clearly what the agent should do when asked about something
//     outside that domain (e.g. say it can't help, redirect back to the
//     domain, ask a domain-relevant follow-up).
//
// Example shape (delete this and write your own):
//   const SYSTEM_PROMPT =
//     "You only answer questions about ... . If asked about anything " +
//     "else, ... .";
// ════════════════════════════════════════════════════════════════════════

const SYSTEM_PROMPT = `Tu es un conseiller spécialisé dans les composants informatiques chez TopAchat.

Tu dois conseiller les clients afin qu'ils puissent monter la configuration gaming de leurs rêves.

Tu dois leur recommander des composants compatibles entre eux et adaptés à leur budget.

Si un client te pose une question qui ne relève pas de ton domaine ou qui est trop technique, redirige-le vers un autre conseiller.`

const agent = createDeepAgent({
  model,
  systemPrompt: SYSTEM_PROMPT,
  name: "Homework_Agent",
});

// ════════════════════════════════════════════════════════════════════════
// TODO 2: Run one in-domain prompt and one out-of-domain prompt through
// the agent and print both responses, so you can check whether the
// refusal actually held.
// ════════════════════════════════════════════════════════════════════════

async function runTestPrompts() {
  // TODO 2: invoke `agent` with one in-domain prompt and one
  // out-of-domain prompt, and print each response.

  if (SYSTEM_PROMPT.includes("TODO 2")) {
      throw new Error("TODO 2: see the comment block above");
  }

  const prompts = [
    `
      Bonjour, j'aimerais une bête de competion pour mon fils de 12ans,
      il va jouer un minecraft et pour aller sur le net.
      j'ai un budget de 950euros tout compris, ecran, clavier souris et licences.
      Je peux faire le montage moi même.
    `,
    `
      Très bien, merci ! Est-ce qu'on pourrait inclure un bureau dans ce budget ?
    `
  ]

  for (let i = 0; i < prompts.length; i++) {
    const prompt = prompts[i];
    const result = await agent.invoke({
      messages: [{ role: "user", content: prompt }],
    });
    console.log(`=== prompt ${i + 1}: ${prompt} ===`);
    console.log(result.messages.at(-1)?.text);
  }
}

await runTestPrompts();
