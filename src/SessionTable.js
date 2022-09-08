function SessionTable({ vector }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Hora</th>
                    <th>Selecionar</th>
                </tr>
            </thead>
            <tbody>
                {
                    vector.map((object, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{object.hours}</td>
                            <td><button className="btn btn-success">Selecionar</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default SessionTable;