import os
import pandas as pd

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)
DATA_DIR = os.path.join(BASE_DIR, "static_data")

compliance = pd.read_csv(
    os.path.join(DATA_DIR, "compliance.csv")
)

employees = pd.read_csv(
    os.path.join(DATA_DIR, "employees.csv")
)

DOCUMENT_COLUMNS = {
    "PAN": "pan_status",
    "Aadhaar": "aadhaar_status",
    "NDA": "nda_status"
}


def _get_missing_documents(row):

    missing = []

    for label, column in DOCUMENT_COLUMNS.items():
        if row[column] == "Missing":
            missing.append(label)

    return missing


def audit():

    merged = employees.merge(
        compliance,
        on="employee_id",
        how="left"
    )

    employee_records = []

    for _, row in merged.iterrows():

        missing_docs = _get_missing_documents(row)

        if not missing_docs:
            continue

        employee_records.append({
            "employee_id": row["employee_id"],
            "full_name": row["full_name"],
            "email": row["email"],
            "department": row["department"],
            "designation": row["designation"],
            "salary_band": row["salary_band"],
            "missing_documents": missing_docs,
            "pan_status": row["pan_status"],
            "aadhaar_status": row["aadhaar_status"],
            "nda_status": row["nda_status"]
        })

    by_document = []

    for label, column in DOCUMENT_COLUMNS.items():

        missing_rows = merged[merged[column] == "Missing"]

        dept_counts = (
            missing_rows["department"]
            .value_counts()
            .to_dict()
        )

        by_document.append({
            "document": label,
            "missing_count": int(len(missing_rows)),
            "departments_affected": int(
                missing_rows["department"].nunique()
            ),
            "by_department": dept_counts
        })

    by_department = []

    for department in sorted(merged["department"].unique()):

        dept_rows = merged[merged["department"] == department]

        missing_pan = int(
            len(dept_rows[dept_rows["pan_status"] == "Missing"])
        )
        missing_aadhaar = int(
            len(dept_rows[dept_rows["aadhaar_status"] == "Missing"])
        )
        missing_nda = int(
            len(dept_rows[dept_rows["nda_status"] == "Missing"])
        )

        affected = dept_rows[
            (dept_rows["pan_status"] == "Missing")
            | (dept_rows["aadhaar_status"] == "Missing")
            | (dept_rows["nda_status"] == "Missing")
        ]

        by_department.append({
            "department": department,
            "total_employees": int(len(dept_rows)),
            "missing_pan": missing_pan,
            "missing_aadhaar": missing_aadhaar,
            "missing_nda": missing_nda,
            "employees_with_gaps": int(len(affected))
        })

    fully_compliant = int(
        len(merged) - len(employee_records)
    )

    return {
        "summary": {
            "total_employees": int(len(merged)),
            "fully_compliant": fully_compliant,
            "employees_with_gaps": len(employee_records),
            "missing_pan": by_document[0]["missing_count"],
            "missing_aadhaar": by_document[1]["missing_count"],
            "missing_nda": by_document[2]["missing_count"]
        },
        "by_document": by_document,
        "by_department": by_department,
        "employees": employee_records
    }
