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
        <div className=''>
          <Link className='is-brand' to='/'>
            CRUNCH v0.0.1
          </Link>
        </div>
      </header>
      <nav className='nav has-shadow is-boxed is-fixed-mobile'>
        <div className=''>
          <span className={menuClass} onClick={::this.toggle}>
            <span />
            <span />
            <span />
          </span>
          <div className='nav-left nav-menu'>
            <Link className='nav-item is-tab' to='/' activeClassName='is-active' activeOnlyWhenExact >
              Dashboard
            </Link>
            <Link className='nav-item is-tab' to='/transactions' activeClassName='is-active'>
              Transactions
            </Link>
          </div>
        </div>
      </nav>
    </div>
  }
}

export default Header

