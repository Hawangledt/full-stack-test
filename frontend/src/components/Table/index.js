import { Link } from 'react-router-dom'

function Table({ list, page, fieldsTable, deleteFunction, restoreFunction }) {
  return (
    <table style={{
      fontFamily: 'arial, sans-serif',
      borderCollapse: 'collapse',
      width: '100%',
    }}>
      <tbody style={{
        border: '1px solid #dddddd',
        textAlign: 'left',
        padding: 8
      }}>
        <tr style={{
          border: '1px solid #dddddd',
          textAlign: 'left',
          padding: 8
        }}>
          {
            fieldsTable.map((key) => {
              return (
                <th
                  key={key}

                  style={{
                    border: '1px solid #dddddd',
                    textAlign: 'left',
                    padding: 8
                  }}>{key}</th>
              )
            })
          }
          <th
            style={{
              border: '1px solid #dddddd',
              textAlign: 'left',
              padding: 8
            }}>Change</th>
          <th
            style={{
              border: '1px solid #dddddd',
              textAlign: 'left',
              padding: 8
            }}>Delete Option</th>
          <th
            style={{
              border: '1px solid #dddddd',
              textAlign: 'left',
              padding: 8
            }}>Restore Option</th>
        </tr>
        {
          list.map((fields) => {
            return (
              <tr key={fields.id}>
                {
                  fieldsTable.map((key) => {
                    return (
                      <td
                        key={key}
                        style={{
                          border: '1px solid #dddddd',
                          textAlign: 'left',
                          padding: 8
                        }}
                      >
                        {
                          key === "deletedAt" ? fields[key] === null ? "Active" : "Deleted" : fields[key]
                        }
                      </td>
                    )
                  })
                }

                <td style={{
                  border: '1px solid #dddddd',
                  textAlign: 'left',
                  padding: 8
                }}><Link to={`/edit/${fields.id}/${page}`} >Edit</Link></td>
                <td style={{
                  border: '1px solid #dddddd',
                  textAlign: 'left',
                  padding: 8
                }}><button onClick={() => deleteFunction(fields.id)}>Delete</button></td>
                <td style={{
                  border: '1px solid #dddddd',
                  textAlign: 'left',
                  padding: 8
                }}><button onClick={() => restoreFunction(fields.id)}>Restore</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export { Table }