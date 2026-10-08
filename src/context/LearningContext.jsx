import React, { createContext, useContext, useEffect, useState } from 'react';
import { MOCK_COURSES } from '../data/mockData';
import { deleteClassRecording } from '../utils/recordingStore';

const STORAGE_KEY = 'edumate_learning_content';
const LearningContext = createContext(null);

const initialContent = MOCK_COURSES.map((course) => ({
  ...course,
  type: 'course',
  subject: course.title.split(' ').slice(0, 2).join(' '),
  status: 'approved'
}));

function loadContent() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialContent;
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new Error('Saved learning content is not a list.');
    return parsed;
  } catch (error) {
    console.error('Could not load saved learning content.', error);
    return initialContent;
  }
}

export function LearningProvider({ children }) {
  const [content, setContent] = useState(loadContent);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (error) {
      console.error('Could not save learning content.', error);
    }
  }, [content]);

  useEffect(() => {
    const syncContent = (event) => {
      if (event.key !== STORAGE_KEY) return;
      if (event.newValue === null) {
        setContent(initialContent);
        return;
      }
      try {
        const parsed = JSON.parse(event.newValue);
        if (!Array.isArray(parsed)) throw new Error('Saved learning content is not a list.');
        setContent(parsed);
      } catch (error) {
        console.error('Could not sync saved learning content.', error);
      }
    };
    window.addEventListener('storage', syncContent);
    return () => window.removeEventListener('storage', syncContent);
  }, []);

  const publishContent = (item) => {
    const publishedItem = {
      ...item,
      id: `learning-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setContent((current) => [publishedItem, ...current]);
    return publishedItem;
  };

  const updateContentStatus = (id, status) => {
    setContent((current) => current.map((item) => (
      item.id === id ? { ...item, status } : item
    )));
  };

  const removeContent = async (id) => {
    const item = content.find((entry) => entry.id === id);
    if (item?.videoId) await deleteClassRecording(item.videoId);
    setContent((current) => current.filter((item) => item.id !== id));
  };

  return (
    <LearningContext.Provider value={{ content, publishContent, updateContentStatus, removeContent }}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) throw new Error('useLearning must be used within a LearningProvider.');
  return context;
}
