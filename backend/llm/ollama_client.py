"""Backward-compatible import for code that still uses the old module name."""

from llm.groq_client import generate_response

__all__ = ["generate_response"]
