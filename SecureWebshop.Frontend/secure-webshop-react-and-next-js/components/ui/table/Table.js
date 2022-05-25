import classes from './Table.module.css';

export default function Table({ children, tableHeaders = [] }) {

  const tableHeaderElements = tableHeaders.map(th => <th key={th}>{th}</th>);

  return (
    <table className={classes.table}>
      <thead>
          <tr>
            {tableHeaderElements}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
    </table>
  );
}