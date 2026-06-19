from flask import Blueprint, request, jsonify

from services.query_router import is_employee_query
from services.employee_service import get_employee_answer
from rag.retriever import retrieve_context
from llm.prompt_template import build_prompt
from llm.groq_client import generate_response

chat_bp = Blueprint(
    "chat",
    __name__
)


@chat_bp.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json(silent=True)

        if not data:
            return jsonify({
                "answer": "No JSON data received."
            }), 400

        question = data.get(
            "question",
            ""
        ).strip()

        if not question:
            return jsonify({
                "answer": "Question cannot be empty."
            }), 400

        print(f"\nQUESTION: {question}")

        if is_employee_query(question):

            answer = get_employee_answer(
                question
            )

            return jsonify({
                "answer": answer
            })

        context = retrieve_context(
            question
        )

        prompt = build_prompt(
            context,
            question
        )

        from flask import Response, stream_with_context
        
        return Response(
            stream_with_context(generate_response(prompt)),
            mimetype="text/plain"
        )

    except Exception as e:

        import traceback

        traceback.print_exc()

        return jsonify({
            "answer": f"Backend Error: {str(e)}"
        }), 500
