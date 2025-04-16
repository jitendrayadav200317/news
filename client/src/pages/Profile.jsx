import {
  Avatar,
  Tabs,
  Text,
  Button,
  Container,
  Card,
  Group,
  Badge,
  Divider,
  Menu,
} from '@mantine/core';
import { getCookie } from '../utils/utils';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getBookmarks, getReadingHistory } from '../redux/slice/newsSlice';
import { Delete, DeleteIcon, EllipsisVertical, Trash } from 'lucide-react';
import List from '../components/List';
const Profile = () => {
  const [bookmarksCount, setBookmarksCount] = useState(5);
  const [readingHistoryCount, setReadingHistoryCount] = useState(12);
  const { readingHistory, bookmarks } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReadingHistory());
    dispatch(getBookmarks());
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Container className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
        <Card className="p-6 shadow-md">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-6"
          >
            <Avatar
              size={100}
              radius="xl"
              src="https://via.placeholder.com/100"
              alt="User Avatar"
            />
            <div>
              <h1 className="text-2xl font-bold">
                {getCookie('name').toUpperCase()}
              </h1>
              <h2 className="text-gray-500">{getCookie('email')}</h2>
            </div>
          </motion.div>

          <Group position="left" spacing="md" className="mt-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4, ease: 'easeOut' }}
            >
              <Badge color="blue" size="lg">
                📌 Bookmarks: {bookmarks.length}
              </Badge>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
            >
              <Badge color="green" size="lg">
                📖 Reading History:{' '}
                {readingHistory.length > 0 ? readingHistory.length : 0}
              </Badge>
            </motion.div>
          </Group>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button variant="outline" fullWidth color="blue" className="mt-4">
              Edit Profile
            </Button>
          </motion.div>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Tabs defaultValue="bookmarks" className="mt-6">
            <Tabs.List>
              <Tabs.Tab value="bookmarks">📌 Bookmarks</Tabs.Tab>
              <Tabs.Tab value="liked">❤️ Liked News</Tabs.Tab>
              <Tabs.Tab value="ai-news">🤖 AI Recommendations</Tabs.Tab>
              <Tabs.Tab value="preferences">⚙ Preferences</Tabs.Tab>
              <Tabs.Tab value="reading-history">⚙ Reading History</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="bookmarks" className="p-4">
              <List data={bookmarks} />
            </Tabs.Panel>

            <Tabs.Panel value="liked" className="p-4">
              <Text className="text-gray-700">No liked news articles.</Text>
            </Tabs.Panel>

            <Tabs.Panel value="ai-news" className="p-4">
              <Text className="text-gray-700">
                AI-powered news recommendations will appear here.
              </Text>
            </Tabs.Panel>

            <Tabs.Panel value="preferences" className="p-4">
              <Text className="text-gray-700">No preferences set.</Text>
            </Tabs.Panel>
            <Tabs.Panel value="reading-history" className="p-4">
              <List data={readingHistory} />
            </Tabs.Panel>
          </Tabs>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default Profile;
