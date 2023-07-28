
const Footer = () => {
  const handleBack = () => {
    window.history.back()
  }
  const handleFront = () => {
    window.history.forward()
  }
  return (
    <>
      <div style={{textAlign: 'center'}}>
        <h3>Footer 영역</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handleBack}>뒤로</button>
          <button onClick={handleFront}>앞으로</button>
        </div>

      </div>
    </>
  )
}

export default Footer;
