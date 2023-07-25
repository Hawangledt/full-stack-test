import { useState } from "react"
import { api } from "../services/api"
import { useApp } from "../hooks"
import "../components/Login/Login.css"

function Login() {

    const [form, setForm] = useState({})
    const { setAccessToken } = useApp()
    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault()
            const response = await api.post('/api/loginUser', form)
            setAccessToken(response.data.token)
            alert("Login com sucesso.")
        } catch (error) {
            alert(error.response.data.message)
        }        
    }

    return (
        <div>
            <form className="form-container" onSubmit={onSubmitHandler}>
                <input
                    className="input-field"
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    type="email"
                    placeholder="Type your email"
                />
                <input
                    className="input-field"
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    type="password"
                    placeholder="Type your password"
                />
                <button className="button" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export { Login }