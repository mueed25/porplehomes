import { Search, Settings, BadgeHelp, LogOut, ClipboardListIcon, FolderArchive, PersonStandingIcon, HomeIcon, LayoutDashboardIcon } from "lucide-react"

export const AdminList = [{
    name: 'Overview',
    icon: <LayoutDashboardIcon />
  },{
    name: 'Residentials',
    icon: <HomeIcon />
  },,{
    name: 'People',
    icon: <PersonStandingIcon />
  },,{
    name: 'Accountin',
    icon: <FolderArchive />
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