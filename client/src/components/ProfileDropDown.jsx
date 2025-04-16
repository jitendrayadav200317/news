import { Avatar, Menu, Divider, Text } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/slice/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/utils';
import { LogOut, User, Bookmark, Book, Mail } from 'lucide-react';
function ProfileDropDown() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/login');
  };
  return (
    <div>
      <Menu shadow="md" width={300}>
        <Menu.Target>
          <Avatar className="cursor-pointer" />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Profile</Menu.Label>

          <Link to="/profile">
            {' '}
            <Menu.Item leftSection={<User size={16} />}>Profile</Menu.Item>
          </Link>
          <Menu.Item
            leftSection={<Bookmark size={16} />}
          
          >
            Bookmarks
          </Menu.Item>
          <Menu.Item leftSection={<Book size={16} />} >
            Reading History
          </Menu.Item>

          <Divider />
          <Menu.Item
            leftSection={<LogOut size={16} />}
            color="red"
            onClick={handleSignOut}
          >
            Sign Out
          </Menu.Item>
          <Text leftSection={<Mail size={16} />} ml={20} size="sm">
            {getCookie('email')}
          </Text>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export default ProfileDropDown;
