import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    passList: [],
    website: '',
    username: '',
    password: '',
    showPassword: false,
    searchInput: '',
  }

  typewebsite = event => {
    this.setState({website: event.target.value})
  }

  typeusername = event => {
    this.setState({username: event.target.value})
  }

  typepassword = event => {
    this.setState({password: event.target.value})
  }

  onsubmit = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    if (website === '' || username === '' || password === '') return

    const newpassword = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    this.setState(prev => ({
      passList: [...prev.passList, newpassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  ondelete = id => {
    this.setState(prev => ({
      passList: prev.passList.filter(each => each.id !== id),
    }))
  }

  showpassword = () => {
    this.setState(prev => ({showPassword: !prev.showPassword}))
  }

  onsearch = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {passList, website, username, password, showPassword, searchInput} =
      this.state

    const filteredPasswords = passList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="back">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="logo"
          alt="app logo"
        />
        <div className="block1">
          <form onSubmit={this.onsubmit}>
            <h1>Add New Password</h1>
            <div className="inputs">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                onChange={this.typewebsite}
                value={website}
              />
            </div>
            <div className="inputs">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                onChange={this.typeusername}
                value={username}
              />
            </div>
            <div className="inputs">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={this.typepassword}
                value={password}
              />
            </div>
            <button type="submit">Add</button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>
        <div className="block2">
          <div className="search-bar">
            <h1>
              Your Passwords <p className="span">{filteredPasswords.length}</p>
            </h1>
            <div className="inputs">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.onsearch}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="showpass">
            <input
              id="check"
              type="checkbox"
              className="check-box"
              onChange={this.showpassword}
            />
            <label htmlFor="check">Show Passwords</label>
          </div>
          {filteredPasswords.length === 0 ? (
            <div className="empty-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-img"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          ) : (
            <ul className="passwords" type="none">
              {filteredPasswords.map(each => (
                <PasswordItem
                  details={each}
                  ondelete={this.ondelete}
                  showPassword={showPassword}
                  key={each.id}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
