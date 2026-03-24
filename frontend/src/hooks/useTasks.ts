import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  board: string;
  position: number;
  assignee?: { _id: string; email: string };
  updatedAt: string;
}

export const useTasks = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { socket } = useSocket();

  const fetchTasks = useCallback(async () => {
    if (!boardId || !token) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/tasks/board/${boardId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [boardId, token]);

  const createTask = useCallback(async (taskData: {
    title: string;
    description?: string;
    status?: 'todo' | 'in-progress' | 'done';
    position?: number;
  }) => {
    if (!boardId || !token) throw new Error('Missing boardId or token');

    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...taskData, boardId })
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to create task');
    }

    const data = await res.json();
    
    if (socket) {
      socket.emit('task-updated', { 
        boardId, 
        task: data.task 
      });
    }
    
    return data.task;
  }, [boardId, token, socket]);

  const updateTask = useCallback(async (taskId: string, updates: Partial<Task>) => {
    if (!token) throw new Error('Missing token');

    const res = await fetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update task');
    }

    const data = await res.json();
    
    if (socket) {
      socket.emit('task-updated', { 
        boardId: tasks[0]?.board || boardId!, 
        task: data.task 
      });
    }
    
    return data.task;
  }, [token, socket, boardId, tasks]);

  useEffect(() => {
    if (boardId && token) {
      fetchTasks();
    }
  }, [boardId, token, fetchTasks]);

useEffect(() => {
  if (!socket || !boardId) return;

    console.log('🔗 Listening for task-updated on board:', boardId);

  const handleTaskUpdate = (data: { boardId: string; task: Task }) => {

      console.log('TASK RECEIVED:', data.task?._id, 'for board:', data.boardId);
      
      if (data.boardId === boardId && data.task?._id) {  // NULL CHECKS
       
      setTasks(prev => {
      const index = prev.findIndex(t => t._id === data.task!._id);;
        if (index > -1) {
          const updated = [...prev];
          updated[index] = data.task;
          return updated;
        }
        return [data.task, ...prev];
      });
    }
  };

socket.on('task-updated', (data: { boardId: string; task: Task }) => {
  console.log('📨 TASK UPDATE RECEIVED:', data.task._id, data.boardId); //DEBUG
});

  socket.on('task-updated', handleTaskUpdate);

  return () => {
    socket.off('task-updated', handleTaskUpdate);
  };
}, [socket, boardId]);


  return { tasks, loading, fetchTasks, createTask, updateTask };
};
