import React, {Component} from 'react';
import './Header.scss';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {menuToggle} from '../../actions/chatActions';
import PropTypes from "prop-types";

class Header extends Component {

    static propTypes = {
        menuToggle: PropTypes.func.isRequired,
        authorizedUser: PropTypes.bool.isRequired,
        regNameUser: PropTypes.string.isRequired,
        regSocialActivityUser: PropTypes.string.isRequired,
        registeredUser: PropTypes.bool.isRequired
    };

    render() {
        const {user, userSocialActivity, menuToggle, authorizedUser, regNameUser, regSocialActivityUser, registeredUser} = this.props;
        return (
            <header className="header">
                <Link className="header__profile-link" to="/profile/">
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={(authorizedUser == true && registeredUser == true) ? regNameUser : user}
                        secondary={(authorizedUser == true && registeredUser == true) ? regSocialActivityUser : userSocialActivity}/>
                    <ListItemText/>
                </Link>
                <IconButton className="header__button-menu" onClick={menuToggle}>
                    <MenuIcon/>
                </IconButton>
            </header>
        );
    }
}

const mapStateToProps = ({profileReducer, authorizationReducer}) => ({
    user: profileReducer.user,
    userSocialActivity: profileReducer.userSocialActivity,
    authorizedUser: authorizationReducer.authorizedUser,
    regNameUser: authorizationReducer.regNameUser,
    regSocialActivityUser: authorizationReducer.regSocialActivityUser,
    registeredUser: authorizationReducer.registeredUser
});
const mapDispatchToProps = dispatch => bindActionCreators({menuToggle}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Header);