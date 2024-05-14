import { Search, Settings, BadgeHelp, LogOut, ClipboardListIcon, FolderArchive, PersonStandingIcon, HomeIcon, LayoutDashboardIcon } from "lucide-react"

export const AdminList1 = [{
    name: 'Overview',
    icon: <LayoutDashboardIcon color='#7623BA'/>
  },{
    name: 'Residentials',
    icon: <HomeIcon color='#7623BA'/>
  },,{
    name: 'People',
    icon: <PersonStandingIcon color='#7623BA'/>
  },,{
    name: 'Communication',
    icon: <ClipboardListIcon color='#7623BA'/>
  },]

  export const AdminList = [{
  name: 'Seller Dashboard',
  icon: <LayoutDashboardIcon />
},{
    name: 'Overview',
    icon: <LayoutDashboardIcon />
  },{
    name: 'Residentials',
    icon: <HomeIcon />
  },,{
    name: 'People',
    icon: <PersonStandingIcon />
  },,{
    name: 'Communication',
    icon: <ClipboardListIcon />
  },]

  

  export const SettingList = [{
    name: 'Help',
    icon: <BadgeHelp />
  },{
    name: 'Setting',
    icon: <Settings />
  },,{
    name: 'LogOut',
    icon: <LogOut />
  }]