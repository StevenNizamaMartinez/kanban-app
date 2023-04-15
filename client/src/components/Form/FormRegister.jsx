import { useForm } from "react-hook-form"
import { useAuth } from "../../context/AuthContext"

function FormRegister() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { registerMutation } = useAuth()

  const onSubmit = (data) => {
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
      <button>Register</button>
    </form>
  )
}

export default FormRegister
