const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-8 py-3 rounded-lg text-lg font-medium transition-colors'
  
  const variants = {
    primary: 'bg-white text-gray-800 hover:bg-gray-100 shadow-lg',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-gray-800'
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

