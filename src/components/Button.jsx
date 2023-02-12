import '../sass/Button.scss'

const Button = ({icon, handleClick}) => {
  return (
    <div className='button__box'>
      <button
        className="button" 
        onClick={handleClick}
        >{icon}
        </button>
      <div className='button__shadow'></div>
    </div>
  )
}
// default lets you rename the component when importing to the App.jsx
// export default Button

export {Button}