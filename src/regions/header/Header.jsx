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
        menuToggle: PropTypes.func.isRequired
    };

    render() {
        const {user, userSocialActivity, menuToggle} = this.props;
        return (
            <header className="header">
                <Link className="header__profile-link" to="/profile/">
                    <ListItemAvatar>
                        <Avatar>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user} secondary={userSocialActivity}/><ListItemText/>
                </Link>
                <IconButton className="header__button-menu" onClick={menuToggle}>
                    <MenuIcon/>
                </IconButton>
            </header>
        );
    }
}

const mapStateToProps = ({profileReducer}) => ({
    user: profileReducer.user,
    userSocialActivity: profileReducer.userSocialActivity
});
const mapDispatchToProps = dispatch => bindActionCreators({menuToggle}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Header);