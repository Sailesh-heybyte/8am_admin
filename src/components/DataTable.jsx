export default function DataTable({ headers, rows, footer }) {
  return (
    <div className="table-card">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="table-empty" colSpan={headers.length}>
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {footer && (
        <div className="pagination">
          <span>{footer}</span>
          <div>
            <button>‹</button>
            <button className="selected">1</button>
            <button>2</button>
            <button>3</button>
            <button>...</button>
            <button>36</button>
            <button>›</button>
          </div>
        </div>
      )}
    </div>
  );
}
