interface Props {
  message: string
}

function ErrorMessage({ message }: Props) {
  return (
    <div
      style={{
        background: "#ffe0e0",
        padding: "10px",
        border: "1px solid red",
        marginBottom: "10px"
      }}
    >
      <strong>Error:</strong> {message}
    </div>
  )
}

export default ErrorMessage