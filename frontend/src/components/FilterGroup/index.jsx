import "./index.css";

const FilterGroup = (props) => {
  const renderTypeOfEmplyeesDetails = () => {
    const { employmentTypesList } = props;
    return employmentTypesList.map((employee) => {
      const { changeEmploymentTypeId } = props;

      const onchangeEmploymentTypeId = (event) => {
        changeEmploymentTypeId(event.target.value, event.target.checked);
      };

      return (
        <li className="employment-list-item" key={employee.employmentTypeId}>
          <input
            type="checkbox"
            id={employee.employmentTypeId}
            value={employee.label}
            onChange={onchangeEmploymentTypeId}
          />
          <label htmlFor={employee.employmentTypeId}>{employee.label}</label>
        </li>
      );
    });
  };

  const renderEmployementDetails = () => (
    <>
      <h1 className="employment-header">Type of Employment</h1>
      <ul className="categories-container">{renderTypeOfEmplyeesDetails()}</ul>
    </>
  );

  const renderSalaryRangedetails = () => {
    const { salaryRangesList } = props;
    return salaryRangesList.map((salary) => {
      const { changeSalaryRangeId } = props;
      const onChangeSalaryRangeId = (event) =>
        changeSalaryRangeId(event.target.value, event.target.checked);

      return (
        <li className="salary-list-item" key={salary.salaryRangeId}>
          <input
            type="radio"
            name="salaryranges"
            id={salary.salaryRangeId}
            value={salary.salaryRangeId}
            onChange={onChangeSalaryRangeId}
          />
          <label htmlFor={salary.salaryRangeId}>{salary.label}</label>
        </li>
      );
    });
  };

  const renderSalarydetails = () => (
    <>
      <h1 className="salaries-header">Salary Range</h1>
      <ul className="categories-container">{renderSalaryRangedetails()}</ul>
    </>
  );

  return (
    <div className="filter-group-con">
      <hr />
      {renderEmployementDetails()}
      <hr />
      {renderSalarydetails()}
    </div>
  );
};

export default FilterGroup;
