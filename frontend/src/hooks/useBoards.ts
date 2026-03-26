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

  const [error, setError] = useState<string | null>(null);

  const fetchBoards = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch('/api/boards', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to fetch boards');

      const data = await res.json();
      setBoards(data.boards || []);
    } catch (error) {
      console.error('Failed to fetch boards:', error);
      setError('Failed to load boards. Please refresh.');
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
        console.log('📤 EMITTING board-updated:', data);
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

  console.log('🔗 Boards socket listening...'); // DEBUG

  const handleBoardChange = (board: Board) => {
    console.log('📨 BOARD CHANGED:', board._id, board.name);
    setBoards(prev => {
      const index = prev.findIndex(b => b._id === board._id);
      if (index > -1) {
        const updated = [...prev];
        updated[index] = board;
        return updated;
      }
      return [board, ...prev];
    });
  };

  socket.on('board-changed', handleBoardChange);

  return () => {
    socket.off('board-changed', handleBoardChange);
  };
}, [socket]);


  return { boards, loading, error, fetchBoards, createBoard };
};
