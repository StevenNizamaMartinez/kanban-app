import { useForm } from "react-hook-form"
import { useAuth } from "../../context/AuthContext"
import ButtonForm from "../ButtonForm"

function FormRegister() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { registerMutation, loadingAuth, setLoadingAuth} = useAuth()

  const onSubmit = (data) => {
    setLoadingAuth(true)
    registerMutation.mutate(data)
  }

  return (
    <form className="form--container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form--item">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" {...register("name", { required: true })} />
        {errors.name && <span className="form--error">Email is required</span>}
      </div>
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
      <ButtonForm loader={loadingAuth} text={"Register"} textLoading={"Loading"} />
    </form>
  )
}

export default FormRegister
