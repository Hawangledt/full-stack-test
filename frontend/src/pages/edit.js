import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from "../services/api";
import { fieldsUser, fieldsChangePassword } from "../utils/constants"
import { Button } from "../components/Button"
import TextField from "../components/TextField";


function Edit() {
  const { id, page } = useParams()
  const [form, setForm] = useState({})
  const navigate = useNavigate();

  const fields = {
    user: fieldsUser,
    password: fieldsChangePassword
  }

  useEffect(() => {
    const load = async () => {
      const response = await api.get(`/api/listOne${page}`)
      setForm(response.data)
    }
    load()
  }, [id, page])

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    await api.patch(`/api/updateOne${page}/${id}`, {
      ...form
    })
    navigate(-1)
  }

  return (
    <main>
      <Header />
      <p style={{ textAlign: "center", fontSize: 36, fontWeight: "bold" }}>
        Edit {page}.
      </p>
      <form
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: '100%',
          alignItems: 'center'
        }}>
        {
          Object.keys(form)
            .filter((field) => fields[page][field].visible === true)
            .map((field) => {
              return (
                <TextField
                  key={field}
                  label={field}
                  placeholder={form[field]}
                  value={form[field]}
                  onChange={(event) => {
                    setForm({
                      ...form,
                      [field]: event.target.value
                    })
                  }}
                />
              )
            })
        }
        <Button>Update User</Button>
        <Link to={-1}>Return to previous page.</Link>
      </form>
    </main>
  );
}

export { Edit };