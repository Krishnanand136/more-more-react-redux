import ArgusLogo from "../../images/argus-logo.png"
import Menu1 from "../../images/myBooks.png"
import Search from "../../images/Search-Default.png"
import Help from "../../images/Help-Default.png"
import Notification from "../../images/Notification-Default.png"
import User from "../../images/User-Default.jpg"
import TypoGraphy from "../base/TypoGraphy"
import { useLocation, useNavigate } from "react-router-dom"
import IconButton from "../base/IconButton"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import allActions from "../../state/actions"
import { messages } from "../../data/data"


//------------------------------------------//
const NavBarBrand = ({className, ...props}) => {
    return (
        <img
            className={`NavBar-Brand ${className ? className : ''}`}
            src={ArgusLogo}
        />
    )
}

const LeftMenuItem = ({name, icon, selected, onClick ,className}) => {
    const defaultClassName = `LeftMenuItem ${className ? className : ''} ${ selected ? 'LeftMenuItem-Selected' : ''}`

    const onclick = () =>{
        onClick && onClick()
    }

    return (
        <div className={defaultClassName} onClick={onclick}>
            <IconButton icon={icon}/>
            <TypoGraphy text={name}/>
        </div>
    )
}

const NavBarLeftSection = ({className, menuItems}) => {
    const defaultClassName = `NavBarLeftSection ${className ? className : ''}`

    return (
        <div className={defaultClassName}>
            <NavBarBrand/>
            <div className="MenuBar">
                {
                    menuItems.map((el,index) => 
                        <LeftMenuItem key={index} name={el.name} icon={el.icon} onClick={el.onClick} selected={el.selected} dropDown={el.dropDown} dropDownItems={el.dropDownItems}/>
                    )
                }
            </div>
            
        </div>
        
    )
}
//------------------------------------------//



//------------------------------------------//
const RightMenuItem = ({name, icon, onClick, className}) => {
    const defaultClassName = `RightMenuItem ${className ? className : ''}`
    return (
        <div className={defaultClassName}>
            <img
                src={icon}
                className="MenuItem-icon"
                onClick={onClick}
            />
        </div>
    )
}

const NavBarRightSection = ({className, menuItems}) => {
    const defaultClassName = `NavBarRightSection ${className ? className : ''}`

    return (
        <div className={defaultClassName}>
            <div className="MenuBar">
                {
                    menuItems.map((el,index) => 
                        <RightMenuItem key={index} icon={el.icon} onClick={el.onClick}/>
                    )
                }
            </div>
        </div>
        
    )
}
//------------------------------------------//


const UserNavBar = ({className, ...rest}) => {

    const defaultClass = `NavBar-Container ${className ? className : ''}`
    const location = useLocation()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const {  language } = useSelector((state) => state);
    const { userLogout } = bindActionCreators(allActions, dispatch)

    const leftMenuItems = [
        {
            name: messages.allBooks[language],
            icon: Menu1,
            route: 'allBooks',
            selected: location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === 'homepage',
            onClick: () => {
                if(location.pathname !== '/homepage')
                    navigate('/homepage')
            }

        },
        {
            name: messages.myBooks[language],
            icon: Menu1,
            route: 'myBooks',
            selected: location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === 'myBooks',
            onClick: () => {
                if(location.pathname !== '/myBooks')
                    navigate('/myBooks')
            }

        },
        {
            name: messages.myWishList[language],
            icon: Menu1,
            route: 'myWishList',
            selected: location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === 'myWishList',
            onClick: () => {
                if(location.pathname !== '/myWishList')
                    navigate('/myWishList')
            }

        }
    ]

    const rightMenuItems = [
        {
            name: 'Search',
            icon: Search,
        },
        {
            name: 'Help',
            icon: Help,
        },
        {
            name: 'Notification',
            icon: Notification,
        },
        {
            name: 'User',
            onClick: () => userLogout(),
            icon: User,
        }

    ]

    
    return(
        <div className={defaultClass}>
            <NavBarLeftSection menuItems={leftMenuItems}/>
            <NavBarRightSection menuItems={rightMenuItems}/>            
        </div>
    )
}

export default UserNavBar