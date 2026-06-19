import os
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch

from services.report_service import (
    generate_report_data,
    get_department_headcount_rows,
    get_leave_summary_rows,
    ensure_reports_dir,
    REPORTS_DIR
)


def _build_table(dataframe):

    table_data = [list(dataframe.columns)]
    table_data.extend(dataframe.values.tolist())

    table = Table(table_data, repeatRows=1)

    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0891B2")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F1F5F9")]),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))

    return table


def create_pdf_report():

    ensure_reports_dir()

    path = os.path.join(REPORTS_DIR, "hr_report.pdf")

    doc = SimpleDocTemplate(
        path,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()
    content = []

    data = generate_report_data()

    content.append(Paragraph("HR Analytics Report", styles["Title"]))
    content.append(Paragraph(
        f"Generated on: {data['generated_on']}",
        styles["Normal"]
    ))
    content.append(Spacer(1, 16))

    summary_items = [
        ("Total Employees", data["total_employees"]),
        ("Total Departments", data["total_departments"]),
        ("Average Rating", data["average_rating"]),
        ("Average Present Days", data["average_present_days"]),
        ("Total Leave Days", data["total_leave_days"]),
        ("Average Leave Days", data["average_leave_days"]),
        ("Missing PAN Records", data["missing_pan"]),
        ("Missing NDA Records", data["missing_nda"]),
    ]

    summary_table = Table(
        [["Metric", "Value"]] + summary_items,
        colWidths=[3 * inch, 2.5 * inch]
    )

    summary_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0891B2")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F1F5F9")]),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))

    content.append(Paragraph("Executive Summary", styles["Heading2"]))
    content.append(Spacer(1, 8))
    content.append(summary_table)
    content.append(Spacer(1, 20))

    content.append(Paragraph("Department Headcount", styles["Heading2"]))
    content.append(Spacer(1, 8))
    content.append(_build_table(get_department_headcount_rows()))
    content.append(Spacer(1, 20))

    content.append(Paragraph("Leave Summary", styles["Heading2"]))
    content.append(Spacer(1, 8))
    content.append(_build_table(get_leave_summary_rows()))

    doc.build(content)

    return path
