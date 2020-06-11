import React, {Component} from 'react';
import './Profile.scss';
import Header from '../../regions/header/Header';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ChatIcon from '@material-ui/icons/Chat';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import classNames from 'classnames';
import PropTypes from "prop-types";

class Profile extends Component {

    static propTypes = {
        isVisibility: PropTypes.bool.isRequired,
        chats: PropTypes.object.isRequired
    };

    render() {
        const {user, userSocialActivity, isVisibility, chats} = this.props;
        let classes = classNames('aside', {'visibility': isVisibility}),
            chatActive = '/';
        if (Object.keys(chats).length != 0) {
            Object.values(chats).map(chat => {
                if (chat.active == true) chatActive = chat.link;
            });
        }
        return (
            <div className="wrapper">
                <Header/>
                <aside className={classes}>
                    <List className="profile__menu" disablePadding={true}>
                        <ListItem className="profile__menu-item">
                            <Link className="profile__menu-link" to={chatActive}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <HomeIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Главная"/>
                            </Link>
                        </ListItem>
                        <ListItem className="profile__menu-item">
                            <Link className="profile__menu-link" to="/news/">
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImportContactsIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Новости"/>
                            </Link>
                        </ListItem>
                        <ListItem className="profile__menu-item">
                            <Link className="profile__menu-link" to="/photos/">
                                <ListItemAvatar>
                                    <Avatar>
                                        <InsertPhotoIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Фотографии"/>
                            </Link>
                        </ListItem>
                        <ListItem className="profile__menu-item">
                            <Link className="profile__menu-link" to="/music/">
                                <ListItemAvatar>
                                    <Avatar>
                                        <MusicNoteIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Музыка"/>
                            </Link>
                        </ListItem>
                        <ListItem className="profile__menu-item">
                            <Link className="profile__menu-link" to={chatActive}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ChatIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Чаты"/>
                            </Link>
                        </ListItem>
                    </List>
                </aside>
                <main className="main">
                    <div className="profile">
                        <div className="profile__image">
                            <Avatar>
                            </Avatar>
                            <ListItemText primary={user} secondary={userSocialActivity}/><ListItemText/>
                        </div>
                        <div className="profile__text">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque deleniti harum magnam
                                odit pariatur quia tempora! Adipisci blanditiis earum expedita, explicabo facere facilis
                                ipsum, modi mollitia, quaerat quo voluptatem voluptates.</p>
                            <p>Eius error nihil
                                voluptate? Cupiditate excepturi exercitationem rem saepe? Accusantium amet aspernatur
                                ducimus, eligendi eos fugiat fugit harum, hic iste magnam minima minus mollitia,
                                necessitatibus quos repellendus repudiandae sed soluta.</p>
                            <p>Cumque, officiis, vel! Beatae,
                                consequatur dicta, dolores eaque enim impedit laboriosam odit perferendis quas quidem
                                sapiente velit voluptatem. Ad autem deleniti ipsam maiores nesciunt nihil odit
                                perspiciatis placeat sed, unde?</p>
                            <p>Alias aperiam consequatur, cupiditate delectus dignissimos dolorum earum est excepturi
                                incidunt labore laboriosam maiores, maxime minima molestiae nemo nihil nostrum
                                perferendis quidem quo, repudiandae soluta velit vero? Id, laboriosam
                                repudiandae.</p>
                            <p>Accusantium aperiam architecto assumenda aut beatae blanditiis dolorem
                                dolores earum eius fugiat incidunt iste laudantium magnam minima molestias natus neque
                                nesciunt officia possimus quas, quidem unde voluptatibus. Accusamus, et, maxime.</p>
                            <p>Alias aspernatur assumenda culpa doloribus eius error excepturi fugit id magnam nemo odit
                                pariatur perspiciatis, quae recusandae repellat repellendus suscipit! Assumenda cumque
                                delectus enim odio quaerat qui reprehenderit sequi voluptatem!</p>
                            <p>Ad adipisci aliquam architecto consectetur consequatur consequuntur delectus deleniti
                                explicabo facilis, incidunt ipsa iste iusto labore laudantium magni minus molestiae
                                officiis optio placeat quam quos sequi totam ullam unde veniam?</p>
                            <p>Accusantium consequuntur culpa dolorum facilis, laborum officia
                                suscipit. Aliquid architecto assumenda debitis distinctio dolor dolores dolorum, earum
                                est illum inventore iusto nemo nostrum, odio quis quo repudiandae similique, totam
                                vero!</p>
                            <p>Consequatur deserunt ea eaque et facilis harum illum ipsa natus, necessitatibus nemo
                                nobis odio odit, pariatur quae quasi sapiente sed, sit tenetur totam voluptas.
                                Cupiditate error eveniet mollitia natus nihil!</p>
                            <p>Accusamus aliquid at autem commodi consequatur eaque
                                eligendi illum itaque molestias nam numquam odio perferendis placeat quam quas quia quod
                                ratione sed, sunt temporibus tenetur velit veniam veritatis vero voluptatem!</p>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

const mapStateToProps = ({profileReducer, chatReducer}) => ({
    user: profileReducer.user,
    userSocialActivity: profileReducer.userSocialActivity,
    isVisibility: chatReducer.isVisibility,
    chats: chatReducer.chats
});
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Profile);