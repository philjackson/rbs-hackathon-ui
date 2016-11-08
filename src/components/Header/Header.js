import React              from 'react'
import { Link }           from 'react-router'
import classnames         from 'classnames'
import outerClick         from 'react-outerclick'

@outerClick
class Header extends React.Component {

  state = {
    isOpen: false
  }

  toggle(e){
    //e && e.preventDefault()
    this.setState({isOpen: !this.state.isOpen})
  }

  handleOuterClick(){
    this.setState({
      isOpen: false
    })
  }

  render(){
    const { user = {}} = this.props
    const menuClass = classnames('nav-toggle', {
      'is-active': this.state.isOpen
    })

    return <div className='page-header'>
      <header className='hero is-fixed-mobile'>
        <div className='container'>
          <Link className='is-brand' to='/'>
            DESperados
          </Link>
        </div>
      </header>
      <nav className='nav has-shadow is-boxed is-fixed-mobile'>
        <div className='container'>
          <span className={menuClass} onClick={::this.toggle}>
            <span />
            <span />
            <span />
          </span>
          <div className='nav-left nav-menu'>
            <Link className='nav-item' to='/accounts' activeClassName='is-active'>
              My transactions
            </Link>
            <Link className='nav-item is-hidden-tablet' to='/help' activeClassName='is-active'>
              Help & Support
            </Link>
          </div>
          <div className='nav-right nav-menu'>
            <Link className='nav-item' to='/help' activeClassName='is-active'>
              Help & Support
            </Link>
          </div>
        </div>
      </nav>
    </div>
  }
}

export default Header

