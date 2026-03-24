import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

export interface Board {
  _id: string;
  name: string;
  owner: { _id: string; email: string };
  tasks: string[];
  updatedAt: string;
}

export const useBoards = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { socket } = useSocket();

  const fetchBoards = useCallback(async () => {
    try {
      const res = await fetch('/api/boards', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setBoards(data.boards || []);
    } catch (error) {
      console.error('Failed to fetch boards:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createBoard = async (name: string) => {
    try {
      const res = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      });
      const data = await res.json();
      
      if (socket) {
        socket.emit('board-updated', { 
          boardId: data.board._id, 
          board: data.board 
        });
      }
      
      return data.board;
    } catch (error) {
      console.error('Failed to create board:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (token) {
      fetchBoards();
    }
  }, [token, fetchBoards]);

  useEffect(() => {
    if (!socket) return;

    socket.on('board-changed', (board: Board) => {
      setBoards(prev => {
        const index = prev.findIndex(b => b._id === board._id);
        if (index > -1) {
          const updated = [...prev];
          updated[index] = board;
          return updated;
        }
        return [board, ...prev];
      });
    });

    return () => {
      socket.off('board-changed');
    };
  }, [socket]);

  return { boards, loading, fetchBoards, createBoard };
};
