export const parseEmployeeResponse = (
  text
) => {

  if (
    !text ||
    !text.includes(
      "Employee Name"
    )
  ) {
    return null;
  }

  const employee = {};

  const lines =
    text.split("\n");

  lines.forEach(line => {

    const parts =
      line.split(":");

    if (
      parts.length < 2
    ) return;

    const key =
      parts[0]
        .trim()
        .toLowerCase();

    const value =
      parts
        .slice(1)
        .join(":")
        .trim();

    if (
      key.includes(
        "employee name"
      )
    ) {
      employee.employee_name =
        value;
    }

    if (
      key.includes(
        "manager"
      )
    ) {
      employee.manager_name =
        value;
    }

    if (
      key.includes(
        "department"
      )
    ) {
      employee.department =
        value;
    }

    if (
      key.includes(
        "job title"
      )
    ) {
      employee.job_title =
        value;
    }

    if (
      key.includes(
        "performance"
      )
    ) {
      employee.performance_score =
        value;
    }

    if (
      key.includes(
        "salary"
      )
    ) {
      employee.monthly_salary =
        value;
    }

    if (
      key.includes(
        "years"
      )
    ) {
      employee.years_at_company =
        value;
    }

    if (
      key.includes(
        "satisfaction"
      )
    ) {
      employee.employee_satisfaction_score =
        value;
    }

  });

  return employee;
};