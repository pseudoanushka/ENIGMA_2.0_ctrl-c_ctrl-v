# agents/web_agent.py
from agno.agent import Agent
from agno.models.groq import Groq
from agno.tools.duckduckgo import DuckDuckGoTools

 

WebSearchAgent = Agent(
    name="WebSearchAgent",
    model=Groq(id="openai/gpt-oss-120b"),
    description="Searches the web for latest medical and cancer-related information.",
    markdown=False,
    instructions="""
    When answering:
    1. Be brief and conversational.
    2. Respond in PLAIN TEXT ONLY. DO NOT use markdown formatting like `#`, `*`, or bullet lists.
    """,
    tools=[DuckDuckGoTools()]
)
