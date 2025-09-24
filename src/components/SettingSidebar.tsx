import { User, Bell, Palette, Shield, Lock } from 'lucide-react';

interface SettingSidebarProps {
  selectedTopic: string;
  onSelectTopic: (topic: string) => void;
}

const topics = [
  { id: 'profile', label: 'Profile Information', icon: User },
  { id: 'password', label: 'Change Password', icon: Lock },
  { id: 'notifications', label: 'Notification Preferences', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield },
];

export default function SettingSidebar({ selectedTopic, onSelectTopic }: SettingSidebarProps) {
  return (
    <nav className="w-64 bg-white rounded-md shadow-md p-4">
      <ul className="space-y-2">
        {topics.map((topic) => {
          const Icon = topic.icon;
          const isSelected = selectedTopic === topic.id;
          return (
            <li key={topic.id}>
              <button
                onClick={() => onSelectTopic(topic.id)}
                className={`flex items-center w-full px-3 py-2 rounded-md text-left text-sm font-medium ${
                  isSelected ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {topic.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
