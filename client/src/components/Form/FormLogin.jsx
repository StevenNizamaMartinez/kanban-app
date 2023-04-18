import { useForm } from "react-hook-form"
import { useAuth } from "../../context/AuthContext"
import "./Form.css"
import ButtonForm from "../ButtonForm"

function FormLogin() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { loginMutation, loadingAuth, setLoadingAuth } = useAuth()

  const onSubmit = (data) => {
    setLoadingAuth(true)
    loginMutation.mutate(data)
  }

  return (
    <form className="form--container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form--item">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email", { required: true })} />
        {errors.email && <span className="form--error">Email is required</span>}
      </div>
      <div className="form--item">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password", { required: true })} />
        {errors.password && <span className="form--error">Password is required</span>}
      </div>
      <ButtonForm loader={loadingAuth} text={"Sign Up"} textLoading={"Loading"} />
    </form>
  )
}

export default FormLogin
