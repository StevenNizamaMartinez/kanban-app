function HandleQuery({isLoading,isError,children}) {
  if (isLoading) return <h4>Loading...</h4>
  if (isError) return <h4>Ha ocurrido un error intentalo más tarde</h4>
  return <>{children}</>
}

export default HandleQuery
