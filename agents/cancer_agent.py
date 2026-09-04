# agents/cancer_agent.py

from agno.agent import Agent
from agno.models.groq import Groq
def explain_cancer_topic(query: str):
    return f"""
    Analyze the user input:
    {query}

    Instructions:
    1. Do not provide a long, cluttered, or overly structured essay.
    2. Give a concise, direct, and conversational answer.
    3. If the user's query lacks context or details, ask relevant clarifying questions to better understand their situation before giving a definitive medical answer.
    4. Provide the answer in PLAIN TEXT ONLY. DO NOT use markdown like `#`, `*`, or bullet lists.
    """

CancerKnowledgeAgent = Agent(
    name="CancerKnowledgeAgent",
    description="Provides conversational educational explanations about cancer topics.",
    model=Groq(id="openai/gpt-oss-120b"),
    markdown=False,
    tools=[explain_cancer_topic]
)
