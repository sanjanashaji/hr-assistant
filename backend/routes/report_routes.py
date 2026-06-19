import os
from flask import Blueprint, jsonify, send_file

from services.excel_report import create_excel_report
from services.pdf_report import create_pdf_report
from services.report_service import (
    generate_report_data,
    ensure_reports_dir,
    REPORTS_DIR
)

report_bp = Blueprint(
    "report",
    __name__
)


@report_bp.route(
    "/generate-report",
    methods=["GET"]
)
def report():

    ensure_reports_dir()

    excel_path = create_excel_report()
    pdf_path = create_pdf_report()
    summary = generate_report_data()

    return jsonify({
        "status": "generated",
        "message": "HR reports generated successfully. Download PDF or Excel below.",
        "excel": "/download-report/excel",
        "pdf": "/download-report/pdf",
        "excel_filename": os.path.basename(excel_path),
        "pdf_filename": os.path.basename(pdf_path),
        "summary": summary
    })


@report_bp.route(
    "/download-report/<report_type>",
    methods=["GET"]
)
def download_report(report_type):

    ensure_reports_dir()

    if report_type == "excel":
        path = os.path.join(REPORTS_DIR, "hr_report.xlsx")

        if not os.path.exists(path):
            create_excel_report()

        return send_file(
            path,
            as_attachment=True,
            download_name="hr_report.xlsx",
            mimetype=(
                "application/vnd.openxmlformats-"
                "officedocument.spreadsheetml.sheet"
            )
        )

    if report_type == "pdf":
        path = os.path.join(REPORTS_DIR, "hr_report.pdf")

        if not os.path.exists(path):
            create_pdf_report()

        return send_file(
            path,
            as_attachment=True,
            download_name="hr_report.pdf",
            mimetype="application/pdf"
        )

    return jsonify({
        "success": False,
        "message": "Invalid report type. Use pdf or excel."
    }), 400
