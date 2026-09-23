# Threat model · <feature or product> · <date>

## 1. Assets: what are we protecting?
| Asset | Why it matters | Where it lives |
|-------|----------------|----------------|
|       |                |                |

## 2. Actors: who might attack, and how?
- Curious user:
- Determined attacker:
- Compromised dependency, skill or MCP server:
- Malicious content an agent might read (prompt injection):

## 3. Trust boundaries: where can they get in?
- <e.g. phone → API, API → payment provider, agent → the internet>

## 4. Threats (STRIDE, per boundary)
| Boundary | S/T/R/I/D/E | Threat | Likelihood | Damage | Decision (mitigate / accept / redesign) |
|----------|-------------|--------|------------|--------|-----------------------------------------|
|          |             |        |            |        |                                         |

## 5. What if a mitigation fails?
- <for the top threats: the blast radius, and how you'd notice>

## 6. Agents working on this
- What can the agents that build this reach? Does any session hold private data,
  read untrusted content, AND have a way out (the lethal trifecta)?
