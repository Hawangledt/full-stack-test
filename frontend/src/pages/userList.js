import { Header } from "../components/Header"
import { useEffect, useState } from 'react'
import { api } from "../services/api"
import { Paginate } from "../components/Paginate"
import { useApp } from "../hooks"
import { Table } from "../components/Table"
import { Title } from "../components/Title";

function UserList() {
    const { count, logout } = useApp()
    const [users, setUsers] = useState([])
    const [changeState, setChangeState] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
                const response = await api.get(`/api/listUser`)
                setUsers(response.data.users)
                setLoading(false)
            } catch (error) {
                if (error.response.data.cause === "jwt expired") {
                    alert("Expired Session")
                    logout()
                }
                else {
                    logout()
                    alert("Request Failed. \n Contact Support Team.")
                }
            }
        }
        load()
    }, [count, changeState, logout])

    const deleteOneUser = async (id) => {
        await api.delete(`/api/deleteOneUser/${id}`);
        alert("User Deleted.")
        setChangeState(!changeState)
      }

    const restoreOneUser = async (id) => {
    await api.patch(`/api/restoreOneUser/${id}`);
    alert("User Restored.")
    setChangeState(!changeState)
    }

    return (
        <main>
            <Header />
            <Title>Users</Title>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-evenly" }}>
            {
                loading?<p>Loading ...</p> :users && (<Table
                    list={users}
                    page={"user"}
                    fieldsTable={["id", "name", "email", "deletedAt"]}
                    deleteFunction={deleteOneUser}
                    restoreFunction={restoreOneUser}
                    />)
            }
            </div>
            <Paginate
                current={1}
                maxPages={Math.ceil(users.length / 10)}
            />
        </main>
    );
}

export { UserList };