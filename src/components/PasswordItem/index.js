import './index.css'

const PasswordItem = props => {
  const {details, ondelete, showPassword} = props
  const {id, website, username, password} = details

  return (
    <li>
      <div className="pass-box">
        <div className="inner-pass-box">
          <p className="website-logo">{website.charAt(0).toUpperCase()}</p>
          <div className="pass-info">
            <p>{website}</p>
            <p>{username}</p>
            <p>
              {showPassword ? (
                password
              ) : (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                  alt="stars"
                  className="stars"
                />
              )}
            </p>
          </div>
        </div>
        <button
          className="but"
          data-testid="delete"
          onClick={() => ondelete(id)}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            className="delete"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
